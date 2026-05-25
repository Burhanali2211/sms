import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdmissionsStatsProps {
  totalApplications: number;
  pendingApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
}

export const AdmissionsStats = ({
  totalApplications,
  pendingApplications,
  approvedApplications,
  rejectedApplications
}: AdmissionsStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Total Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalApplications}</div>
          <p className="text-xs text-muted-foreground mt-1">
            All time
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Pending Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingApplications}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Awaiting decision
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Approved
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{approvedApplications}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Ready for enrollment
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Rejected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{rejectedApplications}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Not accepted
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
