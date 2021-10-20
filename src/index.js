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
    refs.countryList.innerHTML = '';
    return;
  }

  fetch(`https://restcountries.com/v3.1/name/${countryName}`)
    .then(response => response.json())
    .then(countries => {
      if (Array.isArray(countries)) {
        //проверка что много стран
        if (countries.length > 10) {
          Notify.info('Too many matches found. Please enter a more specific name.');
          refs.countryInfo.innerHTML = '';
          refs.countryList.innerHTML = '';
        } else {
          // создание разметки
          const markup = countries.map(countryItemTpl).join('');
          //рендер разметки
          refs.countryInfo.innerHTML = '';
          refs.countryList.innerHTML = markup;
        }

        if (countries.length === 1) {
          // создание разметки
          const markup = countryInfoTpl(countries[0]);

          //рендер разметки
          refs.countryInfo.insertAdjacentHTML('beforeend', markup);
        }
      } else {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        Notify.failure('Nothing found. Try again.');
      }
    })
    .catch(error => {
      console.log(error);
    });
}
