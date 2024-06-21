import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { text } = await req.json();
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: {
      authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU3NjM3YzktNTBmZS00MmI3LWE2NzctNGVmZDJhNjE4MmUxIiwidHlwZSI6ImFwaV90b2tlbiJ9.-4p9Je4QJ5IJskX1WJKDL29NR85nSQsQrULHpj5DMHk",
    },
    data: {
      providers: "cohere",
      text: text,
      temperature: 0.2,
      max_tokens: 1000,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("API Response:", response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API Request Error:", error);
    return NextResponse.json({ message: "Error generating text", error: error.message });
  }
}
