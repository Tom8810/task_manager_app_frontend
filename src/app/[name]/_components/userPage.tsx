"use client";
import { Header } from "@/app/[name]/_components/header";
import { TaskList } from "@/app/[name]/_components/taskList";
import { TaskDashBoard } from "@/app/[name]/_components/taskDashboard";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { UserByNameQuery, UserByNameQueryVariables } from "@/generated/graphql";
import { useUser } from "@/providers/userProvider";
import { PrimaryLargeButton } from "../../../components/buttons";
import { USER_BY_NAME } from "@/lib/queries";

export function UserPage() {
  const { user, setUser } = useUser();
  const [selectedProjectId, setSelectedProjectId] = useState<number>(-1);
  const params = useParams();
  const name = params.name as string;
  const router = useRouter();

  //パスからユーザー名を取得し、それを引数にクエリを実行してユーザー情報を取得
  const { error } = useQuery<UserByNameQuery, UserByNameQueryVariables>(
    USER_BY_NAME,
    {
      variables: { name },
      // nameがない場合とuserが存在する場合(ログインページからの流入の場合)はクエリをスキップ
      skip: !name || !!user,
      // 成功時には取得したデータをcontextに格納
      onCompleted: (data) => {
        if (data?.userByName) {
          setUser(data.userByName);
        }
      },
    }
  );

  // 失敗時(パスが不正な場合)にはエラー画面とホームへのボタンを出す
  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center gap-y-12">
        <p className="text-2xl ">
          Error loading user data. Maybe user does not exist.
        </p>
        <div className="w-72">
          <PrimaryLargeButton onClick={() => router.push("/")}>
            トップに戻る
          </PrimaryLargeButton>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-y-8 h-screen w-screen">
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-around gap-y-8 md:gap-x-8">
        <TaskList
          setSeletectedId={setSelectedProjectId}
          projects={user?.projects}
        />
        <TaskDashBoard selectedId={selectedProjectId} />
      </div>
    </div>
  );
}
