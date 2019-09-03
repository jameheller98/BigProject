window.onscroll = function() {scroll()};

function scroll() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        if(document.getElementById("scroll").className.split(" ").indexOf("scroll") == -1)
            document.getElementById("scroll").className = document.getElementById("scroll").className.replace(/\bscroll1\b/g,"scroll");
    }
    else {
        document.getElementById("scroll").className = document.getElementById("scroll").className.replace(/\bscroll\b/g,"scroll1");
    }
}