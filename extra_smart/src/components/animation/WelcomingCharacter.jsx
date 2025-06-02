import React from 'react';

const EngineerSVG = () => (
  <svg width="200" height="200" viewBox="0 0 300 300" fill="none">
    {/* الوجه */}
    <circle cx="150" cy="100" r="50" fill="#FFE0B2" />
    
    {/* الخوذة */}
    <path 
      d="M80 60Q150 20 220 60V120Q150 160 80 120V60Z" 
      fill="#2E5BFF"
      stroke="#1A3D8F"
      strokeWidth="3"
    />
    
    {/* العينين */}
    <ellipse cx="130" cy="90" rx="10" ry="12" fill="#333" />
    <ellipse cx="170" cy="90" rx="10" ry="12" fill="#333" />
    
    {/* الابتسامة */}
    <path 
      d="M130 120 Q150 140 170 120" 
      stroke="#333" 
      strokeWidth="3" 
      fill="none"
    />
    
    {/* الجسم */}
    <path 
      d="M100 140H200V240L180 260H120L100 240V140Z" 
      fill="#4A4A4A"
    />
    
    {/* السترة */}
    <rect x="140" y="140" width="20" height="100" fill="#FF6D2E" />
    <path 
      d="M100 140L120 160L140 140M200 140L180 160L160 140" 
      stroke="#FF6D2E" 
      strokeWidth="8"
    />
    
    {/* اليدين */}
    <path 
      d="M80 160L100 180V200M220 160L200 180V200" 
      stroke="#FFE0B2" 
      strokeWidth="10"
    />
    
    {/* اللابتوب */}
    <g transform="translate(180 200) rotate(15)">
      <rect width="80" height="50" rx="5" fill="#fff" />
      <rect x="5" y="5" width="70" height="40" rx="3" fill="#2E5BFF" />
      <text x="15" y="25" fill="white" fontSize="12">{"</>"}</text>
    </g>
    
    {/* الأدوات */}
    <g transform="translate(60 200)">
      <rect width="30" height="30" fill="#FF6D2E" rx="5" />
      <path 
        d="M5 15H25M15 5V25" 
        stroke="white" 
        strokeWidth="2"
      />
    </g>
  </svg>
);

const EngineerCard = () => {
  return (
    
     
        <EngineerSVG />
        
     
        
  );
};

export default EngineerCard;