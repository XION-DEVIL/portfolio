import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Text3DFlip } from "../components/magicui/text-3d-flip";
import { DotPattern } from "../components/magicui/dot-pattern";

describe("Magic UI Components", () => {
  describe("Text3DFlip", () => {
    it("renders text with screen reader accessibility and 3D layers", () => {
      const { container } = render(
        <Text3DFlip
          className="test-title"
          textClassName="text-white"
          flipTextClassName="text-white/80"
          rotateDirection="top"
        >
          Sahaya Savari F
        </Text3DFlip>,
      );

      // Accessible text for screen readers
      expect(screen.getByText("Sahaya Savari F")).toBeInTheDocument();

      // Front and back text characters are rendered (13 letters: Sahaya (6) + Savari (6) + F (1))
      const frontTexts = container.querySelectorAll(".front-text");
      const backTexts = container.querySelectorAll(".back-text");

      expect(frontTexts.length).toBe(13);
      expect(backTexts.length).toBe(13);

      // 3D preserve and backface classes
      expect(frontTexts[0]).toHaveClass("backface-hidden");
      expect(backTexts[0]).toHaveClass("backface-hidden");
    });

    it("handles mouse hover and click events with callback propagation", () => {
      const handleClick = vi.fn();
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      const { container } = render(
        <Text3DFlip
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Sahaya Savari F
        </Text3DFlip>,
      );

      const trigger = container.firstElementChild as HTMLElement;
      expect(trigger).toBeInTheDocument();

      fireEvent.mouseEnter(trigger);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      fireEvent.mouseLeave(trigger);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);

      fireEvent.click(trigger);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles whitespace and empty strings gracefully without crashing", () => {
      const { container } = render(<Text3DFlip> </Text3DFlip>);
      const frontTexts = container.querySelectorAll(".front-text");
      expect(frontTexts.length).toBe(0);
    });
  });

  describe("DotPattern", () => {
    it("renders svg pattern with proper structure and sanitized id without colons", () => {
      const { container } = render(
        <DotPattern width={28} height={28} cx={1} cy={1} cr={1} className="test-pattern" />,
      );

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass("test-pattern");

      const pattern = container.querySelector("pattern");
      expect(pattern).toBeInTheDocument();
      expect(pattern).toHaveAttribute("width", "28");
      expect(pattern).toHaveAttribute("height", "28");

      const id = pattern?.getAttribute("id");
      expect(id).toBeDefined();
      expect(id).toMatch(/^dot-pattern-[a-zA-Z0-9_-]+$/);
      expect(id?.includes(":")).toBe(false);

      const rect = container.querySelector("rect");
      expect(rect).toHaveAttribute("fill", `url(#${id})`);
    });
  });
});
