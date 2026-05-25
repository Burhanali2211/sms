import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Student } from "@/types/dashboard";
import { MOCK_CLASSES, MOCK_STUDENTS } from "@/data/mock/academic";

const isDemoToken = () => {
  const token = localStorage.getItem('authToken');
  return !token || token.startsWith('demo-token-');
};

export const useClassManagement = () => {
  const [classesData, setClassesData] = useState<any[]>([]);
  const [classesLoading, setClassesLoading] = useState(true);
  const [classesError, setClassesError] = useState(null);

  const defaultClass = classesData?.[0] || {
    id: 0,
    name: "",
    subject: "",
    students: 0,
    schedule: "",
    room: ""
  };

  const [selectedClass, setSelectedClass] = useState(defaultClass);

  useEffect(() => {
    const fetchClasses = async () => {
      if (isDemoToken()) {
        setTimeout(() => {
          setClassesData(MOCK_CLASSES);
          setSelectedClass(MOCK_CLASSES[0]);
          setClassesLoading(false);
        }, 300);
        return;
      }
      try {
        setClassesLoading(true);
        const { ApiClient } = await import("@/utils/api/client");
        const apiClient = new ApiClient();
        const data = await apiClient.get<any[]>('/classes');
        setClassesData(data);
        if (data.length > 0) setSelectedClass(data[0]);
      } catch {
        setClassesData(MOCK_CLASSES);
        setSelectedClass(MOCK_CLASSES[0]);
      } finally {
        setClassesLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const [students, setStudents] = useState<Student[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(false);
  const [studentsError, setStudentsError] = useState(null);

  useEffect(() => {
    if (selectedClass && selectedClass.id) {
      if (isDemoToken()) {
        setStudents(MOCK_STUDENTS);
        return;
      }
      const fetchStudents = async () => {
        try {
          setStudentsLoading(true);
          const { ApiClient } = await import("@/utils/api/client");
          const apiClient = new ApiClient();
          const classData = await apiClient.get<any>(`/classes/${selectedClass.id}`);
          setStudents(classData.students || MOCK_STUDENTS);
        } catch {
          setStudents(MOCK_STUDENTS);
        } finally {
          setStudentsLoading(false);
        }
      };
      fetchStudents();
    }
  }, [selectedClass]);
  
  const handleAttendance = async (studentId: string, present: boolean) => {
    try {
      const student = students.find(s => s.id === studentId);
      if (!student) return;
      
      const newAttendance = present ? 
        Math.min(100, (student.attendance || 0) + 1) : 
        Math.max(0, (student.attendance || 0) - 1);
        
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, attendance: newAttendance } : s));
      
      toast({
        title: `Attendance Updated`,
        description: `Student marked as ${present ? 'present' : 'absent'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update attendance",
        variant: "destructive"
      });
    }
  };

  return {
    classesData,
    classesLoading,
    classesError,
    selectedClass,
    setSelectedClass,
    students,
    studentsLoading,
    studentsError,
    handleAttendance
  };
};
