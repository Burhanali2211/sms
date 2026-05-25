import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Award } from "lucide-react";

interface AccountInfoProps {
  formData: any;
  accountAge: number;
}

export const AccountInfo = ({ formData, accountAge }: AccountInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Account Information
        </CardTitle>
        <CardDescription>Details about your account and activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Member Since
            </Label>
            <div className="flex items-center gap-2">
              <Input
                value={formData.joinDate}
                disabled
              />
              {accountAge > 0 && (
                <Badge variant="secondary">{accountAge} years</Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Last Login
            </Label>
            <Input
              value={formData.lastLogin}
              disabled
            />
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="font-medium mb-2">Account Status</h4>
          <div className="flex items-center gap-2">
            <Badge variant="default">Active</Badge>
            <Badge variant="outline">Verified</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
