import type { Meta, StoryFn } from "@storybook/react";
import { StoryStage } from "../../../../.storybook/StoryStage";
import { FractalMaterial, FractalMaterialUniforms } from "./FractalMaterial";
import { Vector3, MathUtils, Color } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useAspect } from "@react-three/drei";

const meta = {
  title: "Shaders/FractalMaterial",
  // @ts-expect-error args != uniforms
  component: FractalMaterial,
  argTypes: {
    uTime: { control: { type: "number", step: 0.1 } },
    uIterations: { control: { type: "number" } },
    uEnergy: { control: { type: "number", step: 0.1 } },
    uGlow: { control: { type: "number", step: 0.2 } },
    uFactor: { control: { type: "number", step: 0.1 } },
    uHigh: { control: { type: "number" } },
    uColor: { control: { type: "color" } },
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
    uColor: "#FFFFFF",
    uTime: 0.5,
    uIterations: 2,
    uEnergy: 0.5,
    uGlow: 1,
    uFactor: 1.5,
    uHigh: 5,
  },
  render: function Render(args: FractalMaterialUniforms) {
    return <FractalMaterialRefScene {...args} />;
  },
};

function FractalMaterialRefScene(args: FractalMaterialUniforms) {
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const colorRef = useRef(new Color());
  const materialRef = useRef(new FractalMaterial());

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const {
      uTime,
      uOpacity,
      uIterations,
      uFactor,
      uColor,
      uHigh,
      uGlow,
      uEnergy,
    } = materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = 1;

    const dynamicDelta = delta;

    // Update the material color
    uColor.value.lerp(colorRef.current.set(args.uColor), dynamicDelta);

    uEnergy.value = MathUtils.lerp(uEnergy.value, args.uEnergy, dynamicDelta);

    uGlow.value = MathUtils.lerp(uGlow.value, args.uGlow, dynamicDelta);

    uHigh.value = MathUtils.lerp(uHigh.value, args.uHigh, dynamicDelta);

    const time = args.uTime;
    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + (isNaN(time) || !isFinite(time) ? 0 : time),
      dynamicDelta
    );

    uFactor.value = MathUtils.lerp(uFactor.value, args.uFactor, dynamicDelta);

    const iterations = args.uIterations;
    uIterations.value =
      Math.floor(
        MathUtils.lerp(
          uIterations.value,
          isNaN(iterations) ? 0 : iterations,
          dynamicDelta
        )
      ) + 1;
  });

  return (
    <mesh
      position={[0, 0, -3]}
      raycast={() => {}}
      scale={[vpWidth, vpHeight, 1]}
    >
      <planeGeometry />
      <fractalMaterial ref={materialRef} />
    </mesh>
  );
}
