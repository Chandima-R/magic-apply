import {Button} from "@/components/ui/button";
import Image from "next/image";
import {SessionCounterCard} from "@/modules/shared/components/session-counter-card";

export const SessionHeader = () => {
    return (
        <div
            className="hidden lg:flex w-2/3 flex-col items-center justify-center py-28 px-10 bg-slate-50 overflow-hidden">
            <h2 className={'font-bold text-xl lg:text-5xl mb-12 text-slate-700'}>Your AI Co-applicant</h2>
            <div className={'mb-4 w-4/5'}>
                <div className={'mb-4'}>
                    <p className={'font-bold text-4xl mb-2 text-slate-700'}>
                        The way the world makes resumes.
                    </p>
                    <p className={'font-bold text-4xl mb-2 text-slate-700'}>
                        The smartest <span className={'text-honoluluBlue'}>AI resume builder.</span>
                    </p>
                </div>
                <p className={'text-slate-500 mb-4 text-lg'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <Button className={'bg-honoluluBlue hover:bg-federalBlue px-8 font-semibold text-md h-10'}>
                    Get Started - It&rsquo; s free
                </Button>
            </div>

            <div className={'mb-8 w-4/5'}>
                <Image
                    src={'/images/banner.png'}
                    alt={'banner'}
                    width={1920}
                    height={1080}
                    className={'w-screen h-80 mt-8 object-cover'}
                />
            </div>

            <div className="lg:flex items-center justify-between gap-4 h-auto py-auto w-4/5">
                <SessionCounterCard title={'Total Users(this is annoying to update)'} count={'2,442,215'}/>
                <SessionCounterCard title={'Interview Rate'} count={'62.18%'}/>
                <SessionCounterCard title={'Avg. User Review'} count={'8.23/10'}/>
            </div>
        </div>
    )
}
