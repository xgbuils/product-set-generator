# product-set-generator

[![travis ci][1]][2]
[![npm version][3]][4]
[![Coverage Status][5]][6]
[![Dependency Status][7]][8]

Generator that receives an iterable of iterables as input and returns and iterator which iterates over array of elements of the cartesian product.

## Install

``` bash
npm install product-set-generator --save
```

## Usage

``` JavaScript
const product-set-generator = require('product-set-generator')

const iterator = productSet([
    [1, 2],
    [3, 4]
])

iterator.next() // {value: [1, 3], done: false}
iterator.next() // {value: [2, 3], done: false}
iterator.next() // {value: [1, 4], done: false}
iterator.next() // {value: [2, 4], done: false}
iterator.next() // {done: true}
```

## Support
- Node.js >=6

## License
MIT

  [1]: https://travis-ci.org/xgbuils/product-set-generator.svg?branch=master
  [2]: https://travis-ci.org/xgbuils/product-set-generator
  [3]: https://badge.fury.io/js/product-set-generator.svg
  [4]: https://badge.fury.io/js/product-set-generator
  [5]: https://coveralls.io/repos/github/xgbuils/product-set-generator/badge.svg?branch=master
  [6]: https://coveralls.io/github/xgbuils/product-set-generator?branch=master
  [7]: https://david-dm.org/xgbuils/product-set-generator.svg
  [8]: https://david-dm.org/xgbuils/product-set-generator
