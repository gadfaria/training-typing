import { useState, useRef } from "react";

const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [isFinish, setIsFinish] = useState(false);
  const countRef: any = useRef(null);

  const handleStart = () => {
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const handleFinish = () => {
    clearInterval(countRef.current);
    setIsFinish(true);
    setTimer(0);
  };

  return {
    timer,
    isFinish,
    handleStart,
    handleFinish
  };
};

export default useTimer;
