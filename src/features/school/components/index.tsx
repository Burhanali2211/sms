import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { School, Building, Calendar } from "lucide-react";

import { useSchoolManagement } from "../useSchoolManagement";
import { SchoolInfo } from "./SchoolInfo";
import { Classrooms } from "./Classrooms";
import { AcademicCalendar } from "./AcademicCalendar";

const SchoolManagement = () => {
  const {
    activeTab,
    setActiveTab,
    schoolInfo,
    classrooms,
    academicYears,
    terms,
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
  } = useSchoolManagement();

  return (
    <DashboardLayout>
      <DashboardHeader title="School Management" />
      <div className="flex-1 overflow-auto bg-background p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="mb-6">
            <TabsList className="w-full grid grid-cols-3 max-w-xl">
              <TabsTrigger value="info">
                <School className="h-4 w-4 mr-2" />
                School Info
              </TabsTrigger>
              <TabsTrigger value="classrooms">
                <Building className="h-4 w-4 mr-2" />
                Classrooms
              </TabsTrigger>
              <TabsTrigger value="academic">
                <Calendar className="h-4 w-4 mr-2" />
                Academic Calendar
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="info" className="space-y-6">
            <SchoolInfo 
              schoolInfo={schoolInfo}
              isEditingSchoolInfo={isEditingSchoolInfo}
              setIsEditingSchoolInfo={setIsEditingSchoolInfo}
              editableSchoolInfo={editableSchoolInfo}
              setEditableSchoolInfo={setEditableSchoolInfo}
              handleUpdateSchoolInfo={handleUpdateSchoolInfo}
            />
          </TabsContent>

          <TabsContent value="classrooms" className="space-y-6">
            <Classrooms 
              classrooms={classrooms}
              isAddingClassroom={isAddingClassroom}
              setIsAddingClassroom={setIsAddingClassroom}
              newClassroom={newClassroom}
              setNewClassroom={setNewClassroom}
              buildings={buildings}
              handleAddClassroom={handleAddClassroom}
              handleDeleteClassroom={handleDeleteClassroom}
            />
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <AcademicCalendar 
              academicYears={academicYears}
              terms={terms}
              handleAddAcademicYear={handleAddAcademicYear}
              handleAddTerm={handleAddTerm}
              handleSetCurrentAcademicYear={handleSetCurrentAcademicYear}
              handleSetCurrentTerm={handleSetCurrentTerm}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SchoolManagement;
