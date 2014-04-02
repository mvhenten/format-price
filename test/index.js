'use strict';

var assert = require('assert'),
    _ = require('lodash'),
    util = require('util'),
    Intl = require('intl'),
    Price = require('../index');

var Random = {
    LOCALES: ['en-US', 'en-IE', 'ru-RU', 'fr-FR', 'nl-NL'],

    CURRENCIES: ['EUR', 'USD', 'GBP', 'RUB'],

    locale: function() {
        return _.sample(Random.LOCALES);
    },

    currency: function() {
        return _.sample(Random.CURRENCIES);
    },

    get LOCALE_X_CURRENCY() {
        return _.reduce(Random.LOCALES, function(cart, locale) {
            for (var i = 0; i < Random.CURRENCIES.length; i++) {
                cart.push([locale, Random.CURRENCIES[i]]);
            }
            return cart;
        }, []);
    }
};


suite('Price format', function() {
    test('price.parse should parse any format NumberFormat produces', function() {
        _.times(999, function() {
            var n = _.random(-999999, 999999) / 100,
                test = Intl.NumberFormat(Random.locale(), {
                    style: 'currency',
                    currency: Random.currency()
                }).format(n),
                result = Price.parse(test);

            assert.equal(result, n, util.format('%s => %s => %s', n, test, result));
        });
    });

    test('price.format should format currencies correctly', function() {
        _.times(99, function() {
            var price = _.random(-9999, 9999) / 100;

            _.each(Random.LOCALE_X_CURRENCY, function(pair) {
                var currency = pair.pop(),
                    locale = pair.pop();

                var expect = Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currency
                }).format(price);

                assert.equal(Price.format(locale, currency, price), expect, util.format('%s %s', expect, locale));
            });
        });
    });
});
