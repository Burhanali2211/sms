import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const SummaryTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Student Enrollment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,250</div>
          <div className="text-xs text-muted-foreground">Current academic year</div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Primary</span>
              <span>450 students</span>
            </div>
            <Progress
              value={36}
              className="h-1"
              indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Middle</span>
              <span>400 students</span>
            </div>
            <Progress
              value={32}
              className="h-1"
              indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>High School</span>
              <span>400 students</span>
            </div>
            <Progress
              value={32}
              className="h-1"
              indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Academic Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85%</div>
          <div className="text-xs text-muted-foreground">Average pass rate</div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>A Grade</span>
              <span>30%</span>
            </div>
            <Progress
              value={30}
              className="h-1"
              indicatorClassName={cn("bg-emerald-500 dark:bg-emerald-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>B Grade</span>
              <span>40%</span>
            </div>
            <Progress
              value={40}
              className="h-1"
              indicatorClassName={cn("bg-blue-500 dark:bg-blue-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>C Grade</span>
              <span>30%</span>
            </div>
            <Progress
              value={30}
              className="h-1"
              indicatorClassName={cn("bg-amber-500 dark:bg-amber-400")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">85</div>
          <div className="text-xs text-muted-foreground">Total staff members</div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Teachers</span>
              <span>50</span>
            </div>
            <Progress
              value={59}
              className="h-1"
              indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Administration</span>
              <span>15</span>
            </div>
            <Progress
              value={18}
              className="h-1"
              indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Support Staff</span>
              <span>20</span>
            </div>
            <Progress
              value={23}
              className="h-1"
              indicatorClassName={cn("bg-school-primary dark:bg-school-secondary")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Attendance Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">92%</div>
          <div className="text-xs text-muted-foreground">Average daily attendance</div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Present</span>
              <span>92%</span>
            </div>
            <Progress
              value={92}
              className="h-1"
              indicatorClassName={cn("bg-emerald-500 dark:bg-emerald-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Absent</span>
              <span>5%</span>
            </div>
            <Progress
              value={5}
              className="h-1"
              indicatorClassName={cn("bg-rose-500 dark:bg-rose-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Leave</span>
              <span>3%</span>
            </div>
            <Progress
              value={3}
              className="h-1"
              indicatorClassName={cn("bg-amber-500 dark:bg-amber-400")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Facilities Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">75%</div>
          <div className="text-xs text-muted-foreground">Average facility utilization</div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Classrooms</span>
              <span>90%</span>
            </div>
            <Progress
              value={90}
              className="h-1"
              indicatorClassName={cn("bg-blue-500 dark:bg-blue-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Labs</span>
              <span>65%</span>
            </div>
            <Progress
              value={65}
              className="h-1"
              indicatorClassName={cn("bg-purple-500 dark:bg-purple-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Library</span>
              <span>70%</span>
            </div>
            <Progress
              value={70}
              className="h-1"
              indicatorClassName={cn("bg-indigo-500 dark:bg-indigo-400")}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-md">Financial Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$2.5M</div>
          <div className="text-xs text-muted-foreground">Annual budget</div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Salaries</span>
              <span>60%</span>
            </div>
            <Progress
              value={60}
              className="h-1"
              indicatorClassName={cn("bg-green-500 dark:bg-green-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Infrastructure</span>
              <span>20%</span>
            </div>
            <Progress
              value={20}
              className="h-1"
              indicatorClassName={cn("bg-cyan-500 dark:bg-cyan-400")}
            />

            <div className="flex items-center justify-between text-xs">
              <span>Operations</span>
              <span>20%</span>
            </div>
            <Progress
              value={20}
              className="h-1"
              indicatorClassName={cn("bg-orange-500 dark:bg-orange-400")}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
