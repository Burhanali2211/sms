import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const FacilitiesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Classroom Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Total Classrooms</span>
              <span className="font-medium">40</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Smart Classrooms</span>
              <span className="font-medium">25</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Regular Classrooms</span>
              <span className="font-medium">15</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Average Capacity</span>
              <span className="font-medium">30 students</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Specialized Facilities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Science Labs</span>
              <span className="font-medium">4</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Computer Labs</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Library</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Auditorium</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sports Fields</span>
              <span className="font-medium">2</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Excellent Condition</span>
              <span className="font-medium">60%</span>
            </div>
            <Progress value={60} className="h-2 mb-4" />

            <div className="flex items-center justify-between">
              <span>Good Condition</span>
              <span className="font-medium">30%</span>
            </div>
            <Progress value={30} className="h-2 mb-4" />

            <div className="flex items-center justify-between">
              <span>Needs Maintenance</span>
              <span className="font-medium">10%</span>
            </div>
            <Progress value={10} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Improvements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <h3 className="font-medium">Chemistry Lab Renovation</h3>
              <p className="text-sm text-muted-foreground">Budget approved — work begins Oct 2026</p>
            </div>
            <div className="p-3 border rounded-md">
              <h3 className="font-medium">Smart Board Rollout (8 Classrooms)</h3>
              <p className="text-sm text-muted-foreground">Phase 2 installation — July 2026</p>
            </div>
            <div className="p-3 border rounded-md">
              <h3 className="font-medium">Rooftop Solar Installation</h3>
              <p className="text-sm text-muted-foreground">Tender floated — target completion Dec 2026</p>
            </div>
            <div className="p-3 border rounded-md">
              <h3 className="font-medium">CCTV Upgrade (IP Cameras)</h3>
              <p className="text-sm text-muted-foreground">48 cameras across campus — June 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
