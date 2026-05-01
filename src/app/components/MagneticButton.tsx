"use client";

import { forwardRef, useRef, useImperativeHandle } from "react";
import gsap from "gsap";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => innerRef.current!);

    const onEnter = () => {
      gsap.to(innerRef.current, { scale: 1.1, duration: 0.4, ease: "power2.out" });
    };

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = innerRef.current!;
      const { left, top, width, height } = btn.getBoundingClientRect();
      gsap.to(btn, {
        x: (e.clientX - (left + width  / 2)) * 0.4,
        y: (e.clientY - (top  + height / 2)) * 0.4,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(innerRef.current, {
        x: 0, y: 0, scale: 1,
        duration: 0.7,
        ease: "elastic.out(1.1, 0.4)",
      });
    };

    return (
      <button
        ref={innerRef}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...props}
      >
        {children}
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
export default MagneticButton;
