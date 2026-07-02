interface FooterProps {
  totalChanges: number;
}

export function Footer({ totalChanges }: FooterProps) {
  return (
    <footer className="h-7 min-h-[28px] border-t border-[#1a1a1a] px-3 flex items-center justify-between bg-[#1e1e1e] text-[10px] text-[#888]">
      <div className="flex items-center gap-2">
        {totalChanges > 0 && (
          <span className="text-[10px] text-[#666]">{totalChanges} unsaved</span>
        )}
        {totalChanges === 0 && <span>No changes</span>}
      </div>
    </footer>
  );
}
