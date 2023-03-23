import axios from 'axios';
import Notiflix from 'notiflix';

const wordInput = document.querySelector('.search-form');
const API_KEY = '34647684-abfdb43770480e65049b2781c';

const searchParams = new URLSearchParams({
  q: wordInput,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const IMAGES_URL =
  'https://pixabay.com/api/?key=' + API_KEY + '${searchParams}';

const fetchImages = async q => {
  const token = await axios.get('https://pixabay.com/api/?key=' + API_KEY);
  const response = await axios.get(IMAGES_URL);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const images = await response.json();
  return images;
};
