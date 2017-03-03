/**
 * Created by Xingyuan on 3/2/17.
 */
function getQuote() {
    $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=", function (json) {
        $("#quote").html(json[0].content);
        $("#cite").html(json[0].title);
    });
}

$(document).ready(function () {
    $("#new-quote-btn").on("click", getQuote);
});
