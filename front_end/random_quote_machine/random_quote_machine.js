/**
 * Created by Xingyuan on 3/2/17.
 */

var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
var currentQuote = "", currentAuthor = "";

// https://market.mashape.com/andruxnet/random-famous-quotes
function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "UsONESE3zzmshM3O3v19H6pGnONap1o91rKjsnxaWbKeqBRuUM",
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
        },
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
        success: function (response) {
            var r = JSON.parse(response);
            currentQuote = r.quote;
            currentAuthor = r.author;
            $("#quote-author").html(currentAuthor);
            $("#quote-text").html(currentQuote);
        },
        cache: false
    });
}

function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

// https://dev.twitter.com/web/tweet-button/web-intent
function tweetQuote() {
    if (!inIframe()) {
        window.open("https://twitter.com/intent/tweet?hashtags=RandomQuoteMachine&text=" + encodeURI('"' + currentQuote + '"' + " - " + currentAuthor));
    }
}

$(document).ready(function() {
    getQuote();
    $("#new-quote-btn").on("click", getQuote);
    $("#tweet-quote-btn").on("click", tweetQuote);
});
