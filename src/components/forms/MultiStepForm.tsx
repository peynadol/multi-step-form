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
import { AnimatePresence, motion } from "motion/react";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      plan: undefined,
      billing: "monthly",
      addons: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("FINAL SUBMIT", values);
    toast.success("Order confirmed. Check console for details.", {
      position: "top-center",
    });
    setIsComplete(true);
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

  const handleStartOver = () => {
    form.reset();
    setCurrentStep(1);
    setProgress(0);
    setIsComplete(false);
  };

  return (
    <div className="mx-auto max-w-xl p-6 sm:p-8 md:p-10 lg:p-12">
      <Progress value={progress} className="mb-6" />
      <FormProvider {...form}>
        {isComplete ? (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">Thank you!</h2>
            <p className="text-muted-foreground">
              Your order has been confirmed.
            </p>
            <Button onClick={handleStartOver}>Make a new order</Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentStep}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="min-h-[400px]"
              >
                {currentStep === 1 && <StepOne />}
                {currentStep === 2 && <StepTwo />}
                {currentStep === 3 && <StepThree />}
                {currentStep === 4 && (
                  <StepFour
                    setCurrentStep={setCurrentStep}
                    setProgress={setProgress}
                  />
                )}
              </motion.div>
            </AnimatePresence>

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
        )}
      </FormProvider>
    </div>
  );
};

export default MultiStepForm;
