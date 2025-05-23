$(function(){
	let swiper1=new Swiper("#start .swiper-container", {
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		},
		on: {
			init: function(){
				// console.log("init event");

				$("#start .swiper-button-prev").hide();
				$("#start .swiper-button-next").hide();
			},
			transitionEnd: function(){
				// console.log("slide transition CSS end event");

				$("#start .swiper-slide").each(function(i){
					if($(this).hasClass("swiper-slide-active")){
						// console.log("i : "+i);

						if(i == 0){
							$("#start .swiper-button-prev").hide();
							$("#start .swiper-button-next").hide();
						}
						else{
							$("#start .swiper-button-prev").show();
							$("#start .swiper-button-next").show();	
						}
					}
				});
			}
		}
	});

	let video=document.getElementById("intro");
	let w, h;
	let videoW, videoH;

	video.muted=true;
	video.play();

	$(window).resize(function(){
		$("#intro").removeAttr("style");
		w=$(window).width();
		h=$(window).height();

		if(w > h){
			videoW=w;
			$("#intro").css({ width: videoW });
		}
		else{
			videoH=h;
			$("#intro").css({ height: h });
			videoW=$("#intro").width();
			$("#intro").css({ left: "50%", marginLeft: (-1)*videoW/2 });
		}
	});

	video.addEventListener("loadeddata", function(){
		$(window).trigger("resize");
	});

	video.addEventListener("ended", function(){
		video.currentTime=0;
		video.play();
	});

	$(".upper .tab").click(function(e){
		e.preventDefault();
		$(".mobile_menu").addClass("active");
	});

	$(".mobile_menu .close").click(function(e){
		e.preventDefault();

		$(".mobile_menu").removeClass("active");
		$("#menu > ul > li").each(function(){
			if($(this).hasClass("active") == true){
				$(this).removeClass("active");
				$(this).find("ul").slideUp(300);
			}
		});
	});

	$("#menu > ul > li").click(function(e){
		e.preventDefault();

		if($(this).hasClass("active") == false){
			$("#menu > ul > li").removeClass("active");
			$(this).addClass("active");
			$("#menu ul ul").slideUp(300);
			$(this).find("ul").slideDown(300);
		}
		else {
			$(this).removeClass("active");
			$(this).find("ul").slideUp(300);
		}
	});

	let t=0;
	let scrollTimer=0;

	$(window).scroll(function(){
		clearTimeout(scrollTimer);

		scrollTimer=setTimeout(function(){
			t=$(window).scrollTop();

			if(t > $(window).height()){
				if($("#start .upper").hasClass("fixed") == false){
					$("#start .upper").addClass("fixed").animate({ top: 0, opacity: 1 }, 300);
				}
				else{
					return;
				}
			}
			else{
				if($("#start .upper").hasClass("fixed") == true){
					$("#start .upper").removeAttr("style");
					$("#start .upper").removeClass("fixed");
				}
				else{
					return;
				}
			}
		});

		$("#start .symbol").click(function(e){
			e.preventDefault();

			$("html").animate({ scrollTop: 0 }, 500);
		});
	});

	let swiper2;

	$("#project_list .description").click(function(e){
		e.preventDefault();

		$(".project_detail_area").addClass("active");

		setTimeout(function(){
			swiper2=new Swiper(".project_detail_area .swiper-container", {
				pagination: {
					el: ".project_detail_area .swiper-pagination"
				}
			});
		}, 100);
	});

	$(".project_detail_area .close").click(function(e){
		e.preventDefault();

		$(".project_detail_area").removeClass("active");
		swiper2=null;
	});
});