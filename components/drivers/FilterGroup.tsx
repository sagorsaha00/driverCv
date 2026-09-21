import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export default function FilterGroup({ title, children }: Props) {
  return (
    <div>
      <h3 className="mb-2.5 text-xs font-bold text-text">{title}</h3>

      {children}
    </div>
  );
}
