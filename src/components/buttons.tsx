"use client";

import type { ButtonHTMLAttributes } from "react";

// スタイルとタイプは固定のためPropsで受け取り拒否(ボタン幅はwidthを指定したdivで囲むことで調整)
type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "type"
>;

export const PrimaryLargeButton = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-blue-600 text-white font-bold px-12 py-2 h-12 w-full rounded-md hover:opacity-60 inline-flex items-center justify-center px-6 text-lg transition active:scale-95"
    />
  );
};

export const SecondaryLargeButton = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-transparent text-black font-bold border border-blue-600 px-12 py-2 h-12 w-full rounded-md hover:bg-gray-200 inline-flex items-center justify-center px-6 text-lg transition active:scale-95"
    />
  );
};

export const TertiaryLargeButton = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-pink-600 text-white font-bold px-12 py-2 h-12 w-full rounded-md hover:opacity-60 inline-flex items-center justify-center px-6 text-lg transition active:scale-95"
    />
  );
};

export const LargeButton = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-transparent text-black font-bold border border-blue-600 px-12 py-2 h-12 w-full rounded-md hover:bg-gray-200 inline-flex items-center justify-center px-6 text-lg transition active:scale-95"
    />
  );
};

export const PrimarySmallButton = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-blue-600 text-white px-6 py-1 h-8 w-full rounded-md hover:opacity-60 inline-flex items-center justify-center px-6 text-sm transition active:scale-95"
    />
  );
};

export const SecondarySmallButton = (props: Props) => {
  return (
    <button
      {...props}
      type="button"
      className="bg-transparent text-black border border-blue-600 px-6 py-1 h-8 w-full rounded-md hover:bg-gray-200 inline-flex items-center justify-center px-6 text-sm transition active:scale-95"
    />
  );
};

// アイコンボタンの隣にラベルを表示させる
export const PlusIconButton = (
  buttonProps: Props & {
    label: string;
  }
) => {
  const { label, ...props } = buttonProps;
  return (
    <div className="flex items-center gap-x-2">
      <button
        {...props}
        type="button"
        className="group flex h-10 w-10 select-none items-center justify-center rounded-lg bg-blue-600 hover:opacity-60  transition active:scale-95"
      >
        <span className="flex items-center group-active:[transform:translate3d(0,1px,0)]">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            aria-labelledby="icon-title"
          >
            <title id="icon-title">add button</title>
            <path
              d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      {label ? <p className="text-lg">{label}</p> : null}
    </div>
  );
};
