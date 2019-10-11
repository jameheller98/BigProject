window.onscroll = function() {scroll()}; // khi scroll màn hình thực hiện hàm scroll()
//hàm scroll
function scroll() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      // trong khi scroll màn hình top > 50 hoặc scroll các phần tử > 50 với màn hình
      // thực thi các lệnh sau
        if(document.getElementById("scroll").className.split(" ").indexOf("scroll") == -1)
        // thực hiện thay thế class scroll1 thành scroll cho phần tử có id là scroll (đẩy head lên đầu)
            document.getElementById("scroll").className = document.getElementById("scroll").className.replace(/\bscroll1\b/g,"scroll");
    }
    else {
      // ngược lại scroll thành scroll1 (đẩy head về vị trí cũ)
        document.getElementById("scroll").className = document.getElementById("scroll").className.replace(/\bscroll\b/g,"scroll1");
    }
}
