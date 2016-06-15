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
  childArr.forEach(createPage);
}

function createPage (elem, ind, arr) {
  var post = document.createElement('li');
  post.className = 'post';
  mainPage.appendChild(post);

  var $score = $('<div/>');
  $score.addClass('score');
  $score.text(elem.data.score);
  $(post).append($score);

  var thumbnailImg;
  var thumbnailLink;
  var info;
  var title;
  var date;
  var millisec;
  var author;
  var comments;
  if (elem.kind === 't1') {
    info = document.createElement('div');
    info.className = 'info';
    post.appendChild(info);

    title = document.createElement('h3');
    title.className = 'title';
    title.innerHTML = '<a href=' + elem.data.link_url + '>'+ elem.data.link_title + '</a>';
    info.appendChild(title);

    var body = document.createElement('div');
    body.className = 'body';
    body.innerHTML = elem.data.body;
    info.appendChild(body);

    date = document.createElement('div');
    millisec = Date.now() - (elem.data.created_utc * 1000);
    date.className = 'date';
    date.innerHTML = timeConvert(millisec);
    info.appendChild(date);

    author = document.createElement('a');
    author.className = 'author';
    author.href = 'http://www.reddit.com/user/' + elem.data.author;
    author.innerHTML = elem.data.author;
    date.appendChild(author);
    $(author).click(function (event) {
      event.preventDefault();
        $(".post").remove();
        $.ajax({
          method: 'GET',
          url: 'http://www.reddit.com/user/' + elem.data.author + '/overview.json',
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
    });

    // comments = document.createElement('a');
    // comments.className = 'comments';
    // comments.href = 'http://www.reddit.com' + elem.data.permalink;
    // comments.innerHTML = elem.data.num_comments + ' comments';
    // info.appendChild(comments);
  }
  if (elem.kind === 't3') {
    thumbnailImg = document.createElement('IMG');
    if (elem.data.thumbnail === 'self') {
      thumbnailImg.src = 'http://a.thumbs.redditmedia.com/ExQ61Q54Z-aAuJpkFNcC0viWh-2iQcEc9HrocEZcxw8.jpg';
    } else {
      thumbnailImg.src = elem.data.thumbnail;
    }
    thumbnailImg.className = 'img';
    thumbnailLink = document.createElement('a');
    thumbnailLink.href = elem.data.url;
    thumbnailLink.className = 'thumbnail';
    thumbnailLink.appendChild(thumbnailImg);
    post.appendChild(thumbnailLink);

    info = document.createElement('div');
    info.className = 'info';
    post.appendChild(info);

    title = document.createElement('h3');
    title.className = 'title';
    title.innerHTML = '<a href=' + elem.data.url + '>'+ elem.data.title + '</a>';
    info.appendChild(title);

    date = document.createElement('div');
    millisec = Date.now() - (elem.data.created_utc * 1000);
    date.className = 'date';
    date.innerHTML = timeConvert(millisec);
    info.appendChild(date);

    author = document.createElement('a');
    author.className = 'author';
    author.href = 'http://www.reddit.com/user/' + elem.data.author;
    author.innerHTML = elem.data.author;
    date.appendChild(author);
    $(author).click(function (event) {
      event.preventDefault();
        $(".post").remove();
        $.ajax({
          method: 'GET',
          url: 'http://www.reddit.com/user/' + elem.data.author + '/overview.json',
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
    });


    comments = document.createElement('a');
    comments.className = 'comments';
    comments.href = 'http://www.reddit.com' + elem.data.permalink;
    comments.innerHTML = elem.data.num_comments + ' comments';
    info.appendChild(comments);
  }
}

function timeConvert (millisec) {
  var seconds = Math.floor(millisec / 1000);
  var minutes = Math.floor(millisec / (1000 * 60));
  var hours = Math.floor(millisec / (1000 * 3600));
  var days = Math.floor(millisec / (1000 * 3600 * 24));
  if (seconds < 60) {
      return 'Submitted ' + seconds + ' Seconds Ago by ';
  } else if (minutes === 1) {
      return 'Submitted ' + minutes + ' Minute Ago by ';
  } else if (minutes < 60) {
      return 'Submitted ' + minutes + ' Minutes Ago by ';
  } else if (hours === 1) {
      return 'Submitted ' + hours + ' Hour Ago by ';
  } else if (hours < 24) {
      return 'Submitted ' + hours + ' Hours Ago by ';
  } else if (days === 1) {
      return 'Submitted ' + days + ' Day Ago by ';
  } else {
      return 'Submitted ' + days + ' Days Ago by ';
  }
}