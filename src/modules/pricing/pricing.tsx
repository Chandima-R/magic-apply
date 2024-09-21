import { Button } from "@/components/ui/button";

export const Pricing = () => {
  return (
    <div className="py-8">
      <div className="flex items-center justify-center flex-wrap gap-4 mb-2">
        <h1 className="text-6xl font-normal text-center">Pay only for </h1>
        <p className="text-center capitalize font-semibold text-6xl text-transparent bg-clip-text bg-gradient-to-r from-nonPhotoBlue to-federalBlue">
          what you need
        </p>
      </div>
      <div className="text-center">
        <p className="text-md text-slate-600">
          Simple, transparent pricing that grows with you. Try any plan free for
          30 days.
        </p>
      </div>

      <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-10 lg:grid-cols-3">
              <div className="bg-white overflow-hidden rounded-lg shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-federalBlue">
                      Free
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-md">
                      Billed monthly
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h4 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      $0/month
                    </h4>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Access to all basic features
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Basic reporting and analytics
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Up to 10 individual users
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        20GB individual data each user
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Basic chat and email support
                      </span>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-honoluluBlue hover:bg-federalBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-honoluluBlue w-full"
                    >
                      Get started
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden rounded-lg shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-federalBlue">
                      Basic
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-md">
                      Billed monthly
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h4 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      $9.99/month
                    </h4>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        200+ Integrations
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Advanced reporting and analytics
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Up to 20 individual users
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        40GB individual data each user
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Priority chat and email support
                      </span>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-honoluluBlue hover:bg-federalBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-honoluluBlue w-full"
                    >
                      Get started
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden rounded-lg shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium leading-6 text-federalBlue">
                      Premium
                    </h3>
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-md">
                      Billed monthly
                    </span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h4 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      $99.9/month
                    </h4>
                  </div>
                  <ul className="mt-8 space-y-4">
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Advanced custom fields
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Audit log and data history
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Unlimited individual users
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Unlimited individual data
                      </span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="flex-shrink-0 w-5 h-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-500">
                        Personalized+ priority service
                      </span>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-honoluluBlue hover:bg-federalBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-honoluluBlue w-full"
                    >
                      Get started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
