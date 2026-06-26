import { z } from "zod";

export const accountDeletionSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  mobile: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.union([
    z.literal(""),
    z.string().email("Enter a valid email"),
  ]),
  reason: z.string().optional(),
  botcheck: z.boolean().optional(),
});

export type AccountDeletionFormData = z.infer<typeof accountDeletionSchema>;
