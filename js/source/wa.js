// wa.js

function showQrModal(modalId, overlayId, imageUrl) {
  $("body").append(
      `<div class="qr-modal-overlay" id="${overlayId}"></div>
       <div id="${modalId}" class="qr-modal">
           <button class="qr-close-btn" onclick="closeQrModal('#${modalId}', '#${overlayId}')">&times;</button>
           <img class="qr-image" src="${imageUrl}" id="${modalId}_img" onerror="this.style.display='none';$('#${modalId}_loading').show();" />
           <div class="qr-loading" id="${modalId}_loading"><div>Loading...</div></div>
           <p class="qr-message">Scan the QR code and wait for your phone to confirm in WhatsApp. When done, close this and enjoy!</p>
       </div>`
  );

  $(`#${overlayId}`).on('click', function() {
      closeQrModal(`#${modalId}`, `#${overlayId}`);
  });

  // Set a timer to remove the modal after 10 seconds
  setTimeout(function() {
      closeQrModal(`#${modalId}`, `#${overlayId}`);
  }, 8000); // 10000 milliseconds = 10 seconds
}

function closeQrModal(modalId, overlayId) {
  $(modalId).remove();
  $(overlayId).remove();
}

function handleButtonClick(event, action, url, modalId, overlayId) {
  event.preventDefault();

  if (action === "start") {
      $(`#${modalId}_loading`).show();

      fetch(STMBX_URL + url)
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.text();
          })
          .then((responseText) => {
              try {
                  let jsonResponse = JSON.parse(responseText);
                  if (jsonResponse.error) {
                      SBChat.showResponse(
                          '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
                          "warning"
                      );
                  } else if (jsonResponse.image) {
                      let imageUrl = "data:image/png;base64," + jsonResponse.image;
                      showQrModal(modalId, overlayId, imageUrl);
                      $(`#${modalId}_loading`).hide();
                  }
              } catch (e) {
                  if (e instanceof SyntaxError) {
                      fetch(STMBX_URL + url)
                          .then((response) => {
                              if (!response.ok) {
                                  throw new Error("Network response was not ok");
                              }
                              return response.blob();
                          })
                          .then((imageBlob) => {
                              let imageUrl = URL.createObjectURL(imageBlob);
                              showQrModal(modalId, overlayId, imageUrl);
                              $(`#${modalId}_loading`).hide();
                          })
                          .catch((error) => {
                              SBChat.showResponse(
                                  '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
                                  "error"
                              );
                          });
                  } else {
                      throw e;
                  }
              }
          })
          .catch((error) => {
              SBChat.showResponse(
                  '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
                  "error"
              );
          })
          .finally(() => {
              $(`#${modalId}_loading`).hide();
          });
  } else if (action === "restart") {
      $.ajax({
          url: url,
          method: "GET",
          dataType: "json",
          success: function (response) {
              SBChat.showResponse(
                  '<i style="var(--color-red)" class="bi bi-telephone-x"></i> Disconnecting from WhatsApp...'
              );
              closeQrModal(`#${modalId}`, `#${overlayId}`);
          },
          error: function (xhr) {
              SBChat.showResponse(
                  '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
                  "error"
              );
          },
      });
  }

  return false;
}

// Handle Whatsmeow button clicks
$(document).on("click", "#whatsmeow-go-start .sb-btn", function (event) {
  handleButtonClick(event, "start", "/include/get_ww.php?qrurl=", "qr_modal1", "qr_modal_overlay1");
});

$(document).on("click", "#whatsmeow-go-restart .sb-btn", function (event) {
  handleButtonClick(event, "restart", "/include/reset_ww.php", "qr_modal1", "qr_modal_overlay1");
});

// Handle waweb button clicks
$(document).on("click", "#waweb-go-start .sb-btn", function (event) {
  handleButtonClick(event, "start", "/include/get_wx.php?qrurl=", "qr_modal2", "qr_modal_overlay2");
});

$(document).on("click", "#waweb-go-restart .sb-btn", function (event) {
  handleButtonClick(event, "restart", "/include/reset_wx.php", "qr_modal2", "qr_modal_overlay2");
});
