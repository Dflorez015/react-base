import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import Icons from '@assets/icons';
import { cn, TC } from '@utils/index';
import { RenderIf } from '../Conditionals';
import { CheckBoxProps, ErrorSpan, RadioProps, SearchInputProps, SwitchProps } from './types';

export const InputError: TC<ErrorSpan> = ({ message }) => {
  return (
    <RenderIf>
      <RenderIf.WhenTrue condition={Boolean(message)}>
        <motion.span className='font-secondary text-red-700' exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {message}
        </motion.span>
      </RenderIf.WhenTrue>
    </RenderIf>
  );
};

export const InputSearch: TC<SearchInputProps> = ({ isSearching = true, containerClass, className, icon: children, iconClass, onCancel, ...res }) => {
  return (
    <div className={cn('relative inline-flex items-center rounded-md px-[15px] py-1', containerClass)}>
      <Icons.Search className='mr-2' height={16} width={16} />

      <input type='search' {...res} className={cn('flex-1 bg-transparent placeholder:text-gray-400 focus:outline-none', className)} />

      <div className='inline-flex h-5 w-[57px] items-center justify-end gap-1'>
        <RenderIf>
          <RenderIf.WhenTrue condition={true}>
            <Icons.Equis className={cn('size-5 cursor-pointer', iconClass)} onClick={onCancel} />
          </RenderIf.WhenTrue>

          <RenderIf.WhenTrue condition={Boolean(isSearching)}>
            <div className='h-4 w-[1px] bg-slate-200' />
            <Icons.Loading className={cn('static size-6', iconClass)} />
          </RenderIf.WhenTrue>
        </RenderIf>
      </div>

      {children}
    </div>
  );
};

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ className, containerClass, fieldError, label, labelClass, disabled, ...resInput }, ref) => {
  return (
    <div className={cn('flex flex-col', containerClass)} data-id='input-wrapper'>
      <label className={cn('flex cursor-pointer items-center gap-[5px]')}>
        <input ref={ref} className={cn('form-checkbox', className)} {...resInput} type='checkbox' />

        <p className={cn('font-secondary', labelClass)}>{label}</p>
      </label>

      <InputError message={fieldError} />
    </div>
  );
});

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({ label, labelClass, containerClass, className, ...inputRes }, ref) => {
  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-[5px]', containerClass)}>
      <input ref={ref} type='radio' className={cn('form-radio', className)} {...inputRes} />

      <p className={cn('font-secondary', labelClass)}>{label}</p>
    </label>
  );
});

export const SwitchButton: TC<SwitchProps> = ({ className, fieldError, label, labelClass, value = false, disabled = false, onChange }) => {
  return (
    <div className={cn('flex flex-col', className)} data-id='input-wrapper'>
      <div className='flex items-center gap-[5px]'>
        <RenderIf>
          <RenderIf.WhenTrue condition={Boolean(label)}>
            <p className={cn('text-med text-input font-secondary', labelClass)}>{label}</p>
          </RenderIf.WhenTrue>
        </RenderIf>

        <div
          className={cn('form-switch', {
            'justify-end bg-primary': value,
            'border border-primary': !value,
            'pointer-events-none': disabled,
            'cursor-pointer': !disabled,
            'border border-slate-200 bg-slate-50': !value && disabled,
            'bg-slate-200': value && disabled,
          })}
          onClick={onChange}>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            className={cn('h-[16px] w-[16px] rounded-full', {
              'bg-white': value,
              'bg-primary': !value,
              'bg-zinc-500': !value && disabled,
            })}
          />
        </div>
      </div>

      <InputError message={fieldError} />
    </div>
  );
};
