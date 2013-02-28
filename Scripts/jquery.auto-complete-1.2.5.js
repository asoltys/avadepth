// ver 1.2.5
// 09-04-17
/*
(c) Copyrights 2009

jQuery Plugin by Ryoma Nakashima
nakashima@2next.co.jp
http://www.2next.co.jp/

Project's sites: 
http://code.google.com/p/js-autocomplete/

License: same as jQuery license. 

This requires jQuery and jQuery Hotkeys Plugin.
http://jquery.com/
http://code.google.com/p/js-hotkeys/

	// usage
	
	<script src="js/jquery.js" type="text/javascript"></script>
	<script src="js/jquery.hotkeys.js" type="text/javascript"></script>
	<script src="js/jquery.auto-complete.js" type="text/javascript"></script>
	<script type="text/javascript">
	$(function(){
		autoComplete();
	});
	</script>


	// static
	<input type="text" class="auto-complete">
	<ul>
		<li>aaa</li>
		<li>bbb</li>
		<li>ccc</li>
	</li>


	// ajax
	<input type="text" id="ajax" class="auto-complete">
    
Note:


*/

function autoComplete (){


	// ajax url
	var url = new Array();
//ex.	url['idname'] = 'search.php?word=';
	url['ajax'] = 'ajax.cgi?q=';


	// design config
	var conf = new Array();
	conf['box-background'] = '#FFF';
	conf['box-border'] = 'solid 1px #000';
	conf['box-max-height'] = '350'; // ! number only

	conf['list-padding'] = '1px 5px';
	conf['list-margin'] = '0';
	conf['list-height'] = '20'; // ! number only
	conf['list-font-style'] = 'normal';
	conf['list-font-weight'] = 'normal';
	conf['list-font-size'] = '12px';
	conf['list-line-height'] = '20px';

	conf['list-color'] = '#000';
	conf['list-background'] = '#FFF';

	conf['list-active-color'] = '#FFF';
	conf['list-active-background'] = '#3399FF';



	$('.auto-complete').each(function(){

		var active = -1;
		var keybind = 0;
		var inputBefore = '';
		var position = '';

		var ua = $.browser;
	
		var textBox = $(this);
		if($(this).next().attr('tagName') != 'UL'){
			$(this).after('<ul></ul>');
		}
		
		var box = $(this).next();
	
		var width = Number(textBox.width()) + Number(textBox.css('padding-left').replace('px','')) + Number(textBox.css('padding-right').replace('px',''));
		var height = textBox.height();

		textBox.attr('autocomplete','off');

		box.css({
			'display':'none',
			'background':conf['box-background'],
			'border':conf['box-border'],
			'z-index':'2147483647',
			'overflow-x':'hidden'
		});
		box.width(width+2);

		var list = box.find('li');
		createList();
	
		textBox.click(function(){
			actionBox(list);
		});
//		textBox.keypress(function(){
//			actionBox();
//		});
		textBox.keyup(function(event){
			if(event.keyCode != 37 && event.keyCode != 38 && event.keyCode != 39 && event.keyCode != 40){
				if(textBox.attr('id') && url[textBox.attr('id')] && inputBefore != input){
					var input = textBox.val();
					inputBefore = input;
					jQuery.ajax({
						url: url[textBox.attr('id')] + input,
						cache: true,
						success: function(data){
							box.empty();

							jQuery.each(data.split("\n"), function(){
								if(String(this).length > 0){
									var li = $('<li></li>');
									li.text(String(this));
									box.append(li);
								}
							});

							list = box.find('li');
							createList();

							var ajax = 1;

							actionBox(list,ajax);
						}
					});					
				}else{
					actionBox(list);
				}

			}
		});
	
		function createList () {
			list.css({
				'padding':conf['list-padding'],
				'margin':conf['list-margin'],
				'overflow-x':'hidden',
				'font-style':conf['list-font-style'],
				'font-weight':conf['list-font-weight'],
				'font-size':conf['list-font-size'],
				'line-height':conf['list-line-height'],
				'white-space':'nowrap'
			});
			list.width(width-8);
			list.height(conf['list-height']);

			list.each(function(){
				$(this).data('text',$(this).text().replace(/\s+$/,''));
				$(this).data('textLC',$(this).data('text').toLowerCase());
			});
		}

		function actionBox (list,ajax) {
			if((!textBox.val() || ajax) && list.size() > 0){
				active = -1;
				box.scrollTop(0);
				list.css({
					'background':conf['list-background'],
					'color':conf['list-color']
				});

				list.each(function(){
					$(this).css('display','block');
					$(this).addClass('select-list');
				});
				selectBoxOn();
			}else{
				var boxon = 0;
				var input = textBox.val();
				var inputLC = textBox.val().toLowerCase();
//				if(inputBefore != input){
					active = -1;
					box.scrollTop(0);
					list.css({
						'background':conf['list-background'],
						'color':conf['list-color']
					});

//					inputBefore = input;
					
					list.each(function(){
						var re = new RegExp('^'+inputLC, 'i');
						if(!$(this).data('textLC').match(re) || $(this).data('text') == input){
							$(this).css('display','none');
							$(this).removeClass('select-list');
						}else{
							$(this).css('display','block');
							$(this).addClass('select-list');
							boxon = 1;
						}
					});
					if(boxon){
						selectBoxOn();
					}else{
						selectBoxOff();
					}
//				}
			}
		}
		function selectBoxOn () {			
			if(box.css('display') != 'block'){
				active = -1;
			}

			if(box.height() > conf['box-max-height']){
				box.css({
					'max-height':conf['box-max-height'] + 'px',
					'overflow-y':'scroll'
					});
			}else{
				box.css('overflow-y','auto');
			}

			fixBox ()

			$(textBox).bind('blur',selectBoxOff);
			
			box.mouseover(function(){
				$(textBox).unbind('blur',selectBoxOff);
			});
			box.mouseout(function(){
				$(textBox).bind('blur',selectBoxOff);
			});

			list.bind('mouseover',listMouseOver);
			list.bind('click',listClick);

			$(document).bind('keydown', 'down', listDown);
			$(document).bind('keydown', 'up', listUp);
			$(document).bind('keydown', 'return', listEnter);
			$(window).bind('resize',fixBox);
			keybind = 1;
		}
		function fixBox () {
			var offset = textBox.offset();
			var left = offset.left;
			var top = offset.top;
			
			box.css({
				'position':'absolute',
				'left':left + 'px'
			});


			var bHeight = getBrowserHeight();
			var scrollTop = getScrollTop();
			
			box.css('display','block');
			if(bHeight < top+height+box.height()-scrollTop && top+height-scrollTop > box.height()){
				box.css('top',(top-box.height()-1) + 'px');
				
				position = 'up';

				scrollTopNew = (box.find('li.select-list').size() -1) * list.outerHeight() - (conf['box-max-height'] - list.outerHeight());
				if(box.scrollTop() - scrollTopNew < list.height()){
					box.scrollTop(scrollTopNew);
				}
								
			}else{
				if(ua.msie || ua.opera || ua.safari){
					box.css('top',(top+height+2) + 'px');
				}else{
					box.css('top',(top+height) + 'px');
				}

				position = 'down';
			}
		}
		function selectBoxOff () {		
			list.unbind('mouseover',listMouseOver);
			list.unbind('click',listClick);
			if(keybind){
				$(document).unbind('keydown', 'down', listDown);
				$(document).unbind('keydown', 'up', listUp);
				$(document).unbind('keydown', 'return', listEnter);
				$(window).unbind('resize',fixBox);
				keybind = 0;
			}

			box.scrollTop(0);
			list.css({
				'background':conf['list-background'],
				'color':conf['list-color']
			});
			box.css('display','none');
		}
		function listMouseOver () {
			list.css({
				'background':conf['list-background'],
				'color':conf['list-color']
			});
			$(this).css({
				'background':conf['list-active-background'],
				'color':conf['list-active-color']
			});
			active = box.find('li.select-list').index(this);
		}
		function listClick () {
			var text = $(this).text().replace(/\s+$/,'');
			textBox.val(text);
			selectBoxOff();
			textBox.focus();
		}
		function listDown () {
			var next = 0;
			if(position == 'up' && active == -1){
				return true;
			}else{
				next = active + 1;
			}

			if(box.find('li.select-list').eq(active + 1).size()){
				list.css({
					'background':conf['list-background'],
					'color':conf['list-color']
				});
				active += 1;
				box.find('li.select-list').eq(active).css({
					'background':conf['list-active-background'],
					'color':conf['list-active-color']
				});
				
				scrollTopNew = active * list.outerHeight() - (conf['box-max-height'] - list.outerHeight());
				
				if(box.scrollTop() - scrollTopNew < list.height()){
					box.scrollTop(scrollTopNew);
				}				

				return true;
			}
		}
		function listUp () {
			var next = 0;
			if(active - 1 < -1){
				if(position == 'up'){
					next = box.find('li.select-list').size() -1;
				}else{
					return true;
				}
			}else{
				next = active - 1;
			}

			if(box.find('li.select-list').eq(next).size()){
				list.css({
					'background':conf['list-background'],
					'color':conf['list-color']
				});
				active = next;
				box.find('li.select-list').eq(active).css({
					'background':conf['list-active-background'],
					'color':conf['list-active-color']
				});

				scrollTopNew = active * list.outerHeight();
				if(scrollTopNew - box.scrollTop() < list.height()){
					box.scrollTop(scrollTopNew);
				}				

				return true;
			}
		}
		function listEnter (event) {
			var text = box.find('li.select-list').eq(active).text().replace(/\s+$/,'');
			textBox.val(text);
			selectBoxOff();
			textBox.focus();
			enableEnter(event);
		}
		function enableEnter(e){
			if(e.srcElement){
				o = e.srcElement;
			}else{
				o = e.target;
			}
			if (o.tagName != 'TEXTAREA' && e.keyCode == 13) {
				if(e.preventDefault){
					e.preventDefault();
					e.stopPropagation();
				}
				e.returnValue=false;
				e.cancelBubble=true;
			}
		}
		function getBrowserHeight() {
			if (window.innerHeight) {
				return window.innerHeight;
			}
			else if(document.documentElement && document.documentElement.clientHeight != 0){
				return document.documentElement.clientHeight;
			}
			else if ( document.body ) {
				return document.body.clientHeight;
			}
			return 0;
		}
		function getScrollTop() {
			var scrollTop  = document.body.scrollTop  || document.documentElement.scrollTop;
			return scrollTop;
		}
	});

}
