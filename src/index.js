var root = document.getElementById('root')
root.innerHTML = `<button class='like-btn'>
                    <span class='like-text'>点赞</span>
                    <span>👍</span>
                  </button>`
var button = document.getElementsByClassName('like-btn')[0]
var text = document.getElementsByClassName('like-text')[0]
var flag = false
button.addEventListener('click', () => {
  flag = !flag
  if (flag) {
    text.textContent = '已点赞'
  } else {
    text.textContent = '点赞'
  }
}, false)