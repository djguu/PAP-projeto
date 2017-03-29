
$('#nickname').focus();

$('#open').click(function(){
    sidenavToggle();
})

function sidenavToggle(){
    if ($(window).width() <= 768) {
        if(document.getElementById("tt").style.width == "250px"){
            document.getElementById("tt").style.width = "0";
            document.getElementById("open").style.marginLeft = "0";
        }
        else{
            document.getElementById("tt").style.width = "250px";
            document.getElementById("open").style.marginLeft = "250px";
        }
    }
    else{
        document.getElementById("tt").style.width = "250px";
        document.getElementById("open").style.marginLeft = "250px";
    }
}

$( window ).resize(function() {
    if ($(window).width() > 768) {
        document.getElementById("tt").style.width = "250px";
        document.getElementById("open").style.marginLeft = "250px";
        $('#open').css('display','none');
    }
    else{
        document.getElementById("tt").style.width = "0px";
        document.getElementById("open").style.marginLeft = "0px";
        $('#open').css('display','block');
    }
});

function Logout(){
    window.location.reload();
};

//$('#contentWrap').show(); 

$(".minimize").click(function(){
    $("#chatWrap").slideToggle(350);
    $("#mm").focus();
    if(document.getElementById("tt").style.width == "250px"){
        sidenavToggle();
    }
});