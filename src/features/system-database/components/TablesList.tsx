import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Table as TableIcon } from "lucide-react";

interface TablesListProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredTables: any[];
}

export const TablesList = ({ searchTerm, setSearchTerm, filteredTables }: TablesListProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Database Tables</CardTitle>
          <CardDescription>
            View all tables in the system database
          </CardDescription>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tables..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Table Name</TableHead>
              <TableHead className="text-right">Rows</TableHead>
              <TableHead className="text-right">Size</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTables.map((table) => (
              <TableRow key={table.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <TableIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                    {table.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">{table.rows.toLocaleString()}</TableCell>
                <TableCell className="text-right">{table.size}</TableCell>
                <TableCell className="text-right">{table.lastUpdate}</TableCell>
              </TableRow>
            ))}
            {filteredTables.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No tables found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
