import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  goal?: number;
  raised?: number;
  categories?: string[];
  variant?: 'default' | 'light' | 'dark';
  href?: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  image,
  goal,
  raised,
  categories,
  variant = 'default',
  href = `/campaigns/${id}`
}) => {
  // Define variant-specific classes
  const variantClasses = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-800 text-white'
  };
  
  // Progress calculation for funding campaigns
  const progress = goal && raised ? Math.min(Math.round((raised / goal) * 100), 100) : null;
  
  // Get background classes based on variant
  const bgClasses = variantClasses[variant];
  
  return (
    <Link href={href}>
      <div 
        className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 h-full
                   ${bgClasses} hover:shadow-lg`}
      >
        {/* Card Image */}
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover"
          />
          
          {/* Categories overlay */}
          {categories && categories.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 p-2 flex flex-wrap gap-1">
              {categories.map((category, index) => (
                <span 
                  key={index}
                  className="text-xs font-medium px-2 py-1 rounded-full bg-primary-500 text-white"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className={`text-sm mb-4 ${variant === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {description}
          </p>
          
          {/* Progress Bar for funding campaigns */}
          {progress !== null && (
            <div className="mt-4 mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className={variant === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  Raised: ${raised?.toLocaleString()}
                </span>
                <span className={variant === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                  {progress}%
                </span>
              </div>
              <div className={`w-full h-2 ${variant === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div 
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className={`text-right text-xs mt-1 ${variant === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Goal: ${goal?.toLocaleString()}
              </div>
            </div>
          )}
          
          {/* Call to action button */}
          <div className="mt-4">
            <button 
              className="w-full py-2 text-center rounded text-white bg-primary-500 hover:bg-primary-600 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card; 