import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SqlQueryToolProps {
  sqlQuery: string;
  setSqlQuery: (query: string) => void;
  queryResult: any;
  handleRunQuery: () => void;
  mockQueries: any[];
}

export const SqlQueryTool = ({
  sqlQuery,
  setSqlQuery,
  queryResult,
  handleRunQuery,
  mockQueries
}: SqlQueryToolProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SQL Query Tool</CardTitle>
        <CardDescription>
          Execute SQL queries directly on the database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800">Use with caution</h3>
            <p className="text-yellow-700 text-sm">Changes made through direct SQL queries can affect system integrity. Make sure you know what you're doing.</p>
          </div>
        </div>

        <div className="border rounded-md">
          <textarea
            className="w-full h-40 p-3 font-mono text-sm focus:outline-none"
            placeholder="Enter your SQL query here..."
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleRunQuery}>
            Run Query
          </Button>
        </div>

        {queryResult && (
          <div className="mt-6 border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Query Result</h3>
              <div className="text-sm text-muted-foreground">
                Execution time: {queryResult.executionTime}
              </div>
            </div>

            {queryResult.message ? (
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-green-800">{queryResult.message}</p>
                <p className="text-sm text-green-700">Rows affected: {queryResult.rowsAffected}</p>
              </div>
            ) : (
              <>
                <div className="text-sm text-muted-foreground mb-2">
                  {queryResult.rowCount} rows returned
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {queryResult.columns.map((column: string) => (
                          <TableHead key={column}>{column}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queryResult.rows.map((row: any, index: number) => (
                        <TableRow key={index}>
                          {queryResult.columns.map((column: string) => (
                            <TableCell key={`${index}-${column}`}>{row[column]}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        )}

        <div className="mt-6">
          <h3 className="font-medium mb-3">Recent Queries</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Query</TableHead>
                  <TableHead className="text-right">Duration</TableHead>
                  <TableHead className="text-right">Executed</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQueries.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-mono text-xs truncate max-w-md">
                        {item.query}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.duration}</TableCell>
                    <TableCell className="text-right">{item.executed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
