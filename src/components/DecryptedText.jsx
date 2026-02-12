import { useState, useEffect } from "react";

// Karakter acak yang akan muncul saat animasi
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

    // Fungsi untuk memulai animasi
    const startAnimation = () => {
      clearInterval(interval);

      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              // Jika karakter sudah benar (sesuai iterasi), biarkan
              if (index < iteration) {
                return text[index];
              }
              // Jika belum, tampilkan karakter acak
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        // Kecepatan pengungkapan huruf (1/3 huruf per tick agar lebih organik)
        iteration += 1 / 3;
      }, speed);
    };

    // Jalankan animasi saat pertama kali load atau saat di-hover
    startAnimation();

    // Cleanup saat unmount
    return () => clearInterval(interval);
  }, [text, speed, isHovered]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(!isHovered)} // Re-animate saat hover
      style={{
        display: "inline-block",
        cursor: "default",
      }}
    >
      {displayText}
    </span>
  );
};
