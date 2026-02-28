import emailjs from "@emailjs/browser";

// EmailJS Configuration
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const TEMPLATE_ID_2 = import.meta.env.VITE_TEMPLATE_ID_2;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export type ReservationEmailData = {
    customer_name: string;
    email: string;
    phone: string;
    number_of_guests: number;
    reservation_date: string;
    reservation_time: string;
    additional_wishes?: string;
};

/**
 * Send reservation confirmation emails
 * Sends to both the restaurant and the customer
 */
export async function sendReservationEmails(
    data: ReservationEmailData
): Promise<{ success: boolean; error?: string }> {
    if (!SERVICE_ID || !TEMPLATE_ID || !TEMPLATE_ID_2 || !PUBLIC_KEY) {
        console.error("EmailJS environment variables are not configured");
        return {
            success: false,
            error: "Email service is not configured",
        };
    }

    try {
        // Prepare template parameters
        const templateParams = {
            user_name: data.customer_name,
            user_email: data.email,
            user_phone: data.phone,
            number_of_guests: data.number_of_guests.toString(),
            date: data.reservation_date,
            time: data.reservation_time,
            additional_wishes: data.additional_wishes || "None",
        };

        // Send email to restaurant (TEMPLATE_ID_2 - based on user's code)
        const restaurantEmail = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID_2,
            templateParams,
            PUBLIC_KEY
        );

        // Send confirmation email to customer (TEMPLATE_ID)
        const customerEmail = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );

        if (restaurantEmail.status === 200 && customerEmail.status === 200) {
            return { success: true };
        }

        return {
            success: false,
            error: "Failed to send confirmation emails",
        };
    } catch (error) {
        console.error("Error sending emails:", error);
        return {
            success: false,
            error: "Failed to send confirmation emails. Your reservation is still confirmed.",
        };
    }
}

/**
 * Format date for email display
 */
export function formatDateForEmail(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

/**
 * Format time for email display
 */
export function formatTimeForEmail(timeString: string): string {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
}
