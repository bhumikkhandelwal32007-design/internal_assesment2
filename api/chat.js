// ============================================
// BHUMIK KHANDELWAL - PORTFOLIO AI CHATBOT
// Vercel Serverless Function + Groq
// ============================================

export default async function handler(req, res) {

    // --------------------------------------------
    // CORS
    // --------------------------------------------

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    // Handle browser preflight request
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Only POST is allowed
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed. Use POST."
        });
    }


    // --------------------------------------------
    // CHECK GROQ API KEY
    // --------------------------------------------

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error("GROQ_API_KEY is missing.");

        return res.status(500).json({
            error:
                "GROQ_API_KEY is not configured in Vercel."
        });
    }


    // --------------------------------------------
    // GET USER MESSAGE
    // --------------------------------------------

    const { message } = req.body || {};

    if (!message || typeof message !== "string") {
        return res.status(400).json({
            error: "Please enter a valid message."
        });
    }


    // --------------------------------------------
    // BHUMIK PORTFOLIO INFORMATION
    // --------------------------------------------

    const portfolioContext = `
You are the AI assistant for Bhumik Khandelwal's personal portfolio.

IMPORTANT IDENTITY RULES:
- The portfolio belongs to Bhumik Khandelwal.
- Always refer to the portfolio owner as Bhumik Khandelwal.
- NEVER call the portfolio owner Lavish Sharma.
- NEVER say that this is Lavish Sharma's portfolio.
- Do not invent personal information about Bhumik.
- If information is not available, clearly say that it is not provided in the portfolio.

Bhumik's portfolio currently contains these projects:

1. Book Reading List
2. Bug Fixing
3. Messy Python
4. Python Program
5. Quiz Application

The portfolio contains sections for:
- Home
- About
- Skills
- Projects
- Contact
- AI Portfolio Chatbot

The chatbot should answer questions about Bhumik's portfolio,
projects, skills, education, programming, and technology when
that information is available.

If the user asks about something that is not provided,
respond honestly instead of making up information.

Keep answers helpful, professional, and reasonably concise.
`;


    // --------------------------------------------
    // CALL GROQ
    // --------------------------------------------

    try {

        const groqResponse = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },

                body: JSON.stringify({

                    model: "llama-3.3-70b-versatile",

                    messages: [
                        {
                            role: "system",
                            content: portfolioContext
                        },
                        {
                            role: "user",
                            content: message.trim()
                        }
                    ],

                    temperature: 0.5,

                    max_tokens: 500

                })
            }
        );


        // --------------------------------------------
        // READ GROQ RESPONSE
        // --------------------------------------------

        const data =
            await groqResponse.json();


        // --------------------------------------------
        // HANDLE GROQ ERROR
        // --------------------------------------------

        if (!groqResponse.ok) {

            console.error(
                "Groq API error:",
                data
            );

            return res.status(
                groqResponse.status
            ).json({
                error:
                    data?.error?.message ||
                    "Groq API request failed."
            });
        }


        // --------------------------------------------
        // GET AI ANSWER
        // --------------------------------------------

        const answer =
            data?.choices?.[0]?.message?.content;


        if (!answer) {

            return res.status(500).json({
                error:
                    "The AI returned an empty response."
            });
        }


        // --------------------------------------------
        // SEND ANSWER TO FRONTEND
        // --------------------------------------------

        return res.status(200).json({
            answer: answer.trim()
        });


    } catch (error) {

        console.error(
            "Chatbot server error:",
            error
        );

        return res.status(500).json({
            error:
                "Unable to connect to the AI service."
        });
    }
}