import CardsService from './apiService';
import cardImage from '../templates/cardTpl.hbs';
import refs from './refs';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import { onClickImage } from './lightBox';

// import LoadMoreBtn from './load-more-btn';

// const loadMoreBtn = new LoadMoreBtn({
//   selector: '[data-action="load-more"]',
//   hidden: true,
// });

const cardsService = new CardsService();

refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', fetchHits);
refs.gallery.addEventListener('click', onClickImage);

function onSearch(e) {
  e.preventDefault();

  cardsService.query = e.currentTarget.elements.query.value;

  if (cardsService.query === '') {
    return alert('Введи что-то нормальное!');
  }

  // loadMoreBtn.show();
  cardsService.resetPage();
  clearCardsContainer();
  fetchHits();
}

function fetchHits() {
  // loadMoreBtn.disable();
  cardsService.fetchCards().then(hits => {
    appendCardsMarkup(hits);
    // loadMoreBtn.enable();

    // window.scrollBy({
    //   top: 1000,
    //   left: 100,
    //   behavior: 'smooth',
    // });
  });
}

function appendCardsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', cardImage(hits));
}

function clearCardsContainer() {
  refs.gallery.innerHTML = '';
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && cardsService.query !== '') {
      console.log('Hi');
      cardsService.fetchCards().then(hits => {
        appendCardsMarkup(hits);
        // cardsService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '200px',
});

observer.observe(refs.sentinel);
