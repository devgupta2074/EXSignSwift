import React, { ReactNode } from "react";

const H4 = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="focus-visible:ring-ring ring-offset-background rounded-md font-medium leading-5 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 text-foreground dark:text-muted-foreground">
      {children}
    </h4>
  );
};

export default H4;
