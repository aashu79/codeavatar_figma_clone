// app/components/ChatBotWrapper.tsx
"use client";

import { useEffect } from "react";

const ChatBotWrapper = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `(function() {
      let isMobileView = window.innerWidth <= 768;
      let bodyOverflowBefore;
      let iframe;
      let setupAttempts = 0;
      let isBotOpen = false;

      function setupIframe(forceRecreate) {
        const isMobile = window.innerWidth <= 768;
        try {
          if (document.body && isMobile && isBotOpen) {
            const scrollY = window.scrollY;
            bodyOverflowBefore = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            document.body.style.position = 'fixed';
            document.body.style.top = "-" + scrollY + "px";
            document.body.style.width = '100%';
            document.body.setAttribute('data-scroll-y', scrollY);
          } else if (document.body && bodyOverflowBefore !== undefined) {
            document.body.style.overflow = bodyOverflowBefore;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            const scrollY = parseInt(document.body.getAttribute('data-scroll-y') || '0');
          }
        } catch (e) {}

        if (!forceRecreate && iframe) {
          if (isMobile) {
            iframe.style.top = "0";
            iframe.style.left = "0";
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.maxHeight = "none";
          } else {
            iframe.style.bottom = "0px";
            iframe.style.right = "0px";
            iframe.style.width = "430px";
            iframe.style.height = "85vh";
            iframe.style.maxHeight = "750px";
          }
          return iframe;
        }

        try {
          const existingFrame = document.querySelector(".chat-frame");
          if (existingFrame) existingFrame.remove();
        } catch (e) {}

        const newIframe = document.createElement("iframe");
        newIframe.src = "https://staging.getchatrat.com/chatbot?isMobile=" + isMobile + 
          "&width=" + window.innerWidth + 
          "&height=" + window.innerHeight + 
          "&t=" + Date.now();

        newIframe.className = "chat-frame";
        newIframe.style.position = "fixed";
        newIframe.style.border = "none";
        newIframe.style.zIndex = "9999";
        newIframe.style.display = "block";

        if (isMobile) {
          newIframe.style.top = "0";
          newIframe.style.left = "0";
          newIframe.style.width = "100%";
          newIframe.style.height = "100%";
          newIframe.style.maxHeight = "none";
          newIframe.style.overflowY = "auto";
          newIframe.style.WebkitOverflowScrolling = "touch";
        } else {
          newIframe.style.bottom = "0px";
          newIframe.style.right = "0px";
          newIframe.style.width = "430px";
          newIframe.style.height = "85vh";
          newIframe.style.maxHeight = "750px";
        }

        try {
          if (document.body) {
            document.body.appendChild(newIframe);
            return newIframe;
          } else {
            if (setupAttempts < 5) {
              setupAttempts++;
              setTimeout(function() { 
                iframe = setupIframe(true); 
              }, 200);
            }
            return null;
          }
        } catch (e) {
          return null;
        }
      }

      try {
        iframe = setupIframe(true);
        if (!iframe && document.readyState !== 'loading') {
          setTimeout(function() {
            if (!iframe) iframe = setupIframe(true);
          }, 500);
        }
      } catch (e) {}

      window.addEventListener("message", (e) => {
        if (e.origin !== "https://staging.getchatrat.com") return;

        try {
          const dimensions = JSON.parse(e.data);
          if (dimensions.type === "BOT_STATE") {
            const botWasOpen = isBotOpen;
            isBotOpen = dimensions.isOpen;
            if (botWasOpen !== isBotOpen) {
              setupIframe(false);
            }
          }

          if (dimensions?.width && dimensions?.height && iframe) {
            const isMobile = window.innerWidth <= 768;
            if (isMobile) {
              iframe.style.width = "100%";
              iframe.style.height = "100%";
            } else {
              iframe.style.width = Math.min(dimensions.width, 420) + "px";
              iframe.style.height = dimensions.height + "px";
              iframe.style.maxHeight = "700px";
            }
          }

          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
              { 
                id: "fb706747-2d7d-47e3-aec6-f7642a20c302", 
                origin: window.location.href 
              },
              "https://staging.getchatrat.com"
            );
          }
        } catch (error) {
          console.error("Invalid message received", error);
        }
      });

      let resizeTimeout;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
          try {
            const currentIsMobile = window.innerWidth <= 768;
            iframe = setupIframe(currentIsMobile !== isMobileView);
            isMobileView = currentIsMobile;
          } catch (e) {}
        }, 250);
      });

      window.addEventListener("orientationchange", function () {
        setTimeout(function() { 
          try {
            iframe = setupIframe(true); 
          } catch (e) {}
        }, 200);
      });
    })();`;

    document.body.appendChild(script);

    return () => {
      script.remove();
      const existingFrame = document.querySelector(".chat-frame");
      if (existingFrame) existingFrame.remove();
    };
  }, []);

  return null;
};

export default ChatBotWrapper;
