import {RegisterData} from "@/modules/dashboard/initialData";
import {Dispatch, RefObject, SetStateAction} from "react";

interface Props {
    formData: RegisterData;
    setFormData: Dispatch<SetStateAction<RegisterData>>;
    refSubmitButton: RefObject<HTMLButtonElement> | null;
    setIsButtonDisabled: (data: boolean) => void;
    setCurrentStep: Dispatch<SetStateAction<string>>
    refFormSaveButton: RefObject<HTMLButtonElement> | null;
}
export const Involvements = ({formData, setFormData, refSubmitButton, setIsButtonDisabled, setCurrentStep}: Props) => {
    return(
        <div>
            <p>involvements</p>

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