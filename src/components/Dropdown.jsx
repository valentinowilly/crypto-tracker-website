import { useState, useRef, useEffect } from "react";

export const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  // Cari label dari value yang sedang aktif
  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || "Select";

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      {/* Tombol Trigger */}
      <button
        className={`dropdown-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedLabel}</span>
        <span className="arrow">▼</span>
      </button>

      {/* Daftar Menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${value === option.value ? "active" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {value === option.value && <span className="check">✔</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
