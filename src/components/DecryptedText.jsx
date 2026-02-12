import { useState, useEffect } from "react";

const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const DecryptedText = ({
  text,
  speed = 50,
  maxIterations = 10,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let iteration = 0;
    let interval = null;

    const startAnimation = () => {
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText(() =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }

              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= maxIterations) {
          clearInterval(interval);
        }

        iteration += 1;
      }, speed);
    };

    startAnimation();

    return () => clearInterval(interval);
  }, [text, speed, isHovered]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(!isHovered)}
      style={{
        display: "inline-block",
        cursor: "default",
      }}
    >
      {displayText}
    </span>
  );
};
