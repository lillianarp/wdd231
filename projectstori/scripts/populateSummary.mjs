export function populateFormSummary() {
    // grab data from localStorage
    const feedbackData = JSON.parse(localStorage.getItem("feedbackData"));
    console.log("Feedback Data:", feedbackData);

    if (!feedbackData) {
        console.error("No feedback data found in localStorage.");
        return;
    }

    const formSummary = document.getElementById("form-summary");

    if (formSummary) {
        // capitalize first letters
        function capitalizeWords(string) {
            return string
                .split(" ")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }

        const summaryHTML = Object.entries(feedbackData).map(([key, value]) => {
            if (!value) {
                value = "Not provided";
            }
            // display timestamp
            if (key === "timestamp") {
                return `<p><strong>Submitted On:</strong> ${value}</p>`;
            }

            const formattedKey = capitalizeWords(key.replace(/-/g, " "));
            return `<p><strong>${formattedKey}:</strong> ${value}</p>`; // make the text pretty 
        }).join(""); 

        formSummary.innerHTML = summaryHTML;

    } else {
        console.error("Form-summary element not found.");
    }
}

