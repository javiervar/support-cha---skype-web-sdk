
  var client;
  $(function () {
    'use strict';
    var conversation;
    var domain="metio.net";
    var person="";
    var version="1.0";
    var webTicket="Bearer cwt=AAEBHAEFAAAAAAAFFQAAAKuuXmvzGAIi1fxkeXIGAACBEFGt0YtqM3BVrxhrtkQkKFqCApwggyDTO0pIM3DEccV7A7uNkkMJWvnOB2sfsOs4Zp3K2V6aq4YIl6vbCxSM0wgNEPafGCkKskFVn6NvOvBYlbY";

$('#chat-btn').click(function () {
	person=document.getElementById("to").value;
	alert(person);
	document.getElementById("chat-container").style.display="block";
	Skype.initialize({
            apiKey: 'SWX-BUILD-SDK',
        }, function (api) {
            client = new api.application();           
			
 		 
		client.signInManager.signIn({
 			/*username: 'evaldez@dynamicnetwork.net',
 			password: 'Javier12'*/
 			version: version,
    		auth: function (req, send) {
        		req.headers['Authorization'] = webTicket;
        		return send(req);
    		},
    		domain: domain
		}).then(function () {
			alert("OK");
			 conversation = client.conversationsManager.createConversation();

 			conversation.chatService.start().then(function(){
 				alert("started");
 				conversation.addParticipant("sip:" + person).then(function(){
 					alert("ADDED");
 					$("#msg").attr("disabled",false); 
 					$("#status p").text("You are now connected with an agent");
 					conversation.historyService.activityItems.added(function (item){
 						 
 					
						 
 								if (item.type() == 'TextMessage') {
        							if (item.direction() == 'Incoming') {
        								 $('#chat').append("<li tabindex='1' class='other'><div class='msg'><p>"+item.text()+'</p><time>'+time()+'</time></div></li>');
        								  auto()
            							console.log('received a text message: ', item.text());
        							} else if (item.direction() == 'Outgoing') {
            							console.log('sent a text message: ', item.text());
        							}
    							}


					});
 				});

 			});
		},function(error){
			alert(error);
		});
	
        }, function (err) {
            alert('Error loading Skype Web SDK: ' + err);
        }); 

});
	
   

    $('#btnLogOut').click(function () {
    	document.getElementById("chat-container").style.display="none";
        // start signing out
        client.signInManager.signOut()
        .then(function () {
               //log out worked!
               alert('Logged out!');
               $('#btnStartConversation').prop('disabled', true);
             }, function (error) {
                //Something went wrong.
                alert(error);
              });
      });

    

	$(document).keypress(function(e) {
    if(e.which == 13) {
    	var txt=$('#msg').val();
    	if (txt!="") {
    		$('#chat').append("<li  tabindex='1' class='self'><div class='msg'><p>"+$('#msg').val()+'</p><time>'+time()+'</time></div></li>');
    	 	auto();
			var chatService = conversation.chatService;
 			conversation.selfParticipant.chat.state.when('Connected', function () {
    			chatService.sendMessage($('#msg').val());
    			$('#msg').val("");
			});
		}
    }
});

	

 function auto(){
		var height = 0;
		$('ol li').each(function(i, value){
    	height += parseInt($(this).height());
		});

		height += '';

		$('ol').animate({scrollTop: height});
}

function time(){

	var datetime =   new Date().toLocaleTimeString('en-US', { hour12: false, 
                                             hour: "numeric", 
                                             minute: "numeric"});;
	return datetime;
}

function GetContactFromName(contactSIP)
{
 var query = client.personsAndGroupsManager.createPersonSearchQuery();
 query.text(contactSIP);
 query.limit(1);
 return query.getMore();          
}

});
     


  