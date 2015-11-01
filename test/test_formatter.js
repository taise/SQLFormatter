var assert = require('assert');
var Formatter = require('../app/formatter.js');

describe('Formatter', function() {
    describe('#trim', function() {
        var expect = 'SELECT * FROM users;'
        it ('should replace some spaces to a single space', function(){
            var sql    = 'SELECT   * FROM    users;'
            assert.equal(expect, Formatter.trim(sql));
        });

        it ('should remove head spaces', function(){
            var sql    = '  SELECT * FROM users;'
            assert.equal(expect, Formatter.trim(sql));
        });

        it ('should remove tail spaces', function(){
            var sql    = 'SELECT * FROM users;  '
            assert.equal(expect, Formatter.trim(sql));
        });

        it ('should replace all return codes to a single space', function() {
            var sql    = 'SELECT\r * \nFROM\n users\n;'
            assert.equal(expect, Formatter.trim(sql));
        });
    });
});
