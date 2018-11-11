function bgService(){
	this.request=function(){
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(e){
			if(this.readystate==4 && this.status==200){
				console.log("response: "+this.response);
				this.bgo.response(this.response);
			}else{
				console.log('read state: '+this.readystate+" status:"+this.status);
			}
		};
		xhr.bgo=this;
		this.xhr=xhr; //try too keep it
		xhr.open("http://abrapp3.ml/alotest.php");
		xhr.send(null);
	};

	this.response=function(res){
		try{
			showNotification("A message from web",res+" "+(Date.now()/1000),true);
			try{
				setTimeout(this.request,20000);
			}catch(exi){
				console.log("Unable to set timeout.");
				console.log(exi);
			}
		}catch(ex){
			console.log('Unable to show notification.');
			console.log(ex);
		}
	};
};
function start_bg(fn){
	var o=new bgService();
	o.request();
	if(typeof(fn)=="function")fn();
}
function config_bg(){
	window.BackgroundService.start(
		start_bg,
		function(){console.log('unable to start bg');}
	)
}

function showNotification(_title,message,vibr){
	cordova.plugins.notification.local.schedule({
		title:_title,
		text:message,
		led:{color:'#3333FF',on:1000,off:1000},
		vibrate:vibr,
		forground:true
	});
}