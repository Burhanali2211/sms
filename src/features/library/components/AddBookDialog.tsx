import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../useLibrary";
import { LibraryItem } from "@/types/dashboard";

interface AddBookDialogProps {
  isAddingBook: boolean;
  setIsAddingBook: (open: boolean) => void;
  newBook: Omit<LibraryItem, "id">;
  setNewBook: (book: Omit<LibraryItem, "id">) => void;
  handleAddBook: () => void;
}

export const AddBookDialog = ({
  isAddingBook,
  setIsAddingBook,
  newBook,
  setNewBook,
  handleAddBook
}: AddBookDialogProps) => {
  return (
    <Dialog open={isAddingBook} onOpenChange={setIsAddingBook}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
          <DialogDescription>
            Enter the details for the new book in the library catalog.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              placeholder="Book title"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="author">Author</Label>
            <Input 
              id="author" 
              placeholder="Author name"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={newBook.category}
              onValueChange={(value) => setNewBook({...newBook, category: value})}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.slice(1).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddingBook(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddBook}>
            Add Book
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
