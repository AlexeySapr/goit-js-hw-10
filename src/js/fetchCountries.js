class CountriesApiService {
  #baseUrl = 'https://restcountries.com/v3.1/name';
  #categories = 'flags,name,capital,population,languages';

  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(`${this.#baseUrl}/${this.searchQuery}?fields=${this.#categories}`).then(
      response => {
        return response.json();
      },
    );
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { CountriesApiService };
