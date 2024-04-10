// import openai from "./chatgpt";

// const query = async (prompt:string, id:string, model:string) => {
//     try {
//         const res = await openai.createCompletion({
//             model: model || "davinci-002",
//             prompt,
//             temperature: 0.9,
//             max_tokens: 1000,
//             frequency_penalty: 0,
//             presence_penalty: 0
//         });
//         console.log("Here is the response", res);
//         return "Payena";
//     } catch (error:any) {
//         if (error.response && error.response.status === 429) {
//             // Implement backoff strategy
//             console.log("Rate limit exceeded. Waiting and retrying...");
//             await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds
//             return query(prompt, id, model); // Retry the request
//         } else {
//             console.log("ChatGPT encountered an error:", error.message);
//             throw error;
//         }
//     }
// };
// 
// export default query


// import OpenAI from "openai";

// const openai = new OpenAI();

// const query=async (prompt: string)=> {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: "system", content:prompt }],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
//   return {message: "Not found"}
// }

// export default query




// import axios from "axios";
// import OpenAI from "openai";

// const openai = new OpenAI({
//   organization: 'org-78ddiCptU84ZvrFwg50VOvkT',
// });
// const query=async(prompt, id, model)=>{
//     const res = await fetch('https://api.openai.com/v1/chat/completions',{
//         method:"POST",
//         headers: {
//             "Content-Type":"application/json",
//             "Authorization":"Bearer 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"
//         },
//         body:JSON.stringify({
//             model:"gpt-3.5-turbo",
//             messages:[{role:"user", content:"Say this is a test"}],
//             temperature:0.7
//         })
//     })
//     console.log(res)
//     return "PAyena"
// }

// export default query




import OpenAI from "openai";

const openai = new OpenAI();

const query=async ()=> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: "Who won the world series in 2020?" },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  console.log(completion);
  return "Payena"
}

export default query

