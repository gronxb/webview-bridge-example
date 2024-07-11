/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { type BridgeWebView, useBridge } from "@webview-bridge/react-native";
import React from "react";
import { Button, SafeAreaView, Text, TextInput, View } from "react-native";

import { appBridge, postMessage, WebView } from "./src/bridge";

function Count() {
  // render when count changed
  const count = useBridge(appBridge, (state) => state.count);

  return <Text>Native Count: {count}</Text>;
}

function Input() {
  const { data, setDataText } = useBridge(appBridge);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Native Data Text: {data.text}
      </Text>
      <TextInput
        value={data.text}
        onChangeText={setDataText}
        style={{ borderWidth: 1, minWidth: "50%", maxWidth: "50%" }}
      />
    </View>
  );
}

function App(): JSX.Element {
  const webviewRef = React.useRef<BridgeWebView>(null);

  const increase = useBridge(appBridge, (state) => state.increase);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <WebView
        ref={webviewRef}
        source={{
          uri: "http://localhost:3000",
        }}
        style={{ height: "50%", width: "100%" }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "50%",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 10 }}>
          This is Native
        </Text>

        <Count />
        <Button onPress={() => increase()} title="Increase From Native" />

        <Input />
      </View>

      <Button
        onPress={() =>
          postMessage("setWebMessage", {
            text: Math.random().toString(),
          })
        }
        title="setWebMessage"
      />
    </SafeAreaView>
  );
}

export default App;
