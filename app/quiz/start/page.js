import { Suspense } from "react";
import StartClient from "./StartClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading quiz...</div>}>
      <StartClient />
    </Suspense>
  );
}
