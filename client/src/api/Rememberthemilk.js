let api_key = 'ceeb72c5519f6ec643d452a85846c61c',
api_secret = '894602a084f7df3a',
	// http = require('http'),

	stdin = process.stdin,
	RememberTheMilk = require('../../node_modules/rtm-js/rtm');

const  RM = () =>{
let rtm = new RememberTheMilk(api_key, api_secret, 'read');
	console.log(rtm)
rtm.get('rtm.auth.getFrob', function(resp){
	let frob = resp.rsp.frob;

	var authUrl = rtm.getAuthUrl(frob);

	console.log('Please visit the following URL in your browser to authenticate:\n');
	console.log(authUrl, '\n');
	console.log('After authenticating, press any key to resume...');

	stdin.resume();

	stdin.on('data', function() {
		rtm.get('rtm.auth.getToken', {frob: frob}, function(resp){
			if (!resp.rsp.auth) {
				console.log('Auth token not found. Did you authenticate?\n');
				process.exit(1);
			}

			rtm.auth_token = resp.rsp.auth.token;

			console.log('Lists:');

			rtm.get('rtm.lists.getList', function(resp){
				var i, list;

				for (i = 0; i < resp.rsp.lists.list.length; i++) {
					list = resp.rsp.lists.list[i];
					console.log(list.name + ' (id: ' + list.id + ')');
				}
				console.log();
				process.exit();
			});
		});
	});
});
}

// const R = {
// 	RM,
// }

export default RM;

