import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\d\s+\-()]+$/, "Enter a valid phone number"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  botcheck: z.boolean().optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;
