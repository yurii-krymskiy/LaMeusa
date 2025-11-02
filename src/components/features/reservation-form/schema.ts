import z from "zod";

export const BookTableSchema = z.object({
    name: z.string().min(1, { error: "Name is required" }),
    guests: z.union([
        z
            .number()
            .int()
            .min(1, { error: "Guests is required" })
            .positive({ error: "Guests must be a positive number" })
            .nullable(),
        z.nan(),
    ]),
    time: z.iso.time({ error: "Not a valid time" }).min(1),
    date: z.iso.date({ error: "Not a valid date" }).min(1),
    promoCode: z.string(),
    details: z.string().max(255).optional(),

    // confirm recheck name, email and phone
    email: z.union([z.literal(""), z.email()]),

    phone: z.union([
        z.literal(""),
        z.string({ error: "Phone is required" }).min(3),
    ]),
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
    details: true,
});

export type BookTableSchemaPickType = z.infer<typeof BookTableSchemaPick>;
export type LiteBookTableSchemaPickType = z.infer<typeof LiteBookTableSchemaPick>;

export const BookConfirmSchemaPick = BookTableSchema.pick({
    name: true,
    email: true,
    phone: true,
}).refine((data) => data.email || data.phone, {
    message: "Fill Email or a Phone",
    path: ["email"],
});

export type BookConfirmSchemaPickType = z.infer<typeof BookConfirmSchemaPick>;
