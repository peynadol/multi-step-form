import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

const StepThree = () => {
  const form = useFormContext();

  const addonOptions = [
    { value: "onlineService", label: "Online Service" },
    { value: "largerStorage", label: "Larger Storage" },
    { value: "customisableProfile", label: "Customisable Profile" },
  ];

  return (
    <>
      <FormField
        control={form.control}
        name="addons"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select add-ons</FormLabel>
            <FormControl>
              <div className="flex flex-col gap-4">
                {addonOptions.map((option) => (
                  <div key={option.value} className="flex items-start gap-3">
                    <Checkbox
                      id={option.value}
                      checked={field.value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const isChecked = checked === true;
                        if (isChecked) {
                          form.setValue("addons", [
                            ...(field.value || []),
                            option.value,
                          ]);
                        } else {
                          form.setValue(
                            "addons",
                            (field.value || []).filter(
                              (val) => val !== option.value
                            )
                          );
                        }
                      }}
                    />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default StepThree;
