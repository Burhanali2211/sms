import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

interface EditBookDialogProps {
  isEditingBook: boolean;
  setIsEditingBook: (open: boolean) => void;
  currentBook: LibraryItem | null;
  setCurrentBook: (book: LibraryItem | null) => void;
  handleEditBook: () => void;
  resetForm: () => void;
}

export const EditBookDialog = ({
  isEditingBook,
  setIsEditingBook,
  currentBook,
  setCurrentBook,
  handleEditBook,
  resetForm
}: EditBookDialogProps) => {
  return (
    <Dialog open={isEditingBook} onOpenChange={setIsEditingBook}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>
            Update the details for this book.
          </DialogDescription>
        </DialogHeader>
        {currentBook && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input 
                id="edit-title" 
                value={currentBook.title}
                onChange={(e) => setCurrentBook({...currentBook, title: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-author">Author</Label>
              <Input 
                id="edit-author" 
                value={currentBook.author}
                onChange={(e) => setCurrentBook({...currentBook, author: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select 
                value={currentBook.category}
                onValueChange={(value) => setCurrentBook({...currentBook, category: value})}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue />
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
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => {
            setIsEditingBook(false);
            resetForm();
          }}>
            Cancel
          </Button>
          <Button onClick={handleEditBook}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
