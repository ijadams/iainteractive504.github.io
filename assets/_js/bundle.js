import {canvasDraw, clearCanvas} from './draw';

$(document).ready(function () {
  // SMOOTH PAGE LOAD
  $('body').removeClass('fade-out');

  // NAV BAR
  $('#toggle').click(function () {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  $('#overlay').click(() => {
    if (isDesktop()) {
      $('#toggle').toggleClass('active');
      $('#overlay').toggleClass('open');
    }
  });

  $(document).keyup(function () {
    if ($('#overlay').hasClass('open')) {
      $('button_container').toggleClass('active');
      $('#toggle').toggleClass('active');
      $('#overlay').toggleClass('open');
    }
  });

  // ANIMATION LOGIC
  $('#intro').addClass('active');

  let activeIndex = 0;
  let animating = true;
  let sectionLength = $('section').length;

  // load second slide after animation
  setTimeout(() => {
    if (activeIndex === 0 && isDesktop()) {
      navigate('next');
    }
  }, 4000);

  // SLICK CAROUSEL
  $('.project--slide ul').slick({
    arrows: false,
    infinite: true,
    lazyLoad: 'ondemand'
  });

  $('.project--slide ul').on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    let next;
    if (isDesktop()) {
      next = $('section.active ul li').eq(nextSlide + 1);
    } else {
      let project = slick.$slider[0];
      next = $(project).find('li').eq(nextSlide + 1);
    }
    let color = $(next).children()[0].innerHTML;
    if (!color) {
      color = next.hasClass('dark') ? 'black' : 'white';
    }
    colorize(color);
  });

  // LEFT PREV CLICK
  $('.prev').click(() => {
    if (!animating && isDesktop()) {
    clearCanvas();
    toggleSlide('previous');
    }
  });

  // RIGHT NEXT CLICK
  $('.next').click(() => {
    if (!animating && isDesktop()) {
    clearCanvas();
    toggleSlide('next');
    }
  });

  // SCROLL ANIMATION LOGIC
  $(window).on('scroll', (e) => {
    if (isDesktop()) {
      e.preventDefault();
    }
  });

  let scroll = {
    isThrottled: false,
    throttleDuration: 1650,
  };

  $(window).on('mousewheel', (e) => {
    if (isDesktop()) {
      e.preventDefault();
      if (scroll.isThrottled) {
        return;
      }
      scroll.isThrottled = true;
      setTimeout(() => {
        scroll.isThrottled = false;
      }, scroll.throttleDuration);
      if (!animating) {
        clearCanvas();
        if (e.originalEvent.wheelDelta > 0) {
          animating = true;
          navigate('previous');
        } else {
          animating = true;
          navigate('next');
        }
      }
    }
  });

  const navigate = (action) => {
    if (action === 'previous' && activeIndex == 0) {
      activeIndex = 0;
    } else if (action === 'next' && (activeIndex === (sectionLength - 1))) {
      activeIndex = sectionLength - 1;
    } else if (action === 'next') {
      leave();
    } else if (action === 'previous') {
      enter();
    }
    setTimeout(() => removeActiveClass(), 1000);
  };

  const leave = () => {
    $('section.active .left').addClass('leave');
    $('section.active .right').addClass('leave');
    setTimeout(() => {
      $('section.active .description').addClass('leave');
    }, 300);
    activeIndex += 1;
    setTimeout(() => removeActiveClass(), 1000);
  };

  const enter = () => {
    activeIndex = activeIndex - 1;
    removeActiveClass();
    $('section.active .left').removeClass('leave');
    $('section.active .right').removeClass('leave');
    setTimeout(() => {
      $('section.active .description').removeClass('leave');
    }, 1000);
  };

  const removeActiveClass = () => {
    $('section.active ul').slick('slickGoTo', 0);
    $('section.active').removeClass('active');
    $('section').eq(activeIndex).addClass('active');
    animating = false;
  };

  const colorize = (color) => {
    if (color) {
      $('#title').css('color', color);
      $('section .description p').css('color', color);
      $('body #toggle.button_container span').css('background', color);
    }
  };

  const isDesktop = () => {
    let width = $(window).width();
    return width > 768;
  };

  // CENTER CLICK
  $('.project--slide').click((e) => {
    let $tgt = $(e.target);
    if (!isDesktop()) {
      let active = $($tgt).closest('.project--slide ul');
      active.slick('slickNext');
    }
  });

  // PAGINATION LOGIC
  const toggleSlide = (direction) => {
    if (isDesktop()) {
      if (direction === 'next') {
        $('.project--slide.active ul').slick('slickNext');
      } else if (direction === 'previous') {
        $('.project--slide.active ul').slick('slickPrev');
      }
    }
  };

  $('canvas.more').each(function() {
    canvasDraw(this);
  });
});
