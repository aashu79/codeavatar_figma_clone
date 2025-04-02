"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/simpleDialog";

// Types
interface BrokenLink {
  id: string;
  date: string;
  link: string;
}

const NotificationsPage = () => {
  // State management
  const [activeTab, setActiveTab] = useState("broken-links");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // Sample data
  const brokenLinks: BrokenLink[] = [
    {
      id: "NOT-8782",
      date: "2022-11-30",
      link: "https://heyopenspot.com/",
    },
    {
      id: "NOT-8782",
      date: "2024-01-05",
      link: "https://heyopenspot.com/",
    },
    {
      id: "NOT-8782",
      date: "2023-05-14",
      link: "https://heyopenspot.com/",
    },
    {
      id: "NOT-8782",
      date: "2021-08-22",
      link: "https://heyopenspot.com/",
    },
  ];

  const totalRows = 100; // Simulating 100 total rows

  const handleUpdateClick = (link: string) => {
    setCurrentLink(link);
    setNewUrl("https://fakeurl.com/asd");
    setUpdateModalOpen(true);
  };

  const handleUpdateUrl = () => {
    // Here you would implement the actual URL update logic
    console.log(`Updating ${currentLink} to ${newUrl}`);
    setUpdateModalOpen(false);
  };

  const closeModal = () => {
    setUpdateModalOpen(false);
  };

  // Add this array near your other state declarations
  const tabItems = [
    { value: "broken-links", label: "Broken Links" },
    { value: "label-1", label: "Label 1" },
    { value: "label-2", label: "Label 2" },
    { value: "label-3", label: "Label 3" },
    { value: "label-4", label: "Label 4" },
  ];

  return (
    <div className="w-full sm:max-w-[640px] md:max-w-[1280px] lg:max-w-[1280px] xl:max-w-[1280px] mx-auto p-6  h-[100vh] bg-white ">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <h1 className="text-xl font-semibold">Notifications</h1>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4  ">
        <TabsList className="flex flex-wrap gap-y-1.5 md:flex-nowrap h-auto md:max-h-[44px]  md:flex-row space-x-2 px-2 py-6 ">
          {tabItems.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`py-1.5 px-4 bg-transparent hover:bg-transparent ${
                activeTab === tab.value ? "bg-gray-100" : ""
              }`}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Search bar */}
      <div className="pb-4">
        <Input
          placeholder="Search"
          className="w-full max-w-sm border border-gray-200 rounded-md"
        />
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead className="w-[120px]">
                Date
                <Button variant="ghost" size="sm" className="ml-1 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Broken Link</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brokenLinks.map((link) => (
              <TableRow key={link.id + link.date}>
                <TableCell className="font-medium">{link.id}</TableCell>
                <TableCell>{link.date}</TableCell>
                <TableCell>
                  <a href={link.link} className="text-red-500 hover:underline">
                    {link.link}
                  </a>
                </TableCell>
                <TableCell className="text-right ">
                  <div
                    className="text-blue-500 py-1 hover:text-blue-700 hover:bg-transparent  hover:cursor-pointer"
                    onClick={() => handleUpdateClick(link.link)}
                  >
                    Update
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Custom Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border-t">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            1 of 100 row(s) selected.
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 space-y-4 sm:space-y-0 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <span className="text-sm">Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="border rounded p-1 text-sm"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <div>
              <span className="text-sm">
                Page {currentPage} of {Math.ceil(totalRows / rowsPerPage)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(1)}
                className="h-8 w-8"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(Math.ceil(totalRows / rowsPerPage), prev + 1)
                  )
                }
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setCurrentPage(Math.ceil(totalRows / rowsPerPage))
                }
                className="h-8 w-8"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={updateModalOpen} onOpenChange={setUpdateModalOpen}>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          className="bg-white rounded-lg shadow-lg overflow-hidden scale-positioned border-purple-500 border-2 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] "
        >
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-semibold">
              Update URL
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Update new url to fix the broken url.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
                placeholder="https://ui.shadcn.com/docs/installation"
              />
              <Button
                onClick={handleUpdateUrl}
                className="bg-black text-white hover:bg-gray-800"
              >
                Update
              </Button>
            </div>

            <div className="mt-2">
              <Button
                variant="outline"
                onClick={closeModal}
                className="text-black border-gray-200 bg-gray-100 hover:bg-gray-200"
              >
                Close
              </Button>
            </div>
          </div>

          {/* <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={18} />
          </button> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NotificationsPage;
