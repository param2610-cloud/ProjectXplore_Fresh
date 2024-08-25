import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

const CopyButton = ({ text,className,size }:{text:string,className:string,size:number}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <>
      {!copied && (
        <Copy onClick={copyToClipboard} className={className} size={size}/>
      )}
      {
        copied && (
            <Check color='green' className={className} size={size}/>
        )
      }
    </>
    
  );
};

export default CopyButton;
