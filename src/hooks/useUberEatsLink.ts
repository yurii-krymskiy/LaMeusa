export const useUberEatsLink = () => {
    const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Try to open the app on mobile devices
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            e.preventDefault();
            const appUrl = "ubereats://store/kVOTcHp3W06MryRUirVDLQ";
            const webUrl = "https://www.ubereats.com/store/la-medusa/kVOTcHp3W06MryRUirVDLQ?diningMode=DELIVERY&ps=1&surfaceName=";
            
            // Try to open the app
            window.location.href = appUrl;
            
            // Fallback to web if app is not installed (after 1.5 seconds)
            setTimeout(() => {
                window.open(webUrl, '_blank');
            }, 1500);
        }
    };

    return { handleOrderClick };
};
