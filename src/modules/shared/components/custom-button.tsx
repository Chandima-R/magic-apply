import {Button} from "@/components/ui/button";

interface Props{
    title: string;
    onSubmit?: () => void
    type: any;
}

export const CustomButton = ({title, onSubmit, type}: Props) => {
    return(
        <Button
            onSubmit={onSubmit}
            type={type}
            className={'w-full h-10 uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue'}
        >
            {title}
        </Button>
    )
}
