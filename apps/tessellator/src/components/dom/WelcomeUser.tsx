import { useEffect, useState } from "react";
import { getMyInfo } from "../../spotifyClient";
import { usePortal } from "../../utils/portalContext";

export default function WelcomeUser() {
  const [name, setName] = useState<string>("");
  const { inPortal } = usePortal();

  useEffect(() => {
    (async () => {
      const u = await getMyInfo();
      setName(u?.display_name ?? "");
    })();
  }, [setName]);

  useEffect(() => {
    const parent = document.querySelector(
      ".welcomeContainer > .typewriterText"
    );
    if (!parent?.children) return;

    Array.from(parent.children).forEach((child: Element, i: number) => {
      (child as HTMLElement).style.setProperty("--n", i.toString());
    });
  }, []);

  return inPortal ? null : (
    <div className="welcomeContainer">
      <div className="typewriterText">
        <p>hello {name},</p>
        <p>welcome to tessellator... a spotify music visualizer</p>
        <p>jump [scroll] into the portal below &#x2B07; to see it in action</p>
      </div>
    </div>
  );
}
