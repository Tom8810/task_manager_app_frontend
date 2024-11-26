import { useRouter } from "next/navigation";
import { SecondarySmallButton } from "../../../components/buttons";

export const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-4xl">Task Manager</h1>
      <div className="w-32">
        <SecondarySmallButton onClick={() => router.push("/")}>
          ログアウト
        </SecondarySmallButton>
      </div>
    </div>
  );
};
