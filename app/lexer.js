var Lexer = function(sql) {
  this.sql = sql;

  this.reservedWord = [
    'SELECT',
    'FROM'
  ]
  this.functionWord = [
    'COUNT'
  ]
  this.TERMINAL_SYMBOL = ';';
  this.LEFT_PAREN ='(';
  this.RIGHT_PAREN =')';
  this.DELIMITER =',';

  Lexer.prototype.term_list = function() {
    return this.sql.replace(/;$/, " ;")
                   .replace(/\s?\(\s?/g, ' ( ').replace(/\s?\)\s?/, ' ) ')
                   .replace(/\s?,\s?/g, ' , ')
                   .split(" ");
  };

  Lexer.prototype.tokenize = function() {
    /*
     * Return
     * ------
     * [[reservedWord, token, indentLevel](, ...)]
     */
    var result = [];

    var indentLevel = 0;
    var that = this;
    that.term_list().forEach(function(token) {
        var i = that.reservedWord.indexOf(token);
        var j = that.functionWord.indexOf(token);
        if (i >= 0) {
          result.push([
              token,
              that.reservedWord[i],
              indentLevel
          ]);
        } else if(j >= 0) {
          result.push([
              token,
              'FUNCTION',
              indentLevel + 1
          ]);
        } else if(token === that.TERMINAL_SYMBOL) {
          result.push([
              token,
              'TERMINAL_SYMBOL',
              0
          ]);
        } else if(token === that.LEFT_PAREN) {
          result.push([
              token,
              'LEFT_PAREN',
              indentLevel + 1
          ]);
          indentLevel += 1
        } else if(token === that.RIGHT_PAREN) {
          result.push([
              token,
              'RIGHT_PAREN',
              indentLevel
          ]);
          indentLevel -= 1
        } else if(token === that.DELIMITER) {
          result.push([
              token,
              'DELIMITER',
              indentLevel + 1
          ]);
        } else {
          result.push([
              token,
              'LITERAL',
              indentLevel + 1
          ]);
        }
    });
    return result;
  };
};

module.exports = Lexer;
