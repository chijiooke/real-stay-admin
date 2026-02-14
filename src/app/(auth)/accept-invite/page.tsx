import { Suspense } from "react";
import AcceptInviteContent from "./components/AcceptInviteContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AcceptInviteContent />
    </Suspense>
  );
}
