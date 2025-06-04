import * as Icons from "lucide-react";

const Icon = ({ name, size, className = "" }) => {
  const LucideIcon = Icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon size={size} className={className} />;
};

export default Icon;
