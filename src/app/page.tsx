export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-amber-900/10 blur-[120px]" />
      </div>

      {/* Thin horizontal rule top */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-amber-600/60" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        {/* Monogram mark */}
        <div className="flex items-center justify-center w-20 h-20 border border-amber-600/40 rotate-45">
          <span className="text-amber-500 text-2xl font-light tracking-widest -rotate-45 select-none">
            HS
          </span>
        </div>

        {/* Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-white font-[family-name:var(--font-dm-sans)] text-6xl sm:text-8xl font-extralight tracking-[0.3em] uppercase">
            Harvey
          </h1>
          <div className="w-full h-px bg-amber-600/40" />
          <h2 className="text-amber-500 font-[family-name:var(--font-dm-sans)] text-6xl sm:text-8xl font-extralight tracking-[0.3em] uppercase">
            Specter
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-zinc-500 text-xs tracking-[0.4em] uppercase font-light mt-2">
          The best closer in New York City
        </p>
      </div>

      {/* Thin horizontal rule bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-transparent to-amber-600/60" />
    </main>
  );
}
