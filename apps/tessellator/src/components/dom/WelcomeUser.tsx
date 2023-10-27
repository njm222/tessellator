import { useState } from "react";
import Typewriter from "typewriter-effect";

import { usePlayer } from "../../utils/playerContext";
import { useGetUserInformation } from "../../utils/spotify";

export function WelcomeUser() {
  const { player } = usePlayer();
  const { isLoading, data, isError } = useGetUserInformation();
  const [rendered, setRendered] = useState(false);

  if (rendered || isLoading || isError || !(player as any).context) return null;

  return (
    <div className="text welcomeContainer">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .start()
            .typeString(`hello <strong>${data?.display_name}</strong>, `)
            .pauseFor(500)
            .typeString("welcome to tessellator...")
            .pauseFor(1000)
            .deleteAll()
            .pauseFor(250)
            .typeString(
              "click <strong>play</strong> on the player below to begin"
            )
            .pauseFor(2500)
            .deleteAll()
            .pauseFor(250)
            .typeString(
              "then jump <strong>[scroll]</strong> into the portal below"
            )
            .pauseFor(3500)
            .deleteAll()
            .pauseFor(250)
            .callFunction(({ elements: { container } }) => {
              typewriter.stop();
              container.innerHTML = "";
              setRendered(true);
            });
        }}
        options={{ delay: 50, deleteSpeed: 1 }}
      />
    </div>
  );
}
