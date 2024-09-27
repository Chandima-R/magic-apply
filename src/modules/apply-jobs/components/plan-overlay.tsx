import { Info, Lock } from "lucide-react";
import Link from "next/link";

export const PlanOverlay = () => {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md mx-auto space-y-6">
        <div className="flex justify-center mb-4">
          <Lock className="w-12 h-12 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          You&rsquo;re on the Free Plan
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Currently, you&rsquo;re subscribed to the{" "}
          <span className="font-semibold text-red-500">Free Plan</span>. To
          unlock features like generating job-focused resumes and more, consider
          upgrading to our Basic Plan or higher.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-left">
          <div className="flex items-center mb-2">
            <Info className="w-5 h-5 text-honoluluBlue mr-2" />
            <span className="text-honoluluBlue font-semibold">
              Why upgrade?
            </span>
          </div>
          <ul className="text-gray-700 space-y-1 pl-5 list-disc">
            <li>Generate unlimited, job-specific resumes</li>
            <li>Access premium templates</li>
            <li>Priority support and personalized tips</li>
          </ul>
        </div>
        <Link href="/pricing">
          <p className="mt-6 px-6 py-3 bg-honoluluBlue text-white rounded-md hover:bg-federalBlue transition text-lg">
            Upgrade to Basic Plan
          </p>
        </Link>
        <p className="text-gray-500 text-sm mt-3">
          Browse our{" "}
          <Link href="/pricing">
            <p className="text-honoluluBlue underline hover:text-blue-700">
              Pricing Page
            </p>
          </Link>{" "}
          for more details.
        </p>
      </div>
    </div>
  );
};
