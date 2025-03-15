"use client";
import { useEffect, useState } from "react";

interface ResponsiveScalerProps extends React.PropsWithChildren {}

const ResponsiveScaler: React.FC<ResponsiveScalerProps> = ({ children }) => {
  // Track if the component has mounted
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simple scaling function
    const handleScaling = () => {
      const rootElement =
        document.querySelector<HTMLElement>("main.app-content");
      const body = document.body;

      if (!rootElement || !body) return;

      const windowWidth = window.innerWidth;
      let scaleRatio = 1;

      // Apply scaling based on device category using Tailwind breakpoints
      if (windowWidth >= 1536) {
        // 2xl breakpoint and above: Large desktop scaling (based on 1920px)
        const rawScale = Math.min(windowWidth / 1920, 1);
        // Round to nearest 0.05 to reduce text pixelation
        scaleRatio = Math.round(rawScale * 20) / 20;
        body.classList.add("is-desktop");
        body.classList.remove("is-medium", "is-mobile");
      } else if (windowWidth > 650) {
        // Medium screens: Laptop/Tablet (651px-1535px)
        const rawScale = Math.min(windowWidth / 1440, 1);
        // Round to nearest 0.05 to reduce text pixelation
        scaleRatio = Math.round(rawScale * 20) / 20;
        body.classList.add("is-medium");
        body.classList.remove("is-desktop", "is-mobile");
      } else {
        // Mobile screens (650px and below)
        if (windowWidth <= 375) {
          // Very small devices (iPhone SE, etc)
          scaleRatio = 0.85;
        } else {
          // Standard mobile devices (375px-650px)
          // Linear scale from 0.85 at 375px to 0.95 at 650px
          scaleRatio = 0.85 + (0.1 * (windowWidth - 375)) / (650 - 375);
          // Round to nearest 0.05
          scaleRatio = Math.round(scaleRatio * 20) / 20;
        }
        body.classList.add("is-mobile");
        body.classList.remove("is-desktop", "is-medium");
      }

      // Set CSS variables
      body.style.setProperty("--ui-scale", scaleRatio.toString());
      body.style.setProperty("--ui-scale-inverse", (1 / scaleRatio).toString());

      // Apply scaling transformations with improved text rendering
      rootElement.style.transform = `scale(${scaleRatio})`;
      rootElement.style.transformOrigin = "top left";
      rootElement.style.width = `${100 / scaleRatio}%`;
      rootElement.style.minHeight = `${100 / scaleRatio}vh`;

      // Add text rendering improvements
      rootElement.style.textRendering = "optimizeLegibility";
      // rootElement.style.WebkitFontSmoothing = "antialiased";
      // rootElement.style.MozOsxFontSmoothing = "grayscale";
    };

    // Apply scaling
    handleScaling();

    // Show the content after scaling has been applied
    document.body.style.visibility = "visible";

    // Mark as mounted
    setMounted(true);

    // Listen for resize events
    window.addEventListener("resize", handleScaling);

    return () => {
      window.removeEventListener("resize", handleScaling);
    };
  }, []);

  return <>{children}</>;
};

export default ResponsiveScaler;
