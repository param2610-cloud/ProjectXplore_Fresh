
import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'
 
// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 50 50"
        width="32"
        height="32"
      >
        <g>
          <circle cx="25" cy="25" r="22" fill="#0066FF" fillOpacity="0.1" />
          <circle cx="25" cy="25" r="18" fill="#0066FF" fillOpacity="0.2" />
          <circle cx="25" cy="25" r="14" fill="#0066FF" fillOpacity="0.3" />
          <circle cx="25" cy="25" r="5" fill="#0066FF" />
          <circle cx="45" cy="15" r="4" fill="#0066FF" />
          <circle cx="38" cy="38" r="4" fill="#0066FF" />
          <circle cx="10" cy="32" r="4" fill="#0066FF" />
          <line 
            x1="25" y1="25" 
            x2="45" y2="15" 
            stroke="#0066FF" 
            strokeWidth="2" 
          />
          <line 
            x1="25" y1="25" 
            x2="38" y2="38" 
            stroke="#0066FF" 
            strokeWidth="2" 
          />
          <line 
            x1="25" y1="25" 
            x2="10" y2="32" 
            stroke="#0066FF" 
            strokeWidth="2" 
          />
        </g>
      </svg>
    ),
    { ...size }
  )
}