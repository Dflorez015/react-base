import { cva, VariantProps } from 'class-variance-authority';
import { table } from './table.module.css';

export const TheadVariants = cva('min-h-[40px]', {
  variants: {
    variant: {
      primary: table,
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface TheadVariants extends VariantProps<typeof TheadVariants> {}
