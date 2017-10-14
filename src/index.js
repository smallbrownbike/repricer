import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import faker from 'faker';
import tinytime from 'tinytime';
import queryString from 'query-string';
import _ from 'lodash';
import App from './Main/App';

let source = []
const template = tinytime('{MM} {DD} {YYYY}');
for(var i=0; i < 50; i++){

  let randomDate = faker.date.past(),
      UNIX = Math.round(randomDate.getTime() / 1000),
      date = template.render(randomDate);

  source.push(
    {
      title: faker.finance.bic(),
      description: faker.company.catchPhrase(),
      time: UNIX,
      date: date,
      loc: 'sherv' + Math.round(Math.random() * (15 - 1) + 1),
      image: 'https://react.semantic-ui.com/assets/images/wireframe/image.png',
      qoh: Math.round(Math.random() * (50 - 1) + 1),
      upc: faker.finance.bic(),
      barcode: Math.round(Math.random() * (1000000000000 - 1) + 1),
      prices: {
        amazon: faker.finance.amount(),
        ebay: faker.finance.amount(),
        newegg: faker.finance.amount()
      },
      data: {
        amazon:
          [
            { date: 'Jan 04 2016', price: 105.35 },
            { date: 'Jan 05 2016', price: 102.71 },
            { date: 'Jan 06 2016', price: 100.7 },
            { date: 'Jan 07 2016', price: 96.45 },
            { date: 'Jan 08 2016', price: 96.96 },
            { date: 'Jan 11 2016', price: 98.53 },
            { date: 'Jan 12 2016', price: 99.96 }
          ],
        walmart: [
          { date: 'Oct 05 2016', price: 113.05 },
          { date: 'Oct 06 2016', price: 113.89 },
          { date: 'Oct 07 2016', price: 114.06 },
          { date: 'Oct 10 2016', price: 116.05 },
          { date: 'Oct 11 2016', price: 116.3 },
          { date: 'Oct 12 2016', price: 117.34 },
          { date: 'Oct 13 2016', price: 116.98 },
          { date: 'Oct 14 2016', price: 117.63 },
          { date: 'Oct 17 2016', price: 117.55 },
          { date: 'Oct 18 2016', price: 117.47 },
          { date: 'Oct 19 2016', price: 117.12 },
          { date: 'Oct 20 2016', price: 117.06 }
        ],
        ebay: 
          [
            { date: 'Jun 02 2016', price: 97.72 },
            { date: 'Jun 03 2016', price: 97.92 },
            { date: 'Jun 06 2016', price: 98.63 },
            { date: 'Jun 07 2016', price: 99.03 },
            { date: 'Jun 08 2016', price: 98.94 },
            { date: 'Jun 09 2016', price: 99.65 },
            { date: 'Jun 10 2016', price: 98.83 },
            { date: 'Jun 13 2016', price: 97.34 },
            { date: 'Jun 14 2016', price: 97.46 },
            { date: 'Jun 15 2016', price: 97.14 },
            { date: 'Jun 16 2016', price: 97.55 }
          ],
        newegg:
          [
            { date: 'Dec 09 2016', price: 113.95 },
            { date: 'Dec 12 2016', price: 113.3 },
            { date: 'Dec 13 2016', price: 115.19 },
            { date: 'Dec 14 2016', price: 115.19 },
            { date: 'Dec 15 2016', price: 115.82 },
            { date: 'Dec 16 2016', price: 115.97 },
            { date: 'Dec 19 2016', price: 116.64 },
            { date: 'Dec 20 2016', price: 116.95 },
            { date: 'Dec 21 2016', price: 117.06 },
            { date: 'Dec 22 2016', price: 116.29 },
            { date: 'Dec 23 2016', price: 116.52 },
            { date: 'Dec 27 2016', price: 117.26 },
            { date: 'Dec 28 2016', price: 116.76 },
            { date: 'Dec 29 2016', price: 116.73 },
            { date: 'Dec 30 2016', price: 115.82 }
          ]
      },
    }
  )
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path='/' render={props => <App {...props} source={_.orderBy(source, ['time'], ['asc'])} />} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)