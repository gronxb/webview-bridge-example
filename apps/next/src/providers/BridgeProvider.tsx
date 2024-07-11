"use client";
import type { AppBridge } from "@webview-bridge/example-native";
import { createLinkBridgeProvider } from "@webview-bridge/react";

export const {
  BridgeProvider,
  useBridgeStatus,
  useBridgeLoose,
  useBridgeStore,
  useBridgeEventListener,
} = createLinkBridgeProvider<AppBridge>({
  throwOnError: true,
  initialBridge: {
    count: 0,
    data: {
      text: "",
    },
    increase: async () => {
      alert("increase");
    },
    setDataText: async (text) => {
      alert(text);
    },
  },
  onReady: () => {
    console.log("nativeMethod is ready");
  },
});
