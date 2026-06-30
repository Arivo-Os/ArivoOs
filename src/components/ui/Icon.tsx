import React from 'react';
import { ReactNode } from 'react';

type IconProps = {
  name: string; // Heroicon name e.g., 'lock', 'shield-check'
  className?: string;
};

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  const icons: { [key: string]: JSX.Element } = {
    lock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 11c1.657 0 3-1.343 3-3V5a3 3 0 10-6 0v3c0 1.657 1.343 3 3 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 11h14a2 2 0 012 2v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2z"
        />
      </svg>
    ),
    shield: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-5 w-5 ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 22s-8-4.5-8-11V5l8-3 8 3v6c0 6.5-8 11-8 11z"
        />
      </svg>
    ),
    // add more icons as needed
  };
  return icons[name] || null;
};
