import { useState, useEffect } from "react";
import { LibraryItem } from "@/types/dashboard";
import { toast } from "@/hooks/use-toast";
import { MOCK_LIBRARY_ITEMS } from "@/data/mock/library";

export const categories = ["All Categories", "Literature", "Fiction", "Textbook", "Reference", "Biography", "Science", "History", "Philosophy", "Computer Science"];

export const useLibrary = () => {
  const [books, setBooks] = useState<LibraryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [currentBook, setCurrentBook] = useState<LibraryItem | null>(null);
  const [newBook, setNewBook] = useState<Omit<LibraryItem, "id">>({
    title: "",
    author: "",
    category: "Literature",
    available: true
  });
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBooks(MOCK_LIBRARY_ITEMS);
      setIsLoading(false);
    }, 400);
  }, []);
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All Categories" || book.category === categoryFilter;
    const matchesAvailability = 
      availabilityFilter === null || 
      (availabilityFilter === "available" && book.available) || 
      (availabilityFilter === "borrowed" && !book.available);
    return matchesSearch && matchesCategory && matchesAvailability;
  });
  
  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      category: "Literature",
      available: true
    });
    setCurrentBook(null);
  };
  
  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title and author are required.",
      });
      return;
    }
    
    try {
      const newBookWithId = {
        id: (books.length + 1).toString(),
        ...newBook
      };
      setBooks(prev => [...prev, newBookWithId]);
      
      setIsAddingBook(false);
      resetForm();
      
      toast({
        title: "Book Added",
        description: `${newBook.title} has been added to the library.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add book to the library.",
      });
    }
  };
  
  const handleEditBook = async () => {
    if (!currentBook || !currentBook.title || !currentBook.author) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title and author are required.",
      });
      return;
    }
    
    try {
      setBooks(prev => prev.map(book => book.id === currentBook.id ? currentBook : book));
      
      setIsEditingBook(false);
      resetForm();
      
      toast({
        title: "Book Updated",
        description: `${currentBook.title} has been updated.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update book information.",
      });
    }
  };
  
  const handleDeleteBook = async (id: string) => {
    try {
      setBooks(prev => prev.filter(book => book.id !== id));
      
      toast({
        title: "Book Deleted",
        description: "The book has been deleted from the library.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete book.",
      });
    }
  };
  
  const handleToggleAvailability = async (id: string) => {
    const book = books.find(book => book.id === id);
    if (!book) return;
    
    try {
      if (book.available) {
        setCurrentBook(book);
        toast({
          title: "Book Check Out",
          description: "Please enter borrower information.",
        });
      } else {
        const bookUpdate = {
          ...book,
          available: true,
          dueDate: undefined,
          borrowedBy: undefined
        };
        
        setBooks(prev => prev.map(b => b.id === id ? bookUpdate : b));
        
        toast({
          title: "Book Checked In",
          description: "The book has been returned to the library.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update book status.",
      });
    }
  };

  const handleBorrowBook = async (book: LibraryItem, borrower: string, dueDate: string) => {
    if (!book || !borrower || !dueDate) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Missing required information.",
      });
      return;
    }
    
    try {
      const bookUpdate = {
        ...book,
        available: false,
        borrowedBy: borrower,
        dueDate
      };
      
      setBooks(prev => prev.map(b => b.id === book.id ? bookUpdate : b));
      setCurrentBook(null);
      
      toast({
        title: "Book Checked Out",
        description: `${book.title} has been checked out to ${borrower}.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check out book.",
      });
    }
  };

  return {
    books,
    filteredBooks,
    isLoading,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    isAddingBook,
    setIsAddingBook,
    isEditingBook,
    setIsEditingBook,
    currentBook,
    setCurrentBook,
    newBook,
    setNewBook,
    resetForm,
    handleAddBook,
    handleEditBook,
    handleDeleteBook,
    handleToggleAvailability,
    handleBorrowBook
  };
};
