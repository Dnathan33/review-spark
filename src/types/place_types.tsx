export type PlaceReview = {
    id: string,
    reviewContent?: string
}

export type PlaceDetail = {
  location_id: string;
  address_obj: PlaceAddress;
  amenities: string[];
  awards: PlaceAward[];
  category: PlaceCategory;
  description: string;
  latitude: string;
  longitude: string;
  name: string;
  num_reviews: string;
  phone: string;
  placeUrls: string[];
};

export type PlaceImageData = {
    id: number;
    is_blessed: boolean;
    caption: string;
    published_date: string;
    images: {
      thumbnail: ImageInfo;
      small: ImageInfo;
      medium: ImageInfo;
      large: ImageInfo;
      original: ImageInfo;
    };
    album: string;
    source: {
      name: string;
      localized_name: string;
    };
    user: {
      username: string;
    };
  };

export type SamplePropmt = {
  id: string
  prompt: string
}

type ImageInfo = {
    height: number;
    width: number;
    url: string;
  };

type PlaceAddress = {
    street1: string
    city: string
    state: string
    country: string
    postalcode: string
    address_string: string
}

type PlaceAward = {
    award_type: string
    categories: string[]
    display_name: string
    year: string
}

type PlaceCategory = {
    name: string
    localized_name: string
}
