var Formatter = function() {};

Formatter.trim = function(sql) {
  return sql.replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "")
            .replace(/ ?;$/, ";");
};

Formatter.indented = function(tokenized) {
  var indented = [];
  tokenized.forEach(function(token_array) {
      var token = token_array[0]
      var indentLevel = token_array[2];

      var indent = '';
      if(indentLevel > 0) {
        indent = Array(indentLevel * 2 + 1).join(' ');
      }
      indented.push(indent + token);
  });
  return indented;
}
module.exports = Formatter;
