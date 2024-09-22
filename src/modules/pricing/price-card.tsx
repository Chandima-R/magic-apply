import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  price: number;
  customButtonFn: () => void;
}

export const PriceCard = ({ title, price, customButtonFn }: Props) => {
  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-lg hover:shadow-xl cursor-pointer hover:bg-lightCyan w-full">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-federalBlue">
            {title}
          </h3>
          <span className="bg-lightCyan text-honoluluBlue text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-md">
            Billed monthly
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h4 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            ${price}/month
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
            <span className="ml-3 text-gray-500">200+ Integrations</span>
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
            onClick={customButtonFn}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-honoluluBlue hover:bg-federalBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-honoluluBlue w-full"
          >
            Get started
          </Button>
        </div>
      </div>
    </div>
  );
};
