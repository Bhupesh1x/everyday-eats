import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

import RequiredLabel from "./RequiredLabel";

// Types of the props for the component.
type Props = {
  id?: string;
  value: string;
  label?: string;
  onChange: (value: string) => void;
};

function PasswordInput({
  id = "password",
  label = "Password",
  value,
  onChange,
}: Props) {
  // Created the state to track the password show be visible or not.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle the state of password visibility.
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <div>
      <label htmlFor="password" className="input-label">
        {label} <RequiredLabel />
      </label>
      <div className="relative">
        <input
          id={id}
          required
          // Toggling the type of the input based on the password visible state.
          type={isPasswordVisible ? "text" : "password"}
          className="input"
          value={value}
          // Passing the changed value to the onChange function passed from the parent component.
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
          onClick={togglePasswordVisibility}
        >
          {/* A ternary operator is used for showing different images based on the password visibility */}
          {isPasswordVisible ? (
            <span title="Hide password">
              <EyeOff
                className="text-gray-400 h-5 w-6"
                xlinkTitle="Hide password"
              />
            </span>
          ) : (
            <span title="Show password">
              <Eye
                className="text-gray-400 h-5 w-6"
                xlinkTitle="Show password"
              />
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
