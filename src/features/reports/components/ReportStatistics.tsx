import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export const ReportStatistics = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Report Statistics
        </CardTitle>
        <CardDescription>
          Overview of report generation and usage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">Reports Generated</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm text-muted-foreground">Active Reports</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Scheduled Reports</div>
          </div>
          <div className="border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-muted-foreground">On-time Delivery</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
