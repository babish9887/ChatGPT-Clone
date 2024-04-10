import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "../../../../firebaseAdmin";
import { GoogleGenerativeAI } from "@google/generative-ai";

 async function handler(req:NextRequest, response:NextResponse) {

    const { prompt, id, model, session } =await  req.json();
    if (!prompt) {
        return NextResponse.json({
            message: "Please provide a prompt"
        },{status:400})
    }

    if (!id) {
        return NextResponse.json({
            message: "Provide valid ID"
        },{status:400})
    }

    try {
//@ts-ignore
            const genAI = new GoogleGenerativeAI(process.env.API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const result = await model.generateContent(prompt);
            const res = result.response;
        const message = {
            text: res.text() || "ChatGPT was unable to find an answer for that!",
            createdAt:new Date(),
            user: {
                _id: "ChatGPT",
                name: "ChatGPT",
                avatar: 'https://static.vecteezy.com/system/resources/previews/021/059/825/original/chatgpt-logo-chat-gpt-icon-on-green-background-free-vector.jpg'
            }
        };

        await adminDb
            .collection('users')
            .doc(session?.user?.email)
            .collection('chats')
            .doc(id)
            .collection("messages")
            .add(message);

    

      return NextResponse.json({
            answer: res.text(),
            status:true
      },{status:200})
            

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({
            message: "Internal server error"
        },{status:500})
    }
}

export { handler as POST };
