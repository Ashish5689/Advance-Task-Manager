import React from 'react';
import styled from 'styled-components';

interface AppIconProps {
  size?: number;
  className?: string;
}

const IconContainer = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const AppIcon: React.FC<AppIconProps> = ({ size = 28, className }) => {
  return (
    <IconContainer size={size} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="512" height="512" rx="100" fill="currentColor" />
        <rect x="120" y="180" width="272" height="40" rx="8" fill="white" opacity="0.9" />
        <rect x="120" y="240" width="272" height="40" rx="8" fill="white" opacity="0.9" />
        <rect x="120" y="300" width="272" height="40" rx="8" fill="white" opacity="0.9" />
        <path d="M160 180 L140 200 L120 180" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="140" cy="260" r="20" stroke="white" strokeWidth="12" fill="none" />
        <path d="M130 306 L140 316 L160 296" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </IconContainer>
  );
};

export default AppIcon; 