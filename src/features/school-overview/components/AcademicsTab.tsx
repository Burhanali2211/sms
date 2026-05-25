import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const AcademicsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Performance by Grade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade) => (
              <div key={grade} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{grade}</h3>
                  <span className="text-sm text-muted-foreground">
                    Average: {Math.floor(Math.random() * 15) + 75}%
                  </span>
                </div>
                <Progress
                  value={Math.floor(Math.random() * 20) + 75}
                  className="h-2"
                  indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subjects Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Mathematics", "English", "Science", "History", "Languages"].map((subject) => (
                <div key={subject} className="flex items-center justify-between">
                  <span>{subject}</span>
                  <span className="font-medium">{Math.floor(Math.random() * 15) + 75}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extracurricular Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Sports", "Music", "Arts", "Debate", "Technology"].map((activity) => (
                <div key={activity} className="flex items-center justify-between">
                  <span>{activity}</span>
                  <span className="font-medium">{Math.floor(Math.random() * 15) + 75}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Excellent</span>
                <span className="font-medium">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Good</span>
                <span className="font-medium">35%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Satisfactory</span>
                <span className="font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Needs Improvement</span>
                <span className="font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
