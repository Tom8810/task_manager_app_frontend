"use client";

import { LoginPage } from "@/app/_components/loginPage";
import { ApClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";

export default function Home() {
  return (
    <ApolloProvider client={ApClient}>
      <LoginPage />
    </ApolloProvider>
  );
}
