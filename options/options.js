document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("settings-form").addEventListener("submit", saveOptions);

// Restore the previously saved URL when the page loads
async function restoreOptions() {
    try {
        const result = await browser.storage.local.get("nextcloudUrl");
        if (result.nextcloudUrl) {
            document.getElementById("nextcloud-url").value = result.nextcloudUrl;
        }
    } catch (error) {
        console.error("Error loading settings:", error);
    }
}

// Save the new URL when the form is submitted
async function saveOptions(e) {
    e.preventDefault();
    let urlInput = document.getElementById("nextcloud-url").value;
    const statusMessage = document.getElementById("status-message");

    // Normalize the URL to include the notes app path automatically
    urlInput = urlInput.trim();
    if (!urlInput.endsWith("/apps/notes") && !urlInput.endsWith("/apps/notes/")) {
        if (!urlInput.endsWith("/")) {
            urlInput += "/";
        }
        urlInput += "apps/notes/";
        
        // Update the input field so the user sees the complete path
        document.getElementById("nextcloud-url").value = urlInput;
    }

    try {
        await browser.storage.local.set({ nextcloudUrl: urlInput });
        
        // Display success message
        statusMessage.textContent = "Configurações salvas com sucesso!";
        statusMessage.className = "success";
        
        // Hide message after 3 seconds
        setTimeout(() => {
            statusMessage.className = "hidden";
        }, 3000);
        
    } catch (error) {
        console.error("Error saving settings:", error);
        statusMessage.textContent = "Erro ao salvar.";
        statusMessage.className = "error";
    }
}
