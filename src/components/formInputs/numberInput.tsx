import { Controller, ControllerProps } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { ReactNode } from "react";

export interface NumberInputProps extends Omit<ControllerProps, "render"> {
  inputProps?: Omit<InputProps, "onChange">;
  rightContent?: ReactNode;
}

export function NumberInput({
  inputProps,
  rightContent,
  ...props
}: NumberInputProps) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="flex items-center gap-4">
            <Input
              {...field}
              {...inputProps}
              onChange={(e) => field.onChange(Number(e.target.value))}
            />
            {rightContent}
          </div>
          {error && <div className="text-red-800">{error.message}</div>}
        </div>
      )}
    />
  );
}
