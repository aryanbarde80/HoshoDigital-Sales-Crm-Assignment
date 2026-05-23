import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";

export function CustomSelect({
  label,
  value,
  onChange,
  options,
  helperText,
  className = "",
  buttonClassName = "",
  panelClassName = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value]
  );

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className={`grid gap-2 ${className}`}>
      {label ? <span className="text-sm text-[var(--text-secondary)]">{label}</span> : null}
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className={`flex w-full items-center justify-between rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] px-4 py-3 text-left text-sm text-[var(--text-primary)] outline-none transition hover:border-[var(--accent-strong)]/50 ${buttonClassName}`}
        >
          <div className="min-w-0">
            <div className="truncate font-medium">{selectedOption?.label}</div>
            {selectedOption?.description ? (
              <div className="mt-1 truncate text-xs text-[var(--text-muted)]">
                {selectedOption.description}
              </div>
            ) : null}
          </div>
          <FiChevronDown
            className={`shrink-0 text-base text-[var(--text-muted)] transition ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen ? (
          <div
            role="listbox"
            className={`absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-card)] p-2 shadow-[var(--shadow-card)] ${panelClassName}`}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-start justify-between gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isSelected
                      ? "bg-[var(--surface-muted)] text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <div>
                    <div className="text-sm font-medium">{option.label}</div>
                    {option.description ? (
                      <div className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                        {option.description}
                      </div>
                    ) : null}
                  </div>
                  {isSelected ? <FiCheck className="mt-0.5 shrink-0 text-[var(--accent-strong)]" /> : null}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
      {helperText ? <p className="text-xs text-[var(--text-muted)]">{helperText}</p> : null}
    </div>
  );
}
