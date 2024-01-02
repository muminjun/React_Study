import React from "react";
import { useState } from "react";

function useCounter(value) {
  const [count, setCount] = useState(value)
  const plusCount = () => setCount((count) => count + 1)
  const minusCount = () => setCount((count) => Math.max(count - 1, 0))

  return [count, plusCount, minusCount]
}

export default useCounter
