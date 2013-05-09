/* -------------------------------------------------------------------------------

 Custom JS

 ---------------------------------------------------------------------------------- */


$(document).ready(function () {

    /* --------------------------------------------------------------------------- */
    /*  Easytabs
     /* --------------------------------------------------------------------------- */

    var $content = $("#content");

    $content.easytabs({
        tabs: "> .navigation > ul > li",
        animate: true,
        updateHash: true,
        animationSpeed: 'normal'
    });


    /* --------------------------------------------------------------------------- */
    /*  Google Maps
     /* --------------------------------------------------------------------------- */

    var $latlng = new google.maps.LatLng(30.580080, 104.032588),
        $myOptions = {
            zoom: 16,
            center: $latlng,
            panControl: false,
            zoomControl: true,
            scaleControl: false,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        $tabContact = ('tab-contact');

    $content.bind('easytabs:after', function (evt, tab, panel) {
        if (tab.hasClass($tabContact)) {
            var $map = new google.maps.Map(document.getElementById("map"), $myOptions);
            var marker = new google.maps.Marker({
                position: $latlng,
                map: $map,
                title: ""
            });
        }
    });


    /* --------------------------------------------------------------------------- */
    /*  Contact Form
     /* --------------------------------------------------------------------------- */

    var $contactform = $('#contactform'),
        $success = '您的留言已发送成功!';

    // Validate form on keyup and submit
    $contactform.validate({
        rules: {
            name: {
                required: true,
                minlength: 1
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 1
            }
        },
        messages: {
            name: {
                required: "请提供您的名称",
                minlength: jQuery.format("名称不能少于 {0} 个字符")
            },
            email: {
                required: "请提供正确的邮箱地址",
                minlength: "请提供正确的邮箱地址",
                email: "请提供正确的邮箱地址"
            },
            message: {
                required: "必须填写留言内容",
                minlength: jQuery.format("留言内容不能少于 {0}  个字符")
            }
        }
    });

    // Send the email
    $contactform.submit(function () {
        if ($contactform.valid()) {
            $.ajax({
                type: "POST",
                url: "php/contact.php",
                data: $(this).serialize(),
                success: function (msg) {
                    if (msg == 'SEND') {
                        response = '<div class="success">' + $success + '</div>';
                    }
                    else {
                        response = '<div class="error">' + msg + '</div>';
                    }
                    $(".error,.success").remove();
                    $contactform.prepend(response);
                }
            });
            return false;
        }
        return false;
    });


    /* --------------------------------------------------------------------------- */
    /*  In-Field Labels
     /* --------------------------------------------------------------------------- */

    $(function () {
        $(".flabel").inFieldLabels();
    });


});