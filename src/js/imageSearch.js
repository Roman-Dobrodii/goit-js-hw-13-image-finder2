import servise from './apiService';
import cardImage from '../templates/cardTpl.hbs';
import refs from './refs';

const debounce = require('lodash.debounce');

refs.searchForm.addEventListener(
  'input',
  debounce(imageSearchInputHandler, 500),
);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {
  e.preventDefault();
  servise.searchQuerry = e.target.value;
  if (servise.query === '') {
    hiddenLoadMoreBtn();
    clearListItems();
    return;
  }

  clearListItems();
  servise.resetPage();

  servise.fetchArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);
  });
  noHiddenLoadMoreBtn();
}

function loadMoreBtnHandler() {
  refs.loadMoreBtn.disabled = true;
  servise.fetchArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    insertListItems(markup);
    refs.loadMoreBtn.disabled = false;
    // window.scrollTo(0, 1000);

    window.scrollBy({
      top: 940,
      left: 100,
      behavior: 'smooth',
    });
  });
}

function insertListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function buildListItemsTemplate(items) {
  return cardImage(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function hiddenLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function noHiddenLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}
