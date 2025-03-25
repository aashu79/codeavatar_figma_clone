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

      // Store previous state
      const wasMobile = body.classList.contains("is-mobile");

      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
      const isDesktop = window.innerWidth > 1024;

      let scaleRatio = 1;
      if (isMobile) {
        scaleRatio = window.innerWidth / 430;
      } else if (isTablet) {
        scaleRatio = window.innerWidth / 1280;
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
        rootElement.style.overflowY = "auto"; // Explicitly set overflow

        body.classList.add("is-mobile");
        body.classList.remove("ui-scaled", "is-tablet", "is-desktop");

        body.style.height = "auto";
        body.style.overflow = "auto"; // Explicitly enable scrolling
        body.style.position = "static"; // Ensure it's not fixed

        html.style.height = "auto";
        html.style.overflow = "auto"; // Enable scrolling
        html.classList.remove("ui-scaled");

        // Force a layout recalculation if switching from desktop to mobile
        if (!wasMobile) {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 10);
        }
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

        /* Mobile fallback with thin scrollbar */
        body.is-mobile {
          overflow-x: hidden;
          height: auto;
          position: static;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        body.is-mobile main.app-content {
          width: 100% !important;
          height: auto;
          min-height: 100vh;
          overflow-y: auto;
          scrollbar-width: thin; /* Thin scrollbar for Firefox */
        }
        
        /* Very thin scrollbar for mobile view in WebKit browsers */
        body.is-mobile main.app-content::-webkit-scrollbar {
          width: 2px; /* Very thin scrollbar */
          background: transparent;
        }
        body.is-mobile main.app-content::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2); /* Semi-transparent thumb */
        }
        body.is-mobile main.app-content::-webkit-scrollbar-track {
          background: transparent;
        }

        /* Footer fix */
        footer {
          flex-shrink: 0;
        }

        /* 
         * Special scaling class for modal/dialog content
         * Handles the unique positioning requirements of modals
         */
        .scale-modal-content {
          /* Remove debug border */
         
          transform: translate(-50%, 0) scale(var(--ui-scale)) !important;
          transform-origin: center top !important;
          width: calc(100% * var(--ui-scale-inverse)) !important;
          height: auto !important; /* Changed from fixed height */
          min-height: calc(90vh * var(--ui-scale-inverse)) !important;
          max-height: calc(100vh * var(--ui-scale-inverse)) !important;
          position: absolute !important;
          overflow: visible !important; /* Changed from scroll */
          left: 50% !important;
          top: 0 !important;
          background-color: white !important;
        }

        .scale-modal-content::-webkit-scrollbar {
          width: 8px !important;
          background-color: transparent;
        }

        .scale-modal-content::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 4px;
        }

        .scale-modal-content::-webkit-scrollbar-track {
          background-color: transparent;
        }

        /* Modal wrapper to provide proper containment */
        .modal-scale-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start; /* Changed from center to flex-start */
          justify-content: center;
          overflow: auto; /* Changed from hidden to auto */
        }

        /* Add tablet specific fixes */
        @media (min-width: 768px) and (max-width: 1024px) {
          .scale-modal-content {
            display: flex !important;
            flex-direction: column !important;
          }
          
          .scale-modal-content > div {
            width: 100% !important;
            max-width: 100% !important;
          }
        }

        /* Special exception for modal content */
        body.is-mobile .scale-modal-content {
          /* Override the general rule for scale-positioned */
          transform: translate(-50%, 0) scale(var(--ui-scale)) !important;
        }

        /* Disable scale and transform on mobile */
        @media (max-width: 767px) {
          .scale-modal-content {
            /* Apply FIXED transform on mobile - set explicit values */
            transform: translate(-50%, 0) scale(var(--ui-scale)) !important;
            transform-origin: center top !important;
            width: calc(100% * var(--ui-scale-inverse)) !important;
            height: auto !important;
            position: absolute !important; /* Keep as absolute */
            left: 50% !important;
            top: 0 !important; /* Keep at 0 */
            min-height: calc(90vh * var(--ui-scale-inverse)) !important;
            max-height: calc(95vh * var(--ui-scale-inverse)) !important;
            overflow: visible !important;
            background-color: white !important;
          }
          
          /* Fix container size */
          .modal-scale-container {
            height: 100% !important;
            overflow-y: auto !important;
            overscroll-behavior: contain !important;
            position: relative !important;
          }
        }
      `;
    };

    handleScaling();
    document.body.style.visibility = "visible";
    setMounted(true);

    // Add both standard resize event and observer for DevTools
    window.addEventListener("resize", handleScaling);

    return () => {
      window.removeEventListener("resize", handleScaling);
    };
  }, []);

  return <>{children}</>;
};

export default ResponsiveScaler;
