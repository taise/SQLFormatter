var Lexer = function(sql) {
  this.sql = sql;

  this.reservedWord = [
    'SELECT',
    'FROM'
  ]
  this.TERMINAL_SYMBOL = ';';
  this.LEFT_PAREN ='(';
  this.RIGHT_PAREN =')';

  Lexer.prototype.term_list = function() {
    return this.sql.replace(/;$/, " ;").split(" ");
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
        if (i >= 0) {
          result.push([
              token,
              that.reservedWord[i],
              indentLevel
          ]);
        } else if(token === that.TERMINAL_SYMBOL) {
          result.push([
              token,
              'TERMINAL_SYMBOL',
              indentLevel
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
