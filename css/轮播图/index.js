const onload = function () {
  function $(selector, all) {
    if (all === true) {
      return document.querySelectorAll(selector);
    }
    return document.querySelector(selector);
  }
  const container = $('.container>li', true);
  const length = container.length;
  const dots = $('.dots');
  const width = +getComputedStyle(container[0]).width.slice(0, -2)
  let pointer = ''
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      pointer += '<span class="actived" data-index=' + i + '></span>';
    } else {
      pointer += '<span data-index=' + i + '></span>';
    }
  }
  dots.innerHTML = pointer;
  // 初始化actived的卡片
  function init() {
    carouselCalc(0)
    for (let i = 0; i < length; i++) {
      container[i].addEventListener('transitionend', function () {
        container[i].style.zIndex = 0
      }, false)
    }
  }
  init();

  let timer = setInterval(carouseling, 1500)

  function carouseling() {
    for (let i = 0; i < length; i++) {
      const li = container[i];
      if (li.classList.contains('actived')) {
        if (i === length - 1) {
          switchover(i, 0);
        } else {
          switchover(i, i + 1);
        }
        break;
      }
    }
  }

  // actived的index，重新计算所有图片的位置
  function carouselCalc(index) {
    if (index === 0) {
      // 左边只要最后一个
      Object.assign(container[length - 1].style, {
        transform: `translateX(-${width}px)`
      })
      for (let i = index + 1; i <= length - 2; i++) {
        Object.assign(container[i].style, {
          transform: `translateX(${width*(i-index)}px)`
        })
      }
    } else if (index === length - 1) {
      // 右边只要第一个
      Object.assign(container[0].style, {
        transform: `translateX(${width}px)`
      })
      for (let i = index - 1; i > 0; i--) {
        Object.assign(container[i].style, {
          transform: `translateX(-${width*(index-i)}px)`
        })
      }
    } else {
      for (let i = index + 1; i <= length - 1; i++) {
        Object.assign(container[i].style, {
          transform: `translateX(${width*(i-index)}px)`
        })
      }
      for (let i = index - 1; i >= 0; i--) {
        Object.assign(container[i].style, {
          transform: `translateX(-${width*(index-i)}px)`
        })
      }
    }
  }

  // actived的图片从fromIndex到toIndex,默认向左走, 当点击小点时，from，to是不连续的
  function switchover(fromIndex, toIndex, direction = 'left') {
    if (direction === 'left') {
      Object.assign(container[fromIndex].style, {
        transform: `translateX(-${width}px)`
      })
    } else if (direction === 'right') {
      Object.assign(container[fromIndex].style, {
        transform: `translateX(${width}px)`
      })
    }
    Object.assign(container[toIndex].style, {
      transform: `translateX(0px)`
    })
    for (let i = 0; i < length; i++) {
      if (container[i].classList.contains('actived') && i !== toIndex) {
        container[i].classList.remove('actived')
      }
      if (!container[i].classList.contains('actived') && i === toIndex) {
        container[i].classList.add('actived')
      }
    }
    container[toIndex].style.zIndex = 2
    container[fromIndex].style.zIndex = 2
    pointerCarousel(toIndex);
    carouselCalc(toIndex);
  }

  // 把小点设置actived，其他的remove actived
  function pointerCarousel(index) {
    const pointers = $('.dots>span', true)
    for (let i = 0; i < length; i++) {
      const span = pointers[i]
      if (span.classList.contains('actived') && i !== index) {
        span.classList.remove('actived')
      }
      if (Number(span.dataset.index) === index && !span.classList.contains('actived')) {
        span.classList.add('actived')
      }
    }
  }

  const carousel = $('.carousel')
  carousel.addEventListener('mouseover', function () {
    clearInterval(timer);
    $('.assit>.prev').style.opacity = '.4'
    $('.assit>.next').style.opacity = '.4'
    $('.assit>.prev').style.left = '15px'
    $('.assit>.next').style.right = '15px'
  })
  carousel.addEventListener('mouseleave', function () {
    timer = setInterval(carouseling, 1500)
    $('.assit>.prev').style.left = '0'
    $('.assit>.prev').style.opacity = '0'
    $('.assit>.next').style.right = '0'
    $('.assit>.next').style.opacity = '0'
  })
  // 点击上一个/下一个的监听事件
  const assit = $('.assit')
  assit.addEventListener('click', throttle(function (event) {
    const click = function (action) {
      for (let i = 0; i < length; i++) {
        const li = container[i];
        if (li.classList.contains('actived')) {
          if (action === 'prev') {
            let toIndex = i - 1
            if (i === 0) {
              toIndex = length - 1
            }
            switchover(i, toIndex, 'right');
          } else if (action === 'next') {
            let toIndex = i + 1
            if (i === length - 1) {
              toIndex = 0
            }
            switchover(i, toIndex, 'left');
          }
          break;
        }
      }
    }
    click(event.target.className)
  }), false)

  // 点击中下的几个小点的监听事件
  dots.addEventListener('click', throttle(function (event) {
    const clickIndex = event.target.dataset.index;
    if (clickIndex) {
      for (let i = 0; i < length; i++) {
        const li = container[i]
        if (li.classList.contains('actived')) {
          switchover(i, +clickIndex);
          break;
        }
      }
    }
  }), false)

  // delay一定要大于等于transition中设置的duration，不然会出现闪现问题
  function throttle(fn, delay = 300, isImmediate = true) {
    let timer = null;
    let flag = true;
    if (isImmediate) {
      return function (...args) {
        if (flag) {
          fn.apply(this, args);
          flag = false
          timer = setTimeout(function () {
            flag = true
          }, delay)
        }
      }
    }
    return function (...args) {
      if (flag) {
        flag = false
        timer = setTimeout(function () {
          fn.apply(this, args);
          flag = true
        }, delay)
      }
    }
  }
}
window.onload = onload;