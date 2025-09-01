import React from "react";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 border rounded-sm hover:shadow-sm transition cursor-pointer w-full bg-white"
    >
      <div className="text-gray-700 text-3xl mb-2">{icon}</div>
      <p className="text-gray-700 text-sm font-medium">{title}</p>
    </div>
  );
};

export default FeatureCard;
