import { PrimaryInput } from "../../components/inputs";
import {
  PrimaryLargeButton,
  SecondaryLargeButton,
} from "../../components/buttons";
import { ChangeEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import {
  CreateUserMutation,
  CreateUserMutationVariables,
} from "@/generated/graphql";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/userProvider";
import { CREATE_USER } from "@/lib/queries";
import { Modal } from "@/components/modal";

type Props = {
  viewFlag: boolean;
  setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SignUpModal = (props: Props) => {
  const { viewFlag, setViewFlag } = props;
  const [username, setUsername] = useState("");
  const { setUser } = useUser();
  const router = useRouter();

  const [signUpUser, { loading, error }] = useMutation<
    CreateUserMutation,
    CreateUserMutationVariables
  >(CREATE_USER, {
    onCompleted(data) {
      console.log(data);
      if (data.createUser?.name) {
        setUser(data.createUser);
        router.push(data.createUser?.name);
      }
    },
    onError: (error) => {
      console.error("Mutation error details:", {
        graphQLErrors: error.graphQLErrors,
        networkError: error.networkError,
        message: error.message,
        extraInfo: error.extraInfo,
      });
    },
  });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onClickSignUp = () => {
    if (username !== "")
      signUpUser({
        variables: {
          input: {
            name: username,
          },
        },
      });
  };

  return (
    <Modal viewFlag={viewFlag} setViewFlag={setViewFlag}>
      <div className="flex flex-col justify-evenly items-center gap-y-8">
        <h1 className="text-3xl">アカウント登録</h1>
        <PrimaryInput
          label="ユーザー名"
          placeholder="sato"
          onChange={onChangeInput}
          isError={error !== undefined}
          errorMessage="使用できないユーザー名です"
        />
        <div className="flex items-center justify-between gap-x-8 w-full px-8">
          <PrimaryLargeButton disabled={loading} onClick={onClickSignUp}>
            登録
          </PrimaryLargeButton>
          <SecondaryLargeButton
            disabled={loading}
            onClick={() => setViewFlag(false)}
          >
            戻る
          </SecondaryLargeButton>
        </div>
      </div>
    </Modal>
  );
};
