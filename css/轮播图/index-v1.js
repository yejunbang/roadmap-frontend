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
  let pointer = ''
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      pointer += '<span class="actived" data-index=' + i + '></span>';
    } else {
      pointer += '<span data-index=' + i + '></span>';
    }
  }
  dots.innerHTML = pointer;
  let timer = setInterval(function () {
    click('next')
  }, 1500)

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
  })
  carousel.addEventListener('mouseleave', function () {
    timer = setInterval(function () {
      click('next')
    }, 1500)
  })

  function click(action) {
    for (let i = 0; i < length; i++) {
      const li = container[i];
      if (li.className === 'actived') {
        li.className = '';
        li.style.display = 'none';
        if (action === 'prev') {
          if (i === 0) {
            container[length - 1].className = 'actived';
            container[length - 1].style.display = 'block';
            pointerCarousel(length - 1);
          } else {
            container[i - 1].className = 'actived';
            container[i - 1].style.display = 'block';
            pointerCarousel(i - 1);
          }
        } else if (action === 'next') {
          if (i < length - 1) {
            container[i + 1].className = 'actived';
            container[i + 1].style.display = 'block';
            pointerCarousel(i + 1);
          } else {
            container[0].className = 'actived';
            container[0].style.display = 'block';
            pointerCarousel(0);
          }
        }
        break;
      }
    }
  }

  // 点击上一个/下一个的监听事件
  const assit = $('.assit')
  assit.addEventListener('click', function (event) {
    click(event.target.className)
  })
  // 点击中下的几个小点的监听事件
  dots.addEventListener('click', function (event) {
    const clickIndex = event.target.dataset.index;
    if (clickIndex || clickIndex === 0) {
      pointerCarousel(+clickIndex);
      let activedIndex
      for (let i = 0; i < length; i++) {
        const li = container[i]
        if (li.className === 'actived') {
          activedIndex = i;
          break;
        }
      }
      if (activedIndex !== clickIndex) {
        container[activedIndex].className = '';
        container[activedIndex].style.display = 'none';
        container[clickIndex].className = 'actived';
        container[clickIndex].style.display = 'block';
      }
    }
  })
}
window.onload = onload;