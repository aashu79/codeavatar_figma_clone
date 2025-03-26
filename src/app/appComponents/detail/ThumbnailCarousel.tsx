import React from "react";

interface MediaItem {
  id: number;
  thumbnail: string;
}

interface ThumbnailCarouselProps {
  mediaItems: MediaItem[];
  activeIndex: number;
  onSelectThumbnail: (index: number) => void;
}

const ThumbnailCarousel: React.FC<ThumbnailCarouselProps> = ({
  mediaItems,
  activeIndex,
  onSelectThumbnail,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Media display area */}
      <div className="relative max-h-[219px] md:max-h-[631px] flex-1 bg-[#E5E5E5] rounded-xl overflow-hidden flex items-center justify-center">
        <img
          src={mediaItems[activeIndex].thumbnail}
          alt="Main display"
          className="w-full h-[100%]  object-cover"
        />
        <button className="absolute w-14 h-14 rounded-full bg-zinc-400 flex items-center justify-center">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-5 h-5 ml-0.5 bg-white"
                style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
              />
            </div>
          </div>
        </button>
      </div>

      {/* Thumbnails section */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {mediaItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => onSelectThumbnail(index)}
                className={`w-36 h-24 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${
                  index === activeIndex
                    ? "border-purple-400/60"
                    : "border-transparent hover:border-gray-200"
                }`}
              >
                <img
                  src={item.thumbnail}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
