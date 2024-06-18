'use client'
import {Dashboard} from "@/modules/dashboard/dashboard";

export default function page() {
    return (
        <main className={'max-w-[1440px] w-full mx-auto p-8'}>
            <Dashboard />
        </main>
    )
}


// 'use client'
//
// import {WizardFooter} from "@/modules/shared/components/wizard-footer";
// import {useRef, useState} from "react";
// import {REGISTER_INITIAL_DATA, RegisterData} from "@/modules/dashboard/initialData";
// import {WizardHeader} from "@/modules/shared/components/wizard-header";
// import {Contact} from "@/modules/dashboard/contact";
// import {Experience} from "@/modules/dashboard/experience";
// import {Project} from "@/modules/dashboard/project";
// import {Education} from "@/modules/dashboard/education";
// import {Certifications} from "@/modules/dashboard/certifications";
// import {Coursework} from "@/modules/dashboard/coursework";
// import {Involvements} from "@/modules/dashboard/involvements";
// import {Skills} from "@/modules/dashboard/skills";
// import {Summary} from "@/modules/dashboard/summary";
// import {FinishReview} from "@/modules/dashboard/finish-review";
//
// const steps = [
//     'contact',
//     'experience',
//     'project',
//     'education',
//     'certifications',
//     'coursework',
//     'involvements',
//     'skills',
//     'summary',
//     'finish up & review',
// ]
//
// export default function Home() {
//     const [currentStep, setCurrentStep] = useState<string>(steps[0]);
//     const [formData, setFormData] = useState<RegisterData>(REGISTER_INITIAL_DATA);
//     const refSubmitButton = useRef<HTMLButtonElement>(null);
//     const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
//     const [isLoading] = useState<boolean>(false);
//     const refFormSaveButton = useRef<HTMLButtonElement>(null);
//
//     const renderStep = () => {
//         switch(currentStep){
//             case 'contact':
//                 return(
//                     <Contact
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                     />
//                 )
//             case 'experience':
//                 return(
//                     <Experience
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'project':
//                 return(
//                     <Project
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'education':
//                 return(
//                     <Education
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'certifications':
//                 return(
//                     <Certifications
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'coursework':
//                 return(
//                     <Coursework
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'involvements':
//                 return(
//                     <Involvements
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'skills':
//                 return(
//                     <Skills
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'summary':
//                 return(
//                     <Summary
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             case 'finish up & review':
//                 return(
//                     <FinishReview
//                         formData={formData}
//                         refSubmitButton={refSubmitButton}
//                         setCurrentStep={setCurrentStep}
//                         setFormData={setFormData}
//                         setIsButtonDisabled={setIsButtonDisabled}
//                         refFormSaveButton={refFormSaveButton}
//                     />
//                 )
//             default:
//                 return null;
//         }
//     }
//
//   return (
//    <main className={'max-w-[1440px] w-full mx-auto p-8'}>
//        <p className={'text-lg font-semibold tracking-normal lg:text-2xl mb-8'}>Fill all details here.</p>
//
//        <div>
//            <div
//                className="relative bg-white w-full max-w-[1440px] h-full flex items-center justify-center p-2 z-10 border rounded-md flex-col"
//            >
//                <div className={'h-8'}>
//                    <WizardHeader
//                        currentStep={currentStep}
//                        steps={steps}
//                    />
//                </div>
//
//                <div className={'w-full px-8 lg:px-32 mt-32 mb-16 lg:my-16'}>
//                    {renderStep()}
//                </div>
//
//                <WizardFooter
//                    currentStep={currentStep}
//                    steps={steps}
//                    refSubmitButton={refSubmitButton}
//                    isButtonDisabled={isButtonDisabled}
//                    isLoading={isLoading}
//                    refFormSaveButton={refFormSaveButton}
//                />
//            </div>
//        </div>
//    </main>
//   );
// }
