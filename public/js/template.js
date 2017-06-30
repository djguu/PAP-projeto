$('#nickname').focus();

$('#open').click(function() {
    sidenavToggle();
});

function sidenavClose() {
    document.getElementById("tt").style.display = "none";
}

function sidenavOpen() {
    document.getElementById("tt").style.display = "block";
}

function sidenavToggle() {
    if ($(window).width() <= 768) {
        if (document.getElementById("tt").style.display === "block"){
            sidenavClose();
        } else {
            if(document.getElementById("chatWrap").style.display === "block"){
                $("#chatWrap").slideToggle(350);
            }
            sidenavOpen();
        }
    } else {
        sidenavOpen();
    }
}

$(window).resize(function() {
    if ($(window).width() > 768) {
        sidenavOpen();
        $('#open').css('display', 'none');
        $('#chatWrap').css('display', 'block');
        if(document.getElementById("Remote").firstElementChild != null){
            document.getElementById("Remote").firstElementChild.width = window.outerWidth;
        }
    } else {
        sidenavClose();
        $('#open').css('display', 'block');
        $('#chatWrap').css('display', 'none');
        if(document.getElementById("Remote").firstElementChild != null){
            document.getElementById("Remote").firstElementChild.width = window.outerWidth;
        }
    }
});

function Logout() {
    window.location.reload();
}


$(".minimize").click(function() {
    $("#chatWrap").slideToggle(350);
    // document.getElementById("tt").style.display == "block";
    if (document.getElementById("tt").style.display == "block") {
        sidenavToggle();
    }
});
