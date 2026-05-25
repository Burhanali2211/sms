import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const StaffTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cn(
              "p-4 rounded-lg text-center",
              "bg-muted text-foreground transition-colors duration-300"
            )}>
              <h3 className="text-xl font-bold">50</h3>
              <p className="text-sm text-muted-foreground">Teachers</p>
            </div>
            <div className={cn(
              "p-4 rounded-lg text-center",
              "bg-muted text-foreground transition-colors duration-300"
            )}>
              <h3 className="text-xl font-bold">15</h3>
              <p className="text-sm text-muted-foreground">Administration</p>
            </div>
            <div className={cn(
              "p-4 rounded-lg text-center",
              "bg-muted text-foreground transition-colors duration-300"
            )}>
              <h3 className="text-xl font-bold">20</h3>
              <p className="text-sm text-muted-foreground">Support Staff</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Teacher Distribution by Department</h3>
            <div className="space-y-2">
              {["Mathematics", "English", "Science", "Social Studies", "Arts", "Physical Education"].map((dept) => (
                <div key={dept} className="flex items-center justify-between">
                  <span>{dept}</span>
                  <span className="font-medium">{Math.floor(Math.random() * 7) + 5}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Qualifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>PhD</span>
              <span className="font-medium">5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Master's Degree</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Bachelor's Degree</span>
              <span className="font-medium">50%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
