import { cva, VariantProps } from 'class-variance-authority';

export const ButtonVariants = cva('transition-colors', {
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary/95',
      blank: 'bg-trasparent border-none',
    },
    size: {
      xs: '!text-min rounded-lg px-1.5 py-2 !leading-none',
      md: '!text-med rounded-lg p-[10px] font-normal',
      xl: '!text-max w-full rounded-md p-[10px] py-4',
      ico: 'mx-auto w-fit rounded-full p-1',
    },
    display: {
      icon: 'inline-flex items-center justify-center gap-2',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface ButtonVariants extends VariantProps<typeof ButtonVariants> {}
