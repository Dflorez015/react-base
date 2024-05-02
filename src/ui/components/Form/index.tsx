import { yupResolver } from '@hookform/resolvers/yup';
import { DeepPartial, DefaultValues, FieldErrors, FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface ISubmitModulesForm<T extends yup.AnyObject> {
  children: React.ReactNode;
  schema?: yup.ObjectSchema<DeepPartial<T>>;
  submit?: (data: yup.InferType<yup.ObjectSchema<T, yup.AnySchema>>) => void;
  onError?: (handler: FieldErrors<any>) => void;
  defaultValue?: DefaultValues<T>;
  values?: any;
  className?: string;
}

export function BasicFormProvider<T extends object>({ children, submit, onError, defaultValue, values, schema, className }: ISubmitModulesForm<T>) {
  // hooks
  const currentMethods = useForm({
    defaultValues: defaultValue ?? schema?.getDefault(),
    values: values,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    resolver: schema ? yupResolver(schema) : undefined,
  });

  return (
    <form onSubmit={submit ? currentMethods.handleSubmit(data => submit(data), onError) : undefined} className={className}>
      <FormProvider {...currentMethods}>{children}</FormProvider>
    </form>
  );
}
