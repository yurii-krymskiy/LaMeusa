export const useUberEatsLink = () => {
    const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Try to open the app on mobile devices
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            e.preventDefault();
            const appUrl = "ubereats://store/kVOTcHp3W06MryRUirVDLQ";
            const webUrl = "https://www.ubereats.com/store/la-medusa/kVOTcHp3W06MryRUirVDLQ?diningMode=DELIVERY&ps=1&surfaceName=";

            // Try to open the app via a hidden iframe so an unrecognized
            // custom scheme fails silently instead of showing Safari's
            // "address is invalid" error page.
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = appUrl;
            document.body.appendChild(iframe);

            // Fallback to web if app is not installed.
            // Using location.href (not window.open) avoids Safari's popup
            // blocker, which would otherwise silently drop a window.open
            // call made from inside a setTimeout.
            setTimeout(() => {
                document.body.removeChild(iframe);
                window.location.href = webUrl;
            }, 600);
        }
    };

    return { handleOrderClick };
};
