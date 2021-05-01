import Ratings from 'react-ratings-declarative';
import {useState} from 'react';

const RatingForm = () => {
  const [rating, setRating] = useState({});
  const changeRating = (newRating) => {
    setRating({rating: newRating});
  };
  return (
    <Ratings
      rating={rating}
      widgetRatedColors="yellow"
      changeRating={changeRating}>
      <Ratings.Widget />
    </Ratings>
  );
};

export default RatingForm;
