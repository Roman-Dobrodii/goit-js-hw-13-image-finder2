const BASE_URL = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  async fetchArticles() {
    const keyapi = '19186547-e8c2926af7125cb35de57caef';
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      per_page: 12,
      key: keyapi,
    });
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&${searchParams}`;
    const res = await fetch(url);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },
  get searchQuerry() {
    return this.query;
  },
  set searchQuerry(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
