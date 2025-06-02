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

//step 1 - name, email, phone number
//step 2 - arcade, advanced, pro, toggle (monthly/yearly)
//step 3 - online service, larger storage, customisable profile
//step 4 - displays totals
