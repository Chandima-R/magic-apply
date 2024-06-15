import { Progress } from "@/components/ui/progress";
import {Button} from "@/components/ui/button";

interface WizardHeaderProps {
    currentStep: string;
    steps: string[];
}

export const WizardHeader = ({ currentStep, steps }: WizardHeaderProps) => {

    return (
        <div className="absolute top-0 left-0 right-0 w-full h-4 p-2">
            <div className="flex items-center justify-center w-full gap-2">
                <div className="flex flex-wrap gap-4">
                    {steps.map((step) => (
                        <Button
                            key={step}
                            className={`text- cursor-pointer text-md font-normal rounded-md capitalize text-black bg-slate-200/40 px-2 py-1 ${
                                currentStep === step ? 'text-white bg-honoluluBlue' : ''
                            } hover:bg-slate-400/40 transition duration-100`}
                        >
                            {step}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
};
