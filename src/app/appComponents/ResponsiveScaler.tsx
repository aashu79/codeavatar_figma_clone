"use client";
import { useEffect } from "react";

interface ResponsiveScalerProps extends React.PropsWithChildren {}

const ResponsiveScaler: React.FC<ResponsiveScalerProps> = ({ children }) => {
  useEffect(() => {
    const handleScaling = () => {
      // For Next.js App Router, target the main element rather than #__next
      const rootElement =
        document.querySelector<HTMLElement>("main.app-content");
      const body = document.body;

      if (!rootElement || !body) return;

      const isMobile = window.innerWidth <= 650;
      // Adjust baseline from 1920 to something more reasonable like 1440
      const scaleRatio = isMobile ? 1 : Math.min(window.innerWidth / 1440, 1);

      // Set CSS custom properties
      body.style.setProperty("--ui-scale", scaleRatio.toString());
      body.style.setProperty("--ui-scale-inverse", `${1 / scaleRatio}`);

      // Apply scaling transformations
      if (isMobile) {
        rootElement.style.transform = "none";
        rootElement.style.width = "100%";
        body.classList.add("is-mobile");
        body.classList.remove("ui-scaled");
      } else {
        rootElement.style.transform = `scale(${scaleRatio})`;
        rootElement.style.transformOrigin = "top left";
        rootElement.style.width = `${100 / scaleRatio}%`;
        rootElement.style.minHeight = `${100 / scaleRatio}vh`;
        body.classList.add("ui-scaled");
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
      document.body.classList.remove("is-mobile", "ui-scaled");
    };
  }, []);

  return <>{children}</>;
};

export default ResponsiveScaler;
