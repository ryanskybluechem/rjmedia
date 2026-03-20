"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

// Common system fonts organized by category
const SYSTEM_FONTS: Record<string, string[]> = {
  "Sans Serif": [
    "Arial", "Helvetica", "Helvetica Neue", "Verdana", "Tahoma", "Trebuchet MS",
    "Gill Sans", "Segoe UI", "Calibri", "Candara", "Optima", "Futura",
    "Century Gothic", "Geneva", "Lucida Grande", "Lucida Sans", "Franklin Gothic Medium",
    "San Francisco", "SF Pro Display", "SF Pro Text", "Inter", "Roboto",
    "system-ui", "-apple-system", "BlinkMacSystemFont",
  ],
  "Serif": [
    "Times New Roman", "Georgia", "Garamond", "Palatino", "Palatino Linotype",
    "Book Antiqua", "Baskerville", "Didot", "Bodoni MT", "Cambria",
    "Constantia", "Rockwell", "Perpetua", "Goudy Old Style",
    "Big Caslon", "Cochin", "Hoefler Text",
  ],
  "Monospace": [
    "Courier New", "Courier", "Consolas", "Monaco", "Menlo",
    "Lucida Console", "Liberation Mono", "DejaVu Sans Mono",
    "Andale Mono", "Source Code Pro", "Fira Code", "JetBrains Mono",
    "SF Mono", "IBM Plex Mono",
  ],
  "Display & Decorative": [
    "Impact", "Comic Sans MS", "Papyrus", "Brush Script MT",
    "Copperplate", "Luminari", "Jazz LET", "Chalkboard",
    "Marker Felt", "Trattatello", "American Typewriter",
    "Snell Roundhand", "Apple Chancery", "Zapfino",
  ],
};

// Check if a font is available on the system
function isFontAvailable(font: string): boolean {
  if (typeof document === "undefined") return false;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  const testString = "abcdefghijklmnopqrstuvwxyz0123456789";
  const size = "72px";
  const baselineFont = "monospace";

  ctx.font = `${size} ${baselineFont}`;
  const baselineWidth = ctx.measureText(testString).width;

  ctx.font = `${size} '${font}', ${baselineFont}`;
  const testWidth = ctx.measureText(testString).width;

  return baselineWidth !== testWidth;
}

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const WEIGHT_LABELS: Record<FontWeight, string> = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
};

interface CustomFont {
  name: string;
  family: string;
}

