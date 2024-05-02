import { cva, VariantProps } from 'class-variance-authority';

export const ButtonVariants = cva('', {
  variants: {
    variant: {},
    size: {},
    display: {
      icon: 'inline-flex items-center justify-center gap-2',
    },
  },
});

export interface ButtonVariants extends VariantProps<typeof ButtonVariants> {}
