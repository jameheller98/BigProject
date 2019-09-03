//Hủy tác dụng
document.getElementById("disabled1").classList.add('disabled');
document.getElementById("disabled2").classList.add('disabled');
//select1
$(".select1").click(function() {
    //Lấy phần tử bấm chuột
    var temp = $("#select1").val();
    var choose_select = $(this);
    
    //lấy nội dung
    var text = choose_select.text();
    
    //gán cho giá trị input text
    $("#select1").val(text);
    var temp1 = $("#select1").val();
    
    //reset select 2 bán, thuê.
    if(temp.indexOf("bán") != temp1.indexOf("bán"))
        $("#select2").val("");
    if(temp.indexOf("thuê") != temp1.indexOf("thuê"))
        $("#select2").val("");
    
    //reset select 3 đất, nhà, căn hộ, mặt bằng.
    if(temp.indexOf("Nhà") != temp1.indexOf("Nhà"))
        $("#select3").val("");
    if(temp.indexOf("Đất") != temp1.indexOf("Đất"))
        $("#select3").val("");
    if(temp.indexOf("Căn hộ") != temp1.indexOf("Căn hộ"))
        $("#select3").val("");
    if(temp.indexOf("Mặt bằng") != temp1.indexOf("Mặt bằng"))
        $("#select3").val("");
    
    if(document.getElementById("select1").value == "Danh mục") {
        //Hủy tác dụng lại khi nhấn Danh mục
        if(document.getElementById("disabled1").className.split(" ").indexOf("disabled") == -1) {
            document.getElementById("disabled1").className += " " + "disabled";
            document.getElementById("disabled2").className += " " + "disabled";
        }
        $("#select2").val("");
        $("#select3").val("");
    }
    else {
        //xóa class disabled(Hủy disabled)
        document.getElementById("disabled1").className = document.getElementById("disabled1").className.replace(/\bdisabled\b/g, "");
        document.getElementById("disabled2").className = document.getElementById("disabled2").className.replace(/\bdisabled\b/g, "");
    }
    $(".select2-1, .select2-2").css("display","none");
    $(".select3-1, .select3-2, .select3-3, .select3-4").css("display","none");
    var a = $("#select1").val();
    //select2
    if(a.indexOf("thuê") == -1) {
        if(temp == -1)
            $("#select2").val("");
        $(".select2-1").css("display","");
        $(".select2-1").click(function() {
            var choose_select = $(this);
            var text = choose_select.text();
            $("#select2").val(text);
        });
    }
    else {
        if(a.indexOf("thuê") == -1)
            $("#select2").val("");
        $(".select2-2").css("display","");
        $(".select2-2").click(function() {
            var choose_select = $(this);
            var text = choose_select.text();
            $("#select2").val(text);
        });
    }
    //select3
    if(a.indexOf("Nhà") != -1) {
        $(".select3-1").css("display","");
        $(".select3-1").click(function() {
            var choose_select = $(this);     
            var text = choose_select.text();
            $("#select3").val(text);
        });
    }
    if(a.indexOf("Đất") != -1) {
    $(".select3-2").css("display","");
    $(".select3-2").click(function() {
        var choose_select = $(this);     
        var text = choose_select.text();
        $("#select3").val(text);
    });
    }
    if(a.indexOf("Căn hộ") != -1) {
        $(".select3-3").css("display","");
        $(".select3-3").click(function() {
            var choose_select = $(this);     
            var text = choose_select.text();
            $("#select3").val(text);
        });
    }
    if(a.indexOf("Mặt bằng") != -1) {
        $(".select3-4").css("display","");
        $(".select3-4").click(function() {
            var choose_select = $(this);     
            var text = choose_select.text();
            $("#select3").val(text);
        });
    }
});
//tắt table search
$(".container .row .col-md-3 > form .form-group > nav .collapse ul > li .dropdown .dropdown-child > li > a").click(function(){
    $(".dropdown-child").css("display","none");
    setTimeout(function(){ $(".dropdown-child").css("display","");}, 100);
});

    