import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const wordInput = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let limit = 40;

const API_KEY = '34647684-abfdb43770480e65049b2781c';

const searchParams = new URLSearchParams({
  q: wordInput,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});

const IMAGES_URL =
  'https://pixabay.com/api/?key=' + API_KEY + '&${searchParams}';

form.addEventListener('submit', async event => {
  event.preventDefault();
  const fetchImages = await fetchImages(images)
    .then(images => {
      renderImages(images);
      console.log(images);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
});

loadMoreBtn.addEventListener('click', images => {
  if ((images.length = totalHits)) {
    return Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    fetchImages(page, limit)
      .then(images => {
        renderImages(images);
        page += 1;
        if (page > 1) {
          loadMoreBtn.textContent = 'Load more posts';
        }
      })
      .catch(error => console.log(error));
  }
});

const fetchImages = async () => {
  try {
    const params = newURLSearchParams({
      page: page,
      limit: limit,
    });
    const response = await axios.get(IMAGES_URL + params);
    const images = await response.json();
    console.log(images);
  } catch (error) {
    console.log(error.message);
  }
};

// fetchImages();

function renderImages(images) {
  const photoCard = {
    linkSmall: config.url,
    linkLarge: largeImageURL,
    tags: '',
    likes: 0,
    views: 0,
    comments: 0,
    downloads: 0,
  };
  const markupImages = images
    .map(image => {
      return `
    <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;
    })
    .join('');

  gallery.insertAdjacentHTML('afterbegin', markupImages);
}

let lightbox = new SimpleLightbox('.gallery a', {
  captions: false,
});
