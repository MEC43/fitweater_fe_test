import style from '../css/Header.module.css';
import { useEffect, useState } from 'react';
import useFetchStore from '../store/fetchStore';
import Nav from './Nav';

const Header = () => {
  const [navOpen, setNavOpen] = useState(window.innerWidth >= 909); //nav 여닫기
  // navOpen 상태 변화 확인용 콘솔 로그
  useEffect(() => {
    // console.log('navOpen 상태:', navOpen);
  }, [navOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 909) {
        setNavOpen(true);
      } else {
        setNavOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    setRegionFirstName,
    setRegionSecondName,
  } = useFetchStore();
  const [regionthirdName, setRegionthirdName] = useState('');

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    const loadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        setTimeout(loadKakaoMap, 300);
      }
    };

    loadKakaoMap();
  }, [location]);

  const regionName = () => {
    if (
      location.latitude &&
      location.longitude &&
      window.kakao &&
      window.kakao.maps
    ) {
      const { kakao } = window;

      // Kakao Maps API가 로드되었는지 확인합니다.
      if (
        location.latitude &&
        location.longitude &&
        window.kakao &&
        window.kakao.maps
      ) {
        const geocoder = new kakao.maps.services.Geocoder();
        const coords = new kakao.maps.LatLng(
          location.latitude,
          location.longitude
        );

        geocoder.coord2RegionCode(
          coords.getLng(),
          coords.getLat(),
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const region = result.find((item) => item.region_type === 'H');
              if (region) {
                setRegionFirstName(region.region_1depth_name);
                setRegionSecondName(region.region_2depth_name);
                setRegionthirdName(region.region_3depth_name);
              } else {
                setRegionFirstName(result[0].region_1depth_name);
                setRegionSecondName(result[0].region_2depth_name);
                setRegionthirdName(result[0].region_3depth_name);
              }
              // 로컬스토리지에 저장
              localStorage.setItem(
                'regionSecondName',
                region.region_2depth_name
              );
              localStorage.setItem(
                'regionthirdName',
                region.region_3depth_name
              );
              localStorage.setItem(
                'regionFirstName',
                region.region_1depth_name
              );
            }
          }
        );
      } else {
        console.error('Kakao Maps API is not loaded.'); // API 로드 실패 시 오류 로그 출력
      }
    }
  };

  useEffect(() => {
    regionName();
  }, [location, setRegionFirstName, regionName, setRegionSecondName]);

  const refresh = () => {
    console.log('새로고침 클릭');
    fetchLocation();
    regionName();
    console.log('지역', regionFirstName, regionSecondName, regionthirdName);
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
        <button
          className={style.refreshBtn}
          onClick={() => {
            refresh();
          }}
        >
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
