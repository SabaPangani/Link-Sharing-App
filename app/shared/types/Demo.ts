export type DemoContextType = {
  setIsDemo: (value: boolean) => void;
  isDemo: boolean;
  setIsMouseEntered: (value: boolean) => void;
  isMouseEntered: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};
