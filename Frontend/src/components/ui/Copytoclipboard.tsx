import { Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

const CopyButton = ({ text,className,size }:{text:string,className:string,size:number|null}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <>
      {!copied && size && (
        <Copy onClick={copyToClipboard} className={className} size={size}/>
      )}
      {
        copied && size && (
            <Check color='green' className={className} size={size}/>
        )
      }
    </>
    
  );
};

export default CopyButton;
