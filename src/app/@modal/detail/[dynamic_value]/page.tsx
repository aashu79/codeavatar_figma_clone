"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Eye, Share2, ExternalLink, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import ThumbnailCarousel from "../../../appComponents/detail/ThumbnailCarousel";

const MotionDialogContent = motion(DialogContent);

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const mounted = useRef(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Store scroll position for better restoration
  const scrollYRef = useRef(0);

  // Sample data
  const content = {
    title: "Title",
    subtitle: "A small description",
    description:
      "A playful group of colorful, abstract 3D shapes (spheres, cubes, and teardrops) bouncing and colliding in a zero-gravity environment, whimsical style, bright pastel colors, soft lighting, cheerful atmosphere. A cheerful scene of abstract 3D forms (stars, crescents, and spirals) floating and dancing in a fluid simulation, interacting with gentle forces, whimsical style, vibrant colors, playful animation.",
    views: "16.6k",
    comments: "16.6k",
    tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5"],
    label: "Label",
  };

  const mediaItems = [
    {
      id: 1,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      thumbnail:
        "https://plus.unsplash.com/premium_photo-1701090939615-1794bbac5c06?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Improved modal opening logic that only triggers for detail routes
  useEffect(() => {
    // Check if this is a detail route
    if (pathname && pathname.includes("/detail/")) {
      // Store scroll position
      scrollYRef.current = window.scrollY;

      // Lock body scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Open the modal
      setOpen(true);
      mounted.current = true;

      return () => {
        // Cleanup only if we're not in a detail route anymore
        if (!pathname.includes("/detail/")) {
          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.width = "";
          document.body.style.overflow = "";
          window.scrollTo(0, scrollYRef.current);
        }
      };
    }
  }, [pathname]); // Only depend on pathname, not searchParams

  // Fixed close modal function - proper order of operations
  const closeModal = () => {
    const scrollY = scrollYRef.current;
    // First close the modal
    window.scrollTo(0, scrollY);
    setOpen(false);
    router.push("/");

    // Use timeout to allow animation to complete
    setTimeout(() => {
      // Reset body styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore scroll position

      // Navigate after everything else
    }, 100);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      {/* Custom overlay with improved fade animation */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>

      {/* Dialog container */}
      <div className="fixed inset-0 z-[10000] overflow-hidden flex flex-col pointer-events-none">
        {/* Top area showing a bit of navbar */}
        <div className="h-10 w-full bg-transparent pointer-events-none"></div>

        <AnimatePresence mode="wait">
          {open && (
            <MotionDialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
              className="flex-1 bg-white rounded-t-xl m-0 p-0 shadow-none pointer-events-auto overflow-hidden  "
              style={{
                width: "100vw",
                height: "95vh",
                position: "absolute",
                backgroundColor: "white",
                top: "2.5vh",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 80,
                mass: 1.1,
                duration: 0.2,
              }}
            >
              <DialogTitle></DialogTitle>

              {/* Proper modal container for scale-modal-content */}
              <div className="modal-scale-container w-full h-full overflow-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-1 right-6 z-50 p-1 rounded-full hover:bg-zinc-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X
                    size={20}
                    className="text-zinc-600 hover:cursor-pointer bg-gray-100 rounded-full scale-positioned"
                  />
                </button>
                <div className="scale-modal-content lg:justify-center flex flex-col md:flex-row gap-[30px] md:gap-[50px] lg:gap-[67px] py-[64px] px-[20px] md:px-[24px] md:py-[48px] lg:px-[184px] lg:py-[40px] relative">
                  {/* Left section - Media Display */}
                  <div className="w-full md:w-3/5 lg:max-w-3/4 min-w-0">
                    <div className="flex flex-col h-full gap-2">
                      <ThumbnailCarousel
                        mediaItems={mediaItems}
                        activeIndex={activeIndex}
                        onSelectThumbnail={setActiveIndex}
                      />

                      <div className="hidden lg:block">
                        <h2 className="text-neutral-800 text-xl font-semibold mb-4">
                          Title
                        </h2>
                        <p className="text-neutral-600 text-base">
                          {content.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right sidebar - added flex-shrink-0 and md width */}
                  <div className="w-full md:w-2/5 lg:max-w-[394px] md:flex-shrink-0 bg-white ">
                    <div className="flex flex-col h-full gap-8">
                      {/* Title and profile section */}
                      <div className="flex flex-col gap=[16px] md:flex-row md:justify-between  lg:flex-col lg:gap-6">
                        <div className="flex w-full md:w-auto items-start gap-4">
                          <div className="w-14 h-14 rounded-lg bg-[#E5E5E5]"></div>
                          <div>
                            <h2 className="text-neutral-800 text-xl font-semibold">
                              {content.title}
                            </h2>
                            <p className="text-neutral-600 text-sm">
                              {content.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex w-full md:w-auto items-center gap-1.5">
                          <div className="flex items-center gap-2 p-1.5">
                            <Eye size={20} className="text-neutral-800" />
                            <span className="text-neutral-800 text-base">
                              {content.views}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-1.5">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.5 9.58398C17.5 13.9590 13.75 17.5006 10 17.5006C9.01812 17.5006 8.07625 17.3023 7.20312 16.9356C5.00312 16.9356 3.125 17.5006 1.94937 18.3765C1.88688 18.4231 1.81438 18.3998 1.8125 18.3231C1.80238 18.2384 1.79825 18.1531 1.8 18.0681C1.95 16.8340 2.45 14.9590 3.4375 13.9673C2.58125 12.7965 2.5 11.5156 2.5 9.58398C2.5 5.20898 6.25 1.66732 10 1.66732C13.75 1.66732 17.5 5.20898 17.5 9.58398Z"
                                stroke="#262626"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-neutral-800 text-base">
                              {content.comments}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col md:flex-row lg:flex-col gap-4">
                        <Button className="h-[52px] w-full md:w-[50%] lg:w-full bg-neutral-800 hover:bg-neutral-700 px-4 rounded-lg flex items-center justify-center gap-2">
                          <ExternalLink size={20} className="text-neutral-50" />
                          <span className="text-neutral-50 text-lg font-medium">
                            Visit
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          className="h-[52px] w-full md:w-[50%] lg:w-full bg-neutral-100 hover:bg-neutral-200 border-0 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                          <Share2 size={20} className="text-neutral-800" />
                          <span className="text-neutral-800 text-lg font-medium">
                            Share
                          </span>
                        </Button>
                      </div>

                      {/* Tags section */}
                      <div className="mb-4">
                        <h3 className="text-neutral-800 text-base font-semibold mb-3">
                          Title
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {content.tags.map((tag, index) => (
                            <div
                              key={index}
                              className={`px-2.5 py-1 rounded-full text-sm ${
                                index === 0
                                  ? "bg-neutral-100 text-neutral-800"
                                  : "border border-neutral-200 text-neutral-500"
                              }`}
                            >
                              {tag}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Label */}
                      <div className="flex flex-col gap-[16px] md:gap-[24px] md:flex-row lg:flex-col justify-between">
                        <div className="mb-4">
                          <h3 className="text-neutral-800 text-base font-semibold mb-3">
                            Title
                          </h3>
                          <div className="inline-flex px-2.5 py-1 border border-neutral-200 rounded text-neutral-800 text-sm">
                            {content.label}
                          </div>
                        </div>

                        {/* Social icons */}
                        <div>
                          <h3 className="text-neutral-800 text-base font-semibold mb-3">
                            Title
                          </h3>
                          <div className="flex items-center gap-3">
                            <button className="w-7 h-7 flex items-center justify-center">
                              <FaLinkedin className="text-neutral-500 w-6 h-6" />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center">
                              <FaXTwitter className="text-neutral-500 w-6 h-6" />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center">
                              <FaFacebook className="text-neutral-500 w-6 h-6" />
                            </button>
                            <button className="w-7 h-7 flex items-center justify-center">
                              <FaInstagram className="text-neutral-500 w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block lg:hidden my-[20.45px]">
                      <h2 className="text-neutral-800 text-xl font-semibold mb-4">
                        Title
                      </h2>
                      <p className="text-neutral-600 text-base">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDialogContent>
          )}
        </AnimatePresence>
      </div>
    </Dialog>
  );
};

export default Page;
