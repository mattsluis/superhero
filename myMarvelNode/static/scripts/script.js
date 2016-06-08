

$('#formLeft').submit(function(e) {
  console.log('submitted')
  e.preventDefault();

  $.ajax({
    url: '/results',
    method: 'POST',
    data: {query: $('#inputLeft').val()},
    error: function(data) {
      console.log(data)
    },


    success: function(data) {
      console.log('data')
      console.log(data)
      console.log(data[1])

      // $('#formLeft').append(data)
      $("<h1>").text(data.JSON).appendTo("body");
    }

  })
});

//
//
// $('#formRight').click(function(e) {
//
//   var dataRight = {
//     name: $('#name').text(),
//     imgLink: $('#imgLink').attr("src"),
//     description: $('#description').text(),
//     storyCount: $('#storyCount').text()
//   }
//   // console.log("dataRight:" dataRight);
//
//   $.ajax({
//     url: '/results',
//     method: 'POST',
//     data: {dataRight},
//
//
//     success: function(data) {
//       window.location = '/results';
//       $('#formRight').append(data)
//     }
//
//   })
// });
