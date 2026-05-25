import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HardDrive, Lock, BellRing, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const BackupSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup Settings</CardTitle>
        <CardDescription>Configure backup and recovery preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="storage">
            <AccordionTrigger>
              <div className="flex items-center">
                <HardDrive className="h-4 w-4 mr-2" />
                Storage Configuration
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="grid gap-2">
                  <Label htmlFor="storage-location">Backup Storage Location</Label>
                  <Select defaultValue="local">
                    <SelectTrigger id="storage-location">
                      <SelectValue placeholder="Select storage location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local Storage</SelectItem>
                      <SelectItem value="cloud">Cloud Storage</SelectItem>
                      <SelectItem value="network">Network Storage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="storage-quota">Storage Quota (GB)</Label>
                  <Input id="storage-quota" type="number" defaultValue="8" />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-cleanup">Auto-cleanup old backups</Label>
                  <Switch id="auto-cleanup" defaultChecked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="encryption">
            <AccordionTrigger>
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                Encryption Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enable-encryption">Enable Backup Encryption</Label>
                  <Switch id="enable-encryption" defaultChecked />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="encryption-algorithm">Encryption Algorithm</Label>
                  <Select defaultValue="aes-256">
                    <SelectTrigger id="encryption-algorithm">
                      <SelectValue placeholder="Select algorithm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aes-256">AES-256</SelectItem>
                      <SelectItem value="aes-128">AES-128</SelectItem>
                      <SelectItem value="twofish">Twofish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="key-management">Key Management</Label>
                  <Select defaultValue="system">
                    <SelectTrigger id="key-management">
                      <SelectValue placeholder="Select key management" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System Managed</SelectItem>
                      <SelectItem value="custom">Custom Key</SelectItem>
                      <SelectItem value="kms">Key Management Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="notifications">
            <AccordionTrigger>
              <div className="flex items-center">
                <BellRing className="h-4 w-4 mr-2" />
                Notification Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label>Notify On</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="notify-success" defaultChecked />
                      <Label htmlFor="notify-success" className="text-sm">Backup Success</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="notify-failure" defaultChecked />
                      <Label htmlFor="notify-failure" className="text-sm">Backup Failure</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="notify-restore" defaultChecked />
                      <Label htmlFor="notify-restore" className="text-sm">System Restore</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="notify-quota" defaultChecked />
                      <Label htmlFor="notify-quota" className="text-sm">Storage Quota Warning</Label>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="advanced">
            <AccordionTrigger>
              <div className="flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Advanced Settings
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="grid gap-2">
                  <Label htmlFor="compression-level">Compression Level</Label>
                  <Select defaultValue="optimal">
                    <SelectTrigger id="compression-level">
                      <SelectValue placeholder="Select compression level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                      <SelectItem value="optimal">Optimal</SelectItem>
                      <SelectItem value="maximum">Maximum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="differential-backups">Enable Differential Backups</Label>
                  <Switch id="differential-backups" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="backup-verification">Verify Backups After Creation</Label>
                  <Switch id="backup-verification" defaultChecked />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="concurrent-backups">Max Concurrent Backups</Label>
                  <Input id="concurrent-backups" type="number" defaultValue="2" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="border-t pt-6 flex justify-end">
        <Button
          onClick={() => {
            toast({
              title: "Settings Saved",
              description: "Your backup settings have been updated."
            });
          }}
        >
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};
