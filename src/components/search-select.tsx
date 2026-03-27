"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchSelectOption {
  value: string;
  label: string;
  /** Optional secondary text (e.g. type, power) */
  sub?: string;
  /** Optional badge color (hex) */
  badgeColor?: string;
  /** Optional badge text (e.g. "FIR") */
  badge?: string;
  /** True if this option is engine-suggested */
  suggested?: boolean;
  /** Group header (options with the same group are grouped) */
  group?: string;
}

interface SearchSelectProps {
  value: string;
  options: SearchSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  /** Show type badge on the trigger button */
  triggerBadge?: { text: string; color: string } | null;
}

export function SearchSelect({
  value,
  options,
  onChange,
  placeholder = "Select…",
  disabled = false,
  className,
  triggerBadge,
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [highlightIdx, setHighlightIdx] = useState(0);

  // Filter options
  const filtered = search
    ? options.filter(o =>
        o.label.toLowerCase().includes(search.toLowerCase()) ||
        (o.sub && o.sub.toLowerCase().includes(search.toLowerCase())) ||
        (o.badge && o.badge.toLowerCase().includes(search.toLowerCase()))
      )
    : options;

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
      setSearch("");
      setHighlightIdx(0);
    }
  }, [open]);

  // Scroll highlighted into view
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.children[highlightIdx] as HTMLElement;
    if (el) el.scrollIntoView({ block: "nearest" });
  }, [highlightIdx, open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIdx(i => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIdx(i => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[highlightIdx]) {
          onChange(filtered[highlightIdx].value);
          setOpen(false);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [filtered, highlightIdx, onChange]
  );

  const selected = options.find(o => o.value === value);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium border transition-all text-left",
          disabled
            ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 cursor-pointer",
          open && "ring-1 ring-violet-400 border-violet-300",
          !value && !disabled && "border-dashed border-gray-300"
        )}
      >
        <span className={cn("flex-1 truncate", !selected && "text-muted-foreground")}>
          {selected ? selected.label : placeholder}
        </span>
        {triggerBadge && (
          <span
            className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded text-white/90"
            style={{ backgroundColor: triggerBadge.color }}
          >
            {triggerBadge.text}
          </span>
        )}
        <ChevronDown className={cn("w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-gray-200 shadow-xl shadow-black/10 overflow-hidden"
            style={{ maxHeight: "min(320px, 50vh)" }}
          >
            {/* Search input */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setHighlightIdx(0); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Search…"
                  className="w-full pl-8 pr-8 py-1.5 text-[12px] rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-violet-300 focus:border-violet-300"
                />
                {search && (
                  <button onClick={() => { setSearch(""); inputRef.current?.focus(); }} className="absolute right-2.5 top-1/2 -translate-y-1/2">
                    <X className="w-3 h-3 text-muted-foreground hover:text-gray-600" />
                  </button>
                )}
              </div>
              {search && (
                <p className="text-[9px] text-muted-foreground mt-1 px-1">
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* Options list */}
            <div ref={listRef} className="overflow-y-auto" style={{ maxHeight: "min(260px, 40vh)" }}>
              {filtered.length === 0 ? (
                <p className="text-center text-[11px] text-muted-foreground py-6">No matches</p>
              ) : (
                filtered.map((opt, i) => {
                  const isSelected = opt.value === value;
                  const isHighlighted = i === highlightIdx;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onMouseEnter={() => setHighlightIdx(i)}
                      onClick={() => {
                        onChange(opt.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 text-left text-[12px] transition-colors",
                        isHighlighted && "bg-violet-50",
                        isSelected && "bg-violet-100/70 font-semibold"
                      )}
                    >
                      {/* Checkmark */}
                      <div className="w-4 shrink-0">
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-600" />}
                      </div>

                      {/* Badge */}
                      {opt.badge && (
                        <span
                          className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded text-white/90 shrink-0"
                          style={{ backgroundColor: opt.badgeColor || "#888" }}
                        >
                          {opt.badge}
                        </span>
                      )}

                      {/* Label + sub */}
                      <div className="flex-1 min-w-0">
                        <span className="truncate block">{opt.label}</span>
                        {opt.sub && <span className="text-[9px] text-muted-foreground truncate block">{opt.sub}</span>}
                      </div>

                      {/* Suggested star */}
                      {opt.suggested && (
                        <span className="text-[9px] text-amber-500 font-bold shrink-0">★</span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
