import React, { useEffect } from "react";

interface Logger {
  log: (msg: string) => void;
}

export const withLogger = <P extends object>(
  LoggedComponent: React.ComponentType<P>,
  logger: Logger,
  componentId: string
) => {
  return (props: P) => {
    useEffect(() => {
      logger.log(`MOUNTED: ${componentId}`);
      return () => logger.log(`DISMOUNTED: ${componentId}`);
    }, []);

    useEffect(() => logger.log(`RENDER: ${componentId}`));

    return <LoggedComponent {...props} />;
  };
};
