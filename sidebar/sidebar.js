document.addEventListener("DOMContentLoaded", async () => {
    try {
        const result = await browser.storage.local.get("nextcloudUrl");
        
        if (result.nextcloudUrl) {
            // Redirect the current panel (sidebar) to the saved Nextcloud URL
            window.location.replace(result.nextcloudUrl);
        } else {
            // Show welcome message and options button if no URL is saved
            document.getElementById("message-container").style.display = "block";
        }
    } catch (error) {
        console.error("Error loading URL:", error);
    }
});

// Listener to open options page directly from the sidebar
document.getElementById("open-options").addEventListener("click", () => {
    browser.runtime.openOptionsPage();
});

// Listen for storage changes in real-time
// Redirects the sidebar immediately when the user saves the URL in the options page
browser.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.nextcloudUrl && changes.nextcloudUrl.newValue) {
        window.location.replace(changes.nextcloudUrl.newValue);
    }
});
