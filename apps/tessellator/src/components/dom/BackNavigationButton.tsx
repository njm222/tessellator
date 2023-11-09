import React from "react";
import { BackIcon, IconButton } from "@tessellator/ui";
import { useRouter } from "next/navigation";

import { useMouseActivity } from "./controls/mouseActivityContext";

export default function BackNavigationButton() {
  const router = useRouter();
  const { mouseActive } = useMouseActivity();

  return (
    <div className={`backNavigationButton ${mouseActive ? "" : "hidden"}`}>
      <IconButton
        icon={<BackIcon />}
        onClick={() => router.back()}
        title="back"
      />
    </div>
  );
}
