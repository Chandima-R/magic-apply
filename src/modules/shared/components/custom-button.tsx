import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  onSubmit?: () => void;
  type: any;
  disabled?: boolean;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export const CustomButton = ({ title, onSubmit, type, disabled, size }: Props) => {
  return (
    <Button
      disabled={disabled}
      onSubmit={onSubmit}
      type={type}
      size={size}
      className={
        "w-full uppercase bg-honoluluBlue tracking-wider text-white hover:bg-federalBlue"
      }
    >
      {title}
    </Button>
  );
};
