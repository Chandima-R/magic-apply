import { Form } from "@/components/ui/form";
import { TextInput } from "@/modules/shared/components/text-input";
import { TextArea } from "@/modules/shared/components/text-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomButton } from "@/modules/shared/components/custom-button";
import { LoadingButton } from "@/modules/shared/components/loading-button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import {
  ADD_NEW_COURSEWORK_BY_USER_ID,
  COURSEWORK_INFORMATION_BY_USER_ID,
  DELETE_COURSEWORK_BY_PK,
  HIDE_COURSEWORK_BY_PK,
} from "@/graphql/coursework";
import { useMutation, useSubscription } from "@apollo/client";
import { LoadingSpinner } from "@/modules/shared/components/loading-spinner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActionCard } from "@/modules/shared/components/action-card";

const courseworkSchema = z.object({
  courseName: z.string().nonempty("Certificate name is required."),
  courseInstitute: z
    .string()
    .nonempty("Certificate issued institute is required."),
  courseCompletionDate: z
    .string()
    .nonempty("Certificate issued date is required."),
  courseSkill: z.string(),
  courseDescription: z.string(),
});
export const Coursework = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();

  const form = useForm<z.infer<typeof courseworkSchema>>({
    resolver: zodResolver(courseworkSchema),
    defaultValues: {
      courseName: "",
      courseInstitute: "",
      courseCompletionDate: "",
      courseSkill: "",
      courseDescription: "",
    },
  });

  const { data: courserworkData, loading: courseworkLoading } = useSubscription(
    COURSEWORK_INFORMATION_BY_USER_ID,
    {
      variables: {
        _eq: user?.id,
      },
    }
  );

  const visibleCoursework = courserworkData?.coursework?.filter(
    (course: any) => course.visibility === true
  );

  const allCoursework = courserworkData?.coursework?.map((e: any) => e);

  const hiddenCoursework = allCoursework?.length - visibleCoursework?.length;

  const [addCoursework] = useMutation(ADD_NEW_COURSEWORK_BY_USER_ID);
  async function onSubmit(values: z.infer<typeof courseworkSchema>) {
    try {
      setIsLoading(true);
      if (!user?.id) {
        throw new Error("User is not authenticated");
      } else {
        await addCoursework({
          variables: {
            course_completion_year: values.courseCompletionDate,
            course_institute: values.courseInstitute,
            course_name: values.courseName,
            course_skill: values.courseSkill,
            course_skill_description: values.courseDescription,
            user_id: user?.id,
          },
        });

        toast({
          variant: "default",
          title: "Success.",
          description: "Your coursework was added to coursework list.",
        });
      }
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const [deleteCoursework] = useMutation(DELETE_COURSEWORK_BY_PK);
  const deleteCourseworkAction = async (id: string) => {
    try {
      await deleteCoursework({
        variables: {
          id,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your coursework was deleted from the coursework list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error deleting the coursework.",
      });
    }
  };

  const [hdieCoursework] = useMutation(HIDE_COURSEWORK_BY_PK);
  const hideCourseworkAction = async (id: string) => {
    try {
      await hdieCoursework({
        variables: {
          id,
          visibility: false,
        },
      });
      toast({
        variant: "default",
        title: "Success.",
        description: "Your coursework was hide from the coursework list.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error hiding the coursework.",
      });
    }
  };

  return (
    <div className={"w-full flex flex-col lg:flex-row"}>
      <div className={"w-full lg:w-1/3"}>
        <div className={"rounded-sm overflow-hidden shadow mb-4"}>
          <video className={"w-full object-cover h-auto"} controls>
            <source src={"/video/resume-builder.mp4"} />
          </video>
        </div>
        <div>
          {courseworkLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {courserworkData?.coursework?.length > 0 && (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  defaultValue="courserowk"
                >
                  <AccordionItem value="coursework">
                    <AccordionTrigger className="text-xl font-semibold capitalize">
                      your coursework
                    </AccordionTrigger>
                    {hiddenCoursework > 0 && (
                      <span>
                        You have {hiddenCoursework} hidden coursework(s) in your
                        bucket.
                      </span>
                    )}
                    {visibleCoursework?.map((coursework: any) => (
                      <AccordionContent key={coursework.id}>
                        <ActionCard
                          id={coursework.id}
                          company={coursework.course_institute}
                          role={coursework.course_name}
                          country={""}
                          fromDate={""}
                          toDate={coursework.course_completion_year}
                          deleteTitle={"Delete your coursework."}
                          deleteDescription={
                            "Are you sure to delete this coursework. This action cannot be undone and it will completely remove this coursework from your coursework."
                          }
                          deleteAction={() =>
                            deleteCourseworkAction(coursework.id)
                          }
                          hideTitle={"Hide your coursework."}
                          hideDescription={
                            "Are you sure to hide this coursework. This action cannot be undone and it will completely hide this coursework from your coursework."
                          }
                          hideAction={() => hideCourseworkAction(coursework.id)}
                        />
                      </AccordionContent>
                    ))}
                  </AccordionItem>
                </Accordion>
              )}
            </>
          )}
        </div>
      </div>
      <div className={"w-full lg:w-2/3 px-2 lg:px-6 py-4 lg:py-0"}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={"gap-4 lg:gap-8 grid grid-cols-1 w-full"}>
              <TextInput
                fieldLabel={"What was the course name?"}
                fieldName={"courseName"}
                control={form.control}
                placeholder={"Introduction to Computer Science"}
                required={true}
              />
              <TextInput
                fieldLabel={"Where did you take the course?"}
                fieldName={"courseInstitute"}
                control={form.control}
                placeholder={"University of Wisconsin, Madison"}
                required={true}
              />
              <TextInput
                fieldLabel={"When did you take the course?"}
                fieldName={"courseCompletionDate"}
                control={form.control}
                placeholder={"2024"}
                required={true}
              />
              <TextInput
                fieldLabel={"When skill did you use?"}
                fieldName={"courseSkill"}
                control={form.control}
                placeholder={"Teamwork"}
                required={false}
              />
              <TextArea
                fieldLabel={"How was that skill applied?"}
                fieldName={"courseDescription"}
                control={form.control}
                placeholder={
                  "Coordinating on code with a small group of people."
                }
                required={false}
              />
            </div>

            <div className="flex justify-end w-full mt-8">
              <div className="w-38">
                {isLoading ? (
                  <LoadingButton />
                ) : (
                  <>
                    {courserworkData?.coursework?.length >= 5 ? (
                      <CustomButton
                        disabled
                        type="submit"
                        title="Save to coursework list"
                      />
                    ) : (
                      <CustomButton
                        type="submit"
                        title="Save to coursework list"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
