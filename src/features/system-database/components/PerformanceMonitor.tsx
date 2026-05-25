import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PerformanceMonitorProps {
  handleRefreshStats: () => void;
  handleOptimize: () => void;
}

export const PerformanceMonitor = ({ handleRefreshStats, handleOptimize }: PerformanceMonitorProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Database Performance</CardTitle>
          <CardDescription>
            Monitor and optimize database performance
          </CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefreshStats}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-md p-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">Query Response Time</div>
            <div className="text-2xl font-bold">24ms</div>
            <div className="text-xs text-green-600">12% faster than last week</div>
          </div>
          <div className="border rounded-md p-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">Active Connections</div>
            <div className="text-2xl font-bold">18</div>
            <div className="text-xs text-muted-foreground">Peak today: 42</div>
          </div>
          <div className="border rounded-md p-4">
            <div className="text-sm font-medium text-muted-foreground mb-2">Cache Hit Ratio</div>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs text-green-600">2.1% improvement</div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-3">Slow Queries</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Query</TableHead>
                  <TableHead className="text-right">Average Time</TableHead>
                  <TableHead className="text-right">Executions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-mono text-xs truncate max-w-md">
                      SELECT * FROM attendance JOIN users ON attendance.user_id = users.id WHERE date &gt; '2023-04-01';
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-amber-600 font-medium">240ms</TableCell>
                  <TableCell className="text-right">152</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-mono text-xs truncate max-w-md">
                      SELECT courses.*, COUNT(enrollments.id) FROM courses LEFT JOIN enrollments ON courses.id = enrollments.course_id GROUP BY courses.id;
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-amber-600 font-medium">185ms</TableCell>
                  <TableCell className="text-right">47</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-mono text-xs truncate max-w-md">
                      SELECT * FROM system_logs WHERE created_at &gt; CURRENT_DATE - INTERVAL '7 days' ORDER BY created_at DESC;
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-amber-600 font-medium">164ms</TableCell>
                  <TableCell className="text-right">284</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Table Growth</h3>
            <div className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">system_logs</span>
                    <span className="text-sm text-muted-foreground">156.8 MB</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">notifications</span>
                    <span className="text-sm text-muted-foreground">78.2 MB</span>
                  </div>
                  <Progress value={48} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">attendance</span>
                    <span className="text-sm text-muted-foreground">64.3 MB</span>
                  </div>
                  <Progress value={38} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">grades</span>
                    <span className="text-sm text-muted-foreground">42.7 MB</span>
                  </div>
                  <Progress value={26} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Index Usage</h3>
            <div className="border rounded-md p-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">users_email_idx</span>
                    <span className="text-sm text-green-600">High</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">grades_course_id_idx</span>
                    <span className="text-sm text-green-600">High</span>
                  </div>
                  <Progress value={86} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">attendance_date_idx</span>
                    <span className="text-sm text-amber-600">Medium</span>
                  </div>
                  <Progress value={58} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">payments_user_id_idx</span>
                    <span className="text-sm text-red-600">Low</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleOptimize}>
            Optimize Database
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
