import React from "react";
import { ReactNode } from "react";

interface ScrollerProps {
  children: ReactNode;
}

const Scroller: React.FC<ScrollerProps> = ({ children }) => {
  const scrollersRef = React.useRef<{
    OuterScroller: HTMLDivElement | null;
    InnerScroller: HTMLUListElement | null;
  }>({
    OuterScroller: null,
    InnerScroller: null,
  });

  function addAnimation(scroller: HTMLElement | null) {
    scroller?.setAttribute("data-animated", "true");
    if (scroller?.classList.contains("scroller__inner")) {
      const scrollerContent = Array.from(scroller?.children);
      scrollerContent.forEach((element, index) => {
        const duplicate = element.cloneNode(true) as HTMLElement;
        duplicate.setAttribute("aria-hidden", "true");
        scroller?.appendChild(duplicate);
      });
    }
  }

  React.useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      addAnimation(scrollersRef.current.OuterScroller);
      addAnimation(scrollersRef.current.InnerScroller);
    }
  }, [scrollersRef]);

  return (
    <div
      className="scroller"
      ref={(ref) => {
        scrollersRef.current.OuterScroller = ref;
      }}
    >
      <ul
        className="tag-list scroller__inner"
        ref={(ref) => {
          scrollersRef.current.InnerScroller = ref;
        }}
      >
        {children}
      </ul>
    </div>
  );
};

export default Scroller;
