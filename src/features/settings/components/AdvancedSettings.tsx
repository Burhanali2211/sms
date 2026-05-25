import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Share2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface AdvancedSettingsProps {
  exportData: {
    includeProfile: boolean;
    includeActivities: boolean;
    includeGrades: boolean;
    format: string;
  };
  setExportData: React.Dispatch<React.SetStateAction<{
    includeProfile: boolean;
    includeActivities: boolean;
    includeGrades: boolean;
    format: string;
  }>>;
}

export const AdvancedSettings = ({
  exportData, setExportData
}: AdvancedSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
        <CardDescription>
          Export your data and manage other advanced options
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Data Export</h3>
          <p className="text-sm text-muted-foreground">
            Export your data from the platform in various formats
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="include-profile"
                checked={exportData.includeProfile}
                onChange={(e) => setExportData({...exportData, includeProfile: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="include-profile">Include profile information</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="include-activities"
                checked={exportData.includeActivities}
                onChange={(e) => setExportData({...exportData, includeActivities: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="include-activities">Include activities and logs</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="include-grades"
                checked={exportData.includeGrades}
                onChange={(e) => setExportData({...exportData, includeGrades: e.target.checked})}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="include-grades">Include grades and assessments</Label>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Label htmlFor="export-format">Export format:</Label>
            <Select 
              value={exportData.format} 
              onValueChange={(format) => setExportData({...exportData, format})}
            >
              <SelectTrigger id="export-format" className="w-32">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="xlsx">Excel</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline"
              className="ml-auto"
              onClick={() => {
                toast({
                  title: "Export Started",
                  description: `Your data export in ${exportData.format.toUpperCase()} format has begun. You'll be notified when it's ready to download.`,
                  duration: 5000,
                });
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">API Access</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Manage your API tokens and access
            </p>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Personal Access Token</p>
                <p className="text-xs text-muted-foreground">Created on Jan 15, 2025</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => {
                toast({
                  title: "Token Regenerated",
                  description: "Your API token has been regenerated.",
                });
              }}>
                Regenerate
              </Button>
            </div>

            <div className="flex mt-2">
              <Input 
                value="sk_test_****_****_****_****_****_****" 
                readOnly 
                className="font-mono text-xs" 
              />
              <Button 
                variant="ghost" 
                className="ml-2"
                onClick={() => {
                  navigator.clipboard.writeText("sk_test_****_****_****_****_****_****");
                  toast({
                    title: "Copied to clipboard",
                    description: "API token has been copied to your clipboard.",
                    duration: 2000,
                  });
                }}
              >
                Copy
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Your API token provides full access to your account. Keep it safe!
            </p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Browser Sessions</h3>
            <p className="text-sm text-muted-foreground">
              Manage and log out from other browser sessions
            </p>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between p-2 rounded-md bg-secondary/50">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-xs text-muted-foreground">Chrome on Windows • New York, USA</p>
                </div>
                <Badge>Active</Badge>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md">
                <div>
                  <p className="font-medium">Safari on iPhone</p>
                  <p className="text-xs text-muted-foreground">Last active: 1 day ago • Los Angeles, USA</p>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive">
                  Revoke
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded-md">
                <div>
                  <p className="font-medium">Firefox on Linux</p>
                  <p className="text-xs text-muted-foreground">Last active: 3 days ago • Seattle, USA</p>
                </div>
                <Button size="sm" variant="ghost" className="text-destructive">
                  Revoke
                </Button>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => {
                toast({
                  title: "All Sessions Revoked",
                  description: "You've been logged out from all other devices.",
                  duration: 3000,
                });
              }}
            >
              Log out from all other sessions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
