import { registerWebMethod } from "@webview-bridge/web";

export const webBridge = registerWebMethod({
  async alert(message: string) {
    window.alert(message);
  },
  async sum(a: number, b: number) {
    return a + b;
  },
});

export type WebBridge = typeof webBridge;
