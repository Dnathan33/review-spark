import {
  getTadvisorPlaceDetail,
  getTripAdvisorPlacePhotos,
  parseTadvisorLocationID,
} from "@/serverApi/tripAdvisor/trip-advisor-apis";
import { NextRequest, NextResponse } from "next/server";

interface Request extends NextRequest {
  locationId: string;
}

export async function POST(req: Request) {
  try {
    const { placeUrl } = await req.json();

    if (!placeUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "placeUrl is required",
        },
        { status: 400 }
      );
    }

    const locationID = parseTadvisorLocationID(placeUrl);
    const placeDetail = await getTadvisorPlaceDetail(locationID);
    const placePhotos = await getTripAdvisorPlacePhotos(locationID);
    const extractedImages = placePhotos.map((photo) => photo.images);

    let placeImages: string[] = [];

    for (const photo of extractedImages) {
      placeImages = [...placeImages, photo.large.url];
    }

    placeDetail.placeUrls = placeImages;

    return NextResponse.json(
      {
        success: true,
        value: placeDetail,
      },
      { status: 200 }
    );
  } catch (err) {
    console.warn(err);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to get place details",
      },
      { status: 500 }
    );
  }
}
