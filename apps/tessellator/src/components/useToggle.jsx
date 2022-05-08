import { useStore } from "@/utils/store";

// eslint-disable-next-line react/display-name
export const useToggle = (ToggledComponent, toggle) => (props) => {
  const keys = Array.isArray(toggle) ? toggle : [toggle];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const values = useStore((state) =>
    keys.map((key) =>
      key.charAt(0) === "!" ? !state[key.slice(1)] : state[key]
    )
  );
  return values.every((v) => !!v) ? (
    <ToggledComponent {...props} />
  ) : props.children ? (
    <>{props.children}</>
  ) : null;
};
