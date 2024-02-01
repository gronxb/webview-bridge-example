import type { AppBridge } from "@webview-bridge/example-native";
import { linkBridge } from "@webview-bridge/web";
import { ref } from "vue";

export const isReady = ref(false);
console.log("isReady.value", isReady.value);
export const bridge = linkBridge<AppBridge>({
  throwOnError: true,
  onReady: () => {
    isReady.value = true;
    console.log("nativeMethod is ready");
  },
});

export const bridgeStore = bridge.store;
