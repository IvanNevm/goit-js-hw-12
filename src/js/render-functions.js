import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
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
  galleryContainer.innerHTML = markup;
  lightbox.refresh();
}
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.classList.remove('visible');
}

export function showLoadMoreButton() {
  loadMoreButton.classList.add('visible');
}

export function hideLoadMoreButton() {
  loadMoreButton.classList.remove('visible');
}