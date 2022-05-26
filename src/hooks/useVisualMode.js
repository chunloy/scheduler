import { useState } from "react";

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {
    setHistory(prev => [...(replace ? prev.slice(0, -1) : prev), newMode]);
  };

  const back = () => {
    if (history.length <= 1) return;
    setHistory(prev => [...prev].slice(0, -1));
  };

  return { mode: history[history.length - 1], transition, back };
};

export default useVisualMode;
