var childArr;
var mainPage = document.getElementById('main');

$.ajax({
  method: 'GET',
  url: 'http://www.reddit.com/r/funny.json',
  dataType: 'json'
})
.done(function (data) {
  processResponse(data);
})
.fail(function () {
  throw new TypeError();
})
.always(function () {

});

function processResponse (response) {
  childArr = response.data.children;
  childArr.forEach(createTitle);
}

function createTitle (elem, ind, arr) {
  var title = document.createElement('h3');
  title.className = 'title';
  title.innerHTML = '<a href=' + elem.data.url + '>'+ elem.data.title + '</a>';
  mainPage.appendChild(title);

  var thumbnail = document.createElement('div');
  thumbnail.className = 'thumbnail';
  thumbnail.innerHTML = '<a href=' + elem.data.url + '><img src=' + elem.data.thumbnail + '></a>';
  mainPage.appendChild(thumbnail);

  var author = document.createElement('div');
  author.className = 'author';
  author.innerHTML = '<a href=http://www.reddit.com/user/' + elem.data.author + '>' + elem.data.author + '</a>';
  mainPage.appendChild(author);

  var comments = document.createElement('div');
  comments.className = 'comments';
  comments.innerHTML = '<a href=http://www.reddit.com' + elem.data.permalink+ '>' + elem.data.num_comments + ' comments' + '</a>';
  mainPage.appendChild(comments);
}