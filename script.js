// Discord Webhook URL
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1314271275807408159/HSbwBLh1jZqeRhePrE9rZqA6wAHTi-rzQRXgs380JjIpKZqTJsjPtxB0awZWduV2Gbiw";

// Load cases from localStorage
let cases = JSON.parse(localStorage.getItem("cases")) || [];

// Function to render the case list
function renderCases() {
    const caseList = document.getElementById("caseList");
    caseList.innerHTML = "";

    cases.forEach((c, index) => {
        const caseElement = document.createElement("div");
        caseElement.innerHTML = `
            <h3>${c.caseTitle}</h3>
            <p><strong>Plaintiff:</strong> ${c.plaintiff}</p>
            <p><strong>Defendant:</strong> ${c.defendant}</p>
            <p><strong>Description:</strong> ${c.description}</p>
            <button onclick="deleteCase(${index})">Delete Case</button>
        `;
        caseList.appendChild(caseElement);
    });
}

// Add event listener for the form
document.getElementById("fileCaseForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect case data
    const caseTitle = document.getElementById("caseTitle").value;
    const plaintiff = document.getElementById("plaintiff").value;
    const defendant = document.getElementById("defendant").value;
    const description = document.getElementById("description").value;

    const newCase = { caseTitle, plaintiff, defendant, description };

    // Save to localStorage
    cases.push(newCase);
    localStorage.setItem("cases", JSON.stringify(cases));

    // Send to Discord
    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            content: `New Case Filed:\n**Title:** ${caseTitle}\n**Plaintiff:** ${plaintiff}\n**Defendant:** ${defendant}\n**Description:** ${description}`
        }),
    });

    // Reset form and re-render cases
    e.target.reset();
    renderCases();
});

// Function to delete a case
function deleteCase(index) {
    cases.splice(index, 1);
    localStorage.setItem("cases", JSON.stringify(cases));
    renderCases();
}

// Initial render
renderCases();
