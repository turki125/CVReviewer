"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [transitionKey, setTransitionKey] = useState(pathname);

  useEffect(() => {
    setTransitionKey(pathname);
    document.documentElement.classList.remove("is-navigating");
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.button !== 0
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;

      const url = new URL(link.href, window.location.href);
      const isSamePageHash =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash;

      if (
        link.target ||
        link.hasAttribute("download") ||
        url.origin !== window.location.origin ||
        isSamePageHash
      ) {
        return;
      }

      document.documentElement.classList.add("is-navigating");
      window.setTimeout(() => {
        document.documentElement.classList.remove("is-navigating");
      }, 900);
    }

    window.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return (
    <div className="page-transition-shell" key={transitionKey}>
      {children}
    </div>
  );
}
