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
    const init = async () => {
      const version = await nativeMethod.getBridgeVersion();
      if (version >= 2) {
        const message = await nativeMethod.getMessage();
        setMessage(message);
      } else {
        // Support for old native methods with `loose`
        const oldVersionMessage =
          await nativeMethod.loose.getOldVersionMessage();
        setMessage(oldVersionMessage);
      }
    };
    init();
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
