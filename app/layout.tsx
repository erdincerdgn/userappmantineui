import "@mantine/core/styles.css";
import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";

export const metadata = {
  title: "Login - UserApp",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </MantineProvider>
        
      </body>
    </html>
  );
}
