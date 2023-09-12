import { useState } from "react";

export default function useVisualMode(initial) {
const [mode, setMode] = useState(initial);
const [history, setHistory] = useState([initial]);

function transition(newMode, replace = false) {
  if (replace) {
    setHistory(prevHistory => {
      const newHistory = [...prevHistory];
      newHistory[newHistory.length - 1] = newMode; // Replace last mode
      return newHistory;
    });
  } else {
    setHistory(prevHistory => [...prevHistory, newMode]); // Add new mode
  }

  setMode(newMode); // Update the current mode
}

  
  function back() {
    if (history.length > 1) {
      console.log("history", history)
      const newHistory = history.slice(0, history.length - 1); // remove last mode
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]); // set mode to the new last item in history
    }
  }
  return {mode, transition, back}
}