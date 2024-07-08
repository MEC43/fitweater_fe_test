import style from '../css/Codi.module.css';
import React, { useEffect } from 'react';


const CodiGuidelineBox = ({ codiGuidelineBox, setCodiGuidelineBox }) => {

    function preventScroll(event) {
        // 스크롤 막기 함수
        event.preventDefault();
        event.stopPropagation();
    }
    useEffect(() => {
        // console.log('Nav.jsx>>>>>>유저정보, 햄open여부', userInfo, navOpen);
        if (codiGuidelineBox === true) {
            // 스크롤 막기
            window.addEventListener('scroll', preventScroll, { passive: false });
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
        }

        return () => {
            // clean-up 함수: 컴포넌트가 unmoun될 때 이벤트 리스너 제거
            window.removeEventListener('scroll', preventScroll, { passive: false });
            window.removeEventListener('wheel', preventScroll, { passive: false });
            window.removeEventListener('touchmove', preventScroll, {
                passive: false,
            });
        };
    }, [codiGuidelineBox]);


    return (
        <div className={style.CodiGuidelineBoxCon}>

            <div className={style.modalBox}>
                <div className={style.top}>
                    <h3 className='fontHead3'>기온별 추천 의류</h3>
                    <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setCodiGuidelineBox(false)} alt="x" />
                    {/* <img src="img/icons/common/dot.svg" className={style.DotIcon} alt="dot" /> */}
                </div>
                <div className={style.contents}>
                    <div className={style.tempBar}>
                        <span className='fontTitleM'>28°</span>
                        <span className='fontTitleM'>23°</span>
                        <span className='fontTitleM'>20°</span>
                        <span className='fontTitleM'>17°</span>
                        <span className='fontTitleM'>12°</span>
                        <span className='fontTitleM'>9°</span>
                        <span className='fontTitleM'>5°</span>
                        <span className='fontTitleM'>0°</span>
                    </div>
                    <div className={style.GuideCon}>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >민소매, 반팔, 반바지, 스커트, 린넨 옷</span>
                            <img src="img/icons/clothes/clothesTemp28.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >반팔, 얇은 셔츠, 반바지, 면바지</span>
                            <img src="img/icons/clothes/clothesTemp23.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >블라우스, 긴팔 티, 면바지, 슬랙스</span>
                            <img src="img/icons/clothes/clothesTemp20.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >얇은 니트, 얇은 가디건, 맨투맨, 후드, 긴바지</span>
                            <img src="img/icons/clothes/clothesTemp17.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >자켓, 가디건, 청자켓, 니트, 청바지, 스타킹</span>
                            <img src="img/icons/clothes/clothesTemp12.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >트렌치 코트, 야상, 점퍼, 스타킹, 기모 바지</span>
                            <img src="img/icons/clothes/clothesTemp09.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >울 코트, 히트텍, 가죽 옷, 기모</span>
                            <img src="img/icons/clothes/clothesTemp05.svg" alt="clothesTemp28" />
                        </div>
                        <div className={`fontBodyS ${style.guideBox}`}>
                            <span >패딩, 두꺼운 코트, 목도리, 기모, 누빔 옷</span>
                            <img src="img/icons/clothes/clothesTemp00.svg" alt="clothesTemp28" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodiGuidelineBox