"use client";
import type { AppBridge } from "@webview-bridge/example-native";
import { createLinkBridgeProvider } from "@webview-bridge/react";

export const {
  BridgeProvider,
  useBridgeStatus,
  useBridgeLoose,
  useBridgeStore,
} = createLinkBridgeProvider<AppBridge>({
  throwOnError: true,
  onReady: () => {
    console.log("nativeMethod is ready");
  },
});
