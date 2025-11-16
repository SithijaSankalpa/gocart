import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { openai } from "@/configs/openai";

async function main(base64Image, mimeType) {
  const messages = [
    {
      "role": "system",
      "content": `You are a product listing assistant for an e-commerce store.
      Your job is to analyze an image of a product and generate structured data about the product.
      
      Respond ONLY with raw JSON (no code block, no markdown, no explanation) 
      The JSON must strictly follow this schema:
      {
        "name": "string",
        "description": "string"
      }`
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Analyze this image and return name and description in JSON format.",
        },
        {
          "type": "image_url",
          "image_url": {
            "url": `data:${mimeType};base64,${base64Image}`,
            // Add detail parameter for Gemini compatibility
            "detail": "auto"
          },
        },
      ],
    }
  ];
  
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    messages,
    max_tokens: 300,
    // Add temperature for more consistent JSON output
    temperature: 0.1,
  });

  const raw = response.choices[0].message.content;
  
  // More robust cleaning of markdown artifacts
  const cleaned = raw
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (error) {
    console.error("Failed to parse AI response:", raw);
    throw new Error("AI did not return valid JSON.");
  }
  
  // Validate the response has required fields
  if (!parsed.name || !parsed.description) {
    throw new Error("AI response missing required fields (name or description).");
  }
  
  return parsed;
}

export async function POST(request) {
  try {
    const {userId} = getAuth(request);
    const isSeller = await authSeller(userId);
    
    if(!isSeller){
      return NextResponse.json({error: 'Not Authorized'}, {status: 401});
    }
    
    const {base64Image, mimeType} = await request.json();
    
    if (!base64Image || !mimeType) {
      return NextResponse.json({error: 'Missing base64Image or mimeType'}, {status: 400});
    }
    
    const result = await main(base64Image, mimeType);
    return NextResponse.json({...result});
    
  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to analyze image' 
    }, { status: 400 });
  }
}