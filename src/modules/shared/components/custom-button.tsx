import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  onSubmit?: () => void;
  type: any;
  disabled?: boolean;
}

export const CustomButton = ({ title, onSubmit, type, disabled }: Props) => {
  return (
    <Button
      disabled={disabled}
      onSubmit={onSubmit}
      type={type}
      className={
        "w-full h-10 uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
      }
    >
      {title}
    </Button>
  );
};
