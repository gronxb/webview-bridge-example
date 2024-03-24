import type { MetaFunction } from "@remix-run/node";
import BridgeHome from "../components/BridgeHome";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function clientLoader() {
  return null;
}

export default function Index() {
  return <BridgeHome />;
}
