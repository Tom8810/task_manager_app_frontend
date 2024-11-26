import type React from "react";
import { memo, ReactNode, useEffect } from "react";

type Props = {
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

// react-modalが最新のreactと互換性がなく、https://tech-lab.sios.jp/archives/33280を参考に作成

export const Modal = memo((props: Props) => {
  const { viewFlag, setViewFlag, children } = props;
  useEffect(() => {
    // 背景画面固定用関数
    const registerBackgroundFixed = () => {
      const body = document.body;
      const scrollWidth = window.innerWidth - body.clientWidth;
      body.style.marginRight = `${scrollWidth}px`;
      body.style.overflowY = "hidden";
    };
    // 背景画面固定解除用関数
    const unRegisterBackgroundFixed = () => {
      const body = document.body;
      body.style.overflowY = "";
      body.style.marginRight = "";
    };
    if (viewFlag) registerBackgroundFixed();

    return () => {
      unRegisterBackgroundFixed();
    };
  }, [viewFlag]);

  // 枠外クリック用関数
  const onClickBackground = () => {
    setViewFlag(false);
  };

  // 枠内クリック
  const onClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        className={`fixed flex flex-col items-center justify-center overflow-hidden bg-black bg-opacity-40 transition-all ${
          viewFlag
            ? " top-0 left-0 h-screen w-screen z-10"
            : " top-1/2 left-1/2 h-0 w-0 "
        }`}
        onClick={onClickBackground}
      >
        <div
          className="flex w-[600px] p-10 bg-gray-100 flex-col"
          onClick={onClickCard}
        >
          {children}
        </div>
      </div>
    </>
  );
});

Modal.displayName = "Modal";
