import type { Meta, StoryFn } from "@storybook/react";
import { StoryStage } from "../../../../.storybook/StoryStage";
import { WaveMaterial, WaveMaterialUniforms } from "./WaveMaterial";
import { Vector3, MathUtils, Color } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useAspect } from "@react-three/drei";

const meta = {
  title: "Shaders/WaveMaterial",
  // @ts-expect-error args != uniforms
  component: WaveMaterial,
  argTypes: {
    uTime: { control: { type: "number", step: 0.01 } },
    uStrengthFactor: { control: { type: "number", step: 0.1 } },
    uNoise: { control: { type: "number", step: 0.1 } },
    uResolution: { control: { type: "number", step: 0.5 } },
    uColorStart: { control: { type: "color" } },
  },
  tags: ["autodocs"],
  decorators: [
    (StoryFn: StoryFn, context) => (
      <StoryStage cameraPosition={new Vector3(0, 0, 30)}>
        {StoryFn({}, context)}
      </StoryStage>
    ),
  ],
} satisfies Meta;

export default meta;

export const Example = {
  args: {
    uTime: 0.2,
    uStrengthFactor: 1,
    uNoise: 0.5,
    uResolution: 1,
    uColorStart: "#FFFFFF",
  },
  render: function Render(args: WaveMaterialUniforms) {
    return <WaveMaterialRefScene {...args} />;
  },
};

function WaveMaterialRefScene(args: WaveMaterialUniforms) {
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const colorRef = useRef(new Color());
  const materialRef = useRef(new WaveMaterial());

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    const {
      uTime,
      uColorStart,
      uStrengthFactor,
      uOpacity,
      uNoise,
      uResolution,
    } = materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = 1;

    const dynamicDelta = delta;

    uStrengthFactor.value = MathUtils.lerp(
      uStrengthFactor.value,
      Math.max(args.uStrengthFactor, 0.1),
      dynamicDelta
    );

    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + args.uTime,
      dynamicDelta
    );

    uNoise.value = MathUtils.lerp(uNoise.value, args.uNoise, dynamicDelta);

    uResolution.value = MathUtils.lerp(
      uResolution.value,
      args.uResolution,
      dynamicDelta
    );

    // Update the material color
    uColorStart.value.lerp(
      colorRef.current.set(args.uColorStart),
      dynamicDelta
    );
  });

  return (
    <mesh
      position={[0, 0, -3]}
      raycast={() => {}}
      scale={[vpWidth, vpHeight, 1]}
    >
      <planeGeometry />
      <waveMaterial ref={materialRef} />
    </mesh>
  );
}
