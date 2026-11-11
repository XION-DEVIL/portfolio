"use client";

import React, { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Text3DFlipProps extends ComponentPropsWithoutRef<"span"> {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  rotateDirection?: "top" | "bottom" | "left" | "right";
  springDamping?: number;
  springStiffness?: number;
}

export function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  staggerDuration = 0.035,
  staggerFrom = "first",
  rotateDirection = "top",
  springDamping = 20,
  springStiffness = 180,
  onMouseEnter,
  onMouseLeave,
  onClick,
  ...props
}: Text3DFlipProps) {
  const [scope, animate] = useAnimate();
  const isHoveredRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  const getInitialPosition = () => {
    switch (rotateDirection) {
      case "top":
        return { initial: { y: 0, x: 0 }, hover: { y: "-100%", x: 0 } };
      case "bottom":
        return { initial: { y: 0, x: 0 }, hover: { y: "100%", x: 0 } };
      case "left":
        return { initial: { y: 0, x: 0 }, hover: { y: 0, x: "-100%" } };
      case "right":
        return { initial: { y: 0, x: 0 }, hover: { y: 0, x: "100%" } };
    }
  };

  const getRotation = () => {
    switch (rotateDirection) {
      case "top":
        return {
          initial: { rotateX: 0, rotateY: 0 },
          hover: { rotateX: 90, rotateY: 0 },
        };
      case "bottom":
        return {
          initial: { rotateX: 0, rotateY: 0 },
          hover: { rotateX: -90, rotateY: 0 },
        };
      case "left":
        return {
          initial: { rotateX: 0, rotateY: 0 },
          hover: { rotateX: 0, rotateY: -90 },
        };
      case "right":
        return {
          initial: { rotateX: 0, rotateY: 0 },
          hover: { rotateX: 0, rotateY: 90 },
        };
    }
  };

  const getBackRestingState = () => {
    switch (rotateDirection) {
      case "top":
        return { y: "100%", x: 0, rotateX: -90, rotateY: 0 };
      case "bottom":
        return { y: "-100%", x: 0, rotateX: 90, rotateY: 0 };
      case "left":
        return { y: 0, x: "100%", rotateX: 0, rotateY: 90 };
      case "right":
        return { y: 0, x: "-100%", rotateX: 0, rotateY: -90 };
    }
  };

  const springTransition = {
    type: "spring" as const,
    damping: springDamping,
    stiffness: springStiffness,
  };

  const handleHover = () => {
    isHoveredRef.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const { hover: hoverPosition } = getInitialPosition();
    const { hover: hoverRotation } = getRotation();

    animate([
      [
        ".front-text",
        { ...hoverPosition, ...hoverRotation },
        {
          ...springTransition,
          delay: stagger(staggerDuration, { from: staggerFrom }),
        },
      ],
      [
        ".back-text",
        { y: 0, x: 0, rotateX: 0, rotateY: 0 },
        {
          ...springTransition,
          delay: stagger(staggerDuration, { from: staggerFrom }),
        },
      ],
    ]);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const { initial: initialPosition } = getInitialPosition();
    const { initial: initialRotation } = getRotation();
    const backResting = getBackRestingState();

    animate([
      [
        ".front-text",
        { ...initialPosition, ...initialRotation },
        {
          ...springTransition,
          delay: stagger(staggerDuration, { from: staggerFrom }),
        },
      ],
      [
        ".back-text",
        backResting,
        {
          ...springTransition,
          delay: stagger(staggerDuration, { from: staggerFrom }),
        },
      ],
    ]);
  };

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    onClick?.(e);
    handleHover();
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        handleMouseLeave();
      }
    }, 1200);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    onMouseEnter?.(e);
    handleHover();
  };

  const handlePointerLeave = (e: React.MouseEvent<HTMLSpanElement>) => {
    onMouseLeave?.(e);
    handleMouseLeave();
  };

  const words = (children || "").trim().split(/\s+/).filter(Boolean);

  return (
    <span
      ref={scope}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handlePointerLeave}
      onClick={handleClick}
      className={cn("relative inline-flex flex-wrap cursor-pointer select-none", className)}
      {...props}
    >
      <span className="sr-only">{children}</span>
      <span
        className="inline-flex flex-wrap items-center justify-center md:justify-start gap-x-[0.28em] leading-[0.95]"
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="relative inline-block overflow-hidden [perspective:1000px] [-webkit-perspective:1000px]"
              >
                <span
                  className={cn(
                    "front-text inline-block transform-gpu transform-3d backface-hidden [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
                    textClassName,
                  )}
                >
                  {char}
                </span>
                <span
                  className={cn(
                    "back-text absolute left-0 top-0 inline-block transform-gpu transform-3d backface-hidden [transform-style:preserve-3d] [-webkit-transform-style:preserve-3d] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]",
                    flipTextClassName,
                  )}
                  style={{
                    transform: `${
                      rotateDirection === "top" || rotateDirection === "bottom"
                        ? `translateY(${rotateDirection === "top" ? "100%" : "-100%"})`
                        : `translateX(${rotateDirection === "left" ? "100%" : "-100%"})`
                    } ${
                      rotateDirection === "top" || rotateDirection === "bottom"
                        ? `rotateX(${rotateDirection === "top" ? "-90deg" : "90deg"})`
                        : `rotateY(${rotateDirection === "left" ? "90deg" : "-90deg"})`
                    }`,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}

export default Text3DFlip;
