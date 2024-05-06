import { Controller, useFormContext } from 'react-hook-form';
import { SwitchButton } from '@components/core';
import { TC } from '@utils/typos';
import { PropsSwitchInput } from './types';

export const SwitchFormCntx: TC<PropsSwitchInput> = ({ currentId, className = 'flex-1', fieldError, ...res }) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={currentId}
      render={({ field: { value, onChange } }) => (
        <SwitchButton className={className} {...res} value={value} onChange={() => onChange(!value)} fieldError={fieldError || (errors[currentId]?.message as string)} />
      )}
    />
  );
};
