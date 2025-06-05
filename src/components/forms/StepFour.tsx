import { useFormContext } from "react-hook-form";
import { type FormData } from "@/lib/types";

type StepFourProps = {
  setCurrentStep: (step: number) => void;
  setProgress: (progress: number) => void;
};

const StepFour = ({ setCurrentStep, setProgress }: StepFourProps) => {
  const form = useFormContext<FormData>();
  const values = form.getValues();

  const planPrices: Record<FormData["plan"], number> = {
    Arcade: 9,
    Advanced: 12,
    Pro: 15,
  };

  const addonPrices: Record<FormData["addons"][number], number> = {
    onlineService: 1,
    largerStorage: 2,
    customisableProfile: 2,
  };

  const planPrice = planPrices[values.plan] || 0;

  const addonsTotal = (values.addons || []).reduce<number>(
    (total, addon) => total + (addonPrices[addon] || 0),
    0
  );

  const total = planPrice + addonsTotal;
  const displayedTotal = values.billing === "monthly" ? total : total * 12;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-primary">Finishing up</h2>
      <p className="text-left text-muted-foreground">
        Double-check everything looks OK before confirming.
      </p>

      {/* Summary card */}
      <div className="rounded-lg bg-blue-100 p-6 space-y-4">
        {/* Plan */}
        <div className="flex justify-between items-center text-left">
          <div>
            <p className="font-bold">
              {values.plan} (
              {values.billing === "monthly" ? "Monthly" : "Yearly"})
            </p>
            <button
              type="button"
              className="text-primary underline text-sm mt-1 cursor-pointer"
              onClick={() => {
                setCurrentStep(2);
                setProgress(33);
              }}
            >
              Change
            </button>
          </div>
          <p className="font-bold">
            ${values.billing === "monthly" ? planPrice : planPrice * 12}/
            {values.billing === "monthly" ? "mo" : "yr"}
          </p>
        </div>

        <hr className="border-muted" />

        {/* Add-ons */}
        <div className="space-y-2">
          {(values.addons || []).map((addon) => (
            <div key={addon} className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm capitalize">
                {addon === "onlineService"
                  ? "Online service"
                  : addon === "largerStorage"
                  ? "Larger storage"
                  : "Customisable profile"}
              </p>
              <p className="text-sm text-foreground">
                +$
                {values.billing === "monthly"
                  ? addonPrices[addon]
                  : addonPrices[addon] * 12}
                /{values.billing === "monthly" ? "mo" : "yr"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center px-6">
        <p className="text-muted-foreground">
          Total (per {values.billing === "monthly" ? "month" : "year"})
        </p>
        <p className="text-xl font-bold text-primary">
          +${displayedTotal}/{values.billing === "monthly" ? "mo" : "yr"}
        </p>
      </div>
    </div>
  );
};

export default StepFour;
