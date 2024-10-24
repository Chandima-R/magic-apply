import { FlipCard } from "@/modules/shared/components/flip-card";
import { SessionCounterCard } from "@/modules/shared/components/session-counter-card";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import {
  Briefcase,
  CheckCircle,
  Loader2,
  MessageCircle,
  Search,
  UserPlus,
} from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full h-auto">
      <div
        className={
          "w-full max-w-screen mx-auto flex justify-center scroll-auto bg-white border-b"
        }
      >
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-28 px-14 lg:px-16 mx-auto bg-gradient-to-r from-nonPhotoBlue via-lightCyan to-white rounded-lg ">
          <div className="flex items-center justify-center mb-8">
            <Briefcase size={40} className="text-honoluluBlue mr-4" />
            <h1 className="font-extrabold text-2xl lg:text-4xl text-honoluluBlue">
              Join as a Recruiter
            </h1>
          </div>

          <p className="text-lg lg:text-xl text-center text-slate-600 mb-6">
            If you are a recruiter, talent sourcer, or employer, we invite you
            to complete the early registration form below. Join our community
            and access the best talent!
          </p>

          <div className="flex flex-col space-y-4 mb-8">
            <div className="flex items-center space-x-3">
              <CheckCircle size={24} className="text-blue-500" />
              <span className="text-lg text-slate-700 font-medium">
                Access a pool of highly skilled professionals.
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle size={24} className="text-purple-500" />
              <span className="text-lg text-slate-700 font-medium">
                Engage with top talent through seamless communication.
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Search size={24} className="text-teal-500" />
              <span className="text-lg text-slate-700 font-medium">
                Efficiently search and source candidates that match your needs.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center bg-honoluluBlue text-white px-6 py-3 rounded-md cursor-pointer hover:bg-federalBlue transition-all duration-200 shadow-lg mb-6">
              <UserPlus size={24} className="mr-2" />
              <span className="text-md font-medium">Register Now</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-28 px-14 lg:px-16 mx-auto bg-white rounded-lg border-l">
          <h1 className={"font-bold text-4xl lg:text-6xl mb-12 text-slate-700"}>
            MagicApply
          </h1>

          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>

      <div className="bg-slate-50 overflow-hidden flex justify-center w-full mx-auto">
        <div className="lg:flex w-full lg:w-2/3 flex-col items-center justify-center py-4 px-10">
          <div className={"mb-4 w-full"}>
            <div className={"mb-4"}>
              <p
                className={"font-bold text-4xl mb-2 text-slate-700 text-center"}
              >
                Important Metrics
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 space-y-4 h-auto py-auto w-full flex-grow">
            <SessionCounterCard
              title={"Total Users(this is annoying to update)"}
              count={"2,442,215"}
            />
            <SessionCounterCard title={"Interview Rate"} count={"62.18%"} />
            <SessionCounterCard title={"Avg. User Review"} count={"8.23/10"} />
          </div>
        </div>
      </div>

      <div className="bg-slate-50 overflow-hidden flex justify-center w-full mx-auto">
        <div className="lg:flex w-full flex-col items-center justify-center py-4 px-10">
          <div className={"mb-4 w-full"}>
            <div className={"mb-4"}>
              <p
                className={"font-bold text-4xl mb-2 text-slate-700 text-center"}
              >
                Land the Perfect Job Faster with AI-Optimized Resumes!
              </p>
            </div>
            <p className={"text-slate-500 mb-4 text-lg"}>
              Magic Apply enhances your resume and cover letter to match 90% of
              ny job description, so you can apply with confidence.
            </p>
          </div>

          <div className="flex items-center justify-between  gap-4 h-auto w-full">
            <FlipCard
              frontTitle="AI-Powered Tailoring"
              frontDescription=" Our cutting-edge I analyzes and tailors your resume for the best
            fit."
              backTitle="Intelligent Matching"
              backDescription="We optimize your application to match job descriptions with 90%
            accuracy."
            />
            <FlipCard
              frontTitle="One-Click Application"
              frontDescription="Apply for multiple jobs in a single go, saving hours of time."
              backTitle="Resume Perfection"
              backDescription="Get resume feedback and enhancements powered by AI, tailored to specific industries."
            />

            <FlipCard
              frontTitle="Job Match Fuarantee"
              frontDescription="Magic Apply ensures a 90%+ match with job descriptions to increase your interview chances."
              backTitle="Effortless Application"
              backDescription="Submit 50 applicaitons with one click, no more manual entry."
            />
          </div>

          <div className="w-full flex items-center justify-center my-8">
            <div className="w-auto flex items-center justify-center bg-white border-federalBlue border-2 text-black px-12 py-3 rounded-md cursor-pointer hover:bg-federalBlue hover:text-white transition-all duration-200 shadow-lg mb-6">
              <span className="text-md font-medium">Get started for free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
