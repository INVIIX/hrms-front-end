import React from "react";
import { WizardForm, Step } from "../ui/wizard";

type WizardWidgetProps = {
  steps: Step[];
  onFinish?: () => void;
};

export const WizardWidget: React.FC<WizardWidgetProps> = ({ steps, onFinish }) => {
  return <WizardForm steps={steps} onSubmit={onFinish} />;
};