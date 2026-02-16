
import React from 'react';

export const FashionIcon: React.FC<{ type: string; className?: string }> = ({ type, className = "w-12 h-12" }) => {
  const icons: Record<string, React.ReactNode> = {
    // Categories
    'Dress': <path d="M7 4l10 0l2 16l-14 0z M9 4l0-1 M15 4l0-1" />,
    'Top': <path d="M6 4h12l1 10h-3v6h-8v-6h-3z" />,
    'Skirt': <path d="M8 4h8l3 16h-14z" />,
    'Pants': <path d="M8 4h8v16h-3v-8h-2v8h-3z" />,
    'Jumpsuit': <path d="M7 4h10l1 8l-2 8h-2v-4h-4v4h-2l-2-8z" />,

    // Necklines
    'Sweetheart': <path d="M12 8c-2-2-4-1-4 1c0 3 4 7 4 7s4-4 4-7c0-2-2-3-4-1z" />,
    'V-Neck': <path d="M6 4l6 8l6-8" />,
    'Halter': <path d="M12 4c-3 0-4 2-4 2l4 6l4-6s-1-2-4-2z" />,
    'Boat Neck': <path d="M4 6c4-2 12-2 16 0" />,
    'Off-the-Shoulder': <path d="M4 8c4-1 12-1 16 0 M4 8l2 4 M20 8l-2 4" />,
    'Square': <path d="M7 4h10v6H7z" />,

    // Sleeves
    'Sleeveless': <path d="M8 4l-2 4 M16 4l2 4" />,
    'Short': <path d="M8 4l-4 4v4l4-2 M16 4l4 4v4l-4-2" />,
    'Cap': <path d="M8 4s-3 1-3 3s3 2 3 2 M16 4s3 1 3 3s-3 2-3 2" />,
    'Three-Quarter': <path d="M8 4l-5 5v7l5-2 M16 4l5 5v7l-5-2" />,
    'Long': <path d="M8 4l-6 6v10l6-3 M16 4l6 6v10l-6-3" />,
    'Bell': <path d="M8 4l-6 6v8c4 2 4 2 0 0 M16 4l6 6v8c-4 2-4 2 0 0" />,
    'Bishop': <path d="M8 4c-4 4-4 12 0 14 M16 4c4 4 4 12 0 14" />,

    // Silhouettes
    'A-Line': <path d="M12 4L4 20h16z" />,
    'Ball Gown': <path d="M12 4c-2 0-3 2-3 2l-5 14h16l-5-14s-1-2-3-2z" />,
    'Mermaid': <path d="M12 4c-2 0-3 2-3 6c0 4 2 6 2 8l-4 2h10l-4-2c0-2 2-4 2-8c0-4-1-6-3-6z" />,
    'Sheath': <path d="M9 4h6v16H9z" />,
    'Empire': <path d="M9 4h6v4H9z M8 8h8l2 12h-12z" />,
    'Peplum': <path d="M8 4h8l1 6h-10z M7 10h10l2 4h-14z" />,
    'Crop': <path d="M8 4h8l1 6h-10z" />,
    'Tunic': <path d="M8 4h8l1 10h-10z" />,
    'Blouse': <path d="M8 4h8l2 10h-12z" />,
    'Pencil': <path d="M9 4h6l-1 16h-4z" />,
    'Wide Leg': <path d="M8 4h8l3 16h-4v-8h-2v8h-4z" />,
    'Straight': <path d="M9 4h6v16h-2v-8h-2v8h-2z" />,
  };

  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      {icons[type] || <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />}
    </svg>
  );
};
