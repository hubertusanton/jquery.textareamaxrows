
$(document).ready(function() {
    
    $('#idoftextarea').textareamaxrows();
    $('#idoftextarea').textareamaxrows({alert:true});
    $('#idoftextarea').textareamaxrows({alert:true, alertmessage : 'hey too long!', maxrows : 4, maxcharsinrow : 12});
    
});    
    