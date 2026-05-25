import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Pencil, MapPin, Phone, Mail, Globe } from "lucide-react";

interface SchoolInfoProps {
  schoolInfo: any;
  isEditingSchoolInfo: boolean;
  setIsEditingSchoolInfo: (editing: boolean) => void;
  editableSchoolInfo: any;
  setEditableSchoolInfo: (info: any) => void;
  handleUpdateSchoolInfo: () => void;
}

export const SchoolInfo = ({
  schoolInfo,
  isEditingSchoolInfo,
  setIsEditingSchoolInfo,
  editableSchoolInfo,
  setEditableSchoolInfo,
  handleUpdateSchoolInfo
}: SchoolInfoProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>School Information</CardTitle>
          <CardDescription>
            View and update basic school information
          </CardDescription>
        </div>
        <Button 
          variant={isEditingSchoolInfo ? "default" : "outline"}
          onClick={() => setIsEditingSchoolInfo(!isEditingSchoolInfo)}
        >
          {isEditingSchoolInfo ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditingSchoolInfo ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input 
                    id="school-name" 
                    value={editableSchoolInfo.name}
                    onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={editableSchoolInfo.address}
                    onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, address: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city" 
                      value={editableSchoolInfo.city}
                      onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input 
                      id="state" 
                      value={editableSchoolInfo.state}
                      onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, state: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input 
                      id="zip" 
                      value={editableSchoolInfo.zipCode}
                      onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, zipCode: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input 
                      id="country" 
                      value={editableSchoolInfo.country}
                      onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, country: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={editableSchoolInfo.phone}
                    onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={editableSchoolInfo.email}
                    onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, email: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={editableSchoolInfo.website}
                    onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, website: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal</Label>
                  <Input 
                    id="principal" 
                    value={editableSchoolInfo.principal}
                    onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, principal: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded</Label>
                    <Input 
                      id="founded" 
                      value={editableSchoolInfo.founded}
                      onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, founded: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slogan">School Slogan</Label>
              <Input 
                id="slogan" 
                value={editableSchoolInfo.slogan}
                onChange={(e) => setEditableSchoolInfo({...editableSchoolInfo, slogan: e.target.value})}
              />
            </div>
            
            <div className="flex justify-end">
              <div className="space-x-2">
                <Button variant="outline" onClick={() => {
                  setEditableSchoolInfo(schoolInfo);
                  setIsEditingSchoolInfo(false);
                }}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateSchoolInfo}>
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{schoolInfo.name}</h3>
                  <p className="text-sm text-muted-foreground italic">"{schoolInfo.slogan}"</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                    <div>
                      <p>{schoolInfo.address}</p>
                      <p>{schoolInfo.city}, {schoolInfo.state} {schoolInfo.zipCode}</p>
                      <p>{schoolInfo.country}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p>{schoolInfo.phone}</p>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p>{schoolInfo.email}</p>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                  <p>{schoolInfo.website}</p>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Principal:</span> {schoolInfo.principal}
                  </p>
                  <p className="flex items-center">
                    <span className="font-medium mr-2">Founded:</span> {schoolInfo.founded}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
