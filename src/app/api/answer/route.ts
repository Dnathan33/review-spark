import { getTadvisorLocationReviews } from "@/serverApi/tripAdvisor/trip-advisor-apis";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface Request extends NextRequest {
  userPrefs: string;
  placeUrls: string[];
}

const ROLE = `You are a travel guide. Given a list of 5 houses, I want you to recommend a list of the 3 best
    house rentals for a given user based on the reviews for each house. The list should contain at most
    3 houses but can contain fewer than 3.`;

const EX_USER_PREFS = "I want a house that is comfortable.";
// const EX_USER_RECOMMENDATION = `Based on the reviews provided, Hotel X is a good choice.`;

const EX_USER_RECOMMENDATION = `Hotel X is a good choice for User1 due to Review1A. Hotel Y is also a good choice because of Review2A.`;

export async function POST(req: Request) {
  try {
    const { userPrefs, placeUrls } = await req.json();
    const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;
    const openAISecretKey = process.env.OPENAI_SECRET_KEY;
    const model = new OpenAI({ apiKey: openAISecretKey });

    let locationsReviews: string[] = [];

    if (!tripAdvisorApiKey) return;

    for (const url of placeUrls) {
      const review = await getTadvisorLocationReviews(url, tripAdvisorApiKey);
      locationsReviews.push(review);
    }

    const response = await model.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `${ROLE}`,
        },
        {
          role: "assistant",
          content: `${locationsReviews}`,
        },
        {
          role: "user",
          content: `${EX_USER_PREFS}`,
        },
        {
          role: "assistant",
          content: `${EX_USER_RECOMMENDATION}`,
        },
        {
          role: "user",
          content: `${userPrefs}`,
        },
      ],
      temperature: 0.25,
      //   maxTokens: 2000,
      //   topP: 1,
      //   frequencyPenalty: 0,
      // presencePenalty: 0,
    });

    return NextResponse.json(
      {
        success: true,
        value: response.choices[0].message.content,
      },
      { status: 200 }
    );
  } catch (err) {
    console.warn(err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get reviews",
      },
      { status: 500 }
    );
  }
}
