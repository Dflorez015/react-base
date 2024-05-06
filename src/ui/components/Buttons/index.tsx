import { forwardRef } from 'react';
import Icons from '@assets/icons';
import { RenderIf } from '@components/core';
import { cn } from '@utils/functions';
import { ButtonVariants } from './variants';

export const Button = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariants & { isLoading?: boolean }>(
  ({ className, type = 'button', variant, display, isLoading = false, size, children, ...props }, ref) => {
    return (
      <button type={type} className={cn(ButtonVariants({ variant, size, display }), className)} ref={ref} {...props}>
        <RenderIf>
          <RenderIf.WhenTrue condition={isLoading}>
            <div className='relative m-auto h-[24px] w-[24px]'>
              <Icons.Loading className='right-0 top-0 h-[24px] w-[24px]' />
            </div>
          </RenderIf.WhenTrue>
          <RenderIf.WhenFalse condition={isLoading}>{children}</RenderIf.WhenFalse>
        </RenderIf>
      </button>
    );
  },
);
