import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setDebugFunctions } from '@/utils/api/client';

// Define database schema information
export interface DatabaseField {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  constraints?: string[];
}

export interface DatabaseTable {
  name: string;
  fields: DatabaseField[];
  relationships?: {
    type: 'one-to-one' | 'one-to-many' | 'many-to-many' | 'many-to-one';
    relatedTable: string;
    foreignKey?: string;
    joinTable?: string;
  }[];
}

export interface DebugRequest {
  id: string;
  timestamp: Date;
  method: string;
  url: string;
  headers: Record<string, string>;
  payload?: any;
  status?: number;
  response?: any;
  error?: string;
  duration?: number;
  // Database interaction information
  tableName?: string;
  affectedFields?: string[];
  validationErrors?: string[];
  expectedFormat?: any;
  actualFormat?: any;
  fieldConflicts?: { field: string; expected: string; actual: string }[];
}

interface DebugContextType {
  requests: DebugRequest[];
  addRequest: (request: Omit<DebugRequest, 'id' | 'timestamp'>) => void;
  clearRequests: () => void;
  isDebugWindowOpen: boolean;
  setIsDebugWindowOpen: (isOpen: boolean) => void;
  // Database schema information
  databaseSchema: DatabaseTable[];
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

interface DebugProviderProps {
  children: ReactNode;
}

// Define the database schema with relationships
const DATABASE_SCHEMA: DatabaseTable[] = [
  {
    name: 'users',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the user' },
      { name: 'email', type: 'VARCHAR(255)', required: true, description: 'User email address', constraints: ['UNIQUE', 'NOT NULL'] },
      { name: 'password_hash', type: 'VARCHAR(255)', required: true, description: 'Hashed user password', constraints: ['NOT NULL'] },
      { name: 'name', type: 'VARCHAR(255)', required: true, description: 'User full name', constraints: ['NOT NULL'] },
      { name: 'role', type: 'VARCHAR(50)', required: true, description: 'User role in the system', constraints: ['NOT NULL', 'CHECK (role IN (\'admin\', \'super-admin\', \'principal\', \'school-admin\', \'teacher\', \'student\', \'parent\', \'financial\', \'library\', \'labs\'))'] },
      { name: 'status', type: 'VARCHAR(20)', required: false, description: 'User account status', constraints: ['DEFAULT \'active\'', 'CHECK (status IN (\'active\', \'inactive\', \'suspended\'))'] },
      { name: 'avatar_url', type: 'TEXT', required: false, description: 'URL to user avatar image' },
      { name: 'phone', type: 'VARCHAR(20)', required: false, description: 'User phone number' },
      { name: 'address', type: 'TEXT', required: false, description: 'User address' },
      { name: 'date_of_birth', type: 'DATE', required: false, description: 'User date of birth' },
      { name: 'emergency_contact', type: 'VARCHAR(255)', required: false, description: 'Emergency contact information' },
      { name: 'last_login', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp of last login' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'one-to-one', relatedTable: 'students', foreignKey: 'user_id' },
      { type: 'one-to-one', relatedTable: 'teachers', foreignKey: 'user_id' }
    ]
  },
  {
    name: 'events',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the event' },
      { name: 'title', type: 'VARCHAR(255)', required: true, description: 'Event title', constraints: ['NOT NULL'] },
      { name: 'description', type: 'TEXT', required: false, description: 'Event description' },
      { name: 'start_date', type: 'TIMESTAMP WITH TIME ZONE', required: true, description: 'Event start date and time', constraints: ['NOT NULL'] },
      { name: 'end_date', type: 'TIMESTAMP WITH TIME ZONE', required: true, description: 'Event end date and time', constraints: ['NOT NULL'] },
      { name: 'location', type: 'VARCHAR(255)', required: false, description: 'Event location' },
      { name: 'event_type', type: 'VARCHAR(50)', required: false, description: 'Type of event' },
      { name: 'created_by', type: 'UUID', required: true, description: 'User who created the event', constraints: ['NOT NULL', 'REFERENCES users(id)'] },
      { name: 'is_public', type: 'BOOLEAN', required: false, description: 'Whether event is public', constraints: ['DEFAULT true'] },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'many-to-one', relatedTable: 'users', foreignKey: 'created_by' }
    ]
  },
  {
    name: 'classes',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the class' },
      { name: 'name', type: 'VARCHAR(255)', required: true, description: 'Class name', constraints: ['NOT NULL'] },
      { name: 'grade', type: 'VARCHAR(10)', required: true, description: 'Grade level', constraints: ['NOT NULL'] },
      { name: 'section', type: 'VARCHAR(10)', required: true, description: 'Class section', constraints: ['NOT NULL'] },
      { name: 'subject', type: 'VARCHAR(255)', required: false, description: 'Subject taught in class' },
      { name: 'teacher_id', type: 'UUID', required: false, description: 'Teacher assigned to class', constraints: ['REFERENCES users(id)'] },
      { name: 'department_id', type: 'UUID', required: false, description: 'Department the class belongs to', constraints: ['REFERENCES departments(id)'] },
      { name: 'room_number', type: 'VARCHAR(50)', required: false, description: 'Classroom room number' },
      { name: 'capacity', type: 'INTEGER', required: false, description: 'Maximum number of students', constraints: ['DEFAULT 30'] },
      { name: 'schedule', type: 'JSONB', required: false, description: 'Class schedule information' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'many-to-one', relatedTable: 'users', foreignKey: 'teacher_id' },
      { type: 'many-to-one', relatedTable: 'departments', foreignKey: 'department_id' }
    ]
  },
  {
    name: 'students',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the student' },
      { name: 'user_id', type: 'UUID', required: false, description: 'Reference to user account', constraints: ['REFERENCES users(id)'] },
      { name: 'student_id', type: 'VARCHAR(50)', required: true, description: 'Student identification number', constraints: ['UNIQUE', 'NOT NULL'] },
      { name: 'grade', type: 'VARCHAR(10)', required: true, description: 'Current grade level', constraints: ['NOT NULL'] },
      { name: 'section', type: 'VARCHAR(10)', required: true, description: 'Current section', constraints: ['NOT NULL'] },
      { name: 'class_id', type: 'UUID', required: false, description: 'Current class enrollment', constraints: ['REFERENCES classes(id)'] },
      { name: 'enrollment_date', type: 'DATE', required: false, description: 'Date of enrollment', constraints: ['DEFAULT CURRENT_DATE'] },
      { name: 'parent_contact', type: 'VARCHAR(255)', required: false, description: 'Parent/guardian contact information' },
      { name: 'medical_info', type: 'TEXT', required: false, description: 'Medical information' },
      { name: 'attendance', type: 'DECIMAL(5,2)', required: false, description: 'Attendance percentage', constraints: ['DEFAULT 0.00'] },
      { name: 'gpa', type: 'DECIMAL(3,2)', required: false, description: 'Grade point average', constraints: ['DEFAULT 0.00'] },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'one-to-one', relatedTable: 'users', foreignKey: 'user_id' },
      { type: 'many-to-one', relatedTable: 'classes', foreignKey: 'class_id' }
    ]
  },
  {
    name: 'attendance',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the attendance record' },
      { name: 'student_id', type: 'UUID', required: true, description: 'Student identifier', constraints: ['NOT NULL', 'REFERENCES students(id)'] },
      { name: 'class_id', type: 'UUID', required: true, description: 'Class identifier', constraints: ['NOT NULL', 'REFERENCES classes(id)'] },
      { name: 'date', type: 'DATE', required: true, description: 'Attendance date', constraints: ['NOT NULL'] },
      { name: 'status', type: 'VARCHAR(20)', required: true, description: 'Attendance status', constraints: ['NOT NULL', 'CHECK (status IN (\'present\', \'absent\', \'late\', \'excused\'))'] },
      { name: 'notes', type: 'TEXT', required: false, description: 'Additional notes' },
      { name: 'marked_by', type: 'UUID', required: true, description: 'User who marked attendance', constraints: ['NOT NULL', 'REFERENCES users(id)'] },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'many-to-one', relatedTable: 'students', foreignKey: 'student_id' },
      { type: 'many-to-one', relatedTable: 'classes', foreignKey: 'class_id' },
      { type: 'many-to-one', relatedTable: 'users', foreignKey: 'marked_by' }
    ]
  },
  {
    name: 'teachers',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the teacher' },
      { name: 'user_id', type: 'UUID', required: false, description: 'Reference to user account', constraints: ['REFERENCES users(id)'] },
      { name: 'employee_id', type: 'VARCHAR(50)', required: true, description: 'Employee identification number', constraints: ['UNIQUE', 'NOT NULL'] },
      { name: 'department_id', type: 'UUID', required: false, description: 'Department assignment', constraints: ['REFERENCES departments(id)'] },
      { name: 'qualification', type: 'VARCHAR(255)', required: false, description: 'Educational qualifications' },
      { name: 'experience_years', type: 'INTEGER', required: false, description: 'Years of teaching experience', constraints: ['DEFAULT 0'] },
      { name: 'salary', type: 'DECIMAL(10,2)', required: false, description: 'Monthly salary' },
      { name: 'hire_date', type: 'DATE', required: false, description: 'Date of hiring', constraints: ['DEFAULT CURRENT_DATE'] },
      { name: 'specialization', type: 'VARCHAR(255)', required: false, description: 'Teaching specialization' },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'one-to-one', relatedTable: 'users', foreignKey: 'user_id' },
      { type: 'many-to-one', relatedTable: 'departments', foreignKey: 'department_id' }
    ]
  },
  {
    name: 'assignments',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the assignment' },
      { name: 'title', type: 'VARCHAR(255)', required: true, description: 'Assignment title', constraints: ['NOT NULL'] },
      { name: 'description', type: 'TEXT', required: false, description: 'Assignment description' },
      { name: 'class_id', type: 'UUID', required: true, description: 'Class for which assignment is given', constraints: ['NOT NULL', 'REFERENCES classes(id)'] },
      { name: 'teacher_id', type: 'UUID', required: true, description: 'Teacher who created assignment', constraints: ['NOT NULL', 'REFERENCES users(id)'] },
      { name: 'due_date', type: 'TIMESTAMP WITH TIME ZONE', required: true, description: 'Assignment due date', constraints: ['NOT NULL'] },
      { name: 'max_points', type: 'INTEGER', required: false, description: 'Maximum points possible', constraints: ['DEFAULT 100'] },
      { name: 'assignment_type', type: 'VARCHAR(50)', required: false, description: 'Type of assignment', constraints: ['CHECK (assignment_type IN (\'homework\', \'quiz\', \'exam\', \'project\', \'lab\'))'] },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'many-to-one', relatedTable: 'classes', foreignKey: 'class_id' },
      { type: 'many-to-one', relatedTable: 'users', foreignKey: 'teacher_id' }
    ]
  },
  {
    name: 'grades',
    fields: [
      { name: 'id', type: 'UUID', required: true, description: 'Unique identifier for the grade' },
      { name: 'student_id', type: 'UUID', required: true, description: 'Student identifier', constraints: ['NOT NULL', 'REFERENCES students(id)'] },
      { name: 'assignment_id', type: 'UUID', required: true, description: 'Assignment identifier', constraints: ['NOT NULL', 'REFERENCES assignments(id)'] },
      { name: 'points_earned', type: 'DECIMAL(5,2)', required: false, description: 'Points earned by student' },
      { name: 'max_points', type: 'DECIMAL(5,2)', required: false, description: 'Maximum points possible' },
      { name: 'percentage', type: 'DECIMAL(5,2)', required: false, description: 'Grade percentage' },
      { name: 'letter_grade', type: 'VARCHAR(2)', required: false, description: 'Letter grade (A, B, C, etc.)' },
      { name: 'comments', type: 'TEXT', required: false, description: 'Grading comments' },
      { name: 'graded_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when graded', constraints: ['DEFAULT NOW()'] },
      { name: 'graded_by', type: 'UUID', required: true, description: 'User who graded', constraints: ['NOT NULL', 'REFERENCES users(id)'] },
      { name: 'created_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was created', constraints: ['DEFAULT NOW()'] },
      { name: 'updated_at', type: 'TIMESTAMP WITH TIME ZONE', required: false, description: 'Timestamp when record was last updated', constraints: ['DEFAULT NOW()'] }
    ],
    relationships: [
      { type: 'many-to-one', relatedTable: 'students', foreignKey: 'student_id' },
      { type: 'many-to-one', relatedTable: 'assignments', foreignKey: 'assignment_id' },
      { type: 'many-to-one', relatedTable: 'users', foreignKey: 'graded_by' }
    ]
  }
];

