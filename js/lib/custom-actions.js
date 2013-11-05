$(document).ready(function(){  
    $("#myonoffswitch").change(function() {  
        if($("#myonoffswitch").is(':checked')) {  
            //alert("Está activado");  
             $('.denegar').slideUp();
             $('.aceptar').slideDown();
        } else {  
            //alert("No está activado");  
            $('.aceptar').slideUp();
            $('.denegar').slideDown();
        }  
    });  
}); 