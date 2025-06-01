// ハンバーガーメニュー
const nav = document.querySelector('.main-nav');
const links = document.querySelectorAll('.main-nav__link');
const btn = document.querySelector('.hamburger');
const hamburger = () => {
  btn.classList.toggle('open');
  if (btn.classList.contains('open')) {
    nav.classList.add('open');
  } else {
    nav.classList.remove('open');
  }
};
btn.addEventListener('click', hamburger);
links.forEach((link) => {
  link.addEventListener('click', hamburger);
});

// Reason
const slideLeft = document.querySelector('.reason__slide--left');
const slideRight = document.querySelector('.reason__slide--right');
const options = {
  duration: 500,
  easing: 'ease-out',
  fill: 'forwards',
}
// 画面幅が900px以下の場合
if (window.matchMedia('(max-width: 900px)').matches) {
  slideLeft.animate(
    {
      opacity: [0, 1],
      transform: ['translateX(-100%)', 'translateX(0%)']
    },
    options
  );
  slideRight.animate(
    {
      opacity: [0, 1],
      transform: ['translateX(100%)', 'translateX(16px)']
    },
    options
  );
// 画面幅が900px以上の場合
} else {
  slideLeft.animate(
    {
      opacity: [0, 1],
      transform: ['translateX(-50%)', 'translateX(0%)']
    },
    options
  );
  slideRight.animate(
    {
      opacity: [0, 1],
      transform: ['translateX(150%)', 'translateX(100%)']
    },
    options
  );
}
window.addEventListener('resize', () => {
  slideRight.getAnimations().forEach(anim => anim.cancel());
  if (window.matchMedia('(max-width: 900px)').matches) {
    slideRight.style.transform = 'translateX(16px)';
    slideRight.style.width = 'calc(100% - 16px)';
  } else {
    slideRight.style.transform = 'translateX(100%)';
    slideRight.style.width = '50%';
  }
});

// #Voice
// 監視対象が範囲内に現れたら実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          transform: ['scale(.1)', 'scale(1)'],
        },
        options
      );
      obs.unobserve(entry.target);
    }
  });
};
// 監視ロボットの設定
const fadeObserver = new IntersectionObserver(animateFade);
// 監視するように指示
const itemLefts = document.querySelectorAll('.voice__item--left');
itemLefts.forEach((itemLeft) => {
  fadeObserver.observe(itemLeft);
});
const itemRight = document.querySelector('.voice__item--right');
fadeObserver.observe(itemRight);
