import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Contact} from "@/modules/dashboard/contact";
import {Experience} from "@/modules/dashboard/experience";
import {Project} from "@/modules/dashboard/project";
import {Education} from "@/modules/dashboard/education";
import {Certifications} from "@/modules/dashboard/certifications";
import {Coursework} from "@/modules/dashboard/coursework";
import {Involvements} from "@/modules/dashboard/involvements";
import {Skills} from "@/modules/dashboard/skills";
import {Summary} from "@/modules/dashboard/summary";

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
                return <Experience />
            case 'project':
                return <Project />
            case 'education':
                return <Education />
            case 'certifications':
                return <Certifications />
            case 'coursework':
                return <Coursework />
            case 'involvements':
                return <Involvements />
            case 'skills':
                return <Skills />
            case 'summary':
                return <Summary />
            case 'finish up & review':
                return <div>cv overview using a online pdf editor</div>
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
