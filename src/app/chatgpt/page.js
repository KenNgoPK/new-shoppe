'use client'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState,useEffect } from "react";


const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const Chatbox = ()=>{
    
    async function chat() {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);

        // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

        const prompt = "Write a story about a magic backpack."

        const result = await model.generateContent(prompt);
        console.log(result.response.text())
    }
    useEffect(()=>{
        chat()
    },[])
    //chạy thằng chat lần đầu khi reload trang

    return(
        <div>
            <h1>ChatBoxAi</h1>


        </div>
    )
}

export default Chatbox;
