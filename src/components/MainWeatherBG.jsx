import { useEffect, useState } from 'react';
import bgStyle from '../css/MainWeatherBG.module.css'

const MainWeatherBG = () => {
    const [SKY, setSKY] = useState('');    //SKY -> 1맑음  3구름많음 4흐림 
    const [PTY, setPTY] = useState(0);    //PTY -> 0없음 1비 2비/눈 3눈 4소나기 

    const [bgImg, setBgImg] = useState('');//건물이미지
    const bgfile = ['a', 'b', 'c', 'd'];//건물이미지 img/weatherBG/bg/a.png

    const bgLoad = () => {
        const random = Math.floor(Math.random() * (bgfile.length));
        console.log(random, 'random');
        setBgImg(bgfile[random]);
    }

    useEffect(() => {

        const storedSky = localStorage.getItem('pmSKY');
        const storedPty = localStorage.getItem('pmPTY');
        if (storedSky && storedPty) {
            setSKY(storedSky);
            // setSKY(4);///임시고정
            setPTY(storedPty);
            // setPTY(1);
        }

        bgLoad();
    }, [])

    useEffect(() => {
        console.log('^^^^SKY, PTY 변동 감지^^^', SKY, PTY);
    }, [SKY, PTY])

    return (
        <div className={bgStyle.MainweatherBG}>
            {SKY ? (<>
                <img className={bgStyle.skyWeather} src={`img/weatherBG/sky/0${SKY}-3.png`} alt="SKY" />
                <img className={bgStyle.skySun} src={`img/weatherBG/sky/0${SKY}-2.png`} alt="SKY" />
                <img className={bgStyle.skyCloud} src={`img/weatherBG/sky/0${SKY}-1.png`} alt="SKY" />
            </>) : ''
            }
            {PTY !== 0 ?
                < img className={bgStyle.rain} src={`img/weatherBG/sky/pty${PTY}.gif`} alt="bgImg" />
                : ''
            }

            <img className={bgStyle.bg} src={`img/weatherBG/bg/${bgImg || `loading`}.png`} alt="bgImg" />

        </div>
    )
}
export default MainWeatherBG