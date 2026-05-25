import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Clock } from "lucide-react";

interface AcademicCalendarProps {
  academicYears: any[];
  terms: any[];
  handleAddAcademicYear: () => void;
  handleAddTerm: () => void;
  handleSetCurrentAcademicYear: (id: string) => void;
  handleSetCurrentTerm: (id: string) => void;
}

export const AcademicCalendar = ({
  academicYears,
  terms,
  handleAddAcademicYear,
  handleAddTerm,
  handleSetCurrentAcademicYear,
  handleSetCurrentTerm
}: AcademicCalendarProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Academic Years</CardTitle>
            <CardDescription>
              Configure academic years for the school
            </CardDescription>
          </div>
          <Button onClick={handleAddAcademicYear}>
            <Plus className="h-4 w-4 mr-2" />
            Add Year
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {academicYears.map((year) => (
                <TableRow key={year.id}>
                  <TableCell className="font-medium">{year.name}</TableCell>
                  <TableCell>{year.start}</TableCell>
                  <TableCell>{year.end}</TableCell>
                  <TableCell className="text-right">
                    {year.current ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Current
                      </span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetCurrentAcademicYear(year.id)}
                      >
                        Set as Current
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Terms</CardTitle>
            <CardDescription>
              Configure terms within academic years
            </CardDescription>
          </div>
          <Button onClick={handleAddTerm}>
            <Plus className="h-4 w-4 mr-2" />
            Add Term
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {terms.map((term) => (
                <TableRow key={term.id}>
                  <TableCell className="font-medium">{term.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>{term.start} to {term.end}</span>
                    </div>
                  </TableCell>
                  <TableCell>{term.academicYear}</TableCell>
                  <TableCell className="text-right">
                    {term.current ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Current
                      </span>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetCurrentTerm(term.id)}
                      >
                        Set as Current
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
