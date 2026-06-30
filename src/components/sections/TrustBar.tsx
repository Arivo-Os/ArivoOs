import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { Caption } from '@/components/ui/Typography';

const trustItems = [
  { icon: 'lock', text: 'Privacy First' },
  { icon: 'shield', text: 'Secure Encryption' },
  { icon: 'lock', text: 'Your Data Stays Yours' },
  { icon: 'shield', text: 'Built for India' },
];

export const TrustBar: React.FC = () => {
  return (
    <section id="trust-bar" className="bg-gray-50 dark:bg-gray-800 py-6">
      <div className="container mx-auto flex flex-wrap justify-center items-center gap-8">
        {trustItems.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <Icon name={item.icon} className="text-app-accent w-5 h-5" />
            <Caption className="text-app-muted">{item.text}</Caption>
          </div>
        ))}
      </div>
    </section>
  );
};
