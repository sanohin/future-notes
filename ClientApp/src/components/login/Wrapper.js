import React from "react";
import { Pane } from "evergreen-ui";

export const Wrapper = ({ children }) => {
  return (
    <Pane display="flex" alignItems="center" justifyContent="center">
      <Pane
        border="default"
        background="orangeTint"
        padding={14}
        margin={24}
        width="400px"
        borderRadius={4}
      >
        {children}
      </Pane>
    </Pane>
  );
};
