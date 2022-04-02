var $=jQuery.noConflict();

//////////////////////////////
//////////////////////////////
////////// VIEWPORT //////////
//////////////////////////////
//////////////////////////////

// ELEMS
var $wrapper=$('#wrapper');
var $body=$('body');
var $main=$('main');
var $header=$('header');
var $footer=$('footer');

// VARS
var wrapperHeight;
var documentHeight;
var windowWidth;
var windowHeight;
var winTop;
var headerHeight;

// VARS UPDATE
function varsUpdate() {
	wrapperHeight=$wrapper.height();
	documentHeight=$(document).height();
	windowWidth=$(window).width();
	windowHeight=$(window).height();
	headerHeight=$header.outerHeight();
	mainTop=$main.css('padding-top').replace('px','');
	winTop=$(window).scrollTop();
};

// VIEWPORT UPDATE
function viewportUpdate() {
	// vars
	varsUpdate();
	// scrolling
	if (winTop > (mainTop-headerHeight)) {
		$body.addClass('scrolled');
	} else {
		$body.removeClass('scrolled');
	};
	// scrolling end
	if (winTop+windowHeight == $(document).height()) {
		$body.addClass('end');
	} else {
		$body.removeClass('end');
	};
};

// VIEWPORT INIT
function viewportInit() {
	viewportUpdate();
	$(window).on('resize scroll touchmove touchstart touchend',function() {
		viewportUpdate();
	});
};

///////////////////////////////////
///////////////////////////////////
////////// SCROLL UPDATE //////////
///////////////////////////////////
///////////////////////////////////

function scrollUpdateInit() {
	// vars
	var lastScrollTop=0;
	// actions
	function scrollUpdate() {
		// up or down ?
		var st=$(window).scrollTop();
		if (st < 0) { st=0; };
		if (st!=lastScrollTop) {
			if (st>lastScrollTop) {
				$body.removeClass('up');
				$body.addClass('down');
			} else {
				$body.removeClass('down');
				$body.addClass('up');
			};
			lastScrollTop=st;
		};
	};
	// behaviours
	$(window).on('resize scroll touchmove touchstart touchend',function() {
		scrollUpdate();
	});
};

///////////////////////////////////
///////////////////////////////////
////////// MOBILE DETECT //////////
///////////////////////////////////
///////////////////////////////////

/* cf. https://www.codegrepper.com/code-examples/javascript/jquery+detect+if+touch+device */

var isMobile;

if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
	isMobile=true;
	$body.addClass('mobile');
} else {
	isMobile=false;
};

function isTouchScreendevice() {
	return 'ontouchstart' in window || navigator.maxTouchPoints;      
};

//////////////////////////////
//////////////////////////////
////////// SECTIONS //////////
//////////////////////////////
//////////////////////////////

function sectionsInit() {
	
	// vars
	let $contextual=$('.contextual.for-sections');
	let $currentSection;
	let currentSectionColor;
	let currentSectionColorDefault='bright';

	// section introduction
	function siteIntroductionUpdate() {
		if ($currentSection.hasClass('is-introduction')) {
			$body.addClass('introduced');
		} else {
			$body.removeClass('introduced');
		};
	};

	// contextual nav update
	function contextualUpdate($currentSection) {
		// unset
		$('a',$contextual).removeClass('active');
		// set
		$('a[href="#'+$currentSection.attr('id')+'"]').addClass('active');
	};

	// color update
	function colorSpaceUpdate($currentSection) {
		// main update = data-color
		currentSectionColor=currentSectionColorDefault;
		if ($currentSection.data('color')) {
			currentSectionColor=$currentSection.data('color');
		};
		// colorize and animate
		$body.attr('data-color',currentSectionColor);
	};

	// updates
	function sectionVisibleUpdate() {
		// get current most visible section
		$currentSection=$('.section').mostVisible();
		$('.section').removeClass('active');
		$currentSection.addClass('active');
		// color + background update
		colorSpaceUpdate($currentSection);
		contextualUpdate($currentSection);
	};
	
	// behaviours
	$(window).on('resize scroll touchmove touchstart touchend',function() {
		// section visible ?
		sectionVisibleUpdate();
		// introduction ?
		siteIntroductionUpdate();
	});
	
	// init
	sectionVisibleUpdate();
	siteIntroductionUpdate();
}

/////////////////////////////
/////////////////////////////
////////// ANCHORS //////////
/////////////////////////////
/////////////////////////////

function anchorsInit() {
	// behaviours
	$body.on('touchstend click','a',function(e) {
		// vars
		var $this=$(this);
		var currentHref=$this.attr('href');
		// tap behaviours
		if (isMobile) {
			$this.addClass('hover');
			setTimeout(function() { 
				$this.removeClass('hover');
			},500);
		};
		// same page
		if ((currentHref.indexOf('#') != -1) || (currentHref.indexOf('javascript') != -1) || ($this.attr('data-overlay'))) {
			e.preventDefault();
			// only if more than #
			if (currentHref.length > 1) {
				var offsetTop=$(currentHref).offset().top;
				$.scrollTo(offsetTop,500);
			};
		// new page
		} else {
			e.preventDefault();
			if ($this.hasClass('enlarge')) {
				e.stopPropagation();
			} else {
				// new domain
				if ($this.attr('target') == '_blank') {
					window.open(currentHref,'_blank');
				// same domain
				} else {
					$('body').addClass('outload');
					setTimeout(function() {
						location.href=currentHref; // reload page
					},1000);
				};
			};
		};
	});
};

//////////////////////////////////
//////////////////////////////////
////////// INTRODUCTION //////////
//////////////////////////////////
//////////////////////////////////

function siteIntroductionUpdate() {
	if ($currentSection.hasClass('is-introduction')) {
		$body.addClass('introduced');
	} else {
		$body.removeClass('introduced');
	}
};

//////////////////////////
//////////////////////////
////////// INIT //////////
//////////////////////////
//////////////////////////

function siteInit() {
	$('body').removeClass('onload');
	$('noscript').remove();
};

function init() {
	// VIEWPORT
	viewportInit();
	// SCROLLUPDATE
	scrollUpdateInit();
	// SECTIONS
	sectionsInit();
	// ANCHORS
	anchorsInit();
};

///////////////////////////
///////////////////////////
////////// READY //////////
///////////////////////////
///////////////////////////

$(function() {
	init();
});

$(window).on('load',function() {
	siteInit();
});