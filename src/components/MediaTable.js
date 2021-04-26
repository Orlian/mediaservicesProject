import {useMedia} from '../hooks/ApiHooks';
import MediaRow from './MediaRow';

const MediaTable = () => {
  const {mediaArray} = useMedia(true);
  console.log('MediaArray', mediaArray);
  return (
    <div className="container">
      <div className="row">
        {
          mediaArray.map((item) =>
            <div className="col-4" key={item.file_id}>
              <MediaRow file={item} />
            </div>)
        }
      </div>
    </div>
  );
};
export default MediaTable;
