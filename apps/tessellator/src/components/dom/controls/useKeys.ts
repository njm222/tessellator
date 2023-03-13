import { useEffect } from "react";

export const useKeys = (
  keyConfig: { keys: string[]; fn: () => void; up?: boolean }[]
) => {
  useEffect(() => {
    const keyMap: Record<
      string,
      { fn: (flag: boolean) => void; pressed: boolean; up: boolean }
    > = keyConfig.reduce((out, { keys, fn, up = true }) => {
      keys && keys.forEach((key) => (out[key] = { fn, pressed: false, up }));
      return out;
    }, {} as Record<string, { fn: (flag: boolean) => void; pressed: boolean; up: boolean }>);

    const downHandler = ({ key, target }: KeyboardEvent) => {
      if (!keyMap[key] || (target as HTMLElement).nodeName === "INPUT") return;
      const { fn, pressed, up } = keyMap[key];
      keyMap[key].pressed = true;
      if (up || !pressed) fn(true);
    };

    const upHandler = ({ key, target }: KeyboardEvent) => {
      if (!keyMap[key] || (target as HTMLElement).nodeName === "INPUT") return;
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
