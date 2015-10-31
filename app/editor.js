$(function() {
  var sql = [
    "SELECT",
    "  id,",
    "  name",
    "FROM",
    "  js.access_logs",
    "WHERE           ",
    "  name = 'a'    ",
    "ORDER BY        ",
    "  id DESC       ",
    "LIMIT           ",
    "  10            ",
    ";"
  ];
  var reservedWord = [
    'SELECT',
    'FROM',
    'WHERE',
    'GROUP BY',
    'ORDER BY',
    'LIMIT'
  ];

  var showSQL = function(sql) {
    sql = $('textarea').val().split('\n');
    var result = ''
    $.each(sql, function(i, part){
      var className = "part"
      if($.inArray(part, reservedWord) >= 0) {
        className += ' reservedWord'
      };
      result += '<span class="' + className + '">' + part + '</span><br />';
    });
    $('#sql_result').html(result);
  }

  $('#editor').keyup(function() {
    showSQL(sql);
  });

  // for first view
  showSQL(sql);
});
