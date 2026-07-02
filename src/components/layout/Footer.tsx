interface FooterProps {
  totalChanges: number
}

export function Footer({ totalChanges }: FooterProps) {
  return (
    <footer className="h-6 min-h-[24px] border-t border-[#1a1a1a] px-4 flex items-center justify-between bg-[#0a0a0a] text-[10px] text-[#444]">
      <div className="flex items-center gap-3">
        <span className="text-orange-400">HTML</span>
        <span className="text-sky-400">CSS</span>
        <span className="text-amber-400">JS</span>
      </div>
      <div className="flex items-center gap-3">
        <span>UTF-8</span>
        <span>LF</span>
        {totalChanges > 0 && (
          <span className="text-[#666]">{totalChanges} change{totalChanges !== 1 ? "s" : ""}</span>
        )}
        {totalChanges === 0 && (
          <span>No changes</span>
        )}
      </div>
    </footer>
  )
}
