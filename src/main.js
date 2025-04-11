import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
} from './js/render-functions.js';
import iziToast from 'izitoast';

// Селектори елементів
const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('.load-more');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Подія для форми
form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  hideLoadMoreButton();
  await fetchAndRenderImages();
});

// Подія для кнопки Load More
loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  await fetchAndRenderImages();
});

// Функція для отримання даних і відображення
async function fetchAndRenderImages() {
  try {
    showLoader();
    const { hits, totalHits: newTotalHits } = await getImagesByQuery(currentQuery, currentPage);

    if (currentPage === 1) totalHits = newTotalHits;

    if (hits.length === 0) {
      iziToast.warning({ title: 'Warning', message: 'No images found!' });
      hideLoader();
      return;
    }

    createGallery(hits);

    if (currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images!' });
    console.error(error);
  } finally {
    hideLoader();
  }
}