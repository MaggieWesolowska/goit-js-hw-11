import axios from 'axios';
import Notiflix from 'notiflix';

//axios.get('/users')
//.then(res => {
//  console.log(res.data);
//});
const wordInput = document.querySelector('.search-form');

const searchParams = new URLSearchParams({
  key: '34647684-abfdb43770480e65049b2781c',
  q: wordInput,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const IMAGES_URL = 'https://pixabay.com/api/?${searchParams}';

const fetchImages = async () => {
  const response = await axios.get(IMAGES_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const images = await response.json();
  return images;
};
