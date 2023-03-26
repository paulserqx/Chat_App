import React, { RefObject, useEffect, useState } from "react";

interface DashboardProps {
  ref?: RefObject<HTMLDivElement>;
}

export const Dashboard: React.FC<DashboardProps> = ({ ...props }) => {
  return (
    <section
      className="w-full h-full bg-white pt-[76px] overflow-hidden"
      {...props}
    >
      <div>Join A Room</div>
    </section>
  );
};
