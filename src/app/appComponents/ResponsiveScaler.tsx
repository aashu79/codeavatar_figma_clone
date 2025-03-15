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
        scaleRatio = Math.min(windowWidth / 1920, 1);
        body.classList.add("is-desktop");
        body.classList.remove("is-medium", "is-mobile");
      } else {
        // COMBINED: Both tablet and laptop (640px-1535px) use same scaling
        scaleRatio = Math.min(windowWidth / 1440, 1);
        body.classList.add("is-medium");
        body.classList.remove("is-desktop", "is-mobile");
      }

      // Set CSS variables
      body.style.setProperty("--ui-scale", scaleRatio.toString());
      body.style.setProperty("--ui-scale-inverse", (1 / scaleRatio).toString());

      // Apply scaling transformations
      rootElement.style.transform = `scale(${scaleRatio})`;
      rootElement.style.transformOrigin = "top left";
      rootElement.style.width = `${100 / scaleRatio}%`;
      rootElement.style.minHeight = `${100 / scaleRatio}vh`;
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
