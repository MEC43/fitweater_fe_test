import style from '../css/Header.module.css';
import { useEffect, useState, useCallback } from 'react';
import useFetchStore from '../store/fetchStore';
import Nav from './Nav';

const Header = () => {
  const [navOpen, setNavOpen] = useState(window.innerWidth >= 909);
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    setRegionFirstName,
    setRegionSecondName,
  } = useFetchStore();
  const [regionthirdName, setRegionthirdName] = useState('');
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => setNavOpen(window.innerWidth >= 909);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_JS_KEY}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log('Kakao Maps API loaded successfully');
        setKakaoLoaded(true);
      });
    };
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  const regionName = useCallback(() => {
    if (
      !window.kakao ||
      !window.kakao.maps ||
      !location.latitude ||
      !location.longitude
    ) {
      console.error(
        'Kakao Maps API is not loaded or location is not available'
      );
      return;
    }

    const geocoder = new window.kakao.maps.services.Geocoder();
    const coords = new window.kakao.maps.LatLng(
      location.latitude,
      location.longitude
    );

    geocoder.coord2RegionCode(
      coords.getLng(),
      coords.getLat(),
      (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const region =
            result.find((item) => item.region_type === 'H') || result[0];
          setRegionFirstName(region.region_1depth_name);
          setRegionSecondName(region.region_2depth_name);
          setRegionthirdName(region.region_3depth_name);

          localStorage.setItem('regionFirstName', region.region_1depth_name);
          localStorage.setItem('regionSecondName', region.region_2depth_name);
          localStorage.setItem('regionthirdName', region.region_3depth_name);

          console.log(
            'Region information retrieved:',
            region.region_1depth_name,
            region.region_2depth_name,
            region.region_3depth_name
          );
        } else {
          console.error('Failed to retrieve region information', status);
        }
      }
    );
  }, [location, setRegionFirstName, setRegionSecondName]);

  useEffect(() => {
    if (kakaoLoaded) {
      fetchLocation();
    }
  }, [kakaoLoaded, fetchLocation]);

  useEffect(() => {
    if (kakaoLoaded && location.latitude && location.longitude) {
      regionName();
    }
  }, [kakaoLoaded, location, regionName]);

  const refresh = () => {
    console.log('Refreshing location and region information');
    fetchLocation();
  };

  return (
    <header className={style.hd}>
      <div className={`mw ${style.top}`}>
        <img
          className={style.ham}
          src="img/icons/common/ham.svg"
          alt="햄버거버튼"
          onClick={() => setNavOpen(!navOpen)}
        />
        <h1 id="myAddr">
          {regionFirstName} {regionSecondName} {regionthirdName}
        </h1>
        <button className={style.refreshBtn} onClick={refresh}>
          <img
            className={style.refresh}
            src="img/icons/common/refresh.svg"
            alt="새로고침"
          />
        </button>
      </div>
      <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
    </header>
  );
};

export default Header;
