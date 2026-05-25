import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LibraryItem } from "@/types/dashboard";

interface LibraryStatsProps {
  books: LibraryItem[];
}

export const LibraryStats = ({ books }: LibraryStatsProps) => {
  const totalBooks = books.length;
  const availableBooks = books.filter(book => book.available).length;
  const borrowedBooks = books.filter(book => !book.available).length;
  const overdueBooks = books.filter(book => {
    if (!book.dueDate) return false;
    return new Date(book.dueDate) < new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBooks}</div>
          <p className="text-xs text-muted-foreground mt-1">In catalog</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Available Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableBooks}</div>
          <p className="text-xs text-muted-foreground mt-1">Ready for checkout</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Borrowed Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{borrowedBooks}</div>
          <p className="text-xs text-muted-foreground mt-1">Currently checked out</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overdueBooks}</div>
          <p className="text-xs text-muted-foreground mt-1">Past due date</p>
        </CardContent>
      </Card>
    </div>
  );
};
