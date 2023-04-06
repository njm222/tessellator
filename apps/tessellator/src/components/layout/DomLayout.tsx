import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "../../utils/authContext";
import { PortalProvider } from "../../utils/portalContext";
import { ControlsProvider } from "../dom/controls/controlsContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

const DomLayout = forwardRef(
  ({ children, ...props }: { children: ReactNode }, ref) => {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => localRef.current);

    const [queryClient] = useState(() => new QueryClient());

    return (
      <div className={"domContainer"} ref={localRef} {...props}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ControlsProvider>
              <MouseActivityProvider>
                <PortalProvider>{children}</PortalProvider>
              </MouseActivityProvider>
            </ControlsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </div>
    );
  }
);

DomLayout.displayName = "DomLayout";

export default DomLayout;