export default function FontTester() {
  const [availableFonts, setAvailableFonts] = useState<Record<string, string[]>>({});
  const [localApiFonts, setLocalApiFonts] = useState<string[]>([]);
  const [selectedFont, setSelectedFont] = useState("Instrument Sans");
  const [pairingFont, setPairingFont] = useState("Space Mono");
  const [sampleText, setSampleText] = useState("The quick brown fox jumps over the lazy dog");
  const [fontSize, setFontSize] = useState(48);
  const [fontWeight, setFontWeight] = useState<FontWeight>(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [lineHeight, setLineHeight] = useState(1.4);
  const [textColor, setTextColor] = useState("#F5F5F5");
  const [bgColor, setBgColor] = useState("#0A0A0A");
  const [textTransform, setTextTransform] = useState<"none" | "uppercase" | "lowercase" | "capitalize">("none");
  const [fontStyle, setFontStyle] = useState<"normal" | "italic">("normal");
  const [activeTab, setActiveTab] = useState<"grid" | "preview" | "pairing" | "waterfall" | "glyphs">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [customFonts, setCustomFonts] = useState<CustomFont[]>([]);
  const [showAllFonts, setShowAllFonts] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const customFontCounter = useRef(0);

  // Detect available system fonts
  useEffect(() => {
    const detected: Record<string, string[]> = {};
    for (const [category, fonts] of Object.entries(SYSTEM_FONTS)) {
      const available = fonts.filter(isFontAvailable);
      if (available.length > 0) {
        detected[category] = available;
      }
    }
    setAvailableFonts(detected);

    // Try the Local Font Access API
    async function tryLocalFontAccess() {
      try {
        if ("queryLocalFonts" in window) {
          // @ts-expect-error — Local Font Access API not in all TS defs
          const fonts = await window.queryLocalFonts();
          const uniqueFamilies = [...new Set(fonts.map((f: { family: string }) => f.family))] as string[];
          setLocalApiFonts(uniqueFamilies.sort());
        }
      } catch {
        // User denied or API not available — fall back to detection
      }
    }
    tryLocalFontAccess();
  }, []);

  // Upload custom font
  const handleFontUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as ArrayBuffer;
        const familyName = `CustomFont_${++customFontCounter.current}_${file.name.replace(/\.[^.]+$/, "")}`;
        const fontFace = new FontFace(familyName, result);
        fontFace.load().then((loaded) => {
          document.fonts.add(loaded);
          setCustomFonts((prev) => [...prev, { name: file.name, family: familyName }]);
          setSelectedFont(familyName);
        });
      };
      reader.readAsArrayBuffer(file);
    });

    e.target.value = "";
  }, []);

  // Build flat font list for the picker
  const allFonts: string[] = (() => {
    const fonts: string[] = [];

    // Custom uploaded fonts first
    customFonts.forEach((f) => fonts.push(f.family));

    if (localApiFonts.length > 0) {
      // Use Local Font Access API results
      localApiFonts.forEach((f) => {
        if (!fonts.includes(f)) fonts.push(f);
      });
    } else {
      // Use detected system fonts
      const categoryOrder = activeCategoryFilter
        ? [activeCategoryFilter]
        : Object.keys(availableFonts);
      categoryOrder.forEach((cat) => {
        (availableFonts[cat] || []).forEach((f) => {
          if (!fonts.includes(f)) fonts.push(f);
        });
      });
    }

    return fonts;
  })();

  const filteredFonts = searchQuery
    ? allFonts.filter((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
    : allFonts;

  const displayFonts = showAllFonts ? filteredFonts : filteredFonts.slice(0, 30);

  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

  const waterfallSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 56, 64, 72, 96];

  return (
    <>
      <Navigation />
      <main className="relative z-10 min-h-screen pt-28 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Font <span className="text-[#39FF14] neon-text">Tester</span>
            </h1>
            <p className="text-[#888] text-lg max-w-2xl">
              Explore your local font library. Preview, pair, and test fonts with full typographic controls.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            {/* Sidebar — Font Picker & Controls */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Font Search */}
              <div className="bg-[#111] border border-[#222] p-4 space-y-3">
                <label className="text-xs tracking-[0.2em] uppercase text-[#888] block">
                  Search Fonts
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to filter..."
                  className="w-full bg-[#0A0A0A] border border-[#333] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#39FF14] transition-colors placeholder:text-[#555]"
                />
                <div className="text-xs text-[#555]">
                  {filteredFonts.length} font{filteredFonts.length !== 1 ? "s" : ""} available
                  {localApiFonts.length > 0 && (
                    <span className="text-[#39FF14]"> (Local Font Access)</span>
                  )}
                </div>
              </div>

              {/* Category Filters */}
              {localApiFonts.length === 0 && (
                <div className="bg-[#111] border border-[#222] p-4 space-y-3">
                  <label className="text-xs tracking-[0.2em] uppercase text-[#888] block">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveCategoryFilter(null)}
                      className={`text-xs px-3 py-1.5 border transition-colors ${
                        activeCategoryFilter === null
                          ? "border-[#39FF14] text-[#39FF14]"
                          : "border-[#333] text-[#888] hover:text-[#F5F5F5] hover:border-[#555]"
                      }`}
                    >
                      All
                    </button>
                    {Object.keys(availableFonts).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategoryFilter(cat === activeCategoryFilter ? null : cat)}
                        className={`text-xs px-3 py-1.5 border transition-colors ${
                          activeCategoryFilter === cat
                            ? "border-[#39FF14] text-[#39FF14]"
                            : "border-[#333] text-[#888] hover:text-[#F5F5F5] hover:border-[#555]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Font List */}
              <div className="bg-[#111] border border-[#222] p-4 space-y-2 max-h-[300px] overflow-y-auto">
                {displayFonts.map((font) => {
                  const isCustom = customFonts.some((c) => c.family === font);
                  const displayName = isCustom
                    ? customFonts.find((c) => c.family === font)?.name || font
                    : font;
                  return (
                    <button
                      key={font}
                      onClick={() => setSelectedFont(font)}
                      className={`w-full text-left px-3 py-2 text-sm transition-all truncate ${
                        selectedFont === font
                          ? "bg-[#39FF14]/10 text-[#39FF14] border-l-2 border-[#39FF14]"
                          : "text-[#ccc] hover:bg-[#1a1a1a] hover:text-[#F5F5F5] border-l-2 border-transparent"
                      }`}
                      style={{ fontFamily: `'${font}', sans-serif` }}
                    >
                      {displayName}
                      {isCustom && (
                        <span className="ml-2 text-[10px] text-[#39FF14] uppercase tracking-wider">
                          uploaded
                        </span>
                      )}
                    </button>
                  );
                })}
                {!showAllFonts && filteredFonts.length > 30 && (
                  <button
                    onClick={() => setShowAllFonts(true)}
                    className="w-full text-center py-2 text-xs text-[#39FF14] hover:underline"
                  >
                    Show all {filteredFonts.length} fonts
                  </button>
                )}
              </div>

              {/* Upload Font */}
              <div className="bg-[#111] border border-[#222] p-4">
                <label className="text-xs tracking-[0.2em] uppercase text-[#888] block mb-3">
                  Upload Custom Font
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".woff,.woff2,.ttf,.otf"
                  multiple
                  onChange={handleFontUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-[#333] py-3 text-sm text-[#888] hover:border-[#39FF14] hover:text-[#39FF14] transition-colors"
                >
                  + Drop or click to upload (.woff, .ttf, .otf)
                </button>
              </div>

              {/* Controls */}
              <div className="bg-[#111] border border-[#222] p-4 space-y-5">
                <label className="text-xs tracking-[0.2em] uppercase text-[#888] block">
                  Typography Controls
                </label>

                {/* Font Size */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#888]">
                    <span>Size</span>
                    <span className="text-[#39FF14] font-mono">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="200"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full accent-[#39FF14]"
                  />
                </div>

                {/* Font Weight */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#888]">
                    <span>Weight</span>
                    <span className="text-[#39FF14] font-mono">{fontWeight} — {WEIGHT_LABELS[fontWeight]}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="900"
                    step="100"
                    value={fontWeight}
                    onChange={(e) => setFontWeight(Number(e.target.value) as FontWeight)}
                    className="w-full accent-[#39FF14]"
                  />
                </div>

                {/* Letter Spacing */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#888]">
                    <span>Letter Spacing</span>
                    <span className="text-[#39FF14] font-mono">{letterSpacing}em</span>
                  </div>
                  <input
                    type="range"
                    min="-0.1"
                    max="0.5"
                    step="0.01"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-full accent-[#39FF14]"
                  />
                </div>

                {/* Line Height */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-[#888]">
                    <span>Line Height</span>
                    <span className="text-[#39FF14] font-mono">{lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="3"
                    step="0.05"
                    value={lineHeight}
                    onChange={(e) => setLineHeight(Number(e.target.value))}
                    className="w-full accent-[#39FF14]"
                  />
                </div>

                {/* Text Transform */}
                <div className="space-y-2">
                  <span className="text-xs text-[#888]">Transform</span>
                  <div className="flex gap-1">
                    {(["none", "uppercase", "lowercase", "capitalize"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTextTransform(t)}
                        className={`flex-1 text-[10px] py-1.5 border transition-colors ${
                          textTransform === t
                            ? "border-[#39FF14] text-[#39FF14]"
                            : "border-[#333] text-[#888] hover:text-[#F5F5F5]"
                        }`}
                      >
                        {t === "none" ? "Aa" : t === "uppercase" ? "AA" : t === "lowercase" ? "aa" : "Ab"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Style */}
                <div className="space-y-2">
                  <span className="text-xs text-[#888]">Style</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFontStyle("normal")}
                      className={`flex-1 text-xs py-1.5 border transition-colors ${
                        fontStyle === "normal"
                          ? "border-[#39FF14] text-[#39FF14]"
                          : "border-[#333] text-[#888] hover:text-[#F5F5F5]"
                      }`}
                    >
                      Normal
                    </button>
                    <button
                      onClick={() => setFontStyle("italic")}
                      className={`flex-1 text-xs py-1.5 border transition-colors italic ${
                        fontStyle === "italic"
                          ? "border-[#39FF14] text-[#39FF14]"
                          : "border-[#333] text-[#888] hover:text-[#F5F5F5]"
                      }`}
                    >
                      Italic
                    </button>
                  </div>
                </div>

                {/* Colors */}
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <span className="text-xs text-[#888]">Text Color</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-8 h-8 bg-transparent border border-[#333] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 bg-[#0A0A0A] border border-[#333] px-2 py-1 text-xs text-[#F5F5F5] font-mono outline-none focus:border-[#39FF14]"
                      />
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-xs text-[#888]">Background</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 bg-transparent border border-[#333] cursor-pointer"
                      />
                      <input
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 bg-[#0A0A0A] border border-[#333] px-2 py-1 text-xs text-[#F5F5F5] font-mono outline-none focus:border-[#39FF14]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pairing Font (shown in pairing tab) */}
              {activeTab === "pairing" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-[#111] border border-[#222] p-4 space-y-3"
                >
                  <label className="text-xs tracking-[0.2em] uppercase text-[#888] block">
                    Pairing Font (Body)
                  </label>
                  <select
                    value={pairingFont}
                    onChange={(e) => setPairingFont(e.target.value)}
                    className="w-full bg-[#0A0A0A] border border-[#333] px-3 py-2 text-sm text-[#F5F5F5] outline-none focus:border-[#39FF14]"
                  >
                    {allFonts.map((font) => (
                      <option key={font} value={font}>
                        {customFonts.find((c) => c.family === font)?.name || font}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}
            </motion.aside>

            {/* Main Content Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Editable Sample Text */}
              <div className="bg-[#111] border border-[#222] p-4">
                <label className="text-xs tracking-[0.2em] uppercase text-[#888] block mb-2">
                  Sample Text
                </label>
                <input
                  type="text"
                  value={sampleText}
                  onChange={(e) => setSampleText(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#333] px-4 py-3 text-[#F5F5F5] outline-none focus:border-[#39FF14] transition-colors"
                  placeholder="Type your sample text here..."
                />
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-[#222]">
                {(["grid", "preview", "pairing", "waterfall", "glyphs"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors ${
                      activeTab === tab
                        ? "text-[#39FF14]"
                        : "text-[#888] hover:text-[#F5F5F5]"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#39FF14]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Font Info Bar */}
              <div className="flex items-center justify-between bg-[#111] border border-[#222] px-4 py-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-[#F5F5F5]">
                    {customFonts.find((c) => c.family === selectedFont)?.name || selectedFont}
                  </span>
                  <span className="text-xs text-[#555] font-mono">
                    {fontSize}px / {fontWeight} / {letterSpacing}em / {lineHeight}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const css = `font-family: '${selectedFont}', sans-serif;\nfont-size: ${fontSize}px;\nfont-weight: ${fontWeight};\nletter-spacing: ${letterSpacing}em;\nline-height: ${lineHeight};\ntext-transform: ${textTransform};\nfont-style: ${fontStyle};\ncolor: ${textColor};`;
                    navigator.clipboard.writeText(css);
                  }}
                  className="text-xs text-[#888] hover:text-[#39FF14] transition-colors border border-[#333] px-3 py-1.5 hover:border-[#39FF14]"
                >
                  Copy CSS
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "grid" && (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[1px] bg-[#222]"
                  >
                    {filteredFonts.map((font) => {
                      const isCustom = customFonts.some((c) => c.family === font);
                      const displayName = isCustom
                        ? customFonts.find((c) => c.family === font)?.name || font
                        : font;
                      return (
                        <button
                          key={font}
                          onClick={() => {
                            setSelectedFont(font);
                            setActiveTab("preview");
                          }}
                          className={`group relative bg-[#0A0A0A] p-6 text-left transition-all hover:bg-[#111] min-h-[160px] flex flex-col justify-between overflow-hidden ${
                            selectedFont === font ? "ring-1 ring-[#39FF14] ring-inset" : ""
                          }`}
                        >
                          <p
                            className="text-2xl md:text-3xl leading-tight break-words select-text line-clamp-3"
                            style={{
                              fontFamily: `'${font}', sans-serif`,
                              fontWeight,
                              fontStyle,
                              textTransform,
                              color: textColor,
                            }}
                          >
                            {sampleText}
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-[10px] text-[#555] uppercase tracking-wider truncate max-w-[80%] group-hover:text-[#888] transition-colors">
                              {displayName}
                            </span>
                            <span className="text-[10px] text-[#39FF14] opacity-0 group-hover:opacity-100 transition-opacity">
                              Select
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {activeTab === "preview" && (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#222] p-8 md:p-12 min-h-[400px] flex items-center justify-center"
                    style={{ backgroundColor: bgColor }}
                  >
                    <p
                      className="w-full break-words select-text"
                      style={{
                        fontFamily: `'${selectedFont}', sans-serif`,
                        fontSize: `${fontSize}px`,
                        fontWeight,
                        letterSpacing: `${letterSpacing}em`,
                        lineHeight,
                        textTransform,
                        fontStyle,
                        color: textColor,
                      }}
                    >
                      {sampleText}
                    </p>
                  </motion.div>
                )}

                {activeTab === "pairing" && (
                  <motion.div
                    key="pairing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#222] p-8 md:p-12 space-y-8"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div>
                      <p className="text-xs text-[#555] font-mono mb-2 uppercase tracking-wider">
                        Heading — {customFonts.find((c) => c.family === selectedFont)?.name || selectedFont}
                      </p>
                      <h2
                        className="break-words select-text"
                        style={{
                          fontFamily: `'${selectedFont}', sans-serif`,
                          fontSize: `${Math.max(fontSize, 36)}px`,
                          fontWeight: 700,
                          letterSpacing: `${letterSpacing}em`,
                          lineHeight: 1.2,
                          textTransform,
                          color: textColor,
                        }}
                      >
                        {sampleText}
                      </h2>
                    </div>
                    <div className="w-16 h-[1px] bg-[#39FF14]/30" />
                    <div>
                      <p className="text-xs text-[#555] font-mono mb-2 uppercase tracking-wider">
                        Body — {customFonts.find((c) => c.family === pairingFont)?.name || pairingFont}
                      </p>
                      <p
                        className="select-text max-w-3xl"
                        style={{
                          fontFamily: `'${pairingFont}', sans-serif`,
                          fontSize: "16px",
                          fontWeight: 400,
                          lineHeight: 1.75,
                          color: textColor,
                          opacity: 0.8,
                        }}
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                        in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                    <div className="w-16 h-[1px] bg-[#39FF14]/30" />
                    <div>
                      <p className="text-xs text-[#555] font-mono mb-2 uppercase tracking-wider">
                        Mixed Layout
                      </p>
                      <div className="space-y-4">
                        <h3
                          className="select-text"
                          style={{
                            fontFamily: `'${selectedFont}', sans-serif`,
                            fontSize: "28px",
                            fontWeight: 600,
                            lineHeight: 1.3,
                            color: textColor,
                          }}
                        >
                          A Headline Using Your Selected Font
                        </h3>
                        <p
                          className="select-text max-w-3xl"
                          style={{
                            fontFamily: `'${pairingFont}', sans-serif`,
                            fontSize: "15px",
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: textColor,
                            opacity: 0.75,
                          }}
                        >
                          Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui.
                          Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam id
                          dolor id nibh ultricies vehicula ut id elit.
                        </p>
                        <h4
                          className="select-text"
                          style={{
                            fontFamily: `'${selectedFont}', sans-serif`,
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: 1.4,
                            color: textColor,
                          }}
                        >
                          A Subheading for Context
                        </h4>
                        <p
                          className="select-text max-w-3xl"
                          style={{
                            fontFamily: `'${pairingFont}', sans-serif`,
                            fontSize: "15px",
                            fontWeight: 400,
                            lineHeight: 1.7,
                            color: textColor,
                            opacity: 0.75,
                          }}
                        >
                          Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ut
                          facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod
                          semper. Donec ullamcorper nulla non metus auctor fringilla.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "waterfall" && (
                  <motion.div
                    key="waterfall"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#222] p-8 space-y-6"
                    style={{ backgroundColor: bgColor }}
                  >
                    {waterfallSizes.map((size) => (
                      <div key={size} className="flex items-baseline gap-4">
                        <span className="text-xs text-[#555] font-mono w-12 shrink-0 text-right">
                          {size}px
                        </span>
                        <p
                          className="select-text truncate"
                          style={{
                            fontFamily: `'${selectedFont}', sans-serif`,
                            fontSize: `${size}px`,
                            fontWeight,
                            letterSpacing: `${letterSpacing}em`,
                            fontStyle,
                            textTransform,
                            color: textColor,
                            lineHeight: 1.3,
                          }}
                        >
                          {sampleText}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "glyphs" && (
                  <motion.div
                    key="glyphs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="border border-[#222] p-8"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-1">
                      {glyphs.split("").map((char, i) => (
                        <div
                          key={i}
                          className="aspect-square flex items-center justify-center border border-[#222] hover:border-[#39FF14] transition-colors cursor-default group relative"
                          title={`U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")}`}
                        >
                          <span
                            className="select-text text-2xl"
                            style={{
                              fontFamily: `'${selectedFont}', sans-serif`,
                              fontWeight,
                              fontStyle,
                              color: textColor,
                            }}
                          >
                            {char}
                          </span>
                          <span className="absolute bottom-0.5 text-[8px] text-[#555] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            {char.charCodeAt(0).toString(16).toUpperCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
