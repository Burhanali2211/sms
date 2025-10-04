/**
 * API client for EduSync backend
 * Handles all HTTP requests to the backend server
 */

// Global variable to hold debug functions when context is available
let debugAddRequest: ((request: any) => void) | null = null;

// Function to set debug functions from context
export const setDebugFunctions = (addRequest: (request: any) => void) => {
  debugAddRequest = addRequest;
};

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    // Initialize token from localStorage if available
    this.token = localStorage.getItem('authToken');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...options.headers as Record<string, string>,
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      // Create debug request object
      const debugRequest = {
        method: options.method || 'GET',
        url,
        headers,
        payload: options.body ? JSON.parse(options.body as string) : undefined
      };

      // Add request to debug log if debug context is available
      if (debugAddRequest) {
        debugAddRequest(debugRequest);
      }

      const startTime = Date.now();
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include' // Include credentials for cross-origin requests
      });
      const duration = Date.now() - startTime;

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          // If JSON parsing fails, get text content
          const text = await response.text();
          errorData = { error: text || `HTTP ${response.status}: ${response.statusText}` };
        }
        
        const errorMessage = errorData.error || `HTTP ${response.status}: ${response.statusText}`;
        
        // Add error response to debug log
        if (debugAddRequest) {
          debugAddRequest({
            ...debugRequest,
            status: response.status,
            error: errorMessage,
            duration,
            // Add database interaction information for common endpoints
            ...this.getDatabaseInfoForEndpoint(endpoint, options.method || 'GET', errorData)
          });
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Add successful response to debug log
      if (debugAddRequest) {
        debugAddRequest({
          ...debugRequest,
          status: response.status,
          response: data,
          duration,
          // Add database interaction information for common endpoints
          ...this.getDatabaseInfoForEndpoint(endpoint, options.method || 'GET', data)
        });
      }
      
      return { data };
    } catch (error) {
      // Add error to debug log
      if (debugAddRequest) {
        debugAddRequest({
          method: options.method || 'GET',
          url: `${this.baseURL}${endpoint}`,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers as Record<string, string>,
          },
          payload: options.body ? JSON.parse(options.body as string) : undefined,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          status: 0, // 0 indicates network/error
          // Add database interaction information for common endpoints
          ...this.getDatabaseInfoForEndpoint(endpoint, options.method || 'GET', null)
        });
      }
      
      return { 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Helper method to get database interaction information for common endpoints
  private getDatabaseInfoForEndpoint(endpoint: string, method: string, data: any) {
    const dbInfo: any = {};
    
    // Calendar events
    if (endpoint.includes('/calendar/events')) {
      dbInfo.tableName = 'events';
      dbInfo.affectedFields = ['title', 'description', 'start_date', 'end_date', 'location', 'event_type', 'is_public', 'created_by'];
      
      if (method === 'POST' || method === 'PUT') {
        // Check for validation errors
        const validationErrors: string[] = [];
        const fieldConflicts: { field: string; expected: string; actual: string }[] = [];
        
        if (data && typeof data === 'object') {
          // Check required fields
          if (method === 'POST' && (!data.title || !data.start_date)) {
            validationErrors.push('Title and start date are required');
          }
          
          // Check field types
          if (data.start_date && isNaN(Date.parse(data.start_date))) {
            fieldConflicts.push({
              field: 'start_date',
              expected: 'valid date string',
              actual: typeof data.start_date
            });
          }
          
          if (data.end_date && isNaN(Date.parse(data.end_date))) {
            fieldConflicts.push({
              field: 'end_date',
              expected: 'valid date string',
              actual: typeof data.end_date
            });
          }
          
          if (data.is_public !== undefined && typeof data.is_public !== 'boolean') {
            fieldConflicts.push({
              field: 'is_public',
              expected: 'boolean',
              actual: typeof data.is_public
            });
          }
        }
        
        if (validationErrors.length > 0) {
          dbInfo.validationErrors = validationErrors;
        }
        
        if (fieldConflicts.length > 0) {
          dbInfo.fieldConflicts = fieldConflicts;
        }
      }
    }
    
    // Users
    if (endpoint.includes('/users')) {
      dbInfo.tableName = 'users';
      dbInfo.affectedFields = ['email', 'name', 'role', 'phone', 'address', 'status'];
      
      if (method === 'POST' || method === 'PUT') {
        const validationErrors: string[] = [];
        const fieldConflicts: { field: string; expected: string; actual: string }[] = [];
        
        if (data && typeof data === 'object') {
          // Check required fields for creation
          if (method === 'POST' && (!data.email || !data.name || !data.role)) {
            validationErrors.push('Email, name, and role are required');
          }
          
          // Check field types
          if (data.email && typeof data.email !== 'string') {
            fieldConflicts.push({
              field: 'email',
              expected: 'string',
              actual: typeof data.email
            });
          }
          
          const validRoles = ['admin', 'super-admin', 'principal', 'school-admin', 'teacher', 'student', 'parent', 'financial', 'library', 'labs'];
          if (data.role && !validRoles.includes(data.role)) {
            fieldConflicts.push({
              field: 'role',
              expected: `one of: ${validRoles.join(', ')}`,
              actual: data.role
            });
          }
          
          if (data.phone && typeof data.phone !== 'string') {
            fieldConflicts.push({
              field: 'phone',
              expected: 'string',
              actual: typeof data.phone
            });
          }
        }
        
        if (validationErrors.length > 0) {
          dbInfo.validationErrors = validationErrors;
        }
        
        if (fieldConflicts.length > 0) {
          dbInfo.fieldConflicts = fieldConflicts;
        }
      }
    }
    
    // Academic endpoints
    if (endpoint.includes('/academic')) {
      if (endpoint.includes('/classes')) {
        dbInfo.tableName = 'classes';
        dbInfo.affectedFields = ['name', 'grade', 'section', 'subject', 'teacher_id', 'department_id', 'room_number', 'capacity'];
        
        if (method === 'POST' || method === 'PUT') {
          const validationErrors: string[] = [];
          const fieldConflicts: { field: string; expected: string; actual: string }[] = [];
          
          if (data && typeof data === 'object') {
            // Check required fields
            if (method === 'POST' && (!data.name || !data.grade || !data.section)) {
              validationErrors.push('Name, grade, and section are required');
            }
            
            // Check field types
            if (data.capacity !== undefined && (typeof data.capacity !== 'number' || data.capacity < 0)) {
              fieldConflicts.push({
                field: 'capacity',
                expected: 'positive number',
                actual: typeof data.capacity
              });
            }
          }
          
          if (validationErrors.length > 0) {
            dbInfo.validationErrors = validationErrors;
          }
          
          if (fieldConflicts.length > 0) {
            dbInfo.fieldConflicts = fieldConflicts;
          }
        }
      } else if (endpoint.includes('/attendance')) {
        dbInfo.tableName = 'attendance';
        dbInfo.affectedFields = ['student_id', 'class_id', 'date', 'status', 'notes', 'marked_by'];
        
        if (method === 'POST') {
          const validationErrors: string[] = [];
          const fieldConflicts: { field: string; expected: string; actual: string }[] = [];
          
          if (data && typeof data === 'object') {
            // Check required fields
            const requiredFields = ['student_id', 'class_id', 'date', 'status', 'marked_by'];
            const missingFields = requiredFields.filter(field => !data[field]);
            if (missingFields.length > 0) {
              validationErrors.push(`Missing required fields: ${missingFields.join(', ')}`);
            }
            
            // Check field types
            if (data.date && isNaN(Date.parse(data.date))) {
              fieldConflicts.push({
                field: 'date',
                expected: 'valid date string',
                actual: typeof data.date
              });
            }
            
            const validStatuses = ['present', 'absent', 'late', 'excused'];
            if (data.status && !validStatuses.includes(data.status)) {
              fieldConflicts.push({
                field: 'status',
                expected: `one of: ${validStatuses.join(', ')}`,
                actual: data.status
              });
            }
          }
          
          if (validationErrors.length > 0) {
            dbInfo.validationErrors = validationErrors;
          }
          
          if (fieldConflicts.length > 0) {
            dbInfo.fieldConflicts = fieldConflicts;
          }
        }
      } else if (endpoint.includes('/grades')) {
        dbInfo.tableName = 'grades';
        dbInfo.affectedFields = ['student_id', 'assignment_id', 'points_earned', 'max_points', 'percentage', 'letter_grade', 'comments', 'graded_by'];
        
        if (method === 'POST' || method === 'PUT') {
          const validationErrors: string[] = [];
          const fieldConflicts: { field: string; expected: string; actual: string }[] = [];
          
          if (data && typeof data === 'object') {
            // Check required fields for creation
            if (method === 'POST') {
              const requiredFields = ['student_id', 'assignment_id', 'graded_by'];
              const missingFields = requiredFields.filter(field => !data[field]);
              if (missingFields.length > 0) {
                validationErrors.push(`Missing required fields: ${missingFields.join(', ')}`);
              }
            }
            
            // Check field types
            if (data.points_earned !== undefined && typeof data.points_earned !== 'number') {
              fieldConflicts.push({
                field: 'points_earned',
                expected: 'number',
                actual: typeof data.points_earned
              });
            }
            
            if (data.max_points !== undefined && typeof data.max_points !== 'number') {
              fieldConflicts.push({
                field: 'max_points',
                expected: 'number',
                actual: typeof data.max_points
              });
            }
          }
          
          if (validationErrors.length > 0) {
            dbInfo.validationErrors = validationErrors;
          }
          
          if (fieldConflicts.length > 0) {
            dbInfo.fieldConflicts = fieldConflicts;
          }
        }
      }
    }
    
    // Dashboard endpoints
    if (endpoint.includes('/dashboard')) {
      if (endpoint.includes('/notifications')) {
        dbInfo.tableName = 'notifications';
        dbInfo.affectedFields = ['user_id', 'title', 'message', 'type', 'is_read'];
      } else if (endpoint.includes('/events')) {
        dbInfo.tableName = 'events';
        dbInfo.affectedFields = ['title', 'description', 'start_date', 'end_date', 'location', 'event_type', 'created_by', 'is_public'];
      }
    }
    
    // Add detailed error information for 500 errors
    if (data && typeof data === 'object' && data.error) {
      // Try to extract more detailed error information
      if (data.error.includes('database') || data.error.includes('SQL') || data.error.includes('relation')) {
        dbInfo.expectedFormat = 'Database query error';
        dbInfo.actualFormat = data.error;
      }
    }
    
    return dbInfo;
  }

  // Generic CRUD operations
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Authentication operations
  async login(email: string, password: string) {
    return this.post('/auth/login', { email, password });
  }

  async register(userData: any) {
    return this.post('/auth/register', userData);
  }

  async verifyToken(token: string) {
    return this.post('/auth/verify', { token });
  }

  // User operations
  async getUsers() {
    return this.get('/users');
  }

  async createUser(userData: any) {
    return this.post('/users', userData);
  }

  async updateUser(id: string, userData: any) {
    return this.put(`/users/${id}`, userData);
  }

  async deleteUser(id: string) {
    return this.delete(`/users/${id}`);
  }

  // Dashboard operations
  async getDashboardStats(role: string, userId?: string) {
    const endpoint = userId ? `/dashboard/stats/${role}/${userId}` : `/dashboard/stats/${role}`;
    return this.get(endpoint);
  }

  async getNotifications(userId: string) {
    return this.get(`/dashboard/notifications/${userId}`);
  }

  async getEvents(userId: string) {
    return this.get(`/dashboard/events/${userId}`);
  }

  async markNotificationRead(notificationId: string, userId: string) {
    return this.put(`/dashboard/notifications/${notificationId}/read`, { userId });
  }

  // Calendar operations
  async getCalendarEvents(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.get(`/calendar/events${query}`);
  }

  async createEvent(eventData: any) {
    return this.post('/calendar/events', eventData);
  }

  async updateEvent(id: string, eventData: any) {
    return this.put(`/calendar/events/${id}`, eventData);
  }

  async deleteEvent(id: string) {
    return this.delete(`/calendar/events/${id}`);
  }

  // Transportation operations
  async getBusRoutes() {
    return this.get('/transportation/routes');
  }

  async updateBusLocation(locationData: any) {
    return this.post('/transportation/location', locationData);
  }

  async getBusLocations() {
    return this.get('/transportation/locations');
  }

  // Academic operations
  async getClasses() {
    return this.get('/academic/classes');
  }

  async getClassStudents(classId: string) {
    return this.get(`/academic/classes/${classId}/students`);
  }

  async markAttendance(attendanceData: any) {
    return this.post('/academic/attendance', attendanceData);
  }
  
  async getStudentGrades(studentId: string) {
    return this.get(`/academic/students/${studentId}/grades`);
  }
  
  async createGrade(gradeData: any) {
    return this.post('/academic/grades', gradeData);
  }
  
  async updateGrade(id: string, gradeData: any) {
    return this.put(`/academic/grades/${id}`, gradeData);
  }
}

export const apiClient = new ApiClient();
export default apiClient;