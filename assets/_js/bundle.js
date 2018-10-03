$(document).ready(function () {

  // SMOOTH PAGE LOAD
  $('body').removeClass('fade-out');

  // NAV BAR
  $('#toggle').click(function() {
    $(this).toggleClass('active');
    $('#overlay').toggleClass('open');
  });

  $(document).keyup(function() {
    if ($('#overlay').hasClass('open')) {
      $('button_container').toggleClass('active');
      $('#toggle').toggleClass('active');
      $('#overlay').toggleClass('open');
    }
  });

  // ANIMATION LOGIC
  $('#intro').addClass('active');

  let activeIndex = 0;
  let animating = false;
  let sectionLength = $('section').length;

  // LOAD NEXT SLIDE AS PER MAU REQUEST
  setTimeout(() => {
    if (!animating && activeIndex === 0 && isDesktop()) {
      navigate('next');
    }
  }, 4000);

  // LEFT PREV CLICK
  $('.left').click(() => {
    if (!animating && isDesktop()) {
      toggleSlide('previous');
    }
  });

  // RIGHT NEXT CLICK
  $('.right').click(() => {
    if (!animating && isDesktop()) {
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
    console.log($('section.active ul li.active'));
    $('section.active ul li.active').removeClass('active');
    $('section.active ul li').first().addClass('active');
    $('section.active').removeClass('active');
    $('section').eq(activeIndex).addClass('active');
    colorize();
    animating = false;
  };

  const colorize = () => {
    if ($('section.active').hasClass('dark') || $('section.active ul li.active').hasClass('dark')) {
      $('body').addClass('dark');
    } else {
      $('body').removeClass('dark');
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
      let active = $($tgt).closest('li.active');
      let next = active.next();
      if (next.length < 1) {
        // next = $($tgt).parent().first();
        next = $($tgt).parent().parent().find('li:first-of-type');
      }
      active.removeClass('active');
      next.addClass('active');
      next.hasClass('dark') ? $('body').addClass('dark') : $('body').removeClass('dark');
    }
  });


  // PAGINATION LOGIC
  const toggleSlide = (direction) => {
    if (isDesktop()) {
      if (direction === 'next') {
        let active = $('section.active ul li.active');
        let next = active.next();
        if (next.length === 0) {
          return;
        }
        active.addClass('slide-right');
        next.addClass('active');
        next.removeClass('slide-left');
        next.hasClass('dark') ? $('body').addClass('dark') : $('body').removeClass('dark');
        setTimeout(() => active.removeClass('active'), 300);
      } else if (direction === 'previous') {
        let active = $('section.active ul li.active');
        let prev = active.prev();
        if (prev.length === 0) {
          return;
        }
        active.addClass('slide-left');
        prev.addClass('active');
        prev.removeClass('slide-right');
        prev.addClass('active');
        prev.hasClass('dark') ? $('body').addClass('dark') : $('body').removeClass('dark');
        setTimeout(() => active.removeClass('active'), 300);
      }
    }
  };

});

