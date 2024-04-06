let URL = window.URL,
  gumStream,
  recorder,
  input,
  encodingType,
  AudioContext = window.AudioContext || window.webkitAudioContext,
  encodeAfterRecord = true,
  recordButton = document.querySelector("#recordButton"),
  stopButton = document.querySelector("#stopButton"),
  stopIcon = document.querySelector(".sb-icon-stop");

recordButton.addEventListener("click", function () {
  stopIcon.style.display = "block";
  startRecording();
});

stopButton.addEventListener("click", function () {
  stopRecording();
  stopIcon.style.display = "none";
});

function startRecording() {
  const audioContext = new AudioContext(),
    constraints = { audio: true, video: false };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      gumStream = stream;
      input = audioContext.createMediaStreamSource(stream);
      encodingType = "mp3";
      recorder = new WebAudioRecorder(input, {
        workerDir: "js/",
        encoding: encodingType,
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
    })
    .catch(function (err) {
      recordButton.disabled = false;
      stopButton.disabled = true;
    });

  recordButton.disabled = true;
  stopButton.disabled = false;
  recordButton.style.display = "none";
  stopButton.style.display = "inline";
}

function stopRecording() {
  gumStream.getAudioTracks()[0].stop();
  stopButton.disabled = true;
  recordButton.disabled = false;
  recordButton.style.display = "inline";
  stopButton.style.display = "none";
  recorder.finishRecording();
}

function blobToFile(theBlob, fileName) {
  theBlob.lastModifiedDate = new Date();
  return new File([theBlob], fileName);
}

let counter = 0;
function createDownloadLink(blob, extension) {
  const fd = new FormData();
  const fileName = `1-minute-recording.${extension}`;
  const file = blobToFile(blob, fileName);
  fd.append("fname", fileName);
  fd.append("file", file);
  fetch(STMBX_URL + "/include/upload.php", {
    method: "POST",
    body: fd,
  })
    .then((response) => response.text())
    .then((data) => SBF.uploadResponse(data))
    .catch((error) => console.error("Error uploading file:", error));
}
