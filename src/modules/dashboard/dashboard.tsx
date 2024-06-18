import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Contact} from "@/modules/dashboard/contact";

const steps = [
    'contact',
    'experience',
    'project',
    'education',
    'certifications',
    'coursework',
    'involvements',
    'skills',
    'summary',
    'finish up & review',
]
export const Dashboard = () => {
    const [currentStep, setCurrentStep] = useState('contact');
    const renderStepComponent = () => {
        switch (currentStep) {
            case 'contact':
                return <Contact/>
            case 'experience':
                return <div>experience</div>
            // Add cases for other steps and return their respective components
            case 'project':
                return <div>projects</div>
            case 'education':
                return <div>education</div>
            case 'certifications':
                return <div>certifications</div>
            case 'coursework':
                return <div>coursework</div>
            case 'involvements':
                return <div>involvements</div>
            case 'skills':
                return <div>skills</div>
            case 'summary':
                return <div>summary</div>
            case 'finish up & review':
                return <div>finish</div>
            default:
                return <div>Select a step</div>;
        }
    };

    return(
        <>
            <div className="flex items-center justify-center w-full gap-2">
                <div className="flex flex-wrap gap-4">
                    {steps.map((step) => (
                        <Button
                            size={'sm'}
                            key={step}
                            className={`text-sm cursor-pointer font-normal rounded-md capitalize text-black bg-slate-200/40 px-2 py-1 ${
                                currentStep === step ? 'text-white bg-honoluluBlue' : ''
                            } hover:bg-slate-400/40 transition duration-100`}
                            onClick={() => setCurrentStep(step)}
                        >
                            {step}
                        </Button>
                    ))}
                </div>
            </div>


            <section className="mt-8">
                {renderStepComponent()}
            </section>
        </>
    )
}
