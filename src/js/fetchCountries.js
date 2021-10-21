class CountriesApiService {
  constructor() {
    this.searchQuery = '';
    this.baseUrl = 'https://restcountries.com/v3.1/name';
    this.categories = 'flags,name,capital,population,languages';
  }

  fetchCountries() {
    return fetch(`${this.baseUrl}/${this.searchQuery}?fields=${this.categories}`).then(response => {
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

export { CountriesApiService };
