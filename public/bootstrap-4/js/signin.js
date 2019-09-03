function tran3() {
    var tran = document.getElementById("tran3");
    tran.className = tran.className.replace(/\btran1\b/g, "tran");

    setTimeout(function() {
        var run1 = document.getElementById("run9");
        run1.className = run1.className.replace(/\brun\b/g, "run1");
    }, 0);
    setTimeout(function() {
        var run2 = document.getElementById("run10");
        run2.className = run2.className.replace(/\brun\b/g, "run2"); 
    }, 250);
    setTimeout(function() {
        var run3 = document.getElementById("run11");
        run3.className = run3.className.replace(/\brun\b/g, "run3"); 
    }, 0);
    setTimeout(function() {
        var run4 = document.getElementById("run12");
        run4.className = run4.className.replace(/\brun\b/g, "run4"); 
    }, 250);
};
function tran4() {
    var tran = document.getElementById("tran4");
    tran.className = tran.className.replace(/\btran1\b/g, "tran");

    setTimeout(function() {
        var run1 = document.getElementById("run13");
        run1.className = run1.className.replace(/\brun\b/g, "run1");
    }, 0);
    setTimeout(function() {
        var run2 = document.getElementById("run14");
        run2.className = run2.className.replace(/\brun\b/g, "run2"); 
    }, 250);
    setTimeout(function() {
        var run3 = document.getElementById("run15");
        run3.className = run3.className.replace(/\brun\b/g, "run3"); 
    }, 0);
    setTimeout(function() {
        var run4 = document.getElementById("run16");
        run4.className = run4.className.replace(/\brun\b/g, "run4"); 
    }, 250);
};
function reset(){
    var tran3 = document.getElementById("tran3");
    var tran4 = document.getElementById("tran4");
    var user = document.getElementById("username");
    var pass = document.getElementById("password");
    
    if(user.value === "") {
        tran3.className = tran3.className.replace(/\btran\b/g, "tran1");

        setTimeout(function() {
            var run4 = document.getElementById("run12");
            run4.className = run4.className.replace(/\brun4\b/g, "run");
        }, 250);
        setTimeout(function() {
            var run3 = document.getElementById("run11");
            run3.className = run3.className.replace(/\brun3\b/g, "run"); 

        }, 0);
        setTimeout(function() {
            var run2 = document.getElementById("run10");
            run2.className = run2.className.replace(/\brun2\b/g, "run");
        }, 250);
        setTimeout(function() {
            var run1 = document.getElementById("run9");
            run1.className = run1.className.replace(/\brun1\b/g, "run");
        }, 0);
    }  
    if(pass.value === "") {
        tran4.className = tran4.className.replace(/\btran\b/g, "tran1");

        setTimeout(function() {
            var run4 = document.getElementById("run16");
            run4.className = run4.className.replace(/\brun4\b/g, "run");
        }, 250);
        setTimeout(function() {
            var run3 = document.getElementById("run15");
            run3.className = run3.className.replace(/\brun3\b/g, "run"); 

        }, 0);
        setTimeout(function() {
            var run2 = document.getElementById("run14");
            run2.className = run2.className.replace(/\brun2\b/g, "run");
        }, 250);
        setTimeout(function() {
            var run1 = document.getElementById("run13");
            run1.className = run1.className.replace(/\brun1\b/g, "run");
        }, 0);
    }
}