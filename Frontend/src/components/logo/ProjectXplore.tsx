import React from 'react';

const ProjectXploreLogo = ({ className }:{
    className?: string;
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 300 100" 
      className={className}
    >
      {/* Main icon - abstract project/explore concept */}
      <g transform="translate(30, 25)">
        {/* Compass/radar element - theme-aware */}
        <circle cx="25" cy="25" r="22" className="fill-primary opacity-10" />
        <circle cx="25" cy="25" r="18" className="fill-primary opacity-20" />
        <circle cx="25" cy="25" r="14" className="fill-primary opacity-30" />
        
        {/* Connection nodes representing project elements - theme-aware */}
        <circle cx="25" cy="25" r="5" className="fill-primary" />
        <circle cx="45" cy="15" r="4" className="fill-primary" />
        <circle cx="38" cy="38" r="4" className="fill-primary" />
        <circle cx="10" cy="32" r="4" className="fill-primary" />
        
        {/* Connection lines - theme-aware */}
        <line 
          x1="25" y1="25" 
          x2="45" y2="15" 
          className="stroke-primary" 
          strokeWidth="2" 
        />
        <line 
          x1="25" y1="25" 
          x2="38" y2="38" 
          className="stroke-primary" 
          strokeWidth="2" 
        />
        <line 
          x1="25" y1="25" 
          x2="10" y2="32" 
          className="stroke-primary" 
          strokeWidth="2" 
        />
      </g>
      
      {/* Text - theme-aware */}
      <g transform="translate(80, 50)">
        <text 
          fontFamily="Arial, sans-serif" 
          fontWeight="700" 
          fontSize="24" 
          className="fill-foreground"
        >
          Project<tspan className="fill-primary">Xplore</tspan>
        </text>
        <text 
          x="2" y="20" 
          fontFamily="Arial, sans-serif" 
          fontSize="11" 
          className="fill-muted-foreground"
        >
          Project Management & Collaboration
        </text>
      </g>
    </svg>
  );
};

export default ProjectXploreLogo;