import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace) {
    // setMode(newMode);
    setHistory(prev => [...(replace ? prev.slice(0, -1) : prev), newMode]);
  };

  function back() {
    if (history.length <= 1) return; //guard clause
    // setMode(history[history.length - 2]);
    setHistory(prev => [...prev].slice(0, -1));
  };
  console.log(history);
  return { mode: history[history.length - 1], transition, back };
}