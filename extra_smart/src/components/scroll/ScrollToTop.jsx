// components/scroll/ScrollToTop.tsx
import React from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTop({ scrollContainerRef }) {
  const [visible, setVisible] = React.useState(false);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setVisible(scrollContainerRef.current.scrollTop > 300);
    }
  };

  React.useEffect(() => {
    const node = scrollContainerRef.current;
    if (node) {
      node.addEventListener("scroll", handleScroll);
      return () => node.removeEventListener("scroll", handleScroll);
    }
  }, [scrollContainerRef]);

  const handleClick = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="small"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
}
