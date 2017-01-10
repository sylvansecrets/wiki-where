const request = require('request-promise');
const cheerio = require('cheerio');
const Entities = require('html-entities').AllHtmlEntities;
const jsonfile = require('jsonfile');
const _ = require('underscore');
entities = new Entities();

const easySource = 'https://en.wikipedia.org/wiki/List_of_cities_by_GDP';

const easyCityLocation = '../../assets/easyCity.json'

request(easySource)
.then((responseHTML) => {
  const $ = cheerio.load(responseHTML);
  const cityList = [];
  const countryList = [];
  $('td:first-child').each((index, element) => {
    cityList.push(entities.decode($(element).text()));
  })
  $('td:nth-child(2)').each((index, element) => {
    countryList.push(entities.decode($(element).text()));
  })
  const easyList = _.zip(cityList, countryList);
  return easyList;
})
.then(easyList => {
  jsonfile.writeFile(easyCityLocation, easyList, (err) => {
    console.warn(err)
  })
})
