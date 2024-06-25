import { Button } from "@/components/ui/button";

interface Props {
  role: string;
  company: string;
}

export const ExperienceCard = ({ role, company }: Props) => {
  return (
    <div className="border p-2 px-4 rounded shadow cursor-pointer">
      <div className="mb-2">
        <h2 className="font-semibold text-lg capitalize">{role}</h2>
        <p className="font-semibold capitalize">{company}</p>
      </div>
      <div className="flex items-between gap-4">
        <Button
          size={"sm"}
          className="capitalize text-xs bg-honoluluBlue hover:bg-federalBlue"
        >
          edit
        </Button>
        <Button
          size={"sm"}
          className="capitalize text-xs"
          variant={"destructive"}
        >
          delete
        </Button>
        <Button size={"sm"} className="capitalize text-xs" variant={"outline"}>
          hide
        </Button>
      </div>
    </div>
  );
};
