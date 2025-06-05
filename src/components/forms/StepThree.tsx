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
import clsx from "clsx";
import { type FormData } from "@/lib/types";

// 100% correctly typed addon option
type AddonOption = {
  value: FormData["addons"][number];
  label: string;
  description: string;
  price: string;
};

const addonOptions: AddonOption[] = [
  {
    value: "onlineService",
    label: "Online Service",
    description: "Access to multiplayer games",
    price: "+$1/mo",
  },
  {
    value: "largerStorage",
    label: "Larger Storage",
    description: "Extra 1TB of cloud save",
    price: "+$2/mo",
  },
  {
    value: "customisableProfile",
    label: "Customisable Profile",
    description: "Custom theme on your profile",
    price: "+$2/mo",
  },
];

const StepThree = () => {
  const form = useFormContext<FormData>();

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="addons"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-3xl font-bold text-primary mb-2">
              Pick add-ons
            </FormLabel>
            <p className="text-muted-foreground mb-6 text-left">
              Add-ons help enhance your gaming experience.
            </p>
            <FormControl>
              <div className="flex flex-col gap-4">
                {addonOptions.map((option) => {
                  const isChecked = field.value?.includes(option.value);

                  return (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className={clsx(
                        "flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-all",
                        "hover:border-blue-600",
                        isChecked
                          ? "border-blue-600 bg-blue-100 text-foreground"
                          : "border border-muted text-muted-foreground"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <Checkbox
                          id={option.value}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const checkedBool = checked === true;
                            if (checkedBool) {
                              form.setValue("addons", [
                                ...(field.value || []),
                                option.value,
                              ]);
                            } else {
                              form.setValue(
                                "addons",
                                (field.value ?? []).filter(
                                  (val) => val !== option.value
                                )
                              );
                            }
                          }}
                        />
                        <div className="flex flex-col">
                          <span className="text-base font-bold">
                            {option.label}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {option.description}
                          </span>
                        </div>
                      </div>

                      <span className="text-sm font-bold text-primary">
                        {option.price}
                      </span>
                    </Label>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepThree;
