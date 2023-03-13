import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
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

  if (!name || inPortal) return null;

  return (
    <div className="welcomeContainer">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .start()
            .typeString(`hello ${name}, `)
            .pauseFor(1000)
            .typeString("welcome to tessellator...")
            .pauseFor(1000)
            .deleteAll()
            .typeString("click play on the player below to begin")
            .pauseFor(2500)
            .deleteAll()
            .typeString("then jump [scroll] into the portal below")
            .pauseFor(3500)
            .deleteAll();
        }}
        options={{ delay: 50, deleteSpeed: 1 }}
      />
    </div>
  );
}
