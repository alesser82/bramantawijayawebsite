$(window).ready(function () {

    // OPENING

    function overlayOpeningPage() {
        $('.opening').css('opacity','1');
    }

    // END OPENING

    // NAVBAR

    function menuCollapse() {
        $('nav .menu,nav .logo').toggleClass('collapsed');
        $('nav .sub-menu-group').removeClass('collapsed');
        $('.sidebar-menu-group').removeClass('collapsed');
    }

    var i = 1;

    $('body').mousewheel(function (event) {
        if($('nav').hasClass('about')){
            if (event.deltaY == -1) {
                pageScollToBottom();
            } else if (event.deltaY == 1){
                pageScollToUp();
            }
        }
    });

    $('body').on("keydown", function (event) {
        if ($('nav').hasClass('about')) {
            if ((event.which === 40) || (event.which === 34)) {
                pageScollToBottom();
            } else if ((event.which === 38) || (event.which === 33)) {
                pageScollToUp();
            }
        }
    });

    function pageScollToBottom() {
        if (($('.row').eq(i).hasClass('active')) && (i < 5)) {
            $('.row').eq(i).removeClass('active');
            $('.row').eq(i + 1).addClass('active');
            $('.row').eq(i + 1).find('.about-text,.about-image,.about-image-column').addClass('scrolled');
            i++;
        }
    }

    function pageScollToUp() {
        if ($('.row').eq(i).hasClass('active') && (i > 1)) {
            $('.row').eq(i).removeClass('active');
            $('.row').eq(i - 1).addClass('active');
            $('.row').eq(i - 1).find('.about-text,.about-image,.about-image-column').addClass('scrolled');
            i--;
        }
    }

    function navbarScrolled() {
        let $nav = $("nav.home");
        let $navelse = $("nav");
        let $banner = $('.banner');
        let $content = $('.sposa-content-1');
        $nav.toggleClass('scrolled', $(this).scrollTop() > $banner.height() - 100);
        $navelse.toggleClass('scrolled', $(this).scrollTop() >= $navelse.height());
    }

    function subMenuCollapsed(object,e) {
        if (!object.next('.sub-menu-group').hasClass('collapsed') && $(window).width() < 1000) {
            e.preventDefault();
            $('.sub-menu-group').removeClass('collapsed');
            object.next('.sub-menu-group').addClass('collapsed');
        }
    }

    function subSubMenuCollapsed(object,e,i) {
        if (!$('.sub-sub-menu-block').eq(i).hasClass('collapsed') && $(window).width() < 1000) {
            e.preventDefault();
            $('.sub-sub-menu-block').removeClass('collapsed');
            // object.next('.sub-sub-menu-block').addClass('collapsed');
            $('.sub-sub-menu-block').eq(i).addClass('collapsed');
        }
    }

    $(window).scroll(function () {
        navbarScrolled();
    });

    $('.menu-group-link').each(function (i) {
        $('.menu-group-link').eq(i).click(function(e) {
            subMenuCollapsed($(this),e);
        });
    });

    $('.sub-sub-menu-group-link').each(function (i) {
        $('.sub-sub-menu-group-link').eq(i).click(function (e) {
            subSubMenuCollapsed($(this), e, i);
        });
    });

    $(window).resize(function () {
        let screenSize = $(window).width();
        screenSize > 1000 ? $('.sub-menu-group,.logo').removeClass('collapsed') : true;
    });


    // END NAVBAR

    // Banner

    function bannerSlide(owl) {
        owl.owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            autowidth: true,
            margin: 0
        });
    }

    function bannerProduct(owl) {
        if ($(window).width() < 700) {
            owl.owlCarousel({
                items: 1,
                loop: true,
                margin: 0,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: false,
                autowidth: true,
                margin: 0,
                nav: true,
                navText: ['<i class="fa fa-caret-left mx-3" style="font-size: 20px">','<i class="fa fa-caret-right mx-3" style="font-size: 20px">'],
                dots: true,
                dotsEach: true
            });
        }else {
            owl.owlCarousel({
                items: 0,
                loop: false,
                margin: 0,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: false,
                autowidth: true,
                margin: 0,
                mouseDrag: false,
                touchDrag: false
            });
        }
    }

    function intimateBanner(owl) {
        if ($(window).width() > 1000) {
            owl.owlCarousel({
                items: 1,
                loop: true,
                margin: 0,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: false,
                autowidth: true,
                margin: 0
            });
        }else {
            owl.owlCarousel({
                items: 0,
                loop: false,
                margin: 0,
                autoplay: false,
                autoplayTimeout: 3000,
                autoplayHoverPause: false,
                autowidth: true,
                margin: 0,
                mouseDrag: false,
                touchDrag: false
            });
            $('footer a').removeClass('text-white');
        }
    }

    function changeNavbar(color) {
        if (color == 'black') {
            $('nav').removeClass('home');
        }else {
            $('nav').addClass('home');
        }
    }

    function changeFooter(color) {
        if (color == 'black') {
            $('footer').removeClass('fixed-footer');
            $('footer a').removeClass('text-white');
        } else {
            $('footer').addClass('fixed-footer');
            $('footer a').addClass('text-white');
        }
    }

    var owl = $('.owl-carousel');
    if (owl.hasClass('product-detail-carousel')) {
        bannerProduct(owl);
    } else if (owl.hasClass('intimate-banner')) {
        intimateBanner(owl);
        owl.on('changed.owl.carousel', function (event) {
            // console.log(event);
            let item = event.item.index;
            let color = '';
            if (item > 3) {
                let color = 'black';
                changeNavbar(color);
                changeFooter(color);
            } else {
                let color = 'white';
                changeNavbar(color);
                changeFooter(color);
            }
        });
    }else{
        bannerSlide(owl);
    }

    // End Banner

    // Blog

    function blogDropdown(object, e) {
        if (!object.parent().hasClass('open')) {
            e.preventDefault();
            object.parent().toggleClass('open');
        }else{
            if (object.hasClass('disabled')) {
                e.preventDefault();
                object.parent().toggleClass('open');
            }else{
                return;
            }
        }
    }

    // End Blog

    //Sidebar Menu

    function sidebarCollapsed(object) {
        object.parent('.sidebar-menu-group').toggleClass('collapsed');
    }

    function sidebarMenu() {
        if ($(window).width() > 1000) {
            $('#collection-pink-label,#account').addClass('collapsed');
        }else {
            $('#collection-pink-label,#account').removeClass('collapsed');
        }
    }

    $('.sidebar-title-menu').click(function () {
        sidebarCollapsed($(this));
    });

    $('div.col-sm-12').each(function (i) {
        $('div.col-sm-12').eq(i).click(function () {
            if (!$(this).hasClass('sidebar-menu')) {
                if ($(window).width() < 1000) {
                    $('.sidebar-menu-group').removeClass('collapsed');
                }
            } 
        });
    });

    sidebarMenu();

    $(window).resize(function () {
        sidebarMenu();
    });

    // End Sidebar Menu

    overlayOpeningPage();

    $('nav span').click(function () {
        menuCollapse();
    });

    navbarScrolled();

    $('.blog-dropdown a').each(function (i) {
        $('.blog-dropdown a').eq(i).click(function (e) {
            blogDropdown($(this), e);
        });
    });

    $('div.row').each(function(i) {
        $('div.row').eq(i).click(function () {
            if (!$(this).hasClass('blog-menu')) {
                $('.blog-dropdown').removeClass('open');                    
            }
        });
    });

    // Detail menu

    

    $('.product-info-title').click(function () {
        $('.info-list').toggleClass('show');
    });

});