var assert = require('assert');
var Lexer = require('../app/lexer.js');

describe('Lexer', function() {
    var sql = 'SELECT * FROM users;'
    var lexer = new Lexer(sql);
    describe('new', function() {
        it('should return self instance', function () {
            assert(lexer instanceof Lexer);
        });

        it('should return the sql', function(){
            assert.equal(lexer.sql, sql);
        });
    });

    describe('#term_list', function() {
        it('should splited array by a space', function () {
            var expect = ['SELECT', '*', 'FROM', 'users', ';'];
            assert.deepEqual(lexer.term_list(), expect);
        });

        it('should splited array by PARENS', function () {
            var sql = 'SELECT COUNT(*) FROM users;';
            var lexer = new Lexer(sql);
            var expect = ['SELECT', 'COUNT', '(', '*', ')', 'FROM', 'users', ';'];
            assert.deepEqual(lexer.term_list(), expect);
        });
    });

    describe('#tokenize', function() {
        it('should return a tokenized array', function () {
            var expect = [ ['SELECT', 'SELECT', 0],
              ['*', 'LITERAL', 1],
              ['FROM', 'FROM', 0],
              ['users', 'LITERAL', 1],
              [';', 'TERMINAL_SYMBOL', 0] ];
            var actual = lexer.tokenize();

            assert.equal(actual.length, expect.length);
            for(var i = 0; i < actual.length; i++) {
              assert.deepEqual(actual[i], expect[i]);
            }
        });

        it('should return a tokenized array with function', function () {
            var sql = 'SELECT COUNT(*) FROM users;'
            var lexer = new Lexer(sql);
            var expect = [ ['SELECT', 'SELECT', 0],
              ['COUNT', 'FUNCTION', 1],
              ['(', 'LEFT_PAREN', 1],
              ['*', 'LITERAL', 2],
              [')', 'RIGHT_PAREN', 1],
              ['FROM', 'FROM', 0],
              ['users', 'LITERAL', 1],
              [';', 'TERMINAL_SYMBOL', 0] ];
            var actual = lexer.tokenize();

            assert.equal(actual.length, expect.length);
            for(var i = 0; i < actual.length; i++) {
              assert.deepEqual(actual[i], expect[i]);
            }
        });
    });
});
