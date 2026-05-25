import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LogStatsProps {
  errorCount: number;
  warningCount: number;
  infoCount: number;
  successCount: number;
}

export const LogStats = ({
  errorCount,
  warningCount,
  infoCount,
  successCount
}: LogStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-rose-600 dark:text-rose-400">
            Errors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{errorCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Require attention
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400">
            Warnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{warningCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Potential issues
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{infoCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Informational logs
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
            Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{successCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Completed operations
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
