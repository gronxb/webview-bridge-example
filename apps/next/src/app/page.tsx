import dynamic from "next/dynamic";

const BridgeHome = dynamic(() => import("../components/BridgeHome"), {
  ssr: false,
});

export default function Home() {
  return <BridgeHome />;
}
