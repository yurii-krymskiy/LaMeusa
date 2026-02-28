import z from "zod";

export const BookTableSchema = z.object({
    name: z
        .string({ error: "We'd love to know your name" })
        .min(1, { error: "Please let us know your name" }),
    guests: z.union([
        z
            .number()
            .int({ error: "Please enter a whole number" })
            .min(1, { error: "How many guests will be joining?" })
            .max(8, { error: "For parties larger than 8, please call us" })
            .positive({ error: "How many guests will be joining?" })
            .nullable(),
        z.nan(),
    ]),
    time: z.iso
        .time({ error: "What time works best for you?" })
        .min(1, { error: "What time would you like to dine?" }),
    date: z.iso
        .date({ error: "When would you like to visit us?" })
        .min(1, { error: "Pick a date for your visit" }),
    promoCode: z.string(),
    details: z
        .string()
        .max(255, { error: "Please keep special requests under 255 characters" })
        .optional(),

    // confirm recheck name, email and phone
    email: z
        .string({ error: "We need your email to confirm" })
        .min(1, { error: "Please enter your email" })
        .email({ error: "Please check your email address" }),

    phone: z
        .string({ error: "How can we reach you?" })
        .min(3, { error: "Please enter a valid phone number" }),
});
export type BookTableTypeSchema = z.infer<typeof BookTableSchema>;

export const BookTableSchemaPick = BookTableSchema.pick({
    name: true,
    guests: true,
    time: true,
    date: true,
    promoCode: true,
});

export const LiteBookTableSchemaPick = BookTableSchema.pick({
    name: true,
    phone: true,
    time: true,
    date: true,
    email: true,
    details: true,
    guests: true,
});

export type BookTableSchemaPickType = z.infer<typeof BookTableSchemaPick>;
export type LiteBookTableSchemaPickType = z.infer<typeof LiteBookTableSchemaPick>;

export const BookConfirmSchemaPick = BookTableSchema.pick({
    name: true,
    email: true,
    phone: true,
});

export type BookConfirmSchemaPickType = z.infer<typeof BookConfirmSchemaPick>;
