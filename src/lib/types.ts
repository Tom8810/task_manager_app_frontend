import { Project, User } from "@/generated/graphql";
import { Maybe } from "graphql/jsutils/Maybe";

export type DepthTwoUser = Maybe<
  Omit<User, "projects" | "createdAt" | "updatedAt" | "deletedAt"> & {
    projects?: DepthOneProject[] | null | undefined;
  }
>;

export type DepthOneProject = Omit<Project, "user">;
