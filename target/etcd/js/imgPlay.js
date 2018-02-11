var zdbfTime = 3000;

function initImage(){
	
    var page = 0;
    var $arrow = $(".prev,.next");
    var $focusArea = $(".slideshow-area li");
    var $focusBulletsUl = $(".slideshow-bullets ul");
    var $len = $focusArea.length - 1;
    if($focusArea.length==1){
    	$arrow.hide();
    	return;
    }
    function autoClick() {
        $(".next").click();
    }
    var $autoScroll = setInterval(autoClick, zdbfTime);
    $arrow.hide();
    $(".slideshow").hover(function() {
                $arrow.show();
                clearInterval($autoScroll);
            },
            function() {
                $arrow.hide();
                $autoScroll = setInterval(autoClick, zdbfTime);
            });
    $focusArea.eq(0).show().siblings().hide();
    $focusArea.each(function(i) {
        $(this).css("z-index", -(i - $len));
        $focusBulletsUl.append("<li>" + (i + 1) + "</li>");
        $(".slideshow-bullets li").eq(0).addClass("current");
    });
    var $focusBullets = $(".slideshow-bullets li");
    $(".next").click(function() {
        if (!$focusArea.is(":animated")) {
            if (page == $len) {
                $focusArea.eq(0).fadeIn('slow').siblings().fadeOut('slow');
                page = 0;
            } else {
                $focusArea.eq(page).fadeOut('slow').next().fadeIn('slow');
                page++;
            }
        }
        $focusBullets.eq(page).addClass("current").siblings().removeClass("current");
    });
    $(".prev").click(function() {
        if (!$focusArea.is(":animated")) {
            if (page == 0) {
                $focusArea.eq($len).fadeIn('slow').siblings().fadeOut('slow');
                page = $len;
            } else {
            
                $focusArea.eq(page - 1).fadeIn('slow').siblings().fadeOut('slow');
                page--;
            }
        }
        $focusBullets.eq(page).addClass("current").siblings().removeClass("current")
    });
    $focusBullets.each(function(e) {
        $(this).click(function() {
            $focusBullets.eq(e).addClass("current").siblings().removeClass("current");
            page = e;
            if (page == 0) {
                $focusArea.eq(0).fadeIn();
            } else {
                $focusArea.eq(page).fadeIn('slow').siblings().fadeOut('slow')
            }
        })
    })	
}
var bwidth = 640;
var bheight = 500;
function drawImage(_src,_width,_height){
	var _wbl = bwidth/_width;
	var _hbl = bheight/_height;
	var rheight;
	var rwidth;
	if(_wbl<=_hbl){
		rheight=_wbl*_height;
		rwidth = bwidth;
	}else{
		rwidth=_hbl*_width;
		rheight = bheight;
	}
	var hp = 548/2-rheight/2;
	var wp = 720/2-rwidth/2;
	return "<li style='margin-top:"+hp+";margin-left:"+wp+"'><img class='ts' src='"+_src+"' width='"+rwidth+"' height='"+rheight+"'></li>";	
}
