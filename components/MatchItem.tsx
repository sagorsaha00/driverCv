import {
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Star,
  UserCheck,
} from "lucide-react";

interface MatchItemProps {
  label: string;
  bg: string;
  icon: "green" | "blue" | "orange" | "purple" | "yellow" | "slate";
}

export default function MatchItem({ label, bg, icon }: MatchItemProps) {
  const iconColor = {
    green: "text-emerald-600",
    blue: "text-blue-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
    yellow: "text-amber-600",
    slate: "text-slate-600",
  };

  const Icon = {
    green: ShieldCheck,
    blue: UserCheck,
    orange: Star,
    purple: MapPin,
    yellow: CheckCircle2,
    slate: ShieldCheck,
  }[icon];

  return (
    <div
      className={`
        flex
        min-h-[54px]
        items-center
        gap-2
        cursor-pointer
        px-3
        py-2.5
       rounded-bl-2xl
              rounded-tr-2xl
        ${bg}
      `}
    >
      <Icon className={`h-3.5 w-3.5 shrink-0 ${iconColor[icon]}`} />

      <span className="text-[8.5px] font-semibold text-slate-700 sm:text-[9px]">
        {label}
      </span>
    </div>
  );
}
