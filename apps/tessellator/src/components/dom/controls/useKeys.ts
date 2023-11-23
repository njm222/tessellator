import { useEffect } from "react";

export const useKeys = (keyConfig: { keys: string[]; fn: () => void }[]) => {
  useEffect(() => {
    const keyMap: Record<string, { fn: () => void }> = keyConfig.reduce(
      (out, { keys, fn }) => {
        keys && keys.forEach((key) => (out[key] = { fn }));
        return out;
      },
      {} as Record<string, { fn: () => void }>
    );

    const downHandler = ({ key, target }: KeyboardEvent) => {
      if (!keyMap[key] || (target as HTMLElement).nodeName === "INPUT") return;
      const { fn } = keyMap[key];
      fn();
    };

    window.addEventListener("keydown", downHandler, { passive: true });

    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, [keyConfig]);
};
