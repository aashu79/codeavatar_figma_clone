"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Track device type once after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Main effect to handle scroll position restoration
  useEffect(() => {
    // Only run in browser after mount
    if (typeof window === "undefined" || !isMounted) return;

    // Check for restoration flag
    const shouldRestore = sessionStorage.getItem("restoreScrollPosition");

    if (shouldRestore === "true") {
      // Clear the flag immediately
      sessionStorage.removeItem("restoreScrollPosition");

      // Get the stored scroll position
      const rawScrollPosition = sessionStorage.getItem("rawScrollPosition");

      if (rawScrollPosition) {
        const scrollY = parseInt(rawScrollPosition, 10);

        // Check if mobile
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          // Mobile works well with immediate scroll
          window.scrollTo({
            top: scrollY,
            behavior: "auto",
          });
        } else {
          // Force scroll immediately to establish baseline
          window.scrollTo(0, scrollY);

          // Desktop & tablet need a more aggressive approach
          const attemptScroll = () => {
            // Cancel any smooth scrolling that might be in progress
            window.stop();

            // Force scroll with vanilla JS - most reliable approach
            window.scrollTo(0, scrollY);
            document.documentElement.scrollTop = scrollY;
            document.body.scrollTop = scrollY;

            // Also try the behavior API as backup
            window.scrollTo({
              top: scrollY,
              behavior: "instant",
            });
          };

          // Try scrolling immediately
          attemptScroll();

          // Then at staggered intervals
          setTimeout(attemptScroll, 50);
          setTimeout(attemptScroll, 150);
          setTimeout(attemptScroll, 300);
          setTimeout(attemptScroll, 600);

          // One last attempt after all content likely loaded
          setTimeout(attemptScroll, 1000);
        }
      }
    } else if (pathname === "/" || pathname === "") {
      // When on homepage, capture scroll position on scroll
      const handleScroll = () => {
        // Always store latest position - don't wait for document.readyState
        const currentPosition = window.scrollY;
        sessionStorage.setItem("rawScrollPosition", String(currentPosition));
      };

      // Store initial position immediately
      sessionStorage.setItem("rawScrollPosition", String(window.scrollY));

      // Listen for scroll events
      window.addEventListener("scroll", handleScroll);

      // Also store position when leaving the page
      return () => {
        handleScroll();
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [pathname, isMounted]);

  return null;
}
