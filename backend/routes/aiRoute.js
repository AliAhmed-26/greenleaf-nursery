import express from "express";
import auth_middleware from "../middleware/userMiddleware.js";
import Product from "../models/productModel.js";
const router = express.Router();



router.post("/chat", auth_middleware, async (req, res) => {
    const { prompt } = req.body;

    if (!prompt?.trim()) {
        return res.status(400).json({ message: "Prompt is empty" });
    }

    let category = null;
    let sort_by_price_des = false;
    
   const user_prompt = prompt.toLowerCase();

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
   
let request_query;
   if (
    user_prompt.includes("cheap") ||
    user_prompt.includes("low cost") ||
    user_prompt.includes("budget") ||
    user_prompt.includes("affordable")
)
     {
    sort_by_price_des = true
    }
    
if (sort_by_price_des && category) {
   
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

        // console.log("API Response:", JSON.stringify(data, null, 2));

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

        const text = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({
            message: "Failed to generate response",
            error: error.message
        });
    }
});


export default router

























// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import auth_middleware from "../middleware/userMiddleware.js";
// const router = express.Router();

// const ai = new GoogleGenerativeAI( process.env.GEMINI_API_KEY)

// router.post("/chat", auth_middleware, async (req, res) => {
//     const prompt = req.body.prompt
//     console.log(process.env.GEMINI_API_KEY);
//     console.log(process.env.GEMINI_API_KEY?.length);
//     if (!prompt) {
//         return res.status(400).json({
//             message: "Prompt is empty"
//         })
//     }
//     try {
//         const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
//         const result = await model.generateContent(
//             `You are an AI assistant for an online plant store.
//             Only answer questions about Plants, Gardening, Fertilizers, Plant care.
            
//             User Question: ${prompt}`
//         );


//         const text = result.response.text();


//         res.status(200).json({ reply: text });
//     } catch (error) {
//         console.error("Error:", error.message);
//         res.status(500).json({
//             message: "Failed to generate AI response",
//             error: error.message
//         });
//     }

// })


