
$('#nickname').focus();

$('#open').click(function(){
    sidenavToggle();
})

function sidenavClose(){
    document.getElementById("tt").style.width = "0";
    document.getElementById("open").style.marginLeft = "0";
}

function sidenavOpen(){
    document.getElementById("tt").style.width = "250px";
    document.getElementById("open").style.marginLeft = "250px";
}

function sidenavToggle(){
    if ($(window).width() <= 768) {
        if(document.getElementById("tt").style.width == "250px"){
            sidenavClose();
        }
        else{
            sidenavOpen();
        }
    }
    else{
        sidenavOpen();
    }
}

$( window ).resize(function() {
    if ($(window).width() > 768) {
        sidenavOpen();
        $('#open').css('display','none');
        //$('#minimize').remove();
    }
    else{
        sidenavClose();
        $('#open').css('display','block');
        //$('#top-chat').append('<span id="minimize" class="glyphicon glyphicon-minus minimize"></span>');
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

/*if($(window).width() <= 768){
    $('#top-chat').append('<span id="minimize" class="glyphicon glyphicon-minus minimize"></span>');
}*/
