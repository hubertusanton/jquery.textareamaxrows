

(function($) {
    
    $.fn.textareamaxrows = function(options) {
    
        var defaults = {
            alert: false, 
            alertmessage : 'too many rows and chars', 
            maxrows : 20, 
            maxcharsinrow : 32,
            usecounter : false,
            counterelem : '',
            errorclass : 'error'
        }

        var down = {};

        var opts = $.extend(defaults, options);

        // prevent right click paste
        $(this).on("paste contextmenu",function(e) { e.preventDefault(); });

        return this.each(function(event) {
            $(this).keyup(onKeyup);
            $(this).keydown(onKeyDown);
        });

        // prevent holding enter key
        function onKeyDown(event) {
            var keycode = (event.keyCode ? event.keyCode : event.which);

            if (keycode == '13') {
                if (down['13'] == null) { // first press
                    down['13'] = true; // record that the key's down
                }
                else {

                    // Cut down the string
                    var current_length = $(this).val().length;
                    var new_length = current_length - 1;
                    $(this).val($(this).val().substr(0, new_length));
                }
            }
        }

        function onKeyup() {

            var number_breaks    = $(this).val().split('\n').length; 
            // first break does not count
            number_breaks--;

            var number_fake_breaks = 0;
            var text_paragraphs = $(this).val().split('\n');
            for (var i in text_paragraphs) {
                var number_fake_breaks_paragraph = parseInt(getNumberOfChunks(opts.maxcharsinrow, text_paragraphs[i]));
                if (number_fake_breaks_paragraph > 1) {
                    number_fake_breaks = number_fake_breaks + number_fake_breaks_paragraph;
                }
            }
            
            var total_breaks = parseInt(number_breaks + number_fake_breaks);
            
            if (total_breaks >= opts.maxrows) {
                if (opts.alert) {
                    alert(opts.alertmessage);
                }
                
                // add error class to textarea
                $(this).addClass(opts.errorclass);

                // Cut down the string
                var current_length = $(this).val().length;
                var new_length = current_length - 1;
                $(this).val($(this).val().substr(0, new_length));
            } 
            else {
                // remove error class textarea
                $(this).removeClass(opts.errorclass);                
            }
            
            // set counter if option usecounter and counterelem and is set
            if ((opts.usecounter) && opts.counterelem != '') {
                if ((opts.maxrows - total_breaks) < 0) {
                    $(opts.counterelem).html('0');
                }
                else {
                    $(opts.counterelem).html(opts.maxrows - total_breaks);
                }
            }

            return false;
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
    
    }

})(jQuery);