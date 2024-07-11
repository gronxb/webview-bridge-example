"use client";
import { useState } from "react";

import {
  useBridgeEventListener,
  useBridgeStatus,
  useBridgeStore,
} from "@/providers/BridgeProvider";

function Count() {
  const count = useBridgeStore((state) => state.count);

  return <p>Native Count: {count}</p>;
}

function DataText() {
  const { text, setDataText } = useBridgeStore((state) => ({
    text: state.data.text,
    setDataText: state.setDataText,
  }));

  return (
    <div>
      <p>Native Data Text: {text}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setDataText(e.target.value)}
      />
    </div>
  );
}

export default function BridgeHome() {
  const { increase, openInAppBrowser } = useBridgeStore((state) => ({
    increase: state.increase,
    openInAppBrowser: state.openInAppBrowser,
  }));
  const status = useBridgeStatus();

  const [message, setMessage] = useState("");

  useBridgeEventListener("setWebMessage", (args) => {
    setMessage(args.text);
  });

  return (
    <div>
      {message}
      <div>
        {`isWebViewBridgeAvailable: ${String(status.isWebViewBridgeAvailable)}`}
      </div>
      <h2>This is WebView</h2>

      <button
        onClick={() => {
          if (status.isNativeMethodAvailable("openInAppBrowser")) {
            openInAppBrowser("https://github.com/gronxb/webview-bridge");
          }
        }}
      >
        open InAppBrowser
      </button>

      <Count />
      <button onClick={() => increase()}>Increase from web</button>

      <DataText />
    </div>
  );
}
