var URL = window.URL;
var gumStream, recorder, input, encodingType = "mp3"; // Default to "mp3"
var AudioContext = window.AudioContext || window.webkitAudioContext;
var encodeAfterRecord = true;
var recordButton = "#recordButton";
var stopButton = "#stopButton";
var stopIcon = $(".bi-record-fill");

$(document).on("click", recordButton, function () {
  startRecording();
});

$(document).on("click", stopButton, function () {
  stopRecording();
});

function startRecording() {
  var audioContext = new AudioContext();
  var constraints = { audio: true, video: false };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      gumStream = stream;
      input = audioContext.createMediaStreamSource(stream);
      recorder = new WebAudioRecorder(input, {
        workerDir: "js/rtn/",
        encoding: encodingType, // Use default encoding type
        numChannels: 2,
      });

      recorder.onComplete = function (recorder, blob) {
        createDownloadLink(blob, recorder.encoding);
      };

      recorder.setOptions({
        timeLimit: 180,
        encodeAfterRecord: encodeAfterRecord,
        ogg: { quality: 0.1 },
        mp3: { bitRate: 32 },
      });

      recorder.startRecording();

      $(recordButton).attr("disabled", true);
      $(stopButton).attr("disabled", false);
      $("#recordButton").hide();
      $("#stopButton").show();
    })
    .catch(function (err) {
      $(recordButton).attr("disabled", false);
      $(stopButton).attr("disabled", true);
      console.error("Error accessing media devices.", err);
    });
}

function stopRecording() {
  gumStream.getAudioTracks()[0].stop();
  $(stopButton).attr("disabled", true);
  $(recordButton).attr("disabled", false);
  $("#recordButton").show();
  $("#stopButton").hide();
  recorder.finishRecording();
}

function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date();
  return new File([theBlob], fileName);
}

function createDownloadLink(blob, extension) {
  var fd = new FormData();
  var fileName = `1-minute-recording.${extension}`;
  var file = blobToFile(blob, fileName);
  fd.append("fname", fileName);
  fd.append("file", file);

  jQuery.ajax({
    url: STMBX_URL + "/include/upload.php",
    cache: false,
    contentType: false,
    processData: false,
    data: fd,
    type: "POST",
    success: function (response) {
      SBF.uploadResponse(response);
    },
  });
}
