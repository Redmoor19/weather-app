import { useState, useEffect } from "react";
import './styles/App.scss';
import Pic from './img/default.jpg';

import Weather from "./Weather";

import { useImages } from "./hooks/imageApi";

function App() {
  const [location, setLocation] = useState('');

  const [imageUrls, setImageUrls] = useState([]);
  const [current, setCurrent] = useState(0);

  const { getImages } = useImages();
  const disImages = [];

  useEffect( () => {
    getImages(location)
      .then( data => {
        setCurrent(0);
        setImageUrls(data);
      })
    //eslint-disable-next-line
  }, [location])

  useEffect( () => {
    const updateImage = setInterval( () => {
      if (current === disImages.length - 1 ) {
        setCurrent(0);
      } else {
        setCurrent(current => current + 1);
      }
    }, 5000);
    return () => {clearInterval(updateImage)};
  }, [current, disImages.length]);

  for (let i = 0; i < imageUrls.length; i++) {
    const image = new Image();
    image.src = imageUrls[i];
    disImages.push(image);
  };

  const background = disImages.length > 0 ? disImages[current].src : null;

  return (
    <div className="App">
      <div 
        className="filter"
        style={{backgroundImage: `url(${background ? background : Pic})`}}/>
        <Weather 
          setLocation={setLocation}
        />
    </div>
  );
}

export default App;
