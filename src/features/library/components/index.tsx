import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, BookCopy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import { useLibrary, categories } from "../useLibrary";
import { LibraryStats } from "./LibraryStats";
import { AddBookDialog } from "./AddBookDialog";
import { EditBookDialog } from "./EditBookDialog";
import { LibraryCatalog } from "./LibraryCatalog";
import { BorrowedBooks } from "./BorrowedBooks";

const Library = () => {
  const {
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
  } = useLibrary();

  const [activeTab, setActiveTab] = useState("catalog");

  return (
    <DashboardLayout>
      <DashboardHeader title="Library Management" description="Manage books and borrowing" />
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading library data...</p>
          </div>
        ) : (
          <>
            <LibraryStats books={books} />
            
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Library Management</CardTitle>
                    <CardDescription>Manage books, loans, and returns</CardDescription>
                  </div>
                  <AddBookDialog
                    isAddingBook={isAddingBook}
                    setIsAddingBook={setIsAddingBook}
                    newBook={newBook}
                    setNewBook={setNewBook}
                    handleAddBook={handleAddBook}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                  <TabsList>
                    <TabsTrigger value="catalog">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Catalog
                    </TabsTrigger>
                    <TabsTrigger value="borrowed">
                      <BookCopy className="h-4 w-4 mr-2" />
                      Borrowed Books
                    </TabsTrigger>
                  </TabsList>
                  
                  <div className="mb-4 mt-4 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search books..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="sm:w-[180px]">
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <TabsContent value="catalog">
                    <LibraryCatalog 
                      filteredBooks={filteredBooks}
                      setCurrentBook={setCurrentBook}
                      setIsEditingBook={setIsEditingBook}
                      handleToggleAvailability={handleToggleAvailability}
                      handleDeleteBook={handleDeleteBook}
                    />
                  </TabsContent>
                  
                  <TabsContent value="borrowed">
                    <BorrowedBooks 
                      books={books}
                      searchTerm={searchTerm}
                      handleToggleAvailability={handleToggleAvailability}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      
      <EditBookDialog 
        isEditingBook={isEditingBook}
        setIsEditingBook={setIsEditingBook}
        currentBook={currentBook}
        setCurrentBook={setCurrentBook}
        handleEditBook={handleEditBook}
        resetForm={resetForm}
      />
    </DashboardLayout>
  );
};

export default Library;
