'use strict';

var Intl = require('intl');

/**
 * Price utility - wraps Intl for consistency and provides a parser to transform
 * price strings back into numbers.
 */
var Price = {

    /**
     * RegExp based price parser
     * May deal with most (western) number formatting, as provided by Intl.NumberFormat
     *
     * examples:
     *  'US$ 3.900,90-' => -3900.90
     *  '-£5,016.43' => -5016.43
     *  '-$8,202.97' => -8202.97
     *  '100,000,000.90' => 100000000.90
     *  '100.000.000,99' => 100000000.90
     *
     */
    parse: function(str) {
        if (typeof str === 'number') return str;
        if (typeof str !== 'string') return NaN;

        var parts = str.match(/(\d+)/g),
            sign = '',
            integer = 0,
            fraction = 0;

        if (!parts || !parts.length) return NaN;

        if (parts.length == 1) {
            integer = parts[0];
        } else {
            integer = parts.slice(0, -1).join('');
            fraction = parts.slice(-1);
        }



        // find a sign
        sign = /-/.test(str) ? '-' : '';

        return parseFloat(sign + integer + '.' + fraction);
    },

    /**
     * Wrapper around NumberFormat
     *
     * Formats a price given locale and currency
     */
    format: function(locale, currency, price) {
        return Intl.NumberFormat(locale, {
            style: 'currency',
            currency: currency
        }).format(price);
    },
};

module.exports = Price;
