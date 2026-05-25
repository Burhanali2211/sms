import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Save } from "lucide-react";

interface AppearanceSettingsProps {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  displaySettings: {
    contentDensity: string;
    fontFamily: string;
    animationsEnabled: boolean;
    fontSize: number;
  };
  setDisplaySettings: React.Dispatch<React.SetStateAction<{
    contentDensity: string;
    fontFamily: string;
    animationsEnabled: boolean;
    fontSize: number;
  }>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  handleSaveSettings: () => void;
}

export const AppearanceSettings = ({
  theme, setTheme,
  displaySettings, setDisplaySettings,
  language, setLanguage,
  handleSaveSettings
}: AppearanceSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance</CardTitle>
        <CardDescription>
          Customize how EduSync looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <RadioGroup 
            id="theme" 
            value={theme}
            onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="font-normal">
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="font-normal">
                Dark
              </Label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system" className="font-normal">
                System
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />

        <div className="space-y-2">
          <Label htmlFor="content-density">Content Density</Label>
          <RadioGroup 
            id="content-density" 
            value={displaySettings.contentDensity}
            onValueChange={(value) => setDisplaySettings({...displaySettings, contentDensity: value})}
            className="flex flex-col space-y-1"
          >
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="comfortable" id="comfortable" />
              <Label htmlFor="comfortable" className="font-normal">
                Comfortable
              </Label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="normal" id="normal" />
              <Label htmlFor="normal" className="font-normal">
                Normal
              </Label>
            </div>
            <div className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value="compact" id="compact" />
              <Label htmlFor="compact" className="font-normal">
                Compact
              </Label>
            </div>
          </RadioGroup>
        </div>

        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="font-size">Font Size</Label>
          <div className="flex items-center gap-4">
            <span className="text-sm">A</span>
            <Slider
              id="font-size"
              min={12}
              max={24}
              step={1}
              value={[displaySettings.fontSize]}
              onValueChange={(values) => setDisplaySettings({...displaySettings, fontSize: values[0]})}
              className="flex-1"
            />
            <span className="text-lg">A</span>
            <span className="ml-4 min-w-[2rem] text-center">{displaySettings.fontSize}px</span>
          </div>
        </div>

        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Animations</Label>
            <p className="text-sm text-muted-foreground">
              Enable interface animations
            </p>
          </div>
          <Switch 
            checked={displaySettings.animationsEnabled}
            onCheckedChange={(checked) => 
              setDisplaySettings({...displaySettings, animationsEnabled: checked})
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
};
