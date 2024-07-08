import style from '../css/Region.module.css';
import { useState, useEffect } from 'react';

function Region({ color, border, region }) {
  const [regionSecondName, setRegionSecondName] = useState('');
  const [regionthirdName, setRegionthirdName] = useState('');

  useEffect(() => {
    const storedRegionSecondName = localStorage.getItem('regionSecondName');
    const storedRegionthirdName = localStorage.getItem('regionthirdName');

    if (storedRegionSecondName) setRegionSecondName(storedRegionSecondName);
    if (storedRegionthirdName) setRegionthirdName(storedRegionthirdName);
  }, []);

  const customStyle = {
    color: color,
    border: border,
  };

  return (
    <span
      className={style.region}
      // ref={regionRef}
      style={customStyle}
    >
      {region ? region : `${regionSecondName} ${regionthirdName}`}
    </span>
  );
}

export default Region;
