var assert = require('assert');
var Lexer = require('../app/lexer.js');


describe('Lexer', function() {
    var sql = 'SELECT * FROM users;'
    describe('new', function() {
        var lexer = new Lexer(sql);

        it('should return self instance', function () {
            assert(lexer instanceof Lexer);
        });

        it('should return the sql', function(){
            assert.equal(sql, lexer.sql);
        });
    });
});
