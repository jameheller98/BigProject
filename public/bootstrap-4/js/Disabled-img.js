function disable() {
    if(window.innerWidth > 550) {
        var parent = document.getElementById("img");
        var child1 = document.getElementById("img1-2");
        var child2 = document.getElementById("img2-2");
        var child3 = document.getElementById("img3-2");
        if(child1 && child2 && child3 == true) {
            parent.removeChild(child1); // Xóa phần tử child nếu tồn tại và cửa sổ màn hình > 550px
            parent.removeChild(child2);
            parent.removeChild(child3);
        }
    }
}
