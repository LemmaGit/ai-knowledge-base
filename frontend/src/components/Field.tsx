import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { capitalize } from "../utils/helpers.js";

type FormFieldProps = {
  label: string;
  errors: FieldErrors<any>;
  register: UseFormRegister<any>;
  registerName: string;
  inputType: string;
};

const FormField = ({
  label,
  errors,
  register,
  registerName,
  inputType = "text",
}: FormFieldProps) => {
  return (
    <div className="form-control space-y-1">
      <label className="label">
        <span className="label-text font-semibold">{capitalize(label)}</span>
      </label>
      <input
        type={inputType}
        placeholder={`Enter your ${label.toLowerCase()}`}
        className={`input input-bordered input-md ${
          errors[registerName] ? "input-error" : "focus:input-primary"
        }`}
        {...register(registerName)}
      />
      {errors[registerName] && (
        <label className="label">
          <span className="label-text-alt text-error font-medium">
            {errors[registerName]?.message as string}
          </span>
        </label>
      )}
    </div>
  );
};

export default FormField;
