import React from "react";
import RecommendationCard, { PlaceInfo } from "./RecommendationCard";

const RecommendationsGridView = () => {
  return (
    <div style={{ overflow: "scroll" }} className="h-[75%]">
      <div className="flex grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 mx-4">
        {places.map((place) => (
          <RecommendationCard
            key={place.id}
            name={place.name}
            imageUrl={place.imageUrl}
            id={place.id}
            reviews={place.reviews}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationsGridView;

const places: PlaceInfo[] = [
  {
    id: "pl-1",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 234,
  },
  {
    id: "pl-2",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 434,
  },
  {
    id: "pl-3",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 984,
  },
  {
    id: "pl-4",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 4434,
  },
  {
    id: "pl-5",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 234,
  },
  {
    id: "pl-6",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 434,
  },
  {
    id: "pl-7",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 984,
  },
  {
    id: "pl-8",
    name: "Great France Style Hotel",
    imageUrl:
      "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg",
    reviews: 4434,
  },
];
