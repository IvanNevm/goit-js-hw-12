import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const form = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery'); // Контейнер галереї
const loadMoreButton = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

// Ініціалізуємо SimpleLightbox для галереї. Це необхідно для роботи lightbox, коли додаються нові картинки.
let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();          // Очищуємо вміст (UL) при новому запиті
  hideLoadMoreButton();    // Ховаємо кнопку "Load more" перед запитом
  await fetchAndRenderImages();
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  try {
    showLoader(); // Показуємо лоадер під час завантаження
    const { hits, totalHits: newTotalHits } = await getImagesByQuery(currentQuery, currentPage);

    if (currentPage === 1) {
      totalHits = newTotalHits;
    }

    if (hits.length === 0) {
      iziToast.warning({ title: 'Warning', message: 'No images found!' });
      hideLoader();
      return;
    }

    // На першій сторінці встановлюємо весь вміст галереї:
    if (currentPage === 1) {
      createGallery(hits);
    } else {
      // Для load more — додаємо нові картинки до кінця галереї  
      appendToGallery(hits);
      lightbox.refresh(); // Оновлюємо lightbox, щоб включити нові елементи
    }

    // Перевірка: якщо отримано менше 15 елементів або досягнуто загальну кількість результатів —
    // ховаємо кнопку "Load more"
    if (hits.length < 15 || currentPage * 15 >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results."
      });
    } else {
      showLoadMoreButton();
    }

    scrollPage();
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images!' });
    console.error(error);
  } finally {
    hideLoader();
  }
}

// Функція для додавання нових карток до кінця UL
function appendToGallery(images) {
  const markup = images
    .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p>Likes: <span class="info-value">${likes}</span></p>
          <p>Views: <span class="info-value">${views}</span></p>
          <p>Comments: <span class="info-value">${comments}</span></p>
          <p>Downloads: <span class="info-value">${downloads}</span></p>
        </div>
      </a>
    `)
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
}

// Функція для плавної прокрутки сторінки після додавання зображень
function scrollPage() {
  const firstChild = galleryContainer.firstElementChild;
  const cardHeight = firstChild ? firstChild.getBoundingClientRect().height : 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth'
  });
}