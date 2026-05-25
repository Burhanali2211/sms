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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  CheckCircle,
  MoreHorizontal,
  Pencil,
  Trash2
} from "lucide-react";
import { LibraryItem } from "@/types/dashboard";

interface LibraryCatalogProps {
  filteredBooks: LibraryItem[];
  setCurrentBook: (book: LibraryItem) => void;
  setIsEditingBook: (open: boolean) => void;
  handleToggleAvailability: (id: string) => void;
  handleDeleteBook: (id: string) => void;
}

export const LibraryCatalog = ({
  filteredBooks,
  setCurrentBook,
  setIsEditingBook,
  handleToggleAvailability,
  handleDeleteBook
}: LibraryCatalogProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredBooks.map((book) => (
          <TableRow key={book.id}>
            <TableCell className="font-medium">
              {book.title}
            </TableCell>
            <TableCell>{book.author}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>
              {book.available ? (
                <StatusBadge status="active" label="Available" />
              ) : (
                <StatusBadge status="info" label="Checked Out" />
              )}
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    setCurrentBook(book);
                    setIsEditingBook(true);
                  }}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleToggleAvailability(book.id)}>
                    {book.available ? (
                      <>
                        <User className="h-4 w-4 mr-2" />
                        Check Out
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Check In
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        
        {filteredBooks.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6">
              No books found matching your search.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
