import { useId } from 'react';

const LogoIcon = ({ size = 48 }) => {
  const gradientId = `ariscanai-logo-${useId()}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradientId} x1="16" y1="8" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00D1FF" />
          <stop offset="50%" stopColor="#00B7FF" />
          <stop offset="100%" stopColor="#0090FF" />
        </linearGradient>
      </defs>
      <path
        d="M31.8 6C26.2 15.2 16 23.4 16 33.8c0 10.3 8 18.2 16 18.2s16-7.9 16-18.2C48 23.3 36.5 13.4 31.8 6z"
        fill={`url(#${gradientId})`}
      />
      <path
        d="M13 38.5c4.2 7 12 11.7 20.7 11.7 7.4 0 13.9-3 18.3-8.6-3-4.3-8.4-6.6-14.6-6.6-9 0-16.8 1.6-24.4 3.5z"
        fill="#00C8FF"
        fillOpacity="0.65"
      />
      <path
        d="M23.5 44.5c-1.6 4.3-1 7.6-1 7.6s4.4 0.4 9.5-2.6c1.7-1 3.3-2.3 4.7-3.8-4.6 0.3-8.7-0.3-13.2-1.2z"
        fill="#B5F3FF"
        fillOpacity="0.75"
      />
    </svg>
  );
};

export default LogoIcon;
