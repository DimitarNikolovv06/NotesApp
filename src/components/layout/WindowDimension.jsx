import React from "react";
import { useEffect } from "react";

function WindowDimension() {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
}

export default function useWindowDimension() {
  const [windowDimension, setWindowDimension] = useState(WindowDimension());

  useEffect(() => {
    function handleResize() {
      setWindowDimension(WindowDimension());
    }
  });
}
