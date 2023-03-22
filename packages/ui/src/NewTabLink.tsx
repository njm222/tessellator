import * as React from "react";

export const NewTabLink = ({
  children,
  href,
  ...other
}: {
  children: React.ReactNode;
  href: string;
}) => {
  return (
    <a href={href} rel="noreferrer" target="_blank" {...other}>
      {children}
    </a>
  );
};
