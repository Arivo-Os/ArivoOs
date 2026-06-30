import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const H1: React.FC<Props> = ({ children, className }) => (
  <h1 className={`font-sans font-bold text-4xl md:text-5xl lg:text-6xl ${className}`}>{children}</h1>
);

export const H2: React.FC<Props> = ({ children, className }) => (
  <h2 className={`font-sans font-semibold text-3xl md:text-4xl lg:text-5xl ${className}`}>{children}</h2>
);

export const H3: React.FC<Props> = ({ children, className }) => (
  <h3 className={`font-sans font-medium text-2xl md:text-3xl ${className}`}>{children}</h3>
);

export const Body: React.FC<Props> = ({ children, className }) => (
  <p className={`font-sans text-base md:text-lg leading-relaxed ${className}`}>{children}</p>
);

export const Caption: React.FC<Props> = ({ children, className }) => (
  <span className={`font-sans text-sm text-app-muted ${className}`}>{children}</span>
);
