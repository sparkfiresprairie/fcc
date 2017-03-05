/**
 * Created by Xingyuan on 3/2/17.
 */

// Flat UI color swatches http://designmodo.github.io/Flat-UI/
var colors = ["#16A085", "#27AE60", "#2980B9", "#8E44AD", "#2C3E50", "#F39C12", "#D35400", "#C0392B", "#BDC3C7", "#7F8C8D"];
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
            var idx = Math.floor(Math.random() * colors.length);
            currentQuote = r.quote;
            currentAuthor = r.author;
            $("#quote-text").fadeOut("slow", "linear", function() {
                $(this).html(currentQuote);
                $(this).css("color", colors[idx]);
                $(this).fadeIn();
            })
            $("#cite").fadeOut("slow", "linear", function() {
                $("#quote-author").html(currentAuthor);
                $(this).css("color", colors[idx]);
                $(this).fadeIn();
            })
            $(".btn").fadeOut("slow", "linear", function() {
                $(this).css("background-color", colors[idx]);
                $(this).fadeIn();
            })
            $(".container-fluid").fadeOut("slow", "linear", function() {
                $(this).css("background-color", colors[idx]);
                $(this).fadeIn();
            })
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
