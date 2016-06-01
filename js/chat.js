
  var client;
  $(function () {
    'use strict';
    var conversation;
    var domain="metio.net";
    var person="evaldez@dynamicnetwork.net";
    var version="1.0";
    var webTicket="Bearer cwt=AAEBHAEFAAAAAAAFFQAAAKuuXmvzGAIi1fxkeTIHAACBEOk__ynkOG5QsauvPGWHtGaCArTrgyDkizQ378pHX38WlE4lbyJVJvART_jMvCpwncg8mXmyFoYIX_kud5CK0wgNEPafGCkKskFVn6NvOvBYlbY";

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
 					$("#status").text("You are now connected with an agent");
 					conversation.historyService.activityItems.added(function (item){
 						 
 					
						 
 								if (item.type() == 'TextMessage') {
        							if (item.direction() == 'Incoming') {
        								 $('#chat').append("<li class='other'><div class='msg'><p>"+item.text()+'</p><time>20:18</time></div></li>');

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


   

    $('#btnLogOut').click(function () {
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
    	$('#chat').append("<li class='self'><div class='msg'><p>"+$('#msg').val()+'</p><time>20:18</time></div></li>');

		var chatService = conversation.chatService;
// when the selfParticipant chat state becomes connected
		conversation.selfParticipant.chat.state.when('Connected', function () {
    		chatService.sendMessage($('#msg').val());
    		$('#msg').val("");
		});
    }
});

	

   

function GetContactFromName(contactSIP)
{
 var query = client.personsAndGroupsManager.createPersonSearchQuery();
 query.text(contactSIP);
 query.limit(1);
 return query.getMore();          
}

});
     


  