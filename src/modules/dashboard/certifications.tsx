import {RegisterData} from "@/modules/dashboard/initialData";
import {Dispatch, RefObject, SetStateAction} from "react";

interface Props {
    formData: RegisterData;
    setFormData: Dispatch<SetStateAction<RegisterData>>;
    refSubmitButton: RefObject<HTMLButtonElement> | null;
    setIsButtonDisabled: (data: boolean) => void;
    setCurrentStep: Dispatch<SetStateAction<string>>
}
export const Certifications = ({formData, setFormData, refSubmitButton, setIsButtonDisabled, setCurrentStep}: Props) => {
    return(
        <div>
            <p>certifications</p>

            <button
                type={'submit'}
                ref={refSubmitButton}
                className={'invisible'}
            >
                submit
            </button>
        </div>
    )
}
