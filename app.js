var childArr;
var mainPage = document.getElementById('main');

$.ajax({
  method: 'GET',
  url: 'http://www.reddit.com/r/newsokur.json',
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
  childArr.forEach(createPage);
}

function createPage (elem, ind, arr) {
  var post = document.createElement('div');
  post.className = 'post';
  mainPage.appendChild(post);

  var thumbnailImg = document.createElement('IMG');
  if (elem.data.thumbnail === 'self') {
    thumbnailImg.src = 'http://a.thumbs.redditmedia.com/ExQ61Q54Z-aAuJpkFNcC0viWh-2iQcEc9HrocEZcxw8.jpg';
  } else {
    thumbnailImg.src = elem.data.thumbnail;
  }
  thumbnailImg.className = 'img';
  var thumbnailLink = document.createElement('a');
  thumbnailLink.href = elem.data.url;
  thumbnailLink.className = 'thumbnail';
  thumbnailLink.appendChild(thumbnailImg);
  post.appendChild(thumbnailLink);

  var info = document.createElement('div');
  info.className = 'info';
  post.appendChild(info);

  var title = document.createElement('h3');
  title.className = 'title';
  title.innerHTML = '<a href=' + elem.data.url + '>'+ elem.data.title + '</a>';
  info.appendChild(title);

  var date = document.createElement('div');
  date.className = 'date';
  date.innerHTML = elem.data.created;
  info.appendChild(date);

  var author = document.createElement('a');
  author.className = 'author';
  author.href = 'http://www.reddit.com/user/' + elem.data.author;
  author.innerHTML = elem.data.author;
  info.appendChild(author);

  var comments = document.createElement('a');
  comments.className = 'comments';
  comments.href = 'http://www.reddit.com' + elem.data.permalink;
  comments.innerHTML = elem.data.num_comments + ' comments';
  info.appendChild(comments);
}