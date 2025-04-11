import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton } from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector('.form');              // Форма пошуку
const gallery = document.querySelector('.gallery');          // Контейнер галереї
const loadMoreButton = document.querySelector('.load-more');   // Кнопка "Load more"
const loader = document.querySelector('.loader');            // Лоадер

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = event.target.elements['search-text'].value.trim();
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  clearGallery();           // Очищення галереї при новому запиті
  hideLoadMoreButton();     // Ховаємо кнопку "Load more" перед запитом
  await fetchAndRenderImages();
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  await fetchAndRenderImages();
});

async function fetchAndRenderImages() {
  try {
    showLoader();
    const { hits, totalHits: newTotalHits } = await getImagesByQuery(currentQuery, currentPage);

    if (currentPage === 1) {
      totalHits = newTotalHits;
    }

    if (hits.length === 0) {
      iziToast.warning({ title: 'Warning', message: 'No images found!' });
      hideLoader();
      return;
    }

    // Якщо це перша сторінка – перезаписуємо вміст через createGallery,
    // інакше – додаємо нові картки до кінця за допомогою appendToGallery.
    if (currentPage === 1) {
      createGallery(hits);
    } else {
      appendToGallery(hits);
    }

    // Якщо отримано менше 15 елементів або завантажено всі результати – ховаємо кнопку "Load more"
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

// Нова функція для додавання нових карток до кінця UL. Розмітка відповідає тій, що використовується в createGallery() (із додатковою інформацією)
function appendToGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p> Likes: <span class="info-value">${likes}</span></p>
          <p> Views: <span class="info-value">${views}</span></p>
          <p> Comments: <span class="info-value">${comments}</span></p>
          <p> Downloads: <span class="info-value">${downloads}</span></p>
        </div>
      </a>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

// Функція для плавної прокрутки сторінки після завантаження нових зображень
function scrollPage() {
  const firstElement = gallery.firstElementChild;
  const cardHeight = firstElement ? firstElement.getBoundingClientRect().height : 0;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth'
  });
}