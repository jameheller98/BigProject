function createLI() {
    if(window.innerWidth <= 550)
        for(i=1; i<4; i++) {
            var element = document.createElement("li"); // tạo element li gán cho biến element
            var parent = document.getElementById("slide-button"); // lấy element có id slide-button gán cho parent
            parent.appendChild(element); // thêm phần tử li vào sau phần tử parent
            element.id="slide" + i; // gán id cho từng li
            $("#slide" + i).attr("data-target", "#slide"); //thêm data-target="#slide" cho từng phần tử li có id slide[i]
            $("#slide" + i).attr("data-slide-to", 2 + i); //thêm data-slide-to=2+i cho từng phần tử li có id slide[i]
        }
}

function createDIV1() {
    if(window.innerWidth <= 550) {
        var element = document.createElement("div");
        var img = document.createElement("img");
        var temp = document.getElementById("img");
        var child = document.getElementById("img2-1")

        temp.insertBefore(element, child);
        element.appendChild(img);
        element.classList.add("carousel-item");
        element.id="img1-2";
        img.src="../images/concat/DiamondBay2.png";
        img.width="540";
        img.height="340";
        img.style.maxWidth="100%";
    }
}
function createDIV2() {
    if(window.innerWidth <= 550) {
        var element = document.createElement("div");
        var img = document.createElement("img");
        var temp = document.getElementById("img");
        var child = document.getElementById("img3-1")

        temp.insertBefore(element, child);
        element.appendChild(img);
        element.classList.add("carousel-item");
        element.id="img2-2";
        img.src="../images/concat/HolyLand2.png";
        img.width="540";
        img.height="340";
        img.style.maxWidth="100%";
    }
}
function createDIV3() {
    if(window.innerWidth <= 550) {
        var element = document.createElement("div");
        var img = document.createElement("img");
        var temp = document.getElementById("img");

        temp.appendChild(element);
        element.appendChild(img);
        element.classList.add("carousel-item");
        element.id="img3-2";
        img.src="../images/concat/GreenBayGarden2.jpg";
        img.width="540";
        img.height="340";
        img.style.maxWidth="100%";
    }
}
