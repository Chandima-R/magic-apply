import {ClerkLoaded, ClerkLoading, SignIn} from "@clerk/nextjs";
import {Loader2} from "lucide-react";
import {SessionHeader} from "@/modules/shared/components/session-header";

export default function page() {
  return (
      <div className={'w-full max-w-screen mx-auto h-screen flex justify-center scroll-auto'}>
        <div
            className="w-full lg:w-1/3 flex flex-col items-center justify-center py-28 max-w-[500px] px-14 lg:px-16 mx-auto">
          <h1 className={'font-bold text-4xl lg:text-6xl mb-12 text-slate-700'}>MagicApply</h1>

          <ClerkLoaded>
            <SignIn path="/sign-in"/>
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground"/>
          </ClerkLoading>

        </div>

        <SessionHeader/>
      </div>
  )
}
