var Lexer = function(sql) {
  this.sql = sql;

  var tokenizeKeywords = [
    'SELECT',
    'FROM',
    'WHERE',
    'GROUP BY',
    'ORDER BY',
    'LIMIT'
  ];
  var LEFT_PAREN ='(';
  var RIGHT_PAREN =')';
};

module.exports = Lexer;
