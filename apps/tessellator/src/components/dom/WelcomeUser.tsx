import { useEffect } from "react";
import { useStore } from "@/utils/store";
import { getMyInfo } from "@/spotifyClient";

export default function WelcomeUser() {
  const [set, user] = useStore((state) => [state.set, state.user]);

  useEffect(() => {
    (async () => {
      set({ user: await getMyInfo() });
    })();
  }, [set]);

  useEffect(() => {
    const parent = document.querySelector(
      ".welcomeContainer > .typewriterText"
    );
    Array.from(parent.children).forEach((child: HTMLElement, i: number) => {
      child.style.setProperty("--n", i.toString());
    });
  }, []);

  return (
    <div className="welcomeContainer">
      <div className="typewriterText">
        <p>hello {user?.display_name},</p>
        <p>welcome to tessellator... a spotify music visualizer</p>
        <p>jump [scroll] into the portal below &#x2B07; to see it in action</p>
      </div>
    </div>
  );
}
