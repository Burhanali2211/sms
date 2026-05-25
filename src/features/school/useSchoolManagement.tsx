import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock class data
export const mockClassrooms = [
  { id: "1", name: "Room 101", capacity: 30, building: "Main Building", floor: 1, features: ["Projector", "Whiteboard"] },
  { id: "2", name: "Room 102", capacity: 25, building: "Main Building", floor: 1, features: ["Whiteboard"] },
  { id: "3", name: "Room 201", capacity: 35, building: "Main Building", floor: 2, features: ["Projector", "Whiteboard", "Computers"] },
  { id: "4", name: "Room 202", capacity: 40, building: "Main Building", floor: 2, features: ["Projector", "Whiteboard", "Smart Board"] },
  { id: "5", name: "Science Lab 1", capacity: 20, building: "Science Wing", floor: 1, features: ["Lab Equipment", "Whiteboard", "Sink"] },
  { id: "6", name: "Computer Lab", capacity: 30, building: "Technology Wing", floor: 1, features: ["Computers", "Projector", "Printer"] },
  { id: "7", name: "Library", capacity: 50, building: "Main Building", floor: 1, features: ["Bookshelves", "Study Desks", "Computers"] },
  { id: "8", name: "Auditorium", capacity: 200, building: "Arts Wing", floor: 1, features: ["Stage", "Sound System", "Seating"] },
];

// Mock academic year data
export const mockAcademicYears = [
  { id: "1", name: "2023-2024", start: "2023-08-15", end: "2024-05-30", current: true },
  { id: "2", name: "2022-2023", start: "2022-08-16", end: "2023-05-31", current: false },
  { id: "3", name: "2021-2022", start: "2021-08-15", end: "2022-05-30", current: false },
];

// Mock terms data
export const mockTerms = [
  { id: "1", name: "Fall 2023", start: "2023-08-15", end: "2023-12-20", academicYear: "2023-2024", current: true },
  { id: "2", name: "Spring 2024", start: "2024-01-08", end: "2024-05-30", academicYear: "2023-2024", current: false },
  { id: "3", name: "Fall 2022", start: "2022-08-16", end: "2022-12-21", academicYear: "2022-2023", current: false },
  { id: "4", name: "Spring 2023", start: "2023-01-09", end: "2023-05-31", academicYear: "2022-2023", current: false },
];

export const useSchoolManagement = () => {
  const [activeTab, setActiveTab] = useState("info");
  
  const [schoolInfo, setSchoolInfo] = useState({
    name: "EduSync Academy",
    address: "123 Education Street",
    city: "Learning City",
    state: "Knowledge State",
    zipCode: "12345",
    country: "United States",
    phone: "(555) 123-4567",
    email: "info@edusync.academy",
    website: "https://edusync.academy",
    principal: "Pat Principal",
    founded: "2010",
    slogan: "Empowering Minds, Shaping Futures"
  });
  
  const [classrooms, setClassrooms] = useState(mockClassrooms);
  const [academicYears, setAcademicYears] = useState(mockAcademicYears);
  const [terms, setTerms] = useState(mockTerms);
  
  const [isEditingSchoolInfo, setIsEditingSchoolInfo] = useState(false);
  const [editableSchoolInfo, setEditableSchoolInfo] = useState(schoolInfo);
  
  const [isAddingClassroom, setIsAddingClassroom] = useState(false);
  const [newClassroom, setNewClassroom] = useState({
    name: "",
    capacity: 30,
    building: "Main Building",
    floor: 1,
    features: [] as string[]
  });
  
  const buildings = [...new Set(classrooms.map(c => c.building))];
  
  const handleUpdateSchoolInfo = () => {
    setSchoolInfo(editableSchoolInfo);
    setIsEditingSchoolInfo(false);
    toast({
      title: "School Information Updated",
      description: "School information has been updated successfully.",
    });
  };
  
  const handleAddClassroom = () => {
    if (!newClassroom.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Classroom name is required.",
      });
      return;
    }
    
    const updatedClassrooms = [
      ...classrooms,
      {
        id: (classrooms.length + 1).toString(),
        ...newClassroom,
        features: newClassroom.features || []
      }
    ];
    
    setClassrooms(updatedClassrooms);
    setIsAddingClassroom(false);
    setNewClassroom({
      name: "",
      capacity: 30,
      building: "Main Building",
      floor: 1,
      features: []
    });
    
    toast({
      title: "Classroom Added",
      description: `${newClassroom.name} has been added successfully.`,
    });
  };
  
  const handleDeleteClassroom = (id: string) => {
    const updatedClassrooms = classrooms.filter(classroom => classroom.id !== id);
    setClassrooms(updatedClassrooms);
    
    toast({
      title: "Classroom Deleted",
      description: "Classroom has been deleted successfully.",
    });
  };
  
  const handleAddAcademicYear = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Adding academic years will be available in a future update.",
    });
  };
  
  const handleAddTerm = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Adding terms will be available in a future update.",
    });
  };
  
  const handleSetCurrentAcademicYear = (id: string) => {
    const updatedAcademicYears = academicYears.map(year => ({
      ...year,
      current: year.id === id
    }));
    
    setAcademicYears(updatedAcademicYears);
    
    toast({
      title: "Current Academic Year Updated",
      description: `The current academic year has been updated.`,
    });
  };
  
  const handleSetCurrentTerm = (id: string) => {
    const updatedTerms = terms.map(term => ({
      ...term,
      current: term.id === id
    }));
    
    setTerms(updatedTerms);
    
    toast({
      title: "Current Term Updated",
      description: `The current term has been updated.`,
    });
  };

  return {
    activeTab,
    setActiveTab,
    schoolInfo,
    setSchoolInfo,
    classrooms,
    setClassrooms,
    academicYears,
    setAcademicYears,
    terms,
    setTerms,
    isEditingSchoolInfo,
    setIsEditingSchoolInfo,
    editableSchoolInfo,
    setEditableSchoolInfo,
    isAddingClassroom,
    setIsAddingClassroom,
    newClassroom,
    setNewClassroom,
    buildings,
    handleUpdateSchoolInfo,
    handleAddClassroom,
    handleDeleteClassroom,
    handleAddAcademicYear,
    handleAddTerm,
    handleSetCurrentAcademicYear,
    handleSetCurrentTerm
  };
};
