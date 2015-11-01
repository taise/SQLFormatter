var Formatter = function() {};

Formatter.trim = function(sql) {
  return sql.replace(/\s+/g, " ")
            .replace(/^\s+|\s+$/g, "")
            .replace(/ ?;$/, ";");
};

module.exports = Formatter;
