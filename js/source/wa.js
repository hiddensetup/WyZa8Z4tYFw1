// wa.js

// Handle Whatsmeow button clicks
function handleWhatsmeowButtonClick(event, action) {
  event.preventDefault();

  let url =
    action === "start" ? "/include/get_ww.php?qrurl=" : "/include/reset_ww.php";

  if (action === "start") {
    $("#qr_loading1").show();

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
            let qrImage = $("#qr_image1");

            if (qrImage.length) {
              qrImage.fadeOut(500, function () {
                $(this).attr("src", imageUrl).fadeIn(500);
              });
            } else {
              $("#whatsmeow-go .sb-setting-content").append(
                `<img style="max-width: 90%; margin: 10px; border: 4px solid white; border-radius: 15px;" id="qr_image1" src="${imageUrl}" onerror="this.style.display='none';$('#qr_loading1').show();" />`
              );
              $("#whatsmeow-go .sb-setting-content").append(
                '<div id="qr_loading1" style="display: none; width: 90%; height: 40px; margin: 10px; border-radius: 8px;"><div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center; color: white; font-size: var(--chat-text-size-7);">Loading...</div></div>'
              );
            }

            $("#qr_loading1").hide();
          }
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error("Response is not JSON, assuming it's an image blob.");
            fetch(STMBX_URL + url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.blob();
              })
              .then((imageBlob) => {
                let imageUrl = URL.createObjectURL(imageBlob);
                let qrImage = $("#qr_image1");

                if (qrImage.length) {
                  qrImage.fadeOut(500, function () {
                    $(this).attr("src", imageUrl).fadeIn(500);
                  });
                } else {
                  $("#whatsmeow-go .sb-setting-content").append(
                    `<img style="max-width: 90%; margin: 10px; border: 4px solid white; border-radius: 15px;" id="qr_image1" src="${imageUrl}" onerror="this.style.display='none';$('#qr_loading1').show();" />`
                  );
                  $("#whatsmeow-go .sb-setting-content").append(
                    '<div id="qr_loading1" style="display: none; width: 90%; height: 40px; margin: 10px; border-radius: 8px;"><div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center; color: white; font-size: var(--chat-text-size-7);">Loading...</div></div>'
                  );
                }
              })
              .catch((error) => {
                console.error("Error during fetch:", error);
                SBChat.showResponse(
                  '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
                  "error"
                );
              });

            return;
          } else {
            throw e;
          }
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        SBChat.showResponse(
          '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
          "error"
        );
      })
      .finally(() => {
        $("#qr_loading1").hide();
      });
  } else if (action === "restart") {
    console.log("Restarting...");

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Restart successful. Response:", response);
        SBChat.showResponse(
          '<i style="var(--color-red)" class="bi bi-telephone-x"></i> Disconnecting from WhatsApp...'
        );

        let qrImage = $("#qr_image1");
        if (qrImage.length) {
          qrImage.fadeOut(500, function () {
            $(this).remove();
          });
        }
      },
      error: function (xhr) {
        console.error("Restart error. Response:", xhr.responseText);
        SBChat.showResponse(
          '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
          "error"
        );
      },
    });
  }

  return false;
}

// Handle waweb button clicks
function handlewawebButtonClick(event, action) {
  event.preventDefault();

  let url =
    action === "start" ? "/include/get_wx.php?qrurl=" : "/include/reset_wx.php";

  if (action === "start") {
    $("#qr_loading2").show();

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
            console.error("Error in JSON response:", jsonResponse.error);
            SBChat.showResponse(
              '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
              "warning"
            );
          } else if (jsonResponse.image) {
            let imageUrl = "data:image/png;base64," + jsonResponse.image;
            let qrImage = $("#qr_image2");

            if (qrImage.length) {
              qrImage.fadeOut(500, function () {
                $(this).attr("src", imageUrl).fadeIn(500);
              });
            } else {
              $("#waweb-go .sb-setting-content").append(
                `<img style="max-width: 90%; margin: 10px; border: 4px solid white; border-radius: 15px;" id="qr_image2" src="${imageUrl}" onerror="this.style.display='none';$('#qr_loading2').show();" />`
              );
              $("#waweb-go .sb-setting-content").append(
                '<div id="qr_loading2" style="display: none; width: 90%; height: 40px; margin: 10px; border-radius: 8px;"><div style="position: relative; top: 50%; transform: translateY(-50%); text-align: center; color: white; font-size: var(--chat-text-size-7);">Loading...</div></div>'
              );
            }

            $("#qr_loading2").hide();
          }
        } catch (e) {
          console.error("Error parsing JSON response:", e);
          SBChat.showResponse(
            '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
            "error"
          );
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        SBChat.showResponse(
          '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
          "error"
        );
      })
      .finally(() => {
        $("#qr_loading2").hide();
      });
  } else if (action === "restart") {
    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      success: function (response) {
        console.log("Restart successful. Response:", response);
        SBChat.showResponse(
          '<i style="var(--color-red)" class="bi bi-telephone-x"></i> Disconnecting from WhatsApp...'
        );

        let qrImage = $("#qr_image2");
        if (qrImage.length) {
          qrImage.fadeOut(500, function () {
            $(this).remove();
          });
        }
      },
      error: function (xhr) {
        console.error("Restart error. Response:", xhr.responseText);
        SBChat.showResponse(
          '<i class="bi bi-emoji-dizzy-fill"></i> WhatsApp is unresponsive',
          "error"
        );
      },
    });
  }

  return false;
}

// Event handlers for Whatsmeow buttons
$(document).on("click", "#whatsmeow-go-start .sb-btn", function (event) {
  handleWhatsmeowButtonClick(event, "start");
});

$(document).on("click", "#whatsmeow-go-restart .sb-btn", function (event) {
  handleWhatsmeowButtonClick(event, "restart");
});

// Event handlers for waweb buttons
$(document).on("click", "#waweb-go-start .sb-btn", function (event) {
  handlewawebButtonClick(event, "start");
});

$(document).on("click", "#waweb-go-restart .sb-btn", function (event) {
  handlewawebButtonClick(event, "restart");
});
