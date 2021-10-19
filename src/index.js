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
    .then(response => {
      return response.json();
    })
    .then(countries => {
      //проверка что много стран
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryList.innerHTML = '';
      } else if (countries.length === 1) {
        // создание разметки
        const markup = countryInfoTpl(countries[0]);
        //рендер разметки
        refs.countryInfo.innerHTML = markup;
      } else {
        // создание разметки
        const markup = countries.map(countryItemTpl).join('');
        //рендер разметки
        refs.countryList.innerHTML = markup;
      }
    })
    .catch(error => {
      console.log(error);
    });
}
