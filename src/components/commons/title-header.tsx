import React from "react";

type SectionTitleWithDescProps = {
  title: string;
  desc: string;
  icon?: React.ReactNode; // Tambahkan prop icon opsional
  className?: string;
};

const SectionTitleWithDesc: React.FC<SectionTitleWithDescProps> = ({
  title,
  desc,
  icon,
  className = "",
}) => (
  <div className={className}>
    <span className="text-sm font-medium text-dark bg-gray-100 dark:text-gray-800 me-2 px-2.5 py-0.5 rounded-md flex items-center gap-2 w-fit capitalize">
      {icon && <span className="inline-flex">{icon}</span>}
      {title}
    </span>
    <div className="text-gray-400 font-thin text-sm mt-1 mx-1 first-letter:capitalize">
      {desc}
    </div>
  </div>
);

export default SectionTitleWithDesc;
