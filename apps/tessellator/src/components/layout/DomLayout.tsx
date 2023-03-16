import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  ReactNode,
} from "react";
import { AuthProvider } from "../../utils/authContext";
import { PortalProvider } from "../../utils/portalContext";
import { ControlsProvider } from "../dom/controls/controlsContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

const DomLayout = forwardRef(
  ({ children, ...props }: { children: ReactNode }, ref) => {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => localRef.current);

    return (
      <div className={"domContainer"} ref={localRef} {...props}>
        <AuthProvider>
          <ControlsProvider>
            <MouseActivityProvider>
              <PortalProvider>{children}</PortalProvider>
            </MouseActivityProvider>
          </ControlsProvider>
        </AuthProvider>
      </div>
    );
  }
);

DomLayout.displayName = "DomLayout";

export default DomLayout;
