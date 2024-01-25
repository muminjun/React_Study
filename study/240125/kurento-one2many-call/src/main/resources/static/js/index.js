// WebSocket을 생성하고 Kurento Media Server와의 통신을 위해 사용합니다
var ws = new WebSocket('wss://' + location.host + '/call');

// 페이지 로드 시 실행되며, HTML 요소 및 변수들을 초기화합니다
var video;
var webRtcPeer;

window.onload = function() {
	console = new Console();
	video = document.getElementById('video');
	disableStopButton();
}

window.onbeforeunload = function() {
	ws.close();
}

// WebSocket으로부터 메시지를 수신하는 이벤트 핸들러가 정의되어 있습니다.
// 서버에서 전송된 메시지를 처리하는 로직이 여기에 들어갑니다.
ws.onmessage = function(message) {
	var parsedMessage = JSON.parse(message.data);
	console.info('Received message: ' + message.data);

	switch (parsedMessage.id) {
	case 'presenterResponse':
		presenterResponse(parsedMessage);
		break;
	case 'viewerResponse':
		viewerResponse(parsedMessage);
		break;
	case 'iceCandidate':
		webRtcPeer.addIceCandidate(parsedMessage.candidate, function(error) {
			if (error)
				return console.error('Error adding candidate: ' + error);
		});
		break;
	case 'stopCommunication':
		dispose();
		break;
	default:
		console.error('Unrecognized message', parsedMessage);
	}
}

// 서버로부터 받은 응답 메시지를 처리하는 함수들이 정의.
// presenter에 대한 응답을 다룹니다.
function presenterResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.info('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
			if (error)
				return console.error(error);
		});
	}
}

// 서버로부터 받은 응답 메시지를 처리하는 함수들이 정의.
// viewer에 대한 응답을 다룹니다.
function viewerResponse(message) {
	if (message.response != 'accepted') {
		var errorMsg = message.message ? message.message : 'Unknow error';
		console.info('Call not accepted for the following reason: ' + errorMsg);
		dispose();
	} else {
		webRtcPeer.processAnswer(message.sdpAnswer, function(error) {
			if (error)
				return console.error(error);
		});
	}
}

// presenter 기능을 수행하는 함수들이 정의되어 있습니다.
// WebRTC 피어를 생성하고 SDP를 생성하여 서버로 전송하는 역할을 합니다.
function presenter() {
	if (!webRtcPeer) {
		showSpinner(video);

		var options = {
			localVideo : video,
			onicecandidate : onIceCandidate
		}
		webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
				function(error) {
					if (error) {
						return console.error(error);
					}
					webRtcPeer.generateOffer(onOfferPresenter);
					console.log(webRtcPeer)
				});

		enableStopButton();
	}
}

function onOfferPresenter(error, offerSdp) {
	if (error)
		return console.error('Error generating the offer');
	console.info('Invoking SDP offer callback function ' + location.host);
	var message = {
		id : 'presenter',
		sdpOffer : offerSdp
	}
	sendMessage(message);
}

// viewer 기능을 수행하는 함수들이 정의되어 있습니다.
// WebRTC 피어를 생성하고 SDP를 생성하여 서버로 전송하는 역할을 합니다.
function viewer() {
	if (!webRtcPeer) {
		showSpinner(video);

		var options = {
			remoteVideo : video,
			onicecandidate : onIceCandidate
		}
		webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
				function(error) {
					if (error) {
						return console.error(error);
					}
					this.generateOffer(onOfferViewer);
				});

		enableStopButton();
	}
}

function onOfferViewer(error, offerSdp) {
	if (error)
		return console.error('Error generating the offer');
	console.info('Invoking SDP offer callback function ' + location.host);
	var message = {
		id : 'viewer',
		sdpOffer : offerSdp
	}
	sendMessage(message);
}

// ICE 후보, 연결 중지, 피어 해제 등을 다루는 함수들이 정의되어 있습니다.
// (로컬 후보(candidate) 처리 로직)
function onIceCandidate(candidate) {
	console.log("Local candidate" + JSON.stringify(candidate));

	var message = {
		id : 'onIceCandidate',
		candidate : candidate
	};
	sendMessage(message);
}

// (통신 중지 로직)
function stop() {
	var message = {
		id : 'stop'
	}
	sendMessage(message);
	dispose();
}

// (피어 해제 및 UI 업데이트 로직)
function dispose() {
	if (webRtcPeer) {
		webRtcPeer.dispose();
		webRtcPeer = null;
	}
	hideSpinner(video);

	disableStopButton();
}

// (Stop 버튼 비활성화 로직)
function disableStopButton() {
	enableButton('#presenter', 'presenter()');
	enableButton('#viewer', 'viewer()');
	disableButton('#stop');
}

// (Stop 버튼 활성화 로직)
function enableStopButton() {
	disableButton('#presenter');
	disableButton('#viewer');
	enableButton('#stop', 'stop()');
}

// (버튼 비활성화 로직)
function disableButton(id) {
	$(id).attr('disabled', true);
	$(id).removeAttr('onclick');
}

// (버튼 활성화 로직)
function enableButton(id, functionName) {
	$(id).attr('disabled', false);
	$(id).attr('onclick', functionName);
}

// 서버로 메시지를 전송하는 함수입니다.
function sendMessage(message) {
	var jsonMessage = JSON.stringify(message);
	console.log('Sending message: ' + jsonMessage);
	ws.send(jsonMessage);
}

// (로딩 스피너 표시 로직)
function showSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].poster = './img/transparent-1px.png';
		arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
	}
}

// (로딩 스피너 숨김 로직)
function hideSpinner() {
	for (var i = 0; i < arguments.length; i++) {
		arguments[i].src = '';
		arguments[i].poster = './img/webrtc.png';
		arguments[i].style.background = '';
	}
}

/**
 * Lightbox utility (to display media pipeline image in a modal dialog)
 */
$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});
