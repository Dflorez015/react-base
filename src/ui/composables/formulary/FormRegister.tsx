import { useFormContext } from 'react-hook-form';
import { CheckBox, Radio } from '@components/core/inputs';
import { TC } from '@utils/typos';
import { PropsCheckBoxInput, PropsRadioInput } from './types';

export const RadioFormCntx: TC<PropsRadioInput> = ({ currentId, ...res }) => {
  const { register } = useFormContext();
  return <Radio {...res} {...register(currentId)} />;
};

export const CheckBoxFormCntx: TC<PropsCheckBoxInput> = ({ currentId, ...res }) => {
  const { register } = useFormContext();
  return <CheckBox {...res} id={currentId} {...register(currentId)} />;
};
