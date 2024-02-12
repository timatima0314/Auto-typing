const axios = require("axios");

axios
  .get("http://xxx/wp-json/wp/v2/posts")
  .then(function (response) {
    //console.log(response);
    let html = "";
    _.each(response, function (items) {
      _.each(items, function (item) {
        console.log(item);
        console.log(item.link);
        console.log(item.title.rendered);
        html += `<p><a href="${item.link}">${item.title.rendered}</a></p>`;
      });

      $("#posts").html(html);
    });
  })
  .catch(function (error) {
    console.log(error);
  });
