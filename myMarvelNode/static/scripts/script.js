//Search Red
$('#formRed').submit(function(e) {
  console.log('submitted')
  e.preventDefault();
  $.ajax({
    url: '/search',
    method: 'POST',
    data: {
      query: $('#inputRed').val()
    },
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

//Search Blue
$('#formBlue').submit(function(e) {
  console.log('submitted')
  e.preventDefault();
  $.ajax({
    url: '/search',
    method: 'POST',
    data: {
      query: $('#inputBlue').val()
    },
    error: function(data) {
      console.log(data);
    },
    success: function(data) {
      console.log('data:');
      console.log(data);
      var id = (data.heroes[0].id);
      var name = (data.heroes[0].name);
      var desc = (data.heroes[0].description);
      var img = (data.heroes[0].thumbnail.path);
      var ext = (data.heroes[0].thumbnail.extension);
      var imgLink = (img + '/portrait_uncanny' + '.' + ext);
      // var comicLink = (data.heroes[0].comics.available)
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
//Pick red corner win
$('#addScenarioRW').click(function(e) {
  var fight = {
        heroOne: $('#HBlue').text(),
        heroTwo: $('#HRed').text(),
        comment: $('#explanation').val(),
        winner: true
      };
      $.ajax({
        url: '/scenarios-user',
        method: 'POST',
        data: fight,
        error: function(data) {
          console.log(data)
        },
        success: function() {
          console.log('success');
          window.location = '/scenarios-user';
    }
  })
})
//pick blue corner win
$('#addScenarioBW').click(function(e) {
  var fight = {
        heroOne: $('#HBlue').text(),
        heroTwo: $('#HRed').text(),
        comment: $('#explanation').val(),
        winner: false
      }
      console.log(fight);
  $.ajax({
    url: '/scenarios-user',
    method: 'POST',
    data: fight,
    error: function(data) {
      console.log(data)
    },
    success: function() {
      console.log('success');
      window.location = '/scenarios-user';
    }
  })
})
//remove user scenarios
$('.remove').click(function(e) {
  console.log($(this).attr('scenarioId'))
  var element = $(this);
  var delScenario = {
    id: $(this).attr('scenarioId')
  }
  console.log(delScenario);
  var onDone = function() {
    console.log('deleted', delScenario, element);
    window.location = window.location.pathname;
  };
  $.ajax({
    url: '/scenarios-user/',
    method: 'DELETE',
    data: delScenario,
  }).done(onDone);
});

$('.viewInfo').click(function(e){
  e.preventDefault()
  console.log('clicked')
  var scenId = {
    id: $(this).attr('viewId')
  }
  console.log(scenId);

  $.ajax({
    url: '/fight',
    method: 'POST',
    data: scenId,
    error: function(data) {
      console.log(data)
    },
    success: function() {
      console.log('success');
      window.location = '/fight';
    }
  })
});
