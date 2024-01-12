// const swiperObj = new Swiper('.swiper', {
//     // Optional parameters
//     // direction: 'vertical',
//     // loop: true,
//     slidesPerView: 5,
//     spaceBetween: 250,


//     // If we need pagination
//     pagination: {
//       el: '.swiper-pagination',
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },

//     // And if we need scrollbar
//     scrollbar: {
//       el: '.swiper-scrollbar',
//     },
//   });

const swiperObj = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  grid: {
    rows: 1,
  },

  breakpoints: {

    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 5,
    },
  },

  mousewheel: {
    forceToAxis: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },


});
