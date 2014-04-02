format-price
============

[![Build Status](https://drone.io/github.com/mvhenten/format-price/status.png)](https://drone.io/github.com/mvhenten/format-price/latest)

Simple utility to deal with formatting and parsing price.
When asking a user to input a price, you should expect just about anything:

    US$ 3.900,90-
    -£5,016.43
    -$8,202.97
    100,000,000.90
    100.000.000,99
    19,95 €
    € 19.99
    $1,-

So unless we restrict the user, we have to deal with this.

## install

    npm install format-price

## usage

```javascript

    var Price = require('format-price');

    var amount = Price.parse('US$ 3.900,90-');
    // =>  -3900.90

```

## methods

#### parse

This is a RegExp based price parser, and it should be able to deal with most (western)
number formatting, as provided by `Intl.NumberFormat`. See the examples in the introduction.

#### format

Format a number according to locale and currency:

```javascript
    Price.format( 'fr-FR', 'EUR', 19.99 );
    // => 19,99 €
```

This is really just a small wrapper around `Intl.NumberFormat` provided for symetry
and shorter code.