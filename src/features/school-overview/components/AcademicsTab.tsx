import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const gradePerformance = [
  { grade: "Class 9",  avg: 82, pct: 82 },
  { grade: "Class 10", avg: 87, pct: 87 },
  { grade: "Class 11", avg: 79, pct: 79 },
  { grade: "Class 12", avg: 91, pct: 91 },
];

const subjectPerformance = [
  { subject: "Mathematics",    pct: 84 },
  { subject: "Science",        pct: 88 },
  { subject: "English",        pct: 80 },
  { subject: "Hindi",          pct: 86 },
  { subject: "Social Science", pct: 83 },
  { subject: "Computer Sc.",   pct: 91 },
];

const extracurricular = [
  { activity: "Sports & Athletics", pct: 78 },
  { activity: "Music & Dance",      pct: 65 },
  { activity: "Art & Craft",        pct: 72 },
  { activity: "Debate & Elocution", pct: 60 },
  { activity: "Science Olympiad",   pct: 55 },
];

export const AcademicsTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Academic Performance by Class</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {gradePerformance.map(({ grade, avg, pct }) => (
              <div key={grade} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{grade}</h3>
                  <span className="text-sm text-muted-foreground">Average: {avg}%</span>
                </div>
                <Progress
                  value={pct}
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
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {subjectPerformance.map(({ subject, pct }) => (
                <div key={subject}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{subject}</span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                  <Progress
                    value={pct}
                    className="h-1"
                    indicatorClassName={cn("bg-blue-500 dark:bg-blue-400")}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Extracurricular Participation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {extracurricular.map(({ activity, pct }) => (
                <div key={activity}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{activity}</span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                  <Progress
                    value={pct}
                    className="h-1"
                    indicatorClassName={cn("bg-purple-500 dark:bg-purple-400")}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student Conduct</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "Excellent",          value: "42%", pct: 42, color: "bg-emerald-500 dark:bg-emerald-400" },
                { label: "Good",               value: "38%", pct: 38, color: "bg-blue-500 dark:bg-blue-400" },
                { label: "Satisfactory",       value: "14%", pct: 14, color: "bg-amber-500 dark:bg-amber-400" },
                { label: "Needs Improvement",  value: "6%",  pct: 6,  color: "bg-rose-500 dark:bg-rose-400" },
              ].map(({ label, value, pct, color }) => (
                <div key={label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                  <Progress
                    value={pct}
                    className="h-1"
                    indicatorClassName={cn(color)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
