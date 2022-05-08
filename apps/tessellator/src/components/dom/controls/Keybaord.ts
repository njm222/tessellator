import { useEffect, memo } from "react";
import { useStore } from "@/utils/store";

const modeMap = [
  { key: "0", value: 0 },
  { key: "1", value: 1 },
  { key: "2", value: 2 },
];

const colourMap = [
  { key: "q", value: 0 },
  { key: "a", value: 1 },
];

const useKeys = (keyConfig) => {
  useEffect(() => {
    const keyMap = keyConfig.reduce((out, { keys, fn, up = true }) => {
      keys && keys.forEach((key) => (out[key] = { fn, pressed: false, up }));
      return out;
    }, {});

    const downHandler = ({ key, target }) => {
      if (!keyMap[key] || target.nodeName === "INPUT") return;
      const { fn, pressed, up } = keyMap[key];
      keyMap[key].pressed = true;
      if (up || !pressed) fn(true);
    };

    const upHandler = ({ key, target }) => {
      if (!keyMap[key] || target.nodeName === "INPUT") return;
      const { fn, up } = keyMap[key];
      keyMap[key].pressed = false;
      if (up) fn(false);
    };

    window.addEventListener("keydown", downHandler, { passive: true });
    window.addEventListener("keyup", upHandler, { passive: true });

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [keyConfig]);
};

const Keyboard = () => {
  const set = useStore((state) => state.set);

  useKeys([
    ...modeMap.map(({ key, value }) => ({
      keys: [key],
      fn: () => set({ modeKey: value }),
    })),
    ...colourMap.map(({ key, value }) => ({
      keys: [key],
      fn: () => set({ colourKey: value }),
    })),
  ]);

  return null;
};

export default memo(Keyboard);
