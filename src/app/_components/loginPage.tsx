"use client";

import { useUser } from "@/providers/userProvider";
import { PrimaryLargeButton, SecondaryLargeButton } from "@/components/buttons";
import { PrimaryInput } from "@/components/inputs";
import type {
  UserByNameQuery,
  UserByNameQueryVariables,
} from "@/generated/graphql";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { type ChangeEvent, useState } from "react";
import { SignUpModal } from "./signUpModal";
import { USER_BY_NAME } from "@/lib/queries";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [popupFlag, setPopupFlag] = useState<boolean>(false);
  const { setUser } = useUser();
  const router = useRouter();

  // ログインの実行クエリ
  const [fetchUserByName, { loading, error }] = useLazyQuery<
    UserByNameQuery,
    UserByNameQueryVariables
  >(USER_BY_NAME, {
    onCompleted: (data) => {
      if (data.userByName?.name) {
        // ログイン成功時、contextにuserを格納してユーザーのページへ遷移
        setUser(data.userByName);
        router.push(data.userByName?.name);
      }
    },
    onError: () => {
      window.alert("ユーザーが存在しません");
    },
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onClickLogin = () => {
    if (username === "") {
      window.alert("ユーザー名を入力してください");
      return;
    }
    // stateで管理しているusernameを引数にクエリを実行
    fetchUserByName({ variables: { name: username } });
  };

  return (
    <div className="py-8 px-16 flex flex-col items-center justify-center gap-y-12 w-[600px]">
      <h1 className="text-5xl">Task Manager</h1>
      <div className="flex flex-col gap-y-4 w-full">
        <PrimaryInput
          isError={error !== undefined}
          placeholder="Sato"
          label="お名前"
          onChange={onChangeInput}
        />
        <PrimaryLargeButton disabled={loading} onClick={onClickLogin}>
          ログイン
        </PrimaryLargeButton>
        <SecondaryLargeButton onClick={() => setPopupFlag(true)}>
          アカウントをお持ちでない方
        </SecondaryLargeButton>
        <SignUpModal viewFlag={popupFlag} setViewFlag={setPopupFlag} />
      </div>
    </div>
  );
};
