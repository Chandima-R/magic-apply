import Image from "next/image";

interface Props{
    icon: string;
    title: string;
    customFn: () => void
}

export const CustomSocialLoginButton = ({icon, title, customFn}: Props) => {
    return(
        <div className={'flex items-center gap-4 rounded-md py-3 px-10 shadow-sm border hover:shadow-lg duration-300 transition-all cursor-pointer w-full max-w-96'}>
            <Image
                src={icon}
                alt={title}
                width={512}
                height={512}
                className="w-5 h-5 rounded-sm "
            />
            <p className={'uppercase font-semibold tracking-wide text-md'}>{title}</p>
        </div>
    )
}
