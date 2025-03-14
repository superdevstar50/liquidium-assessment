import { Controller, ControllerProps } from "react-hook-form";
import { Input } from "../ui/input";

export interface NumberInputProps extends Omit<ControllerProps, "render"> {
  inputProps?: Omit<React.ComponentProps<"input">, "onChange">;
}

export function NumberInput({ inputProps, ...props }: NumberInputProps) {
  return (
    <Controller
      {...props}
      render={({ field, fieldState: { error } }) => (
        <div>
          <Input
            {...field}
            {...inputProps}
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
          {error && <div className="text-red-800">{error.message}</div>}
        </div>
      )}
    />
  );
}
