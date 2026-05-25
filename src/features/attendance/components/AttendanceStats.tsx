import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AttendanceStatsProps {
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
  attendancePercentage: number;
}

export const AttendanceStats = ({
  totalClasses,
  presentClasses,
  absentClasses,
  attendancePercentage
}: AttendanceStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClasses}</div>
          <p className="text-xs text-muted-foreground">This semester</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Present</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{presentClasses}</div>
          <p className="text-xs text-muted-foreground">Classes attended</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Absent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{absentClasses}</div>
          <p className="text-xs text-muted-foreground">Classes missed</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{attendancePercentage}%</div>
          <p className="text-xs text-muted-foreground">Overall percentage</p>
        </CardContent>
      </Card>
    </div>
  );
};
