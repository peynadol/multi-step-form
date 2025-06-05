import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  plan: z.enum(["Arcade", "Advanced", "Pro"]),
  billing: z.enum(["monthly", "yearly"]),
  addons: z.array(
    z.enum(["onlineService", "largerStorage", "customisableProfile"])
  ),
});
