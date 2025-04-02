"use client";
import { useState, useEffect, useRef } from "react";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiShareFat } from "react-icons/pi";

import { Eye, ExternalLink, X, Loader } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import { TfiShare } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";

import { CardCount } from "../../../state/globalState";
import ThumbnailCarousel from "../../../appComponents/detail/ThumbnailCarousel";
import { RootState } from "../../../redux/store";

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const { dynamic_value } = params;

  const viewCounted = useRef(false);
  const refCounted = useRef(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname && pathname.includes("/detail/") && !open) {
      setOpen(true);
    }

    const refId = searchParams.get("ref");
    if (refId && !refCounted.current) {
      refCounted.current = true;
      dispatch({
        type: "globalState/recordReferral",
        payload: { refId },
      });
    }
  }, [pathname, open, searchParams, dispatch]);

  const handleDialogOpen = (isOpen: boolean) => {
    setOpen(isOpen);

    if (isOpen && !viewCounted.current && dynamic_value) {
      viewCounted.current = true;

      dispatch({
        type: "globalState/increaseViewCount",
        payload: { id: Number(dynamic_value) },
      });
    }
  };

  const closeModal = () => {
    router.push("/");

    setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  const { cardCount } = useSelector((state: RootState) => state.globalState);
  const card = cardCount.find(
    (card: CardCount) => card.cardId === Number(dynamic_value)
  );
  const viewCount = card ? card.viewCount : 0;
  const shareCount = card ? card.shareCount : 0;

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

  const handleShareCount = () => {
    dispatch({
      type: "globalState/increaseShareCount",
      payload: { id: Number(dynamic_value) },
    });
  };

  return (
    <>
      <div className="h-[90vh] flex items-center justify-center">
        <Loader />
      </div>
      <Dialog open={open} onOpenChange={handleDialogOpen}>
        <div className="fixed inset-0 z-[10000] overflow-hidden flex flex-col pointer-events-none">
          {open && (
            <DialogContent
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
              className="flex-1 bg-white rounded-t-xl m-0 p-0 shadow-none overflow-hidden pointer-events-auto"
              style={{
                width: "100vw",
                height: "100vh",
                position: "absolute",
                backgroundColor: "white",
                top: "5vh",
              }}
            >
              <DialogTitle></DialogTitle>

              <div className="modal-scale-container w-full h-full overflow-auto">
                <button
                  onClick={closeModal}
                  className="absolute top-1 right-6 z-[60] p-1 rounded-full hover:bg-zinc-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X
                    size={20}
                    className="text-zinc-600 hover:cursor-pointer bg-gray-100 rounded-full"
                  />
                </button>

                <div className="scale-modal-content lg:justify-center flex flex-col md:flex-row gap-[30px] md:gap-[50px] lg:gap-[67px] pt-[64px] pb-2 px-[20px] md:px-[24px] md:py-[68px] lg:px-[184px] lg:py-[40px] relative">
                  <div className="w-full md:w-full lg:max-w-[1091px] min-w-0">
                    <div className="flex flex-col h-full gap-2">
                      <ThumbnailCarousel
                        mediaItems={mediaItems}
                        activeIndex={activeIndex}
                        onSelectThumbnail={setActiveIndex}
                      />

                      <div className="hidden lg:block mb-7">
                        <h2 className="text-neutral-800 text-xl font-semibold mb-4">
                          Title
                        </h2>
                        <p className="text-neutral-600 text-base">
                          {content.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-2/5 lg:max-w-[394px] md:flex-shrink-0">
                    <div className="flex flex-col h-full gap-8">
                      <div className="flex flex-col gap=[16px] md:flex-row md:justify-between  lg:flex-col lg:gap-6">
                        <div className="flex w-full md:w-auto items-start gap-4">
                          <div className="w-14 h-17 rounded-lg bg-[#E5E5E5]"></div>
                          <div>
                            <h2 className="text-neutral-800 text-xl font-semibold">
                              {content.title} {dynamic_value}
                            </h2>
                            <p className="text-neutral-600 text-sm">
                              {content.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full md:w-auto items-center gap-1.5">
                          <div className="flex items-center gap-2 p-1.5">
                            <Eye size={20} className="text-neutral-800" />
                            <span className="text-neutral-800 text-base">
                              {viewCount}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 p-1.5">
                            <TfiShare size={20} className="text-neutral-800" />
                            <span className="text-neutral-800 text-base">
                              {shareCount}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row lg:flex-col gap-4">
                        <Button className="h-[52px] w-full md:w-[50%] lg:w-full bg-neutral-800 hover:bg-neutral-700 px-4 rounded-lg flex items-center justify-center gap-2">
                          <ExternalLink size={20} className="text-neutral-50" />
                          <span className="text-neutral-50 text-lg font-medium">
                            Visit
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            handleShareCount();
                          }}
                          className="h-[52px] w-full md:w-[50%] lg:w-full bg-neutral-100 hover:bg-neutral-200 border-0 px-4 rounded-lg flex items-center justify-center gap-2"
                        >
                          <PiShareFat size={20} className="text-neutral-800" />
                          <span className="text-neutral-800 text-lg font-medium">
                            Share
                          </span>
                        </Button>
                      </div>

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

                      <div className="flex flex-col gap-[16px] md:gap-[24px] md:flex-row lg:flex-col justify-between">
                        <div className="mb-4">
                          <h3 className="text-neutral-800 text-base font-semibold mb-3">
                            Title
                          </h3>
                          <div className="inline-flex px-2.5 py-1 border border-neutral-200 rounded text-neutral-800 text-sm">
                            {content.label}
                          </div>
                        </div>

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
                    <div className="block lg:hidden my-[20.45px] ">
                      <h2 className="text-neutral-800 text-xl font-semibold mb-4">
                        Title
                      </h2>
                      <p className="text-neutral-600 text-base  p-1">
                        {content.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default Page;
