import "./App.css";

import type { AppBridge } from "@rnbridge/example-native";
import { linkNativeMethod, registerWebMethod } from "@rnbridge/web";
import { useEffect, useState } from "react";

export const webBridge = registerWebMethod({
  alert: (message: string) => {
    window.alert(message);
  },
  sum: (a: number, b: number) => {
    return a + b;
  },
});

const nativeMethod = linkNativeMethod<AppBridge>({
  throwOnError: ["openInAppBrowser"],
});

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    nativeMethod.getMessage().then((message) => {
      setMessage(message);
    });
  }, []);

  return (
    <div>
      <h1>This is a web page.</h1>
      <h1>{message}</h1>
      <button
        onClick={() => {
          nativeMethod.openInAppBrowser("https://github.com/gronxb/rnbridge");
        }}
      >
        open InAppBrowser
      </button>
    </div>
  );
}

export default App;
