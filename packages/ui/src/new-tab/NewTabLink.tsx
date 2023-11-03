import { AnchorHTMLAttributes } from "react";

export const NewTabLink = ({
  children,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a href={href} rel="noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
};
