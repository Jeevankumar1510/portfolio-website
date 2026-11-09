import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if pointer device supports hover and is fine (desktop mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) {
      setIsTouchDevice(true);
      return;
    }

    setIsTouchDevice(false);

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target;
      if (target && target.closest) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsHovered(interactive);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing animation loop
    let animId;
    let currentX = -100;
    let currentY = -100;

    const followLoop = () => {
      currentX += (posRef.current.x - currentX) * 0.18;
      currentY += (posRef.current.y - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(followLoop);
    };

    animId = requestAnimationFrame(followLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.7 : isHovered ? 1.5 : 1
          })`
        }}
      >
        <div className={`w-2 h-2 rounded-full ${isHovered ? 'bg-cyan-400 shadow-[0_0_10px_#00f0ff]' : 'bg-cyan-300'}`} />
      </div>

      {/* Trailing Outer Glowing Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) translate(-50%, -50%) scale(${
            isClicking ? 0.8 : isHovered ? 1.8 : 1
          })`
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 border ${
            isHovered
              ? 'w-10 h-10 border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
              : 'w-7 h-7 border-cyan-500/40 bg-transparent'
          }`}
        />
      </div>
    </>
  );
};

export default CustomCursor;
