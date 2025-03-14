"use client";
import { useEffect } from "react";

interface ResponsiveScalerProps extends React.PropsWithChildren {}

const ResponsiveScaler: React.FC<ResponsiveScalerProps> = ({ children }) => {
  useEffect(() => {
    const handleScaling = () => {
      const rootElement =
        document.querySelector<HTMLElement>("main.app-content");
      const body = document.body;

      if (!rootElement || !body) return;

      // Simple breakpoints - just use standard responsive breakpoints
      const isMobile = window.innerWidth <= 650;

      // Simple scaling factor - don't overcomplicate
      const scaleRatio = isMobile ? 1 : Math.min(window.innerWidth / 1440, 1);

      // Set CSS custom properties for use in fixed elements only
      body.style.setProperty("--ui-scale", scaleRatio.toString());

      // Apply scaling transformations only in desktop mode
      if (isMobile) {
        rootElement.style.transform = "none";
        rootElement.style.width = "100%";
        body.classList.add("is-mobile");
        body.classList.remove("is-scaled");
      } else {
        rootElement.style.transform = `scale(${scaleRatio})`;
        rootElement.style.transformOrigin = "top left";
        rootElement.style.width = `${100 / scaleRatio}%`;
        body.classList.add("is-scaled");
        body.classList.remove("is-mobile");
      }
    };

    // Initial setup
    handleScaling();

    // Event listeners
    window.addEventListener("resize", handleScaling);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleScaling);
      document.body.classList.remove("is-mobile", "is-scaled");
    };
  }, []);

  return <>{children}</>;
};

export default ResponsiveScaler;
