import { bridge } from "@webview-bridge/react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

export const appBridge = bridge({
  // A bridge scenario that existed in the past. Assume this method existed in a previous version.
  // async getBridgeVersion() {
  //   return 1;
  // },
  // async getOldVersionMessage() {
  //   return "I'm from native old version" as const;
  // },

  async getBridgeVersion() {
    return 2;
  },
  getMessage: async () => {
    return "I'm from native" as const;
  },
  openInAppBrowser: async (url: string) => {
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url);
    }
  },
});

export type AppBridge = typeof appBridge;
