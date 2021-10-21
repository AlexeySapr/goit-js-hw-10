import './css/styles.css';
import countryItemTpl from './templates/country-item.hbs';
import countryInfoTpl from './templates/country-info.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(event) {
  const countryName = event.target.value.trim();
  if (countryName === '') {
    clearWindow();
    return;
  }

  fetchCountries(countryName)
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
    .catch(error => {
      console.log(error);
    });
}

function fetchCountries(countryName) {
  return fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(response => {
    return response.json();
  });
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
