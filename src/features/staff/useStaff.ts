import { useState } from "react";

// Mock staff data
const mockStaffData = [
  {
    id: "1",
    name: "Taylor Smith",
    role: "Mathematics Teacher",
    department: "Mathematics",
    email: "taylor@edusync.com",
    phone: "555-123-4567",
    joinDate: "2018-08-15",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "2",
    name: "Alex Johnson",
    role: "English Teacher",
    department: "English",
    email: "alex@edusync.com",
    phone: "555-234-5678",
    joinDate: "2019-07-20",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "3",
    name: "Jamie Williams",
    role: "Science Teacher",
    department: "Science",
    email: "jamie@edusync.com",
    phone: "555-345-6789",
    joinDate: "2017-09-10",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "4",
    name: "Casey Brown",
    role: "History Teacher",
    department: "Social Studies",
    email: "casey@edusync.com",
    phone: "555-456-7890",
    joinDate: "2020-01-15",
    status: "leave",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "5",
    name: "Morgan Davis",
    role: "Art Teacher",
    department: "Arts",
    email: "morgan@edusync.com",
    phone: "555-567-8901",
    joinDate: "2021-03-05",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "6",
    name: "Riley Miller",
    role: "Physical Education Teacher",
    department: "Physical Education",
    email: "riley@edusync.com",
    phone: "555-678-9012",
    joinDate: "2019-11-20",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "7",
    name: "Jordan Wilson",
    role: "Librarian",
    department: "Library",
    email: "jordan@edusync.com",
    phone: "555-789-0123",
    joinDate: "2020-06-12",
    status: "active",
    avatar: "https://github.com/shadcn.png"
  },
  {
    id: "8",
    name: "Sam Moore",
    role: "Computer Science Teacher",
    department: "Technology",
    email: "sam@edusync.com",
    phone: "555-890-1234",
    joinDate: "2018-12-01",
    status: "inactive",
    avatar: "https://github.com/shadcn.png"
  }
];

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

  return {
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    filteredStaff
  };
};
