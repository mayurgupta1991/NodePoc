//document.ready code starts
$(document).ready(function() {
    //navbar mobile code starts
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement("style");
		msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle);
	}

    var playPromise = document.querySelector('video').play();
    if (playPromise !== undefined) {
        playPromise.then(function() {
            $('#appstoreVideo').addClass('playing');
        });
    }

    $('#appstoreVideoFile').on("click", function () {
        $('#appstoreVideo').removeClass('playing');
        document.querySelector('video').pause();
        gtag('event', 'Clicks on Video for pause', {
            'event_category' : 'Videos',
            'event_label' : 'Signup Campaign'
        });
    });

    $('#videoOverlay').on("click", function () {
        $('#appstoreVideo').addClass('playing');
        document.querySelector('video').play();
        gtag('event', 'Clicks on Video for play', {
            'event_category' : 'Videos',
            'event_label' : 'Signup Campaign'
        });
    });

    $('#iosAppDownload').on("click", function () {
        gtag('event', 'Clicks on iOS appstore', {
            'event_category' : 'AppDownload',
            'event_label' : 'Signup Campaign'
        });
    });

    $('#CloseVideoFullScreen').on("click", function () {
        $('#appstoreVideo').removeClass('playing');
        document.querySelector('video').pause();
        $('#appstoreVideoFile').removeClass('fullScreen');
        $('body').removeClass('videoFullScreen');
    });


	$("#emailForm").submit(function(e){
		e.preventDefault();
        var emailValue = $('#email').val();
        if (checkEmail(emailValue)) {
            $('.hideFields').hide();
            $.ajax({
                type: 'POST',
                url: 'https://api.welcometv.net/api/v1/email/sendlink',
                data: JSON.stringify({'emailAddress':emailValue}),
                contentType: 'application/json',
                error: function(e) {
                    console.log(e);
                },
            });
            gtag('event', 'Clicks on email submission button', {
                'event_category' : 'EnterEmail',
                'event_label' : 'Signup Campaign'
            });
            $('#emailErrorField').addClass('emailSend').text('We have successfully sent an email, please check your inbox.').show();
        } else {
            $('#emailErrorField').show();
        }
	});

    function checkEmail(inputVal) {
        var regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(inputVal);
    }
});
//document.ready code starts

