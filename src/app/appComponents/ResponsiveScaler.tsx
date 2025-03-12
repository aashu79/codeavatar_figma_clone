"use client";
import { useEffect } from "react";

interface ResponsiveScalerProps extends React.PropsWithChildren {}

const ResponsiveScaler: React.FC<ResponsiveScalerProps> = ({ children }) => {
  useEffect(() => {
    const handleScaling = () => {
      const rootElement = document.querySelector<HTMLElement>("#__next");
      const body = document.body;

      if (!rootElement || !body) return;

      const isMobile = window.innerWidth <= 650;
      const scaleRatio = isMobile ? 1 : Math.min(window.innerWidth / 1920);

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
        rootElement.style.height = `${100 / scaleRatio}%`;
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
