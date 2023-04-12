import Typewriter from "typewriter-effect";

import { useGetUserInformation } from "../../utils/spotify";
import { usePlayer } from "../../utils/playerContext";

export default function WelcomeUser() {
  const { player } = usePlayer();

  const { isLoading, data, isError } = useGetUserInformation();

  if (isLoading || isError || !(player as any).context) return null;

  return (
    <div className="welcomeContainer">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .start()
            .typeString(`hello ${data?.display_name}, `)
            .pauseFor(500)
            .typeString("welcome to tessellator...")
            .pauseFor(1000)
            .deleteAll()
            .pauseFor(250)
            .typeString("click play on the player below to begin")
            .pauseFor(2500)
            .deleteAll()
            .pauseFor(250)
            .typeString("then jump [scroll] into the portal below")
            .pauseFor(3500)
            .deleteAll()
            .pauseFor(250)
            .callFunction(({ elements: { container } }) => {
              typewriter.stop();
              container.innerHTML = "";
            });
        }}
        options={{ delay: 50, deleteSpeed: 1 }}
      />
    </div>
  );
}
