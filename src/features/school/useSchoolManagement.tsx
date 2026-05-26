import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock class data
export const mockClassrooms = [
  { id: "1",  name: "Room 101",          capacity: 40, building: "Main Block",       floor: 1, features: ["Projector", "Whiteboard", "Fan"] },
  { id: "2",  name: "Room 102",          capacity: 40, building: "Main Block",       floor: 1, features: ["Whiteboard", "Fan"] },
  { id: "3",  name: "Room 103",          capacity: 35, building: "Main Block",       floor: 1, features: ["Projector", "Whiteboard", "Fan"] },
  { id: "4",  name: "Room 201",          capacity: 40, building: "Main Block",       floor: 2, features: ["Projector", "Whiteboard", "Smart Board", "AC"] },
  { id: "5",  name: "Room 202",          capacity: 40, building: "Main Block",       floor: 2, features: ["Projector", "Whiteboard", "AC"] },
  { id: "6",  name: "Room 203",          capacity: 35, building: "Main Block",       floor: 2, features: ["Whiteboard", "AC"] },
  { id: "7",  name: "Room 301",          capacity: 40, building: "Main Block",       floor: 3, features: ["Projector", "Whiteboard", "AC"] },
  { id: "8",  name: "Room 302",          capacity: 40, building: "Main Block",       floor: 3, features: ["Projector", "Whiteboard", "Smart Board", "AC"] },
  { id: "9",  name: "Physics Lab",       capacity: 24, building: "Science Wing",     floor: 1, features: ["Lab Equipment", "Whiteboard", "Exhaust Fan", "First Aid"] },
  { id: "10", name: "Chemistry Lab",     capacity: 24, building: "Science Wing",     floor: 1, features: ["Lab Equipment", "Whiteboard", "Fume Hood", "Sink", "First Aid"] },
  { id: "11", name: "Biology Lab",       capacity: 24, building: "Science Wing",     floor: 2, features: ["Lab Equipment", "Whiteboard", "Microscopes", "Sink"] },
  { id: "12", name: "Computer Lab",      capacity: 32, building: "Technology Wing",  floor: 1, features: ["32 PCs", "Projector", "Printer", "AC", "Internet"] },
  { id: "13", name: "Library",           capacity: 60, building: "Main Block",       floor: 1, features: ["4200 Books", "Study Desks", "Computers", "AC", "RFID System"] },
  { id: "14", name: "Art & Craft Room",  capacity: 30, building: "Arts Wing",        floor: 1, features: ["Drawing Boards", "Storage Cabinets", "Display Wall"] },
  { id: "15", name: "Music Room",        capacity: 20, building: "Arts Wing",        floor: 1, features: ["Piano", "Instruments", "Soundproofing"] },
  { id: "16", name: "Auditorium",        capacity: 400, building: "Arts Wing",       floor: 1, features: ["Stage", "PA System", "Projector Screen", "AC", "Green Room"] },
  { id: "17", name: "Staff Room",        capacity: 40, building: "Main Block",       floor: 1, features: ["Workstations", "Printer", "AC", "Pantry"] },
  { id: "18", name: "Sports Hall",       capacity: 100, building: "Sports Complex",  floor: 1, features: ["Badminton Court", "TT Tables", "Changing Rooms"] },
];

// Mock academic year data
export const mockAcademicYears = [
  { id: "1", name: "2025-2026", start: "2025-04-01", end: "2026-03-31", current: true },
  { id: "2", name: "2024-2025", start: "2024-04-01", end: "2025-03-31", current: false },
  { id: "3", name: "2023-2024", start: "2023-04-01", end: "2024-03-31", current: false },
];

// Mock terms data
export const mockTerms = [
  { id: "1", name: "Term I (2025-26)",   start: "2025-04-01", end: "2025-09-30", academicYear: "2025-2026", current: false },
  { id: "2", name: "Term II (2025-26)",  start: "2025-10-01", end: "2026-03-31", academicYear: "2025-2026", current: true },
  { id: "3", name: "Term I (2024-25)",   start: "2024-04-01", end: "2024-09-30", academicYear: "2024-2025", current: false },
  { id: "4", name: "Term II (2024-25)",  start: "2024-10-01", end: "2025-03-31", academicYear: "2024-2025", current: false },
];

export const useSchoolManagement = () => {
  const [activeTab, setActiveTab] = useState("info");
  
  const [schoolInfo, setSchoolInfo] = useState({
    name: "EIT Senior Secondary School",
    address: "Plot No. 14, Sector 12, Near Civil Lines",
    city: "Lucknow",
    state: "Uttar Pradesh",
    zipCode: "226001",
    country: "India",
    phone: "0522-2614-890",
    email: "info@eitsms.edu.in",
    website: "https://eitsms.edu.in",
    principal: "Dr. S. K. Arora",
    founded: "2005",
    slogan: "ज्ञान, शील, एकता — Knowledge, Character, Unity"
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
