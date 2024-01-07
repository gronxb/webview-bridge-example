import { registerWebMethod } from "@webview-bridge/web";

export const webBridge = registerWebMethod({
  alert: (message: string) => {
    window.alert(message);
  },
  sum: (a: number, b: number) => {
    return a + b;
  },
});

export type WebBridge = typeof webBridge;
