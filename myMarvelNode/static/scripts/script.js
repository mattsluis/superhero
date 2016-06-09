$('#formRed').submit(function(e) {
  console.log('submitted')
  e.preventDefault();
  $.ajax({
    url: '/search',
    method: 'POST',
    data: {query: $('#inputRed').val()},
    error: function(data) {
      console.log(data)
    },
    success: function(data) {
      console.log('data')
      var id = (data.heroes[0].id);
      var name = (data.heroes[0].name);
      var desc = (data.heroes[0].description);
      var img = (data.heroes[0].thumbnail.path);
      var ext = (data.heroes[0].thumbnail.extension);
      var imgLink = (img + '/portrait_uncanny' + '.' + ext);
      $('#hideRed').text(id);
      $('#imgRed').attr('src', imgLink);
      $('#HRed').text(name);
      $('#PRed').text(desc);
    }
  });
});
$('#formBlue').submit(function(e) {
  console.log('submitted')
  e.preventDefault();
  $.ajax({
    url: '/search',
    method: 'POST',
    data: {query: $('#inputBlue').val()},
    error: function(data) {
      console.log(data)
    },
    success: function(data) {
      console.log('data:')
      console.log(data)
      var id = (data.heroes[0].id)
      var name = (data.heroes[0].name)
      var desc = (data.heroes[0].description)
      var img = (data.heroes[0].thumbnail.path);
      var ext = (data.heroes[0].thumbnail.extension);
      var imgLink = (img + '/portrait_uncanny' + '.' + ext);
      $('#hideBlue').text(id);
      $('#imgBlue').attr('src', imgLink);
      $('#HBlue').text(name);
      $('#PBlue').text(desc);
      // $('#container').text(data).appendTo('')
      // $('#formLeft').append(data)
      // $("<h1>").text(data.JSON).appendTo("body");
    }
  })
});
