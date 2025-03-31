import { useState, useEffect } from "react";

const TypingIndicator = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2 p-2">
      <span className="text-gray-500 text-lg">Typing</span>
      <span className="text-gray-500 text-lg">{dots}</span>
    </div>
  );
};

export default TypingIndicator;
 