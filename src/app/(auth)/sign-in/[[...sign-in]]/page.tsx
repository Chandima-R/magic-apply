import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function page() {
  return (
    <div className="w-full h-auto">
      <header className="flex flex-col mx-auto p-4 w-[1280px] max-w-full text-center px-8 h-screen justify-center -mt-16">
        <h1 className="font-bold text-4xl lg:text-6xl mb-16">
          Unlock Your Career Potential with an <br />
          <span className="text-honoluluBlue">ATS-Optimized</span> Resume
        </h1>
        <p className="text-lg lg:text-2xl font-medium text-gray-700  mx-auto mb-8">
          Stand out in today’s competitive job market with a resume designed to
          pass Applicant Tracking Systems and impress hiring managers. Our
          powerful resume generator helps you highlight your skills, showcase
          your experience, and optimize keywords, giving you the edge needed to
          secure more interviews and land your dream job faster.
        </p>

        <div>
          <Button
            size={"lg"}
            className="rounded-full py-2 bg-honoluluBlue hover:bg-federalBlue text-white "
            variant="default"
          >
            Sign Up - It&rsquo; Free!
          </Button>

          <p className="text-lg font-normal text-gray-700 mt-4">
            7 out of 10 users land their dream job faster with Magic Apply –
            your shortcut to success!
          </p>
        </div>
      </header>

      <section className="flex items-centes w-full max-w-[1280px] mx-auto -mt-28">
        <Tabs defaultValue="resume" className="w-full mx-auto">
          <TabsList className="flex justify-between p-8 border bg-gray-50">
            <TabsTrigger
              value="resume"
              className="flex items-center text-lg font-medium space-x-2"
            >
              🚀 <span>Resume Enhancements with AI</span>
            </TabsTrigger>
            <TabsTrigger
              value="apply-jobs"
              className="flex items-center text-lg font-medium space-x-2"
            >
              💼 <span>Apply 50 Jobs at Once</span>
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="flex items-center text-lg font-medium space-x-2"
            >
              🔍 <span>Compare Resume to Job</span>
            </TabsTrigger>
            <TabsTrigger
              value="cover-letter"
              className="flex items-center text-lg font-medium space-x-2"
            >
              🖹 <span>Generate Specific Cover Letters</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="resume">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Enhance Your Resume with AI
              </h2>
              <p className="text-lg text-gray-700">
                Use cutting-edge AI technology to optimize your resume. Our tool
                analyzes your experience and ensures your resume is
                keyword-rich, ATS-friendly, and tailored for the role you want.
                Let the AI help you craft a standout document in minutes!
              </p>
              <Image
                src="/images/dashboard-banner.png"
                alt="AI Resume Enhancement"
                className="w-full h-auto rounded-lg"
                width={1920}
                height={1080}
              />
            </div>
          </TabsContent>

          <TabsContent value="apply-jobs">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Apply to 50 Jobs at Once</h2>
              <p className="text-lg text-gray-700">
                Save time and increase your chances by applying to multiple jobs
                with a single click. Our tool automatically tailors your resume
                to fit different job descriptions, making it easy for you to
                reach out to recruiters and hiring managers faster than ever.
              </p>
              <Image
                src="/images/dashboard-banner.png"
                alt="AI Resume Enhancement"
                className="w-full h-auto rounded-lg"
                width={1920}
                height={1080}
              />
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Compare Your Resume to Job Descriptions
              </h2>
              <p className="text-lg text-gray-700">
                Ensure your resume aligns perfectly with the job description.
                Our comparison tool checks for keyword matches and highlights
                areas for improvement, giving you the best chance of getting
                noticed by hiring managers.
              </p>
              <Image
                src="/images/dashboard-banner.png"
                alt="AI Resume Enhancement"
                className="w-full h-auto rounded-lg"
                width={1920}
                height={1080}
              />
            </div>
          </TabsContent>

          <TabsContent value="cover-letter">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Generate Customized Cover Letters
              </h2>
              <p className="text-lg text-gray-700">
                Quickly create personalized cover letters for each job you apply
                to. Our generator tailors each letter based on the job
                description, ensuring it’s professional, unique, and compelling.
              </p>
              <Image
                src="/images/dashboard-banner.png"
                alt="AI Resume Enhancement"
                className="w-full h-auto rounded-lg"
                width={1920}
                height={1080}
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
