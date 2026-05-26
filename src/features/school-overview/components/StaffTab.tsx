import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const departmentTeachers = [
  { dept: "Mathematics",        count: 7, pct: 14 },
  { dept: "Science",            count: 9, pct: 18 },
  { dept: "English",            count: 5, pct: 10 },
  { dept: "Social Studies",     count: 6, pct: 12 },
  { dept: "Hindi & Languages",  count: 6, pct: 12 },
  { dept: "Technology",         count: 4, pct: 8  },
  { dept: "Arts & Music",       count: 5, pct: 10 },
  { dept: "Physical Education", count: 4, pct: 8  },
  { dept: "Administration",     count: 4, pct: 8  },
];

export const StaffTab = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Staff Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cn("p-4 rounded-lg text-center", "bg-muted text-foreground")}>
              <h3 className="text-xl font-bold">50</h3>
              <p className="text-sm text-muted-foreground">Teaching Staff</p>
            </div>
            <div className={cn("p-4 rounded-lg text-center", "bg-muted text-foreground")}>
              <h3 className="text-xl font-bold">15</h3>
              <p className="text-sm text-muted-foreground">Administration</p>
            </div>
            <div className={cn("p-4 rounded-lg text-center", "bg-muted text-foreground")}>
              <h3 className="text-xl font-bold">20</h3>
              <p className="text-sm text-muted-foreground">Support Staff</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-4">Teacher Distribution by Department</h3>
            <div className="space-y-3">
              {departmentTeachers.map(({ dept, count, pct }) => (
                <div key={dept}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>{dept}</span>
                    <span className="font-medium">{count} teachers</span>
                  </div>
                  <Progress
                    value={pct}
                    className="h-1"
                    indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                  />
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
            {[
              { label: "M.Phil / Ph.D",       value: "8%",  pct: 8  },
              { label: "Post Graduate (M.A / M.Sc / M.Com)", value: "52%", pct: 52 },
              { label: "Graduate (B.Ed + Degree)", value: "35%", pct: 35 },
              { label: "Diploma / Certificate", value: "5%",  pct: 5  },
            ].map(({ label, value, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
                <Progress
                  value={pct}
                  className="h-1"
                  indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
