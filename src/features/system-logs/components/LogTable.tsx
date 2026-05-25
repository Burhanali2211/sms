import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { SystemLog } from "../useSystemLogs";

// Get log type badge
const getLogTypeBadge = (type: SystemLog['type']) => {
  return <StatusBadge status={type} />;
};

// Format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

interface LogTableProps {
  currentLogs: SystemLog[];
  filteredLogs: SystemLog[];
  logsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
}

export const LogTable = ({
  currentLogs,
  filteredLogs,
  logsPerPage,
  currentPage,
  setCurrentPage,
  totalPages
}: LogTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>User</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentLogs.map((log) => (
            <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="whitespace-nowrap">
                {formatTimestamp(log.timestamp)}
              </TableCell>
              <TableCell>
                {getLogTypeBadge(log.type)}
              </TableCell>
              <TableCell>
                <div>
                  <p className="font-medium">{log.message}</p>
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
              </TableCell>
              <TableCell>
                {log.source}
              </TableCell>
              <TableCell>
                {log.user || '—'}
              </TableCell>
            </TableRow>
          ))}

          {currentLogs.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No logs found matching your search criteria.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {filteredLogs.length > logsPerPage && (
        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, idx, array) => (
                  <React.Fragment key={page}>
                    {idx > 0 && array[idx - 1] !== page - 1 && (
                      <PaginationItem>
                        <span className="px-2">...</span>
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </React.Fragment>
                ))}

              <PaginationNext
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};
