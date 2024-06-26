import { ReactNode } from "react";
import posthogClient from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Contexts
import { AuthenticationProvider } from "../context/AuthenticaionProvider";
import { FlowsProvider } from "./FlowsProvider";
import { MarketplaceProvider } from "../context/MarketplaceProvider";
import { SettingsProvider } from "../context/SettingsProvider";
import { DeeplinkProvider } from "../context/DeeplinkProvider";
import { SoftwareUpdateProvider } from "./SoftwareUpdateProvider";

const VITE_PUBLIC_POSTHOG_KEY = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const VITE_PUBLIC_POSTHOG_HOST = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (import.meta.env.mode === "production") {
  console.log("Initializing PostHog in production");
  posthogClient.init(VITE_PUBLIC_POSTHOG_KEY, {
    api_host: VITE_PUBLIC_POSTHOG_HOST,
  });
}

const Context = ({ children }: { children: ReactNode }) => {
  return (
    <DeeplinkProvider>
      <SoftwareUpdateProvider>
        <SettingsProvider>
          <AuthenticationProvider>
            <MarketplaceProvider>
              <PostHogProvider client={posthogClient}>
                <FlowsProvider>
                  {children}
                </FlowsProvider>
              </PostHogProvider>
            </MarketplaceProvider>
          </AuthenticationProvider>
        </SettingsProvider>
      </SoftwareUpdateProvider>
    </DeeplinkProvider>
  );
};

export default Context;
