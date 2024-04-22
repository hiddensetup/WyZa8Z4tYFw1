var URL = window.URL,
	gumStream,
	recorder,
	input,
	encodingType,
	AudioContext = window.AudioContext || window.webkitAudioContext,
	encodeAfterRecord = !0,
	recordButton = "#recordButton",
	stopButton = "#stopButton",
	stopIcon = $(".bi-record-fill");
$(document).on("click", recordButton, function () {
	stopIcon.css("display", "block"), startRecording();
}),
	$(document).on("click", stopButton, function () {
		stopRecording(), stopIcon.css("display", "none");
	});

	
function startRecording() {
	var audioContext = new AudioContext(),
		constraints = { audio: !0, video: !1 };
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(function (stream) {
			(gumStream = stream),
				(input = audioContext.createMediaStreamSource(stream)),
				(encodingType = "mp3"),
				(recorder = new WebAudioRecorder(input, {
					workerDir: "js/",
					encoding: encodingType,
					numChannels: 2,
				}));
			(recorder.onComplete = function (recorder, blob) {
				createDownloadLink(blob, recorder.encoding);
			}),
				recorder.setOptions({
					timeLimit: 180,
					encodeAfterRecord: encodeAfterRecord,
					ogg: { quality: 0.1 },
					mp3: { bitRate: 32 },
				}),
				recorder.startRecording();
		})
		.catch(function (err) {
			$(recordButton).attr("disabled", !1), $(stopButton).attr("disabled", !0);
		}),
		$(recordButton).attr("disabled", !0),
		$(stopButton).attr("disabled", !1),
		$("#recordButton").hide(),
		$("#stopButton").show();
}



function stopRecording() {
	gumStream.getAudioTracks()[0].stop(),
		$(stopButton).attr("disabled", !0),
		$(recordButton).attr("disabled", !1),
		$("#recordButton").show(),
		$("#stopButton").hide(),
		recorder.finishRecording();
}

__log("Recording stopped");

function blobToFile(theBlob, fileName) {
	theBlob.lastModifiedDate = new Date();
	return new File([theBlob], fileName);
}


var counter = 0;
function createDownloadLink(blob, extension) {
	var fd = new FormData();
	var fileName = `1-minute-recording.${extension}`;
	var file = blobToFile(blob, fileName);
	fd.append("fname", fileName);
	fd.append("file", file);
	jQuery.ajax({
		url: STMBX_URL + "/include/upload.php",
		cache: !1,
		contentType: !1,
		processData: !1,
		data: fd,
		type: "POST",
		success: function (e) {
			SBF.uploadResponse(e);
		},
	});
}

function __log(e, data) {
}
