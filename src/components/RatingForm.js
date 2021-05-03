/* eslint-disable max-len */
import Ratings from 'react-ratings-declarative';
import PropTypes from 'prop-types';
import {useRating} from '../hooks/ApiHooks';

const RatingForm = ({rating, setRating, user, fileId}) => {
  const {postRating, deleteRating} = useRating(user, fileId);
  console.log('current rating', rating);
  const changeRating = async (newRating) => {
    try {
      if (rating !== 0) {
        const deleteResponse = await deleteRating(fileId, localStorage.getItem('token'));
        console.log('newRating delete', deleteResponse);
      }
      const response = await postRating(localStorage.getItem('token'), fileId, newRating);
      console.log('newRating response', response);
      if (response) {
        setRating(newRating);
      }
    } catch (e) {

    }
  };
  return (
    <Ratings
      rating={rating}
      widgetRatedColors="orange"
      changeRating={changeRating}>
      <Ratings.Widget widgetDimension="30px" widgetSpacing="5px"/>
      <Ratings.Widget widgetDimension="30px" widgetSpacing="5px"/>
      <Ratings.Widget widgetDimension="30px" widgetSpacing="5px"/>
      <Ratings.Widget widgetDimension="30px" widgetSpacing="5px"/>
      <Ratings.Widget widgetDimension="30px" widgetSpacing="5px"/>
    </Ratings>
  );
};

RatingForm.propTypes = {
  rating: PropTypes.number,
  setRating: PropTypes.func,
  user: PropTypes.object,
  fileId: PropTypes.number,
};

export default RatingForm;
