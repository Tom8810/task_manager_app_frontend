import type { InputHTMLAttributes } from "react";

// input上部にラベルを、下部にエラーメッセージを表示。エラー状態かどうかのisErrorも受け取る。
type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "className"> & {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
};

export const PrimaryInput = (inputProps: Props) => {
  const {
    label,
    isError = false,
    errorMessage,
    type = "text",
    ...props
  } = inputProps;
  return (
    <div className="w-full flex flex-col items-start">
      {label && <p className="pl-2">{label}</p>}
      <input
        type={type}
        className={`border rounded-md h-12 placeholder-gray-200 px-4 w-full focus:outline-none ${
          isError ? "border-pink-600" : "border-gray-200"
        }`}
        {...props}
      />
      {isError && (
        <p className="text-pink-600">{errorMessage ?? "invalid value"}</p>
      )}
    </div>
  );
};
