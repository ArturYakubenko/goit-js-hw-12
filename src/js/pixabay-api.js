import axios from 'axios';

const API_KEY = '45015535-1baf0a26e6ef32c92247ee5f8';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1;
let currentQuery = '';

export async function fetchImages(query) {
  if (query !== currentQuery) {
    currentPage = 1;
    currentQuery = query;
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: 15,
      },
    });

    currentPage += 1;
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch images: ${error.message}`);
  }
}