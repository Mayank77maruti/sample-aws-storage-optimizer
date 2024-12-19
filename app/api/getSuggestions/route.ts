// import { NextRequest, NextResponse } from "next/server";
// import Groq from "groq-sdk";

// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(req: NextRequest) {
//   const { recipe , modifierType } = await req.json();
//   // console.log(recipe);
//   const prompt = `Modify the following recipe ${recipe}  , provide response with proper space and heading`;

//   const resp = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: prompt,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });

//   const outputText = resp.choices[0]?.message?.content || "";

//   return NextResponse.json({ outputText });
// }

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const { recipe} = await req.json();

  // Create a prompt based on the modifier type
  let prompt = `Modify the description for the following product: ${recipe}.\nProvide the response with proper spacing and headings without ** signs.`;


  const resp = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
  });

  const outputText = resp.choices[0]?.message?.content || "";

  return NextResponse.json({ outputText });
}
