'use client';

export default function Footer() {
  return (
    <footer
      className="py-6 text-center text-sm"
      style={{
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      &copy; 2026 온시아(주) &middot; Midjourney Pro Prompt Generator v1.0
    </footer>
  );
}
