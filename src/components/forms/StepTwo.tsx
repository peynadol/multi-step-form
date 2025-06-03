import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

const StepTwo = () => {
  const form = useFormContext();

  return (
    <div className="space-y-8">
      {/* PLAN SELECTION */}
      <FormField
        control={form.control}
        name="plan"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-bold">
              Select your plan
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-3 gap-4 mt-4"
              >
                {["Arcade", "Advanced", "Pro"].map((plan) => (
                  <Label
                    key={plan}
                    htmlFor={plan}
                    className={clsx(
                      "cursor-pointer rounded-lg border p-4 text-center transition-all",
                      "flex flex-col items-center space-y-2 font-bold",
                      "hover:border-blue-600",
                      field.value === plan
                        ? "border-blue-600 bg-blue-100 text-foreground"
                        : "border border-muted text-muted-foreground"
                    )}
                  >
                    <RadioGroupItem
                      value={plan}
                      id={plan}
                      className="sr-only peer"
                    />
                    <span className="text-lg">{plan}</span>
                    <span className="text-sm text-muted-foreground">
                      {plan === "Arcade"
                        ? "$9/mo"
                        : plan === "Advanced"
                        ? "$12/mo"
                        : "$15/mo"}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* BILLING SELECTION with Switch */}
      <FormField
        control={form.control}
        name="billing"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl font-bold">Billing cycle</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-3 mt-4">
                <Label
                  htmlFor="billing-switch"
                  className={clsx(
                    "text-sm font-bold",
                    field.value === "monthly"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Monthly
                </Label>
                <Switch
                  id="billing-switch"
                  checked={field.value === "yearly"}
                  onCheckedChange={(checked) => {
                    field.onChange(checked ? "yearly" : "monthly");
                  }}
                />
                <Label
                  htmlFor="billing-switch"
                  className={clsx(
                    "text-sm font-bold",
                    field.value === "yearly"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  Yearly
                </Label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepTwo;
