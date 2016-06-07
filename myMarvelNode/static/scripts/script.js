$('#formLeft').click(function(e) {


  var dataLeft = {
    name: $('#name').text(),
    imgLink: $('#imgLink').attr("src"),
    description: $('#description').text(),
    storyCount: $('#storyCount').text()
  }
  console.log(addCollection);

  $.ajax({
    url: '/results',
    method: 'POST',
    data: {dataLeft},
    error: function(data) {
      console.log(data)
    }


    success: function(data) {
      window.location = '/results';
      $('#formLeft').append(data)
    }

  })
});

$('#formRight').click(function(e) {

  var dataRight = {
    name: $('#name').text(),
    imgLink: $('#imgLink').attr("src"),
    description: $('#description').text(),
    storyCount: $('#storyCount').text()
  }
  // console.log("dataRight:" dataRight);

  $.ajax({
    url: '/results',
    method: 'POST',
    data: {dataRight},


    success: function(data) {
      window.location = '/results';
      $('#formRight').append(data)
    }

  })
});
