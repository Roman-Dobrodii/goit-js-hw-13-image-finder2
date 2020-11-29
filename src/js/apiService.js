export default class CardsService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchCards() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=19186547-e8c2926af7125cb35de57caef`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
