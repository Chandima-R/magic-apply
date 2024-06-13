import {ClerkLoaded, ClerkLoading, UserButton} from "@clerk/nextjs";
import {Loader2} from "lucide-react";

export default function Home() {
  return (
   <main>
     <ClerkLoaded>
       <UserButton afterSignOutUrl="/sign-in" />
     </ClerkLoaded>
     <ClerkLoading>
       <Loader2 className="animate-spin size-8 text-slate-400" />
     </ClerkLoading>
   </main>
  );
}
