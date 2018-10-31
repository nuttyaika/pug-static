import '../styles/main.scss';
import 'bootstrap';
import './_jquery.heightLine.js';


$(function () {

  // smooth scroll
  $('a[href^="#"]').click(function () {
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    if (window.matchMedia("(min-width: 980px)").matches) {
      var position = target.offset().top-90;
    } else {
      var position = target.offset().top;
    }

    $('body,html').animate({ scrollTop: position }, speed, 'swing');
    return false;
  });

  // Mobile menu
  var headerMenu = $('.header__menu');
  var headerBtn = $('.header__icon');
  var menuItem = $('.header__menu-item');

  var state = false;
  var scrollpos;

  headerBtn.on('click', function () {
    menuItem.css('opacity', 0);
    $(this).toggleClass('js-active');
    if ($(this).hasClass('js-active')) {
      headerMenu.animate(
        {
          left: '0'
        },
        {
          duration: '80',
          easing: "linear"
        }
      );
      menuItem.each(function (i) {
        $(this).delay(180 * i).animate({
          opacity: 1
        },
          {
            duration: '100',
            easing: "linear"
          }
        );
      });
    } else {
      headerMenu.animate(
        {
          left: '-100%'
        }
      )
    }
    if (state == false) {
      scrollpos = $(window).scrollTop();
      $('body').addClass('js-fixed').css({ 'top': -scrollpos });
      state = true;
    } else {
      $('body').removeClass('js-fixed').css({ 'top': 0 });
      window.scrollTo(0, scrollpos);
      state = false;
    }
  });

  $('.header__menu-item-link').on('click', function () {
    $('body').removeClass('js-fixed');
    headerBtn.removeClass('js-active');
    headerMenu.animate(
      {
        left: '-100%'
      }
    )
    $(window).off('.noScroll');
  });

});
