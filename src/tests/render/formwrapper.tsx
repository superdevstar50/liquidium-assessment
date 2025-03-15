import { PropsWithChildren } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export function FormWrapper<T extends FieldValues>({
  children,
  onSubmit,
}: PropsWithChildren<{ onSubmit?: (data: T) => void }>) {
  const methods = useForm<T>();
  const submit: SubmitHandler<T> = (data) => {
    onSubmit?.(data);
  };

  return (
    <FormProvider {...methods}>
      {children}
      <button onClick={methods.handleSubmit(submit)}>Submit</button>
    </FormProvider>
  );
}
