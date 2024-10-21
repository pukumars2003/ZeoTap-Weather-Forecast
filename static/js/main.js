/*
Author       : Theme-Family
Template Name: Mugni - Weather Forcast HTML5 Website Template
Version      : 1.0
*/
(function($) {
    "use strict";
	
	
	/*--------------------------------------------------------------
       PRELOADER
      --------------------------------------------------------------*/
		/*PRELOADER JS*/
		$(window).on('load', function() { 
			$('#atf-loader').delay(2500).fadeOut(700);
		}); 
		/*END PRELOADER JS*/
		
	/*--------------------------------------------------------------
       Sticky Header
      --------------------------------------------------------------*/
	
		$(window).on("scroll", function() {
			 var scroll = $(window).scrollTop();
			if (scroll >= 10) {
				$('.atf-sticky-header').addClass('atf-sticky-active');
			} else {
				$('.atf-sticky-header').removeClass('atf-sticky-active');
			}
		});
     
    /*--------------------------------------------------------------
       Mobile Menu
      --------------------------------------------------------------*/

        $('.atf-nav').append('<span class="atf-menu-toggle"><span></span></span>');
        $('.menu-item-has-children').append('<span class="atf-menu-dropdown-toggle"></span>');
        $('.atf-menu-toggle').on('click', function() {
            $(this).toggleClass("atf-toggle-active").siblings('.atf-nav-list').slideToggle();;
        });
        $('.atf-menu-dropdown-toggle').on('click', function() {
            $(this).toggleClass('active').siblings('ul').slideToggle();
        });

    
    /*--------------------------------------------------------------
       One Page Navigation
      --------------------------------------------------------------*/
        // Click To Go Top
        $('.atf-smooth-move').on('click', function() {
            var thisAttr = $(this).attr('href');
            if ($(thisAttr).length) {
                var scrollPoint = $(thisAttr).offset().top - 50;
                $('body,html').animate({
                    scrollTop: scrollPoint
                }, 800);
            }
            return false;
        });

        // One Page Active Class
        var topLimit = 300,
            ultimateOffset = 200;

        $('.atf-onepage-nav').each(function() {
            var $this = $(this),
                $parent = $this.parent(),
                current = null,
                $findLinks = $this.find("a");

            function getHeader(top) {
                var last = $findLinks.first();
                if (top < topLimit) {
                    return last;
                }
                for (var i = 0; i < $findLinks.length; i++) {
                    var $link = $findLinks.eq(i),
                        href = $link.attr("href");

                    if (href.charAt(0) === "#" && href.length > 1) {
                        var $anchor = $(href).first();
                        if ($anchor.length > 0) {
                            var offset = $anchor.offset();
                            if (top < offset.top - ultimateOffset) {
                                return last;
                            }
                            last = $link;
                        }
                    }
                }
                return last;
            }

            $(window).on("scroll", function() {
                var top = window.scrollY,
                    height = $this.outerHeight(),
                    max_bottom = $parent.offset().top + $parent.outerHeight(),
                    bottom = top + height + ultimateOffset;

                var $current = getHeader(top);

                if (current !== $current) {
                    $this.find(".active").removeClass("active");
                    $current.addClass("active");
                    current = $current;
                }
            });
        });

	/*--------------------------------------------------------------
       Sticky Back To Top
      --------------------------------------------------------------*/
  
		  $(window).on('scroll', function() {
			if ($(window).scrollTop() > 50) {
				$('.atf-sticky-header').addClass('atf-nav');
				$('#back_to_top').addClass('open');
			} else {
				$('.atf-sticky-header').removeClass('atf-nav');
				$('#back_to_top').removeClass('open');
			}
		  });
		  
	/*--------------------------------------------------------------
       Scroll UP
      --------------------------------------------------------------*/

		$(window).scroll(function() {
			if ($(this).scrollTop() >= 100) {
				$('#back_to_top').addClass('active');
				$('#back_to_top').addClass('affix');
			} else {
				$('#back_to_top').removeClass('active');
				$('#back_to_top').removeClass('affix');
			}
		});
		
		
			
		/*--------------------------------------------------------------
			Weather slider
		--------------------------------------------------------------*/
		var swiper = new Swiper(".mySwiper", {
		  effect: "cards",
		  grabCursor: true,
		  autoplay: {
			   delay: 5000,
			 },
		});
		
	/*--------------------------------------------------------------
      Weather slider 2
      --------------------------------------------------------------*/
		$('#atf-weather-slider').owlCarousel({
			autoplay: true,
			loop: true,
			margin:20,
			nav: false,
			dots:false,
				responsive: {
					0: {
						items:1
					},
					600: {
						items:1
					},
					820: {
						items:1
					},
					1000: {
						items:1
					},
					1200: {
					  items:1
				   }
			}
		  })
		  
		  
		/*--------------------------------------------------------------
			Weekly Weather slider
		--------------------------------------------------------------*/
		$('#atf-weekly-weather').owlCarousel({
			autoplay: true,
			loop: true,
			margin:20,
			nav: false,
			dots:false,
				responsive: {
					0: {
						items:2
					},
					600: {
						items:2
					},
					820: {
						items:2
					},
					1000: {
						items:6
					},
					1200: {
					  items:6
				   }
			}
		  })
		  
		  /*--------------------------------------------------------------
		   START TABS 
		  --------------------------------------------------------------*/	  
			 // Tabs
			$('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
			$('.tab ul.tabs li a').on('click', function (g) {
				var tab = $(this).closest('.tab'), 
				index = $(this).closest('li').index();
				tab.find('ul.tabs > li').removeClass('current');
				$(this).closest('li').addClass('current');
				tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
				tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
				g.preventDefault();
			});
		/*--------------------------------------------------------------
		   END TABS 
	
		/*Start Video Slider*/
			$('.atf__video-slider-active').slick({
            arrows: true,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
						arrows: false,
						dots: true,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        arrows: false,
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

		/*END Video Slider*/
			
		
		/*Start Blog Slider*/
			$('.atf__blog-slider-active').slick({
            arrows: true,
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<a class="slick-prev"><i class="fas fa-arrow-left" alt="Arrow Icon"></i></a>',
            nextArrow: '<a class="slick-next"><i class="fas fa-arrow-right" alt="Arrow Icon"></i></a>',
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
						arrows: false,
						dots: true,
                    }
                },
                {
                    breakpoint: 580,
                    settings: {
                        arrows: false,
                        dots: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });

		/*END Blog Slider*/
			
		/*--------------------------------------------------------------
			POPUP VIDEO
		  --------------------------------------------------------------*/			
				$('.popup-video').magnificPopup({
					type: 'iframe',
				});
		/*--------------------------------------------------------------
			MAGNIFIC POPUP
		  --------------------------------------------------------------*/	

				var magnifPopup = function() {
					$('.atf-popup-img').magnificPopup({
						type: 'image',
						removalDelay: 300,
						mainClass: 'mfp-with-zoom',
						gallery: {
							enabled: true
						},
						zoom: {
							enabled: true, // By default it's false, so don't forget to enable it

							duration: 300, // duration of the effect, in milliseconds
							easing: 'ease-in-out', // CSS transition easing function

							// The "opener" function should return the element from which popup will be zoomed in
							// and to which popup will be scaled down
							// By defailt it looks for an image tag:
							opener: function(openerElement) {
								// openerElement is the element on which popup was initialized, in this case its <a> tag
								// you don't need to add "opener" option if this code matches your needs, it's defailt one.
								return openerElement.is('img') ? openerElement : openerElement.find('img');
							}
						}
					});
				};

				// Call the functions
				magnifPopup();
				
		/*--------------------------------------------------------------
			TESTIMONIAL SLIDER
		  --------------------------------------------------------------*/	

				$('#testimonial-slider').owlCarousel({
					margin: 5,
					autoplay: true,
					center: true,
					autoplayTimeout: 4000,
					nav: false,
					smartSpeed: 1000,
					dots: true,
					autoplayHoverPause: true,
					loop: true,
					responsiveClass:true,
					responsive: {
						0: {
							items: 1
						},
						600: {
							items: 1
						},
						1000: {
							items: 3
						}
					}
				});
			
			/*END Testimonials LOGO*/
		
		
		/*--------------------------------------------------------------
		MAILCHAMP
      --------------------------------------------------------------*/		
			
		$('#mc-form').ajaxChimp({
			url: 'https://gmail.us10.list-manage.com/subscribe/post?u=c9af266402a277062d0d7cee0&amp;id=1211fda42f'
			/* Replace Your AjaxChimp Subscription Link */
		}); 
		
	/*--------------------------------------------------------------
		WOW SCROLL SPY
      --------------------------------------------------------------*/	
			 var wow = new WOW({
				  //disabled for mobile
					mobile: false
				});

			wow.init();
			
    
})(jQuery);

