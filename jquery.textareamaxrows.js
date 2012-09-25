

(function($) {
    $.fn.textareamaxrows = function(options) {
    
        var opts = $.extend({}, $.fn.textareamaxrows.defaults, options);

        return this.each(function() {
            $(this).keyup(onKeyup);
        });

        function onKeyup() {

            var textarea_content = $(this).val();
            var number_breaks    = $(this).val().split('\n').length;     

            var number_fake_breaks = 0;
            var text_paragraphs = $(this).val().split('\n');
            for (var i in text_paragraphs) {
                var number_fake_breaks_paragraph = parseInt(getNumberOfChunks(opts.maxcharsinrow, text_paragraphs[i]));
                if (number_fake_breaks_paragraph > 1) {
                    number_fake_breaks = number_fake_breaks + number_fake_breaks_paragraph;
                }
            }

            if ((number_breaks + number_fake_breaks) >= opts.maxrows) {
                if (opts.alert) {
                    alert(opts.alertmessage);
                }
                $(this).val(textarea_content.slice(0, -1));
            }        

            return false;
        }
    
    
    }

    function getNumberOfChunks(chunkSize, checkString) {

        var chunks = [];

        while (checkString) {
            if (checkString.length < chunkSize) {
                chunks.push(checkString);
                break;
            }
            else {
                chunks.push(checkString.substr(0, chunkSize));
                checkString = checkString.substr(chunkSize);
            }
        }

        return chunks.length;
    }

    $.fn.textareamaxrows.defaults = {
        alert: false, 
        alertmessage : 'too rows and chars', 
        maxrows : 20, 
        maxcharsinrow : 32
    }
    

})(jQuery);