"use client";
import React, { useEffect, useState } from "react";

interface ResponsiveScalerProps extends React.PropsWithChildren {}

const ResponsiveScaler: React.FC<ResponsiveScalerProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScaling = () => {
      const rootElement =
        document.querySelector<HTMLElement>("main.app-content");
      const body = document.body;
      const html = document.documentElement;

      if (!rootElement || !body) return;

      const isMobile = window.innerWidth <= 650;
      const isTablet = window.innerWidth > 650 && window.innerWidth <= 1024;
      const isDesktop = window.innerWidth > 1024;

      let scaleRatio = 1;
      if (isMobile) {
        scaleRatio = 1;
      } else if (isTablet) {
        scaleRatio = window.innerWidth / 1024;
      } else if (isDesktop) {
        scaleRatio = window.innerWidth / 1920;
      }

      body.style.setProperty("--ui-scale", scaleRatio.toString());
      body.style.setProperty("--ui-scale-inverse", (1 / scaleRatio).toString());

      if (isMobile) {
        rootElement.style.transform = "none";
        rootElement.style.width = "100%";
        rootElement.style.height = "auto";
        rootElement.style.minHeight = "100vh";

        body.classList.add("is-mobile");
        body.classList.remove("ui-scaled", "is-tablet", "is-desktop");

        body.style.height = "auto";
        html.style.height = "auto";
        html.classList.remove("ui-scaled");
      } else {
        rootElement.style.transform = `scale(${scaleRatio})`;
        rootElement.style.transformOrigin = "top left";
        rootElement.style.width = `${100 / scaleRatio}%`;

        const scaledHeight = `${Math.ceil(100 / scaleRatio)}vh`;
        rootElement.style.height = scaledHeight;
        rootElement.style.minHeight = scaledHeight;

        body.style.height = "100vh";
        body.style.overflow = "hidden";
        html.style.height = "100vh";
        html.style.overflow = "hidden";

        body.classList.add("ui-scaled");
        body.classList.remove("is-mobile");

        if (isTablet) {
          body.classList.add("is-tablet");
          body.classList.remove("is-desktop");
        } else {
          body.classList.add("is-desktop");
          body.classList.remove("is-tablet");
        }
        html.classList.add("ui-scaled");
      }

      // Insert/update dynamic styles
      const styleId = "dynamic-scaling-styles";
      let styleElement = document.getElementById(styleId) as HTMLStyleElement;
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
      }

      styleElement.innerHTML = `
        /* Basic scaled layout */
        .ui-scaled {
          position: relative;
        }
        body.ui-scaled {
          min-height: 100vh;
          height: 100vh;
          overflow: hidden;
          position: fixed;
          width: 100%;
          top: 0;
          left: 0;
        }
        html.ui-scaled {
          overflow: hidden;
        }
        body.ui-scaled main.app-content {
          display: flex;
          flex-direction: column;
          overflow-y: scroll;
          scrollbar-width: none;
        }
        body.ui-scaled main.app-content::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        /* 
         * Common scaling class for fixed/absolute elements 
         * with a constant-width scrollbar.
         */
        .scale-positioned {
          transform: scale(var(--ui-scale)) !important;
          transform-origin: top left !important;

          /* Keep scrollbar constant size, ignoring the scale. */
          scrollbar-width: thin !important; /* For Firefox */
        }
        .scale-positioned::-webkit-scrollbar {
          width: 8px !important; /* Constant width for WebKit browsers */
        }
        .scale-positioned::-webkit-scrollbar-thumb {
          background-color: #888;
        }
        .scale-positioned::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        /* Disable scale on mobile */
        body.is-mobile .scale-positioned {
          transform: none !important;
        }

        /* Mobile fallback */
        body.is-mobile {
          overflow-x: hidden;
          height: auto;
          position: static;
        }
        body.is-mobile main.app-content {
          width: 100% !important;
          height: auto;
          min-height: 100vh;
          overflow-y: auto;
        }

        /* Footer fix */
        footer {
          flex-shrink: 0;
        }
      `;
    };

    handleScaling();
    document.body.style.visibility = "visible";
    setMounted(true);

    window.addEventListener("resize", handleScaling);
    return () => {
      window.removeEventListener("resize", handleScaling);
    };
  }, []);

  return <>{children}</>;
};

export default ResponsiveScaler;
