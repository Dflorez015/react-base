import { cva, VariantProps } from 'class-variance-authority';

export const ButtonVariants = cva('', {
  variants: {
    variant: {
      primary: 'bg-primary hover:bg-primary/80 text-white border-transparent',
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
});

export interface ButtonVariants extends VariantProps<typeof ButtonVariants> {}
