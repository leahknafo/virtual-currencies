 //By pressing the button, the page will scroll up
 const height = $(document).height();
    $('#content').css('height', height);
    $('#back').hide();
    $(document).ready(function () {
      $(document).scroll(function () {
        const currentPosition = $(window).scrollTop();
        if (currentPosition > height) {
          $('#back').show();
        } else {
          $('#back').hide();
        }
      })
      $('#back').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
      });
    });

    //By pressing the button, the page will scroll to the bottom
    $('#tobottom').click(function (event) {
      event.preventDefault();
      var n = $(document).height();
      $('html, body').animate({ scrollTop: n }, 500);
    });