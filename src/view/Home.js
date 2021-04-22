/* eslint-disable max-len */

const Home = () => {
  return (
    <>
      <div className={'row-cols'}>
        <div className={'col-12 banner'}>This is banner lol</div>
      </div>
      <div className={'row-cols d-flex justify-content-center mt-3'}>
        <div className={'col-6'}>
          <ul
            className={'d-flex home-sort-ul justify-content-between list-unstyled'}>
            <li className={'home-sort-li'}><a className="nav-link"
              href="#asd1">asd1</a></li>
            <li className={'home-sort-li'}><a className="nav-link"
              href="#asd2">asd2</a></li>
            <li className={'home-sort-li'}><a className="nav-link"
              href="#asd3">asd3</a></li>
            <li className={'home-sort-li'}><a className="nav-link"
              href="#asd4">asd4</a></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
