import type { MoonPhase } from '@/lib/astrology';

interface MoonPhaseDisplayProps {
  phase: MoonPhase;
  name: string;
  illumination: number;
  size?: 'sm' | 'md' | 'lg';
}

const moonEmojis: Record<MoonPhase, string> = {
  'new-moon': '🌑',
  'waxing-crescent': '🌒',
  'first-quarter': '🌓',
  'waxing-gibbous': '🌔',
  'full-moon': '🌕',
  'waning-gibbous': '🌖',
  'last-quarter': '🌗',
  'waning-crescent': '🌘',
};

export default function MoonPhaseDisplay({ phase, name, illumination, size = 'md' }: MoonPhaseDisplayProps) {
  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-5xl',
    lg: 'text-7xl',
  };

  return (
    <div className="text-center">
      <div className={`${sizeClasses[size]} mb-3`} role="img" aria-label={name}>
        {moonEmojis[phase]}
      </div>
      <p className="font-serif text-lg">{name}</p>
      <p className="text-sm text-muted mt-1">{illumination}% illuminated</p>
    </div>
  );
}
