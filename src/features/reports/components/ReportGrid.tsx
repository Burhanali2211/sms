import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, DollarSign, Users, Calendar, Eye, BarChart3, Download } from "lucide-react";

interface Report {
  id: number;
  title: string;
  type: string;
  description: string;
  lastGenerated?: string;
  status?: string;
}

interface ReportGridProps {
  filteredReports: Report[];
  handleViewReport: (id: number) => void;
  handleGenerateReport: (id: number) => void;
  handleExportReport: (id: number) => void;
}

export const ReportGrid = ({
  filteredReports,
  handleViewReport,
  handleGenerateReport,
  handleExportReport
}: ReportGridProps) => {
  const getStatusVariant = (status?: string) => {
    switch (status) {
      case "generated": return "default";
      case "pending": return "secondary";
      case "scheduled": return "outline";
      default: return "default";
    }
  };

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filteredReports.map((report) => (
        <Card key={report.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <span className="text-lg">{report.title}</span>
              {report.type === "academic" && <BookOpen className="h-5 w-5 text-blue-500" />}
              {report.type === "financial" && <DollarSign className="h-5 w-5 text-green-500" />}
              {report.type === "administrative" && <Users className="h-5 w-5 text-purple-500" />}
              {report.type === "events" && <Calendar className="h-5 w-5 text-red-500" />}
            </CardTitle>
            <CardDescription>{report.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <Badge variant={getStatusVariant(report.status)}>{report.status}</Badge>
              <div className="text-sm text-muted-foreground">
                Last: {report.lastGenerated}
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleViewReport(report.id)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleGenerateReport(report.id)}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Generate
              </Button>
              <Button 
                size="sm" 
                onClick={() => handleExportReport(report.id)}
              >
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
