import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";

const DomLayout = forwardRef(
  ({ children, ...props }: { children: ReactNode }, ref) => {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => localRef.current);

    return (
      <div className={"domContainer"} ref={localRef} {...props}>
        {children}
      </div>
    );
  }
);

DomLayout.displayName = "DomLayout";

export default DomLayout;
