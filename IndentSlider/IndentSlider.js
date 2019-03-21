function IndentSlider(options) {

    var cls = this;

    var el = $(options.el ? options.el : '#slider');
    var item = $(options.item ? options.item : options.el + ' .item');
    var item_wrap = $(options.item_wrap ? options.item_wrap : options.el + ' .item_wrap');
    var duration = options.duration ? options.duration : 300;
    var indent = options.indent ? options.indent : 2;

    var item_length = item.length;
    var item_width = item.outerWidth();
    var item_wrap_width = item_length * item_width;
    var index = 0;


    cls.init = function() {
        item_wrap.css({
            width: item_wrap_width
        });
        item_wrap.css({
            marginLeft: -item_width * indent
        });

        item.removeClass('active');
        item.removeClass('end');
        item.removeClass('ready');
        item.eq(indent).addClass('active');
        item.slice(0, indent).addClass('end');
        item.slice(indent + 1).addClass('ready');
    }

    cls.move = function(dir) {
        if (!item_wrap.is(':animated')) {
            if (dir == 1) {

                index = index + 1;

                if (index > item_length - 1) {
                    index = 0;
                }


                item.removeClass('end');
                item.slice(0, indent + 1).addClass('end');

                item_wrap.stop(false, true).animate({
                    marginLeft: '-' + item_width * (indent + 1) + 'px'
                }, duration, function() {

                    item.eq(0).appendTo(item_wrap);
                    item_wrap.css({
                        marginLeft: -item_width * indent
                    })

                    item = el.find('.item');
                    item.removeClass('end');
                    item.removeClass('active');
                    item.removeClass('ready');
                    item.eq(indent).addClass('active');
                    item.slice(0, indent).addClass('end');
                    item.slice(indent + 1).addClass('ready');

                });

            } else if (dir == -1) {

                index = index - 1;

                if (index < 0) {
                    index = item_length - 1;
                }


                item.eq(item_length - 1).prependTo(item_wrap);

                item_wrap.css({
                    marginLeft: '-' + item_width * (indent + 1) + 'px'
                });

                item = el.find('.item');
                item.removeClass('end');
                item.slice(0, indent).addClass('end');

                item_wrap.stop(false, false).animate({
                    marginLeft: -item_width * indent
                }, duration, function() {

                    item.removeClass('active');
                    item.removeClass('ready');
                    item.eq(indent).addClass('active');
                    item.slice(indent + 1).addClass('ready');
                });
            }
        }
    }

    cls.init();
}