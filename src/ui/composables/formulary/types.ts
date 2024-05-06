import { CheckBoxProps, InputProps, RadioProps, SelectProps, SwitchProps } from '@components/core/index';

export type PropsFormInput = InputProps & { currentId: string };
export type PropsFormPasswordInput = InputProps & { currentId: string; hasToolTip?: boolean };
export type PropsFormSelect<T extends Object> = SelectProps<T> & { currentId: string };
export type PropsFormSelectByAnotherField<T extends Object> = Omit<PropsFormSelect<T>, 'selectOptions'> & {
  targetValue: string;
  fetchOptions: (data?: any) => Promise<Record<string, any>[]>;
};
export type PropsSwitchInput = SwitchProps & { currentId: string };
export type PropsRadioInput = RadioProps & { currentId: string };
export type PropsCheckBoxInput = CheckBoxProps & { currentId: string };
