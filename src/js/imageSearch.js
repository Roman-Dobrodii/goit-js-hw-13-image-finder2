import CardsService from './apiService';
import cardImage from '../templates/cardTpl.hbs';
import refs from './refs';

const cardsService = new CardsService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  cardsService.query = e.currentTarget.elements.query.value;

  if (cardsService.query === '') {
    return alert('Введи что-то нормальное!');
  }

  cardsService.resetPage();
  cardsService.fetchCards().then(hits => {
    clearCardsContainer();
    appendCardsMarkup(hits);
  });
}

function onLoadMore() {
  cardsService.fetchCards().then(appendCardsMarkup);
}

function appendCardsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardImage(hits));
}

function clearCardsContainer() {
  refs.gallery.innerHTML = '';
}
// function renderCard(card) {
//   const markup = cardImage(card);
//   refs.gallery.innerHTML = markup;
// }

// function onFetchError(error) {
//   alert('Error!');
// }
// const debounce = require('lodash.debounce');

// refs.searchForm.addEventListener(
//   'input',
//   debounce(imageSearchInputHandler, 500),
// );
// refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

// function imageSearchInputHandler(e) {
//   e.preventDefault();
//   servise.searchQuerry = e.target.value;
//   if (servise.query === '') {
//     hiddenLoadMoreBtn();
//     clearListItems();
//     return;
//   }

//   clearListItems();
//   servise.resetPage();

//   servise.fetchArticles().then(hits => {
//     const markup = buildListItemsTemplate(hits);
//     insertListItems(markup);
//   });
//   noHiddenLoadMoreBtn();
// }

// function loadMoreBtnHandler() {
//   refs.loadMoreBtn.disabled = true;
//   servise.fetchArticles().then(hits => {
//     const markup = buildListItemsTemplate(hits);
//     insertListItems(markup);
//     refs.loadMoreBtn.disabled = false;

//     window.scrollBy({
//       top: 940,
//       left: 100,
//       behavior: 'smooth',
//     });
//   });
// }

// function insertListItems(items) {
//   refs.gallery.insertAdjacentHTML('beforeend', items);
// }

// function buildListItemsTemplate(items) {
//   return cardImage(items);
// }

// function clearListItems() {
//   refs.gallery.innerHTML = '';
// }

// function hiddenLoadMoreBtn() {
//   refs.loadMoreBtn.classList.add('is-hidden');
// }

// function noHiddenLoadMoreBtn() {
//   refs.loadMoreBtn.classList.remove('is-hidden');
// }
