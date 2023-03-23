import axios from 'axios';
import Notiflix from 'notiflix';

//axios.get('/users')
//.then(res => {
//  console.log(res.data);
//});
const wordInput = document.querySelector('.search-form');
const API_KEY = '34647684-abfdb43770480e65049b2781c';

const searchParams = new URLSearchParams({
  key: API_KEY,
  q: wordInput,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const responseParams = {
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
};

const IMAGES_URL =
  'https://pixabay.com/api/?${searchParams}' + '${responseParams}';

const fetchImages = async () => {
  const response = await axios.get(IMAGES_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const images = await response.json();
  return images;
};
