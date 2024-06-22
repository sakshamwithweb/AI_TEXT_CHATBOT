import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { text } = await req.json();
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/generation",
    headers: {
      authorization:
        "Bearer {APi key i have removed}",
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
