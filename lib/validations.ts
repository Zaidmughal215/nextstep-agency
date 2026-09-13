import { z } from "zod";

/** Frontend-only contact validation (mailto fallback, no backend). */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name (min 2 characters)."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number.").max(20),
  service: z.enum(["Software Development", "Website Building", "Business Branding", "Other"]),
  message: z.string().min(10, "Tell us a little more (min 10 characters).").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
