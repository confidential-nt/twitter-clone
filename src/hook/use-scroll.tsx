import React, { useCallback, useEffect } from "react";
const onScroll = (e: any) => {
  e.preventDefault();
  e.stopPropagation();

  return false;
};

const useScroll = (displayModal: boolean) => {
  useEffect(() => {
    if (displayModal) {
      window.addEventListener("wheel", onScroll, {
        passive: false,
      });
    } else window.removeEventListener("wheel", onScroll);

    return () => window.removeEventListener("wheel", onScroll);
  }, [displayModal]);
};

export default useScroll;
