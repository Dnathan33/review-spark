import { PlaceDetail, PlaceImageData } from "@/types/place_types";
import axios from "axios";

export async function getTadvisorLocationReviews(
  url: string,
  apiKey: string
): Promise<string> {
  const locationID = parseTadvisorLocationID(url);
  if (locationID === "") {
    return "";
  }

  let data;
  try {
    data = await getTadvisorReviewData(locationID, apiKey);
  } catch (error) {
    console.error("Error fetching review data:", error);
    return "";
  }

  if (!data || !data["data"]) {
    return "";
  }

  let reviewData = "";
  for (const property of data["data"]) {
    const reviewText = property["text"].replace(/\n/g, " ");
    const locationDetail = await getTadvisorPlaceDetail(locationID);

    reviewData += `A review for ${locationDetail.name}: ${reviewText}   `;
  }

  if (reviewData === "") {
    reviewData = `No reviews for property ${locationID}`;
  }

  return reviewData;
}

export async function getTadvisorPlaceDetail(
  locationID: string
): Promise<PlaceDetail> {
  const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;

  const headers = { accept: "application/json" };
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/details?language=en&currency=USD&key=${tripAdvisorApiKey}`;

  try {
    const response = await axios.get(url, { headers });
    return response.data as PlaceDetail;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getTripAdvisorPlacePhotos(
  locationID: string
): Promise<PlaceImageData[]> {
  const tripAdvisorApiKey = process.env.TRIP_ADVISOR_API_KEY;

  const headers = { accept: "application/json" };
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/photos?key=${tripAdvisorApiKey}&key=23A322B1541148B887FEE7235085A529&language=en`;
  try {
    const response = await axios.get(url, { headers });
    return response.data.data as PlaceImageData[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export function parseTadvisorLocationID(url: string): string {
  let locationID = "";

  // URL format - https://api.content.tripadvisor.com/api/v1/location/3627213/reviews?key=6E1FB246B1DB49D2A0CC7A02837FADCF&language=en
  let regex1 = /https.*tripadvisor.com\/.*\/location\/(\d+)\D*/;
  let match1 = url.match(regex1);
  if (match1) {
    locationID = match1[1];
    return locationID;
  }

  // Alternate URL format - https://www.tripadvisor.com/VacationRentalReview-g33037-d11589491-Sunny_Sprawling_Estate_25_Minutes_From_SF_And_Wine_Country_Outdoor_Life_Pool-San_Rafae.html
  let regex2 = /https.*tripadvisor.com\/.*-g\d+-d(\d+)-.*/;
  let match2 = url.match(regex2);
  if (match2) {
    locationID = match2[1];
  }

  return locationID;
}

async function getTadvisorReviewData(
  locationID: string,
  apiKey: string
): Promise<any> {
  const headers = { accept: "application/json" };
  const url = `https://api.content.tripadvisor.com/api/v1/location/${locationID}/reviews?key=${apiKey}&language=en`;

  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
