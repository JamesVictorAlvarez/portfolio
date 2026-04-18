export default function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <rect x="5" y="5" width="90" height="90" rx="22" style={{ fill: 'var(--bg-alt)', stroke: 'var(--border)' }} strokeWidth="2"/>
      <path d="M40 25 H75" style={{ stroke: 'var(--text-main)' }} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M60 25 V60 A 15 15 0 0 1 30 60 V55" style={{ stroke: 'var(--text-main)' }} strokeWidth="8" strokeLinecap="round" fill="none"/>
      <circle cx="30" cy="25" r="5" style={{ fill: 'var(--accent)' }}/>
    </svg>
  );
}
