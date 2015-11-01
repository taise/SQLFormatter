var assert = require('assert');
var Parser = require('../app/parser.js');


describe('Parser', function() {
    var sql = 'SELECT * FROM users;'
    describe('new', function() {
        var parser = new Parser(sql);

        it('should return self instance', function () {
            assert(parser instanceof Parser);
        });

        it('should return the sql', function(){
            assert.equal(sql, parser.sql);
        });
    });
});
