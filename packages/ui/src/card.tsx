import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 rounded-xl bg-white"
    >
      <h1 className="text-xl  pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}