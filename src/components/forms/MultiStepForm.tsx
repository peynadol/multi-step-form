import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { formSchema } from "@/schema";
import { z } from "zod";
import { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Progress } from "../ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      plan: undefined,
      billing: undefined,
      addons: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("FINAL SUBMIT", values);
    toast.success("Order confirmed. Check console for details.");
  };

  const handleNext = async () => {
    let isStepValid = false;

    if (currentStep === 1) {
      isStepValid = await form.trigger(["name", "email", "phoneNumber"]);
      if (isStepValid) {
        setCurrentStep(2);
        setProgress(33);
      }
    } else if (currentStep === 2) {
      isStepValid = await form.trigger(["plan", "billing"]);
      if (isStepValid) {
        setCurrentStep(3);
        setProgress(66);
      }
    } else if (currentStep === 3) {
      isStepValid = await form.trigger(["addons"]);
      if (isStepValid) {
        setCurrentStep(4);
        setProgress(100);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setProgress((prev) => prev - 33);
  };

  return (
    <div className="mx-auto max-w-xl p-6 sm:p-8 md:p-10 lg:p-12">
      <Progress value={progress} className="mb-6" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {currentStep === 1 && <StepOne />}
          {currentStep === 2 && <StepTwo />}
          {currentStep === 3 && <StepThree />}
          {currentStep === 4 && <StepFour setCurrentStep={setCurrentStep} />}

          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handleBack}>
                Go Back
              </Button>
            )}

            {currentStep < 4 && (
              <Button type="button" onClick={handleNext}>
                Next Step
              </Button>
            )}

            {currentStep === 4 && <Button type="submit">Confirm</Button>}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
