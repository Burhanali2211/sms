import { useState } from "react";

const mockStaffData = [
  { id: "1", name: "Sunita Mishra", role: "Mathematics Teacher", department: "Mathematics", email: "sunita.mishra@eitsms.edu.in", phone: "98201-11234", joinDate: "2018-08-15", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SunitaMishra" },
  { id: "2", name: "Arun Khanna", role: "English Teacher", department: "English", email: "arun.khanna@eitsms.edu.in", phone: "98202-22345", joinDate: "2019-07-20", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArunKhanna" },
  { id: "3", name: "Deepa Iyer", role: "Physics Teacher", department: "Science", email: "deepa.iyer@eitsms.edu.in", phone: "98203-33456", joinDate: "2017-09-10", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DeepaIyer" },
  { id: "4", name: "Ramesh Tiwari", role: "History Teacher", department: "Social Studies", email: "ramesh.tiwari@eitsms.edu.in", phone: "98204-44567", joinDate: "2020-01-15", status: "leave", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RameshTiwari" },
  { id: "5", name: "Kavita Nair", role: "Art & Craft Teacher", department: "Arts", email: "kavita.nair@eitsms.edu.in", phone: "98205-55678", joinDate: "2021-03-05", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KavitaNair" },
  { id: "6", name: "Suresh Yadav", role: "Physical Education Teacher", department: "Physical Education", email: "suresh.yadav@eitsms.edu.in", phone: "98206-66789", joinDate: "2019-11-20", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SureshYadav" },
  { id: "7", name: "Mohammed Khan", role: "Librarian", department: "Library", email: "mohammed.khan@eitsms.edu.in", phone: "98207-77890", joinDate: "2020-06-12", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MohammedKhan" },
  { id: "8", name: "Vikram Patel", role: "Computer Science Teacher", department: "Technology", email: "vikram.patel@eitsms.edu.in", phone: "98208-88901", joinDate: "2018-12-01", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=VikramPatel" },
  { id: "9", name: "Fatima Siddiqui", role: "Finance Officer", department: "Administration", email: "fatima.siddiqui@eitsms.edu.in", phone: "98209-99012", joinDate: "2016-04-18", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaSiddiqui" },
  { id: "10", name: "Priya Sharma", role: "Chemistry Teacher", department: "Science", email: "priya.sharma@eitsms.edu.in", phone: "98210-00123", joinDate: "2022-01-10", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma" },
  { id: "11", name: "Anjali Gupta", role: "Admissions Coordinator", department: "Administration", email: "anjali.gupta@eitsms.edu.in", phone: "98211-11235", joinDate: "2021-07-05", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnjaliGupta" },
  { id: "12", name: "Rajesh Kumar", role: "Biology Teacher", department: "Science", email: "rajesh.kumar@eitsms.edu.in", phone: "98212-22346", joinDate: "2015-06-20", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshKumar" },
  { id: "13", name: "Meena Joshi", role: "Hindi Teacher", department: "Languages", email: "meena.joshi@eitsms.edu.in", phone: "98213-33457", joinDate: "2020-08-01", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MeenaJoshi" },
  { id: "14", name: "Sanjay Bhatt", role: "Geography Teacher", department: "Social Studies", email: "sanjay.bhatt@eitsms.edu.in", phone: "98214-44568", joinDate: "2019-03-25", status: "leave", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SanjayBhatt" },
  { id: "15", name: "Lata Desai", role: "Music Teacher", department: "Arts", email: "lata.desai@eitsms.edu.in", phone: "98215-55679", joinDate: "2023-01-15", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LataDesai" },
  { id: "16", name: "Rohan Verma", role: "System Administrator", department: "Technology", email: "rohan.verma@eitsms.edu.in", phone: "98216-66780", joinDate: "2017-02-14", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RohanVerma" },
  { id: "17", name: "Nisha Mehta", role: "Accountant", department: "Administration", email: "nisha.mehta@eitsms.edu.in", phone: "98217-77891", joinDate: "2018-09-30", status: "active", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NishaMehta" },
  { id: "18", name: "Thomas Joseph", role: "Economics Teacher", department: "Social Studies", email: "thomas.joseph@eitsms.edu.in", phone: "98218-88902", joinDate: "2016-11-08", status: "inactive", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ThomasJoseph" },
];

export const getStaffById = (id: string) => {
  return mockStaffData.find(staff => staff.id === id);
};

export const useStaff = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const departments = [...new Set(mockStaffData.map(staff => staff.department))];
  
  const filteredStaff = mockStaffData.filter(staff => {
    // Apply search filter
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply department filter
    const matchesDepartment = departmentFilter === "all" || staff.department === departmentFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const totalStaff = mockStaffData.length;
  const activeStaff = mockStaffData.filter(s => s.status === "active").length;
  const leaveStaff = mockStaffData.filter(s => s.status === "leave").length;

  return {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    filteredStaff,
    totalStaff,
    activeStaff,
    leaveStaff
  };
};
