import React, { useEffect, useRef, useState } from "react";

const UseDebounce = (value, delay = 100) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef();
  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default UseDebounce;
