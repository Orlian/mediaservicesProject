/* eslint-disable max-len */
import MediaTable from '../components/MediaTable';

const Home = () => {
  return (
    <>
      <div className={'row-cols'}>
        <div className={'col-12 banner'}>This is banner lol</div>
      </div>
      <div className={'row-cols d-flex justify-content-center mt-3'}>
        <div className={'col-6'}>
          <MediaTable />
        </div>
      </div>
    </>
  );
};

export default Home;
