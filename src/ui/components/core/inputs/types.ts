import { Only } from '@utils/typos';

type BasicInputs = {
  label?: string;
  labelClass?: React.HTMLProps<HTMLElement>['className'];
  containerClass?: React.HTMLProps<HTMLElement>['className'];
  fieldError?: string | undefined;
  isActive?: boolean;
  icon?: React.ReactNode;
  toolTipChildren?: React.ReactNode;
  inputSize?: 'sm' | 'xs';
};

type ReactInput = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputProps = ReactInput &
  BasicInputs & {
    type?: Omit<React.HTMLInputTypeAttribute, 'search' | 'button' | 'checkbox' | 'file' | 'radio' | 'reset' | 'submit' | 'color'>;
  };

export type SearchInputProps = ReactInput &
  Omit<BasicInputs, 'type'> & {
    iconClass?: React.HTMLProps<HTMLElement>['className'];
    isSearching?: boolean;
    onCancel: () => void;
  };

export type SelectProps<T extends Object> = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> &
  BasicInputs & {
    selectOptions: T[];
    optionsEntries: [Only<T, string>, Only<T, string>];
  };

export type SwitchProps = BasicInputs & {
  className?: React.HTMLProps<HTMLElement>['className'];
  value?: boolean;
  onChange?: () => void;
  disabled?: boolean;
};

export type CheckBoxProps = Omit<BasicInputs, 'type'> & ReactInput;

export type RadioProps = Omit<BasicInputs, 'type'> & ReactInput;

export type ErrorSpan = { message?: string };
