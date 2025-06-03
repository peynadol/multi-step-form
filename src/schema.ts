import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string().min(1),
  plan: z.enum(["Arcade", "Advanced", "Pro"]),
  billing: z.enum(["monthly", "yearly"]),
  addons: z.array(
    z.enum(["onlineService", "largerStorage", "customisableProfile"])
  ),
});
