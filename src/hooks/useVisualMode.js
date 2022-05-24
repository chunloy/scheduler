import { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    setHistory(prev => [...(replace ? prev.slice(0, -1) : prev), newMode]);
  };

  function back() {
    if (history.length <= 1) return; //guard clause
    setHistory(prev => [...prev].slice(0, -1));
  };

  return { mode: history[history.length - 1], transition, back };
}