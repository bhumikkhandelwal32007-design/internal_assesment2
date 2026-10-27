
// =========================================
// BHUMIK KHANDELWAL
// AI PORTFOLIO CHATBOT
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const chatForm = document.getElementById("chatForm");
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const chatStatus = document.getElementById("chatStatus");
    const sendButton = document.getElementById("chatSend");

    // Check chatbot elements
    if (!chatForm || !chatInput || !chatMessages) {
        console.error("Bhumik's chatbot elements were not found.");
        return;
    }


    // =========================================
    // ADD MESSAGE
    // =========================================

    function addMessage(text, type) {

        const message = document.createElement("div");

        message.className =
            type === "user"
                ? "user-message"
                : "bot-message";

        const p = document.createElement("p");

        p.textContent = text;

        message.appendChild(p);

        chatMessages.appendChild(message);

        // Scroll to latest message
        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        return message;
    }


    // =========================================
    // LOADING MESSAGE
    // =========================================

    function addLoadingMessage() {

        const message =
            document.createElement("div");

        message.className =
            "bot-message loading-message";

        message.textContent =
            "Bhumik's AI assistant is thinking...";

        chatMessages.appendChild(message);

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        return message;
    }


    // =========================================
    // SEND MESSAGE
    // =========================================

    async function sendMessage(event) {

        event.preventDefault();

        const message =
            chatInput.value.trim();

        if (!message) {
            return;
        }


        // Show user's message
        addMessage(message, "user");


        // Clear input
        chatInput.value = "";


        // Disable input while AI responds
        chatInput.disabled = true;

        if (sendButton) {
            sendButton.disabled = true;
        }


        // Update status
        if (chatStatus) {
            chatStatus.textContent =
                "Connecting to Bhumik's AI assistant...";
        }


        // Show loading message
        const loadingMessage =
            addLoadingMessage();


        try {

            // =========================================
            // SEND REQUEST TO VERCEL API
            // =========================================

            const response = await fetch("/api/chat", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    message: message
                })

            });


            // Try to read JSON response
            const data =
                await response.json();


            // Remove loading message
            if (loadingMessage) {
                loadingMessage.remove();
            }


            // Check server response
            if (!response.ok) {

                throw new Error(
                    data.error ||
                    `Server error: ${response.status}`
                );

            }


            // Accept different API response names
            const answer =
                data.answer ||
                data.response ||
                data.message ||
                data.reply;


            // Check for empty response
            if (!answer) {

                throw new Error(
                    "AI returned an empty response."
                );

            }


            // Show AI response
            addMessage(answer, "bot");


            // Connected status
            if (chatStatus) {

                chatStatus.textContent =
                    "Bhumik's AI assistant is connected.";

            }

        } catch (error) {

            console.error(
                "Bhumik chatbot error:",
                error
            );


            // Remove loading message
            if (loadingMessage) {
                loadingMessage.remove();
            }


            // Show friendly error
            addMessage(
                "Sorry, I couldn't connect to the AI right now. Please try again.",
                "bot"
            );


            if (chatStatus) {

                chatStatus.textContent =
                    "Connection failed. Please try again.";

            }

        } finally {

            // Enable input again
            chatInput.disabled = false;

            if (sendButton) {
                sendButton.disabled = false;
            }

            // Return cursor to input
            chatInput.focus();

        }

    }


    // =========================================
    // FORM SUBMISSION
    // =========================================

    chatForm.addEventListener(
        "submit",
        sendMessage
    );


    // =========================================
    // ENTER KEY
    // =========================================

    chatInput.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                chatForm.requestSubmit();

            }

        }
    );

});
