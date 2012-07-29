function traverse(node)
{
	var childs = $(node)
		.contents()
		.filter(function(){return this.nodeType === 1});

	font_replace = function(idx, v)
	{
		if (!this.nodeType) return; // this is a workaround!

		var text = $(this).text();

		//merg white spaces
		text = text.replace(/[\t\r\n ]+/g, ' ');
		var wrapped = '';

		for (var i = 0; i < text.length; ++i)
		{
			var character = text[i];
			var span = '<glyph class="glyph-' + character.charCodeAt(0) + '"><o>' + character + '</o></glyph>';
			wrapped += span;
		}

		return wrapped;
	}

	$(node)
		.contents()
		.filter(function(){return this.nodeType === 3})
		.replaceWith(font_replace);

	childs.each(function(){
		if (!$(this).hasClass('font'))
		{
			traverse(this);
		}
	});
	//traverse($(childs));
}

function setup_fonts()
{
	var fonts = $('.font');
	fonts.each(function()
	{
		traverse(this);
	});	
}