import { useState, useRef, useEffect } from "react";

function useTimer(initialState = 0) {
  const [timer, setTimer] = useState(initialState);
  const [isFinish, setIsFinish] = useState(false);
  const countRef: any = useRef(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer !== 0) return;
    clearInterval(countRef.current);
    setIsFinish(true);
    setTimer(0);
  }, [timer]);

  return {
    timer,
    isFinish,
    handleStart,
  };
}

export default useTimer;
