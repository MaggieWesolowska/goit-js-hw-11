import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const inputDOM = document.querySelector('.input');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
loadMoreBtn.style.display = 'none';

let lightbox = new SimpleLightbox('.gallery a', {
  captions: false,
});

let totalHits = 0;
let page = 1;
let lastPage = 0;

const API_KEY = '34647684-abfdb43770480e65049b2781c';

const searchParams = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 40,
};

const IMAGES_URL = 'https://pixabay.com/api/';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const wordSelection = inputDOM.value;
  searchParams.q = wordSelection;
  page = 1;
  const fetchedImages = await fetchImages();
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  gallery.innerHTML = '';
  renderImages(fetchedImages);
  loadMoreBtn.style.display = 'inline';
});

loadMoreBtn.addEventListener('click', async event => {
  page += 1;
  const fetchedImages = await fetchImages(page);
  renderImages(fetchedImages);
  if (page === lastPage) {
    loadMoreBtn.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    loadMoreBtn.style.display = 'inline';
  }
  // const cardHeight = document.querySelector('.photo-card').scrollHeight;
  // console.log(cardHeight);
  // window.scrollBy({
  //   top: cardHeight * 2,
  //   behavior: 'smooth',
  // });
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
});

const fetchImages = async (page = 1) => {
  searchParams.page = page;
  try {
    const response = await axios.get(IMAGES_URL, {
      params: searchParams,
    });
    const images = await response.data.hits;
    console.log(images);
    totalHits = response.data.totalHits;
    lastPage = Math.ceil(totalHits / 40);
    return images;
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

function renderImages(images) {
  const markupImages = images
    .map(image => {
      return `
    <a class="photo-card" href="${image.largeImageURL}">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${image.downloads}
    </p>
  </div>
</a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markupImages);

  lightbox.refresh();
}
