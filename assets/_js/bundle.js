$(document).ready(function () {

  // SMOOTH PAGE LOAD
  $('body').removeClass('fade-out');

  // NAV BAR
  $('.menu-collapsed').click(function() {
    $(this).toggleClass('menu-expanded');
  });

  // NAVIGATION LOGIC
  $('#intro').addClass('active');

  let activeIndex = 0;
  let animating = false;
  let sectionLength = $('section').length;

  // LEFT PREV CLICK
  $('.left').click(() => {
    if (!animating && isDesktop()) {
      animating = true;
      navigate('previous');
    }
  });

  // RIGHT NEXT CLICK
  $('.right').click(() => {
    if (!animating && isDesktop()) {
      animating = true;
      navigate('next');
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
    $('section.active .description').addClass('leave');
    activeIndex += 1;
    setTimeout(() => removeActiveClass(), 1000);
  };

  const enter = () => {
    activeIndex = activeIndex - 1;
    removeActiveClass();
    $('section.active .left').removeClass('leave');
    $('section.active .right').removeClass('leave');
    $('section.active .description').removeClass('leave');
  };

  const removeActiveClass = () => {
    $('section.active').removeClass('active');
    $('section').eq(activeIndex).addClass('active');
    colorize();
    animating = false;
  };

  const colorize = () => {
    if ($('section.active').hasClass('dark')) {
      $('body').addClass('dark');
    } else {
      $('body').removeClass('dark');
    }
  };

  const isDesktop = () => {
    let width = $(window).width();
    return width > 768;
  };

});

