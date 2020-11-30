import CardsService from './apiService';
import cardImage from '../templates/cardTpl.hbs';
import refs from './refs';
import LoadMoreBtn from './load-more-btn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const cardsService = new CardsService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();

  cardsService.query = e.currentTarget.elements.query.value;

  if (cardsService.query === '') {
    return alert('Введи что-то нормальное!');
  }

  loadMoreBtn.show();
  cardsService.resetPage();
  clearCardsContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  cardsService.fetchCards().then(hits => {
    appendCardsMarkup(hits);
    loadMoreBtn.enable();

    window.scrollBy({
      top: 1000,
      left: 100,
      behavior: 'smooth',
    });
  });
}

function appendCardsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardImage(hits));
}

function clearCardsContainer() {
  refs.gallery.innerHTML = '';
}
