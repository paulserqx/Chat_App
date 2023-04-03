import React, { RefObject, useState } from "react";

interface EmptyPopupProps {
  closePopup: () => () => void;
  ref?: RefObject<HTMLDivElement>;
}

export const EmptyPopup: React.FC<EmptyPopupProps> = ({
  closePopup,
  ...props
}) => {
  return null;
};
