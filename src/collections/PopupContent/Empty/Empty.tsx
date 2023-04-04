import React, { RefObject, useState } from "react";

interface EmptyPopupProps {
  ref?: RefObject<HTMLDivElement>;
}

export const EmptyPopup: React.FC<EmptyPopupProps> = ({ ...props }) => {
  return null;
};
