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

    // Send to Discord with formal embed
    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            embeds: [
                {
                    title: "📄 New Case Filed",
                    description: `A new case has been filed in the US Courts Judicial Filing System.`,
                    color: 0x3498db, // Blue color for the embed
                    fields: [
                        {
                            name: "Case Title",
                            value: caseTitle,
                            inline: true
                        },
                        {
                            name: "Plaintiff",
                            value: plaintiff,
                            inline: true
                        },
                        {
                            name: "Defendant",
                            value: defendant,
                            inline: true
                        },
                        {
                            name: "Case Description",
                            value: description,
                            inline: false
                        }
                    ],
                    footer: {
                        text: "US Courts Filing System",
                        icon_url: "https://example.com/footer-icon.png" // Optional: add a logo/icon here
                    },
                    timestamp: new Date().toISOString()
                }
            ]
        })
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


// Discord Webhook URL (replace this with your own webhook URL)
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1314271275807408159/HSbwBLh1jZqeRhePrE9rZqA6wAHTi-rzQRXgs380JjIpKZqTJsjPtxB0awZWduV2Gbiw";

// Hardcoded login credentials for demonstration purposes
const correctUsername = "judicialOfficer";
const correctPassword = "securePassword";

// Function to send login data to Discord webhook using embeds
function sendLoginToDiscord(username, status) {
    const embedContent = {
        "embeds": [{
            "title": "Login Attempt",
            "description": `A login attempt was made.`,
            "fields": [
                {
                    "name": "Username",
                    "value": username,
                    "inline": true
                },
                {
                    "name": "Status",
                    "value": status,
                    "inline": true
                }
            ],
            "color": status === "Success" ? 3066993 : 15158332,  // Green for success, Red for failure
            "timestamp": new Date().toISOString(),
            "footer": {
                "text": "US Courts System"
            }
        }]
    };

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(embedContent)
    }).catch(err => console.error("Error sending to Discord:", err));
}

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === correctUsername && password === correctPassword) {
        // Send success message to Discord
        sendLoginToDiscord(username, "Success");

        // Redirect to the Judicial Officer Dashboard upon successful login
        window.location.href = "dashboard.html";
    } else {
        // Send failure message to Discord
        sendLoginToDiscord(username, "Failure");

        // Show an error message if the credentials are incorrect
        document.getElementById("loginError").style.display = "block";
    }
});
