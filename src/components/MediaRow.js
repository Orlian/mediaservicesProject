import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const MediaRow = ({file}) => {
  return (
    <>
      <img
        src={uploadsUrl + file.thumbnails ? file.thumbnails.w320 : 'https://placekitten.com/320/320'}
        alt={file.title}
      />
    </>
  );
};
MediaRow.propTypes = {
  file: PropTypes.object,
};
export default MediaRow;
