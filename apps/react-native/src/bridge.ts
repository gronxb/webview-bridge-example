import {
  bridge,
  createWebView,
  postMessageSchema,
} from "@webview-bridge/react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { z } from "zod";

type AppBridgeState = {
  getMessage(): Promise<string>;
  openInAppBrowser(url: string): Promise<void>;
  count: number;
  increase(): Promise<void>;
  data: {
    text: string;
  };
  setDataText(text: string): Promise<void>;
};

export const appBridge = bridge<AppBridgeState>(({ get, set }) => ({
  async getMessage() {
    return "I'm from native" as const;
  },
  async openInAppBrowser(url: string) {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    }
  },

  data: {
    text: "",
  },
  count: 0,
  async increase() {
    set({
      count: get().count + 1,
    });
  },
  async setDataText(text) {
    set({
      data: {
        text,
      },
    });
  },
}));

const appPostMessageSchema = postMessageSchema({
  setWebMessage: z.object({
    text: z.string(),
  }),
});

// It is exported via the package.json type field.
export type AppBridge = typeof appBridge;
export type AppPostMessageSchema = typeof appPostMessageSchema;

export const { WebView, postMessage } = createWebView({
  bridge: appBridge,
  postMessageSchema: appPostMessageSchema,
  debug: true,
  fallback: (method) => {
    console.warn(`Method '${method}' not found in native`);
  },
});