export const DebugProvider: React.FC<DebugProviderProps> = ({ children }) => {
  const [requests, setRequests] = useState<DebugRequest[]>(() => {
    // Try to load from localStorage but handle quota exceeded errors
    try {
      const saved = localStorage.getItem('debugRequests');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Convert timestamp strings back to Date objects
        return parsed.map((req: any) => ({
          ...req,
          timestamp: new Date(req.timestamp)
        })).slice(0, 50); // Limit to 50 requests to prevent storage issues
      }
    } catch (e) {
      // If there's an error (including quota exceeded), clear localStorage
      try {
        localStorage.removeItem('debugRequests');
      } catch (clearError) {
        // Ignore errors when clearing
      }
    }
    return [];
  });
  const [isDebugWindowOpen, setIsDebugWindowOpen] = useState(false);

  // Save to localStorage whenever requests change, but with size limitations
  useEffect(() => {
    try {
      // Limit requests to last 50 to prevent storage issues
      const limitedRequests = requests.slice(0, 50);
      
      // Convert Date objects to strings for localStorage
      const requestsToSave = limitedRequests.map(req => ({
        ...req,
        timestamp: req.timestamp.toISOString()
      }));
      
      // Check if the data is too large before saving
      const dataToSave = JSON.stringify(requestsToSave);
      if (dataToSave.length < 1000000) { // Limit to ~1MB
        localStorage.setItem('debugRequests', dataToSave);
      } else {
        // If data is too large, reduce the number of requests
        const reducedRequests = limitedRequests.slice(0, 25); // Keep only 25 requests
        const reducedDataToSave = JSON.stringify(reducedRequests.map(req => ({
          ...req,
          timestamp: req.timestamp.toISOString()
        })));
        localStorage.setItem('debugRequests', reducedDataToSave);
      }
    } catch (e) {
      // If there's a quota exceeded error, clear some data
      try {
        const reducedRequests = requests.slice(0, 10); // Keep only 10 requests
        const reducedDataToSave = JSON.stringify(reducedRequests.map(req => ({
          ...req,
          timestamp: req.timestamp.toISOString()
        })));
        localStorage.setItem('debugRequests', reducedDataToSave);
      } catch (reduceError) {
        // If still failing, clear all debug requests
        try {
          localStorage.removeItem('debugRequests');
        } catch (clearError) {
          // Ignore errors when clearing
        }
      }
    }
  }, [requests]);

  const addRequest = (request: Omit<DebugRequest, 'id' | 'timestamp'>) => {
    const newRequest: DebugRequest = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      ...request
    };
    
    setRequests(prev => [newRequest, ...prev].slice(0, 50)); // Keep only last 50 requests
  };

  // Set debug functions in API client
  useEffect(() => {
    setDebugFunctions(addRequest);
  }, []);

  const clearRequests = () => {
    setRequests([]);
    try {
      localStorage.removeItem('debugRequests');
    } catch (e) {
      // Ignore errors when clearing
    }
  };

  const value: DebugContextType = {
    requests,
    addRequest,
    clearRequests,
    isDebugWindowOpen,
    setIsDebugWindowOpen,
    databaseSchema: DATABASE_SCHEMA
  };

  return (
    <DebugContext.Provider value={value}>
      {children}
    </DebugContext.Provider>
  );
};

export const useDebug = (): DebugContextType => {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
};