import { useEffect, useState } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') !== null ||
        target.closest('[role="button"]') !== null
      );
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', () => setIsHovered(false));

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', () => setIsHovered(false));
    };
  }, []);

  return (
    <div 
      className={`cursor ${isHovered ? 'cursor-hover' : ''}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    />
  );
} 