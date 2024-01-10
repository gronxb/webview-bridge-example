import "./App.css";
import "./bridge"; // execute registerWebMethod

import type { AppBridge } from "@webview-bridge/example-native";
import { linkNativeMethod } from "@webview-bridge/web";
import { useEffect, useState } from "react";

const nativeMethod = linkNativeMethod<AppBridge>({
  throwOnError: ["openInAppBrowser"],
});

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (nativeMethod.isNativeMethodAvailable("getMessage")) {
      nativeMethod.getMessage().then((message) => {
        setMessage(message);
      });
    }
  }, []);

  return (
    <div>
      <h1>This is a web page.</h1>
      <h1>{message}</h1>
      <button
        onClick={() => {
          nativeMethod.openInAppBrowser(
            "https://github.com/gronxb/webview-bridge",
          );
        }}
      >
        open InAppBrowser
      </button>
      <p>{`isWebViewBridgeAvailable: ${String(
        nativeMethod.isWebViewBridgeAvailable,
      )}`}</p>
    </div>
  );
}

export default App;
