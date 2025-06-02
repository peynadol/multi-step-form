import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";

const StepTwo = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="plan"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select your plan</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Arcade" id="arcade" />
                  <Label htmlFor="arcade">Arcade</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Advanced" id="advanced" />
                  <Label htmlFor="advanced">Advanced</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Pro" id="pro" />
                  <Label htmlFor="pro">Pro</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="billing"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly">Yearly</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default StepTwo;
