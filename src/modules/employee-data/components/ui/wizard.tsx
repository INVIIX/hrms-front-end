import { useState } from "react";

export type Step = {
  title: string;
  content: React.ReactNode;
};

type WizardFormProps = {
  steps: Step[];
  onSubmit?: () => void;
};
// import { useState } from "react";

// interface Step {
//   title: string;
//   content: React.ReactNode;
// }

// interface WizardFormProps {
//   steps: Step[];
//   onSubmit?: () => void;
// }

export const WizardForm: React.FC<WizardFormProps> = ({ steps, onSubmit }) => {
  const [wizardStep, setWizardStep] = useState(1);
  const totalSteps = steps.length;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === wizardStep;
          const isCompleted = stepNumber < wizardStep;

          return (
            <div
              key={stepNumber}
              className={`flex-1 text-center text-sm py-2 border-b-4 ${
                isActive
                  ? "border-gray-500 text-gray-500 dark:border-blue-500 dark:text-blue-500 font-bold"
                  : isCompleted
                  ? "border-green-500 text-green-500"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              {step.title}
            </div>
          );
        })}
      </div>

      <div className="min-h-[150px] mb-6">{steps[wizardStep - 1].content}</div>

      <div className="flex justify-end gap-2">
        {wizardStep > 1 ? (
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-500 text-sm px-4 py-2 w-32 rounded-md"
            onClick={() => setWizardStep(wizardStep - 1)}
          >
            Previous
          </button>
        ) : (
          <div />
        )}

        {wizardStep < totalSteps ? (
          <button
            type="button"
            className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
            onClick={() => setWizardStep(wizardStep + 1)}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            form={
              wizardStep === 1
                ? "ownForm"
                : wizardStep === 2
                ? "workForm"
                : wizardStep === 3
                ? "salariForm"
                : "educationForm"
            }
            className="bg-gray-800 hover:bg-gray-600 text-white text-sm px-4 py-2 w-32 rounded-md"
          >
            Add User
          </button>
        )}
      </div>
    </div>
  );
};
// export default function WizardForm({ steps, onSubmit }: WizardFormProps) {
//   const [wizardStep, setWizardStep] = useState(1);
//   const totalSteps = steps.length;

//   return (
//     <div className="w-full max-w-3xl mx-auto">
//       <div className="flex justify-between mb-6">
//         {steps.map((step, index) => {
//           const stepNumber = index + 1;
//           const isActive = stepNumber === wizardStep;
//           const isCompleted = stepNumber < wizardStep;

//           return (
//             <div
//               key={stepNumber}
//               className={`flex-1 text-center text-sm py-2 border-b-4 ${
//                 isActive
//                   ? "border-gray-500 text-gray-500 font-bold"
//                   : isCompleted
//                   ? "border-green-500 text-green-500"
//                   : "border-gray-300 text-gray-500"
//               }`}
//             >
//               {step.title}
//             </div>
//           );
//         })}
//       </div>

//       <div className="min-h-[150px] mb-6">{steps[wizardStep - 1].content}</div>

//       <div className="flex justify-end gap-2">
//         {wizardStep > 1 ? (
//           <button
//             className="bg-gray-200 text-sm px-4 py-2 w-32 rounded-md"
//             onClick={() => setWizardStep(wizardStep - 1)}
//           >
//             Previous
//           </button>
//         ) : (
//           <div />
//         )}

//         {wizardStep < totalSteps ? (
//           <button
//             className="bg-black text-white text-sm px-4 py-2 w-32 rounded-md"
//             onClick={() => setWizardStep(wizardStep + 1)}
//           >
//             Next
//           </button>
//         ) : (
//           <button
//             className="bg-black text-white text-sm px-4 py-2 w-32 rounded-md"
//             onClick={onSubmit}
//           >
//             Add User
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
