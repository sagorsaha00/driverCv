interface IconBoxProps {
  children: React.ReactNode;
  color: string;
}

export default function IconBox({ children, color }: IconBoxProps) {
  return (
    <div
      className={`
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        ${color}
      `}
    >
      {children}
    </div>
  );
}
