import './css/styles.css';
import countryItemTpl from './templates/country-item.hbs';
import countryInfoTpl from './templates/country-info.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import getRefs from './js/get-refs';
import CountriesApiService from './js/country-service';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

const countriesApiService = new CountriesApiService();

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  countriesApiService.query = event.target.value.trim();
  if (countriesApiService.query === '') {
    clearWindow();
    return;
  }

  countriesApiService
    .fetchCountries()
    .then(countries => {
      if (Array.isArray(countries)) {
        if (countries.length > 10) {
          tooManyMatches();
        } else {
          renderCountryList(countries);
        }

        if (countries.length === 1) {
          renderCountryInfo(countries[0]);
        }
      } else {
        nothingFound();
      }
    })
    .catch(nothingFound);
}

function renderCountryInfo(country) {
  const markup = countryInfoTpl(country);
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function renderCountryList(countries) {
  const markup = countries.map(countryItemTpl).join('');
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = markup;
}

function clearWindow() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function tooManyMatches() {
  clearWindow();
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function nothingFound() {
  clearWindow();
  Notify.failure('Nothing found. Try again.');
}
