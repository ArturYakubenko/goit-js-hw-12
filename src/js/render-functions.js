import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let galleryLightbox;
const loadMoreButton = document.querySelector('.load-more');
const loadingIndicator = document.querySelector('.loading-indicator');

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => `
    <li class="item">
      <a href="${image.largeImageURL}" class="gallery-item">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="text"><b>Likes</b> ${image.likes}</p>
        <p class="text"><b>Views</b> ${image.views}</p>
        <p class="text"><b>Comments</b> ${image.comments}</p>
        <p class="text"><b>Downloads</b> ${image.downloads}</p>
      </div>
    </li>
  `).join('');

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);

  if (!galleryLightbox) {
    galleryLightbox = new SimpleLightbox('.gallery a');
  } else {
    galleryLightbox.refresh();
  }

  hideLoadingIndicator();
  scrollToLoadMoreButton();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

export function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

export function showLoadingIndicator() {
  loadingIndicator.style.display = 'block';
}

export function hideLoadingIndicator() {
  loadingIndicator.style.display = 'none';
}

function scrollToLoadMoreButton() {
  const { height } = document.querySelector('.item').getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}