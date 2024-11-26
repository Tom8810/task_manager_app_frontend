"use client";

import { ApClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { UserPage } from "./_components/userPage";

export default function Home() {
  return (
    <ApolloProvider client={ApClient}>
      <UserPage />
    </ApolloProvider>
  );
}
