import { useState } from "react";
import { AdmissionApplication } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import { MOCK_ADMISSIONS } from "@/data/mock/admissions";

export const useAdmissions = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>(MOCK_ADMISSIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [isAddingApplication, setIsAddingApplication] = useState(false);
  const [newApplication, setNewApplication] = useState<Omit<AdmissionApplication, "id" | "submittedAt" | "status">>({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: ""
  });
  const [selectedApplication, setSelectedApplication] = useState<AdmissionApplication | null>(null);
  const [isViewingApplication, setIsViewingApplication] = useState(false);

  // Filter applications based on search, status, and grade
  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? app.status === statusFilter : true;
    const matchesGrade = gradeFilter ? app.grade === gradeFilter : true;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  // Calculate statistics
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(app => app.status === "pending").length;
  const approvedApplications = applications.filter(app => app.status === "approved").length;
  const rejectedApplications = applications.filter(app => app.status === "rejected").length;

  // Add new application handler
  const handleAddApplication = () => {
    if (!newApplication.studentName || !newApplication.parentName || !newApplication.email || !newApplication.grade) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields.",
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const updatedApplications: AdmissionApplication[] = [
      ...applications,
      {
        id: (applications.length + 1).toString(),
        ...newApplication,
        status: "pending",
        submittedAt: today
      }
    ];

    setApplications(updatedApplications);
    setIsAddingApplication(false);
    setNewApplication({
      studentName: "",
      parentName: "",
      email: "",
      phone: "",
      grade: ""
    });

    toast({
      title: "Application Submitted",
      description: `Application for ${newApplication.studentName} has been submitted.`,
    });
  };

  // View application handler
  const handleViewApplication = (id: string) => {
    const application = applications.find(app => app.id === id);
    if (application) {
      setSelectedApplication(application);
      setIsViewingApplication(true);
    }
  };

  // Update application status handler
  const handleUpdateStatus = (id: string, status: 'pending' | 'approved' | 'rejected') => {
    const updatedApplications = applications.map(app =>
      app.id === id ? { ...app, status } : app
    );

    setApplications(updatedApplications);

    const statusVerb = status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending review';
    const application = applications.find(app => app.id === id);

    toast({
      title: `Application ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: `${application?.studentName}'s application has been ${statusVerb}.`,
    });

    setIsViewingApplication(false);
  };

  // Available grades
  const grades = ["6", "7", "8", "9", "10", "11", "12"];

  return {
    applications,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    gradeFilter,
    setGradeFilter,
    isAddingApplication,
    setIsAddingApplication,
    newApplication,
    setNewApplication,
    selectedApplication,
    setSelectedApplication,
    isViewingApplication,
    setIsViewingApplication,
    filteredApplications,
    totalApplications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    handleAddApplication,
    handleViewApplication,
    handleUpdateStatus,
    grades
  };
};
