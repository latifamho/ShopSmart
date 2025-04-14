import { ComponentProps, forwardRef } from "react";
import { buttonColorToClass, buttonStyles } from "./styling.helper";
import { TButtonVariants, TColorVariants } from "@/types/types";
import { cn } from "@/lib/utils";
export type TButtonProperties = Omit<ComponentProps<"button">, "ref"> & {
  size?: "small" | "medium";
  color?: TColorVariants;
  variant?: TButtonVariants;
  progress?: number;
  className?: string;
};

function Button(
  {
    children,
    color,
    variant,
    className,
    size = "medium",
    ...props
  }: TButtonProperties,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fRef?: any
) {
  return (
    <button
      className={cn(
        buttonStyles(),
        size === "small" ? "text-[6px]" : "text-[14px]",
        buttonColorToClass(color, variant, props.disabled),
        className // This will properly merge and override classes
      )}
      type="button"
      ref={fRef}
      {...props}
    >
      {children}
    </button>
  );
}

export default forwardRef(Button);
