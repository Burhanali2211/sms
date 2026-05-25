import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Database, Table as TableIcon, HardDrive } from "lucide-react";

export const DatabaseOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Database className="h-5 w-5 mr-2 text-blue-500" />
            Database Size
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">768.2 MB</div>
          <p className="text-sm text-muted-foreground">12% increase from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TableIcon className="h-5 w-5 mr-2 text-purple-500" />
            Total Tables
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">24</div>
          <p className="text-sm text-muted-foreground">3 new tables this month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <HardDrive className="h-5 w-5 mr-2 text-green-500" />
            Storage Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-1">
            <div className="text-3xl font-bold">72%</div>
            <span className="text-sm text-green-600 font-medium">23.4 GB free</span>
          </div>
          <Progress value={72} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
};
