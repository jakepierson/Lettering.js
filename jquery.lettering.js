/*global jQuery */
/*!	
* Lettering.JS 0.6.1
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function($){
	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			var ch = rainbow.start.h;
			var cs = rainbow.start.s;
			var cl = rainbow.start.l;
			var ca = rainbow.start.a;
			var slice = (rainbow.end.h-rainbow.start.h)/a.length;
			
			$(a).each(function(i, item) {
				inject += '<span style="color: hsla('+ch+','+cs+','+cl+','+ca+');" class="'+klass+(i+1)+'">'+item+'</span>'+after;
				ch = ch+(slice*1)
			});	
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method, rainbow ) {
		
		if( rainbow ) {
			if( !rainbow[0] || !rainbo[1] ) {console.log('invalid rainbow hsla values. Use [['h','s','l','a'],['h','s','l','a']] ');}
			rainbow = {
			  start: { h: rainbow[0][0]|'0', s: rainbow[0][1]|'100%', l: rainbow[0][2]|'50%', a: rainbow[0][3]|'1'},
			  end:   { h: rainbow[1][0]|'0', s: rainbow[1][1]|'100%', l: rainbow[1][2]|'50%', a: rainbow[1][3]|'1'}
			} 
		}
		
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);