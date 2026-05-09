type GtmPayload = {
    event: string;
};

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}

export const pushGtmEvent = (eventName: string) => {
    if (typeof window === "undefined") {
        return;
    }

    window.dataLayer = window.dataLayer || [];
    const payload: GtmPayload = { event: eventName };
    window.dataLayer.push(payload);
};
