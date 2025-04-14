import { TButtonVariants, TColorVariants } from "@/types/types";

export const buttonStyles = () =>
  "transition-all   duration-300 border-none font-Raleway tracking-tight rounded-[4px]  justify-center flex items-center cursor-pointer  tracking-wide capitalize  font-semibold py-[13px] px-[20px]   text-[14px] whitespace-nowrap focus:outline-none";

export const buttonColorToClass = (
  color: TColorVariants = "primary",
  variant: TButtonVariants = "fill",
  disabled?: boolean
) => {
  const disabledbuttonPreset: { [variant in TButtonVariants]: string } = {
    fill: "bg-neutral-300 text-primaryText cursor-not-allowed py-2 px-3",
    outline:
      "shadow-[inset_0_0_0_2px] shadow-neutral-400 text-neutral-500 cursor-not-allowed py-1 px-2",
    // text: "text-neutral-500 bg-neutral-500/[0.1] cursor-not-allowed py-2 px-3",
  };

  const buttonPreset: {
    [variant in TButtonVariants]: { [color in TColorVariants]: string };
  } = {
    fill: {
      primary:
        "bg-background text-foreground outline-none hover:bg-background/[0.4]",
      secondary:
        "bg-foreground text-background  outline-none  hover:bg-foreground/[0.8] ",
    },
    outline: {
      primary:
        "shadow-[inset_0_0_0_2px] shadow-background/[0.5] text-foreground bg-transparent hover:bg-background/[0.4]",
      secondary:
        "shadow-[inset_0_0_0_2px] shadow-foreground border border-1 border-foreground outline-none text-secondaryText bg-foreground hover:bg-foreground/[0.8]  ",
    },
    // text: {
    //   primary: "text-mainBtn bg-transparent px-1 py-1 hover:text-mainBtn",
    //   secondary: "text-primaryBtn hover:bg-white hover:bg-opacity-10",
    // },
  };

  // Fallback to empty string if the variant or color doesn't exist
  if (!buttonPreset[variant] || !buttonPreset[variant][color]) {
    return "";
  }

  return disabled
    ? disabledbuttonPreset[variant]
    : buttonPreset[variant][color];
};
