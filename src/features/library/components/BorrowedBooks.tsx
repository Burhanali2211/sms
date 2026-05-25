import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { User, CalendarClock, CheckCircle } from "lucide-react";
import { LibraryItem } from "@/types/dashboard";

interface BorrowedBooksProps {
  books: LibraryItem[];
  searchTerm: string;
  handleToggleAvailability: (id: string) => void;
}

export const BorrowedBooks = ({
  books,
  searchTerm,
  handleToggleAvailability
}: BorrowedBooksProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Borrowed By</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books
          .filter(book => !book.available)
          .filter(book => {
            const matchesSearch = 
              book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
              book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (book.borrowedBy && book.borrowedBy.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesSearch;
          })
          .map((book) => {
            const isOverdue = book.dueDate && new Date(book.dueDate) < new Date();
            
            return (
              <TableRow key={book.id}>
                <TableCell className="font-medium">
                  <div>
                    <div>{book.title}</div>
                    <div className="text-sm text-muted-foreground">{book.author}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{book.borrowedBy}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{book.dueDate}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge 
                    status={isOverdue ? "error" : "warning"}
                    label={isOverdue ? "Overdue" : "Checked Out"}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleToggleAvailability(book.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Return
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        
        {books.filter(book => !book.available).length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6">
              No books are currently borrowed.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
