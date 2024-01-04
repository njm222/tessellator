import { useState } from "react";
import Typewriter from "typewriter-effect";

export function WelcomeUser() {
  const [rendered, setRendered] = useState(false);

  if (rendered) return null;

  return (
    <div className="text welcomeContainer">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .start()
            .typeString(`hello, `)
            .pauseFor(150)
            .typeString("welcome to tessellator.")
            .pauseFor(250)
            .deleteAll()
            .pauseFor(250)
            .typeString(
              "The visualizer will pick up audio from your selected source."
            )
            .pauseFor(500)
            .deleteAll()
            .pauseFor(250)
            .typeString(
              "You can press [0, 1, 2, 3, 4, 5] to change the visualizer mode,"
            )
            .pauseFor(750)
            .deleteAll()
            .pauseFor(150)
            .typeString("and [q, a, z, w] to change the color mode")
            .pauseFor(750)
            .deleteAll()
            .pauseFor(250)
            .typeString("Jump <strong>[scroll]</strong> into the portal below.")
            .pauseFor(1000)
            .deleteAll()
            .pauseFor(250)
            .callFunction(({ elements: { container } }) => {
              typewriter.stop();
              container.innerHTML = "";
              setRendered(true);
            });
        }}
        options={{ delay: 50 }}
      />
    </div>
  );
}
