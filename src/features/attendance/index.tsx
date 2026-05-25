import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { useAttendance } from "./useAttendance";
import { AttendanceStats } from "./components/AttendanceStats";
import { AttendanceRecords } from "./components/AttendanceRecords";

const Attendance = () => {
  const {
    selectedDate,
    setSelectedDate,
    attendanceData,
    totalClasses,
    presentClasses,
    absentClasses,
    attendancePercentage
  } = useAttendance();

  return (
    <DashboardLayout>
      <DashboardHeader title="Attendance" description="Track your class attendance" />
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        <AttendanceStats 
          totalClasses={totalClasses}
          presentClasses={presentClasses}
          absentClasses={absentClasses}
          attendancePercentage={attendancePercentage}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AttendanceRecords records={attendanceData} />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Calendar
                </CardTitle>
                <CardDescription>Select a date to view attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline">
                  Request Leave
                </Button>
                <Button className="w-full" variant="outline">
                  View Full Report
                </Button>
                <Button className="w-full" variant="outline">
                  Download Certificate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
