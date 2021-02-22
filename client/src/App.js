import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import UnsplachImages from './components/UnsplachImages.component';
import Search from './components/Search.component';
import Loader from './components/Loader.component';


function App() {
  const [serachString, setSerachString] = useState('random');
  const [count, setCount] = useState(1)

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, [])
  useEffect(() => {
    fetchImages();
  }, [serachString])


  const searchByString = (e, string) => {
    e.preventDefault();
    let resettingState = new Promise(resolve => {
      setSerachString(string);
      if (serachString === string) {
        resolve();
      }
    })
    resettingState.then(() => {
      fetchImages();
    })
    if (images.length > 0) {
      images.length = 0
    }
  }

  const fetchImages = () => {
    setCount(count + 1);
    const apiRoot = 'https://api.unsplash.com';
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    // console.log(serachString);
    // console.log(images.length);
    axios.get(`${apiRoot}/search/photos?page=${count}&query=${serachString}&client_id=${accessKey}&count=10`)
      .then(ress => {
        // console.log(ress.data.results);
        setImages([...images, ...ress.data.results])
      })
  }


  return (
    <>
      <Search searchByString={searchByString} />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchImages}
        hasMore={true}
        loader={<Loader />}
      >

        <div className="wrapper-image">
          {
            images.map(image => (
              <UnsplachImages url={image.urls.thumb} ImgData={image} key={image.id} />
            ))
          }
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;
