export default class CountriesApiService {
  constructor() {
    this.searchQuery = '';
    this.baseUrl = 'https://restcountries.com/v3.1/name';
  }

  fetchCountries() {
    return fetch(`${this.baseUrl}/${this.searchQuery}`).then(response => {
      return response.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
