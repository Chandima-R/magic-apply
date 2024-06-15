import {Progress} from "@/components/ui/progress";

interface WizardHeaderProps {
    currentStep: string;
    steps: string[];
}
export const WizardHeader = ({ currentStep, steps}:WizardHeaderProps) => {

    const currentStepIndex = steps.indexOf(currentStep);
    const stepValue = currentStepIndex / steps?.length * 100;

    return(
        <div className={'absolute top-0 left-0 right-0 w-full h-4'}>
            <Progress value={stepValue} className={'h-1 bg-white '}/>
            <div className={'flex items-center justify-center w-full gap-2'}>
                {/*<p className={'text-md font-normal text-white rounded-md capitalize bg-honoluluBlue px-2 py-1'}>{currentStep}</p>*/}
                <div className={'flex flex-wrap gap-4'}>
                    {steps?.map((s) => (
                        <p key={s} className={`cursor-pointer text-md font-normal rounded-md capitalize text-black bg-slate-200/40 px-2 py-1 ${currentStep === s.toString() ? 'text-white bg-honoluluBlue' : ''} hover:bg-slate-400/40 transition duration-100`}>{s}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}
