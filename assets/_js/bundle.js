$(document).ready(function () {

  // NAVIGATION LOGIC
  $('#intro').addClass('active');

  let activeIndex = 0;
  let animating = false;


  // LEFT PREV CLICK
  $('.left').click(() => {
    if (!animating) {
      animating = true;
      navigate('previous');
    }
  });

  // RIGHT NEXT CLICK
  $('.right').click(() => {
    if (!animating) {
      animating = true;
      navigate('next');
    }
  });

  const navigate = (action) => {
    if (action === 'next') {
      leave();
    } else if (action === 'previous' && activeIndex == 0) {
      activeIndex = 0;
    } else if (action === 'previous') {
      enter();
    }
    animating = false;
  };

  const leave = () => {
    $('section.active .left').addClass('leave');
    $('section.active .right').addClass('leave');
    activeIndex += 1;
    setTimeout(() => removeActiveClass(), 1000);
  };

  const enter = () => {
    activeIndex = activeIndex - 1;
    removeActiveClass();
    $('section.active .left').removeClass('leave');
    $('section.active .right').removeClass('leave');
  };

  const removeActiveClass = () => {
    $('section.active').removeClass('active');
    $('section').eq(activeIndex).addClass('active');
  };

});

