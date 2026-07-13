import express from "express";
import auth_middleware from "../middleware/userMiddleware.js";
import Product from "../models/productModel.js";
const router = express.Router();


// <---------- AI chat endpoint --------->

router.post("/chat", auth_middleware, async (req, res) => {
    let request_query;
    const { prompt } = req.body;

    if (!prompt?.trim()) {
        return res.status(400).json({ message: "Prompt is empty" });
    }

    // <--------- Variables used for filtering products ------->

    let category = null;
    let sort_by_price_des = false;
    
   const user_prompt = prompt.toLowerCase();

    // <------- Detect requested category from the user's prompt ----->

   if (user_prompt.includes("indoor")) {
    category = "Indoor"
   }
   else if (user_prompt.includes("outdoor")) {
    category = "Outdoor"
   }
   else if (user_prompt.includes("flowering")) {
    category = "Flowering"
   }
   else if (user_prompt.includes("succulent")) {
    category = "Succulent"
   }
   
    
   if (
    user_prompt.includes("cheap") ||
    user_prompt.includes("low cost") ||
    user_prompt.includes("budget") ||
    user_prompt.includes("affordable")
    )
     {
    sort_by_price_des = true
    }

    // <-------- Detect if user wants low-priced products ------>
    
    if (sort_by_price_des && category) {
   
    // <-------- Filter by category and sort by lowest price ------->

    request_query = await Product.find({
        category : category
    }).sort({price:1})
    }
    else if (!category && sort_by_price_des) {
    request_query = await Product.find().sort({price : 1})
    }
    else if ( category &&!sort_by_price_des ) {
    
     request_query = await Product.find({
        category : category
    })
    }
    else {
    request_query = await Product.find()

    }

    // <------ Convert product objects into plain text for Gemini ------>

    const products = request_query.map(e=>{
        return `Title: ${e.title} | Category: ${e.category} | Price: $${e.price}`
    }).join("\n")

    

    try {
        const response = await fetch(
    
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY
            }`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are an AI assistant for an online plant store.
                            These are the ONLY products available in our store:

                            ${products}

                            IMPORTANT:
                            - Recommend ONLY products from the list above.
                            - Never mention or recommend products that are not listed.
                            - If the requested product is unavailable, say:
                            "Sorry, this product is not currently available in our store."
                            - Do not use your general knowledge to suggest other plants.
                            Only answer questions about:
                            - Plants
                            - Gardening
                            - Fertilizers
                            - Plant care
                            Rules:
                            - Keep every answer under 50 words.
                            - Give short, practical and point to point answers.
                            - Use simple English.
                            - If the user asks something unrelated to plants or gardening, reply:
                            "I can only help with plant and gardening related questions."

                            User Question: ${prompt}`
                        }]
                    }]
                })
            }
        );

        const data = await response.json();


        if (!response.ok) {
            return res.status(response.status).json({
                error: data.error?.message || "API error"
            });
        }

        if (!data.candidates || !data.candidates[0]) {
            return res.status(500).json({
                error: "No response from AI",
                debug: data
            });
        }

        // <------- Extract AI reply and send to frontend -------->

        const text = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: text });

    } catch (error) {

        // <------ Handle unexpected server/API errors --------->

        console.error("Gemini API Error:", error);
        res.status(500).json({
            message: "Failed to generate response",
            error: error.message
        });
    }
});


export default router
