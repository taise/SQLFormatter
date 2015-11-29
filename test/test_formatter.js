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

    describe('#indented', function() {
        it ('should return an array each indented line', function() {
            var tokenized = [ ['SELECT', 'SELECT', 0],
              ['*', 'LITERAL', 1],
              ['FROM', 'FROM', 0],
              ['users', 'LITERAL', 1],
              [';', 'TERMINAL_SYMBOL', 0] ];
            var expect = ['SELECT',
              '  *',
              'FROM',
              '  users',
              ';'
            ];
            var actual = Formatter.indented(tokenized);

            assert.equal(actual.length, expect.length);
            for(var i = 0; i < actual.length; i++) {
              assert.deepEqual(actual[i], expect[i]);
            }
        });
    });
});
