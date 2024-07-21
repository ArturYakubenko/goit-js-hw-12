import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery, showLoadMoreButton, hideLoadMoreButton, showLoadingIndicator, hideLoadingIndicator } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.getElementById('search-form');
const loadMoreButton = document.querySelector('.load-more');
let currentQuery = '';

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  const query = event.currentTarget.query.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Search query cannot be empty',
    });
    return;
  }

  currentQuery = query;
  clearGallery();
  showLoadingIndicator();
  hideLoadMoreButton();

  try {
    const data = await fetchImages(query);
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      renderGallery(data.hits);
      if (data.totalHits > 15) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
});

loadMoreButton.addEventListener('click', async () => {
  showLoadingIndicator();

  try {
    const data = await fetchImages(currentQuery);
    if (data.hits.length === 0 || data.hits.length < 15) {
      hideLoadMoreButton();
      iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      renderGallery(data.hits);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message,
    });
  }
});