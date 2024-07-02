/*
 * ==========================================================
 * ADMINISTRATION SCRIPT
 * ==========================================================
 *
 * Main Javascript admin file. © 2017-2022 Routin.bot. All rights reserved.
 *
 */
"use strict";
(function ($) {
  // Global
  var admin;
  var header;

  // Conversation
  var conversations = [];
  var conversations_area;
  var conversations_admin_list;
  var conversations_admin_list_ul;
  var conversations_filters;

  var saved_replies = false;
  var chat_status = false;
  var saved_replies_list = false;
  var pagination = 1;
  var notes_panel;
  var tags_panel;

  var attachments_panel;
  var direct_message_box;
  var dialogflow_intent_box;
  var suggestions_area;
  var pagination_count = 1;

  // Users
  var users_area;
  var users_table;
  var users_table_menu;
  var users = {};
  var users_pagination = 1;
  var users_pagination_count = 1;
  var profile_box;
  var profile_edit_box;

  // Settings
  var settings_area;
  var articles_area;
  var articles_category_selects;
  var articles_category_parent_select;
  var automations_area;
  var automations_area_select;
  var automations_area_nav;
  var conditions_area;

  // Reports
  var reports_area;

  // Miscellaneus
  var upload_target;
  var upload_on_success;
  var language_switcher_target;
  var timeout;
  var alertOnConfirmation;
  var responsive = $(window).width() < 555;
  var scrolls = {
    last: 0,
    header: true,
    always_hidden: false,
  };
  var localhost =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";
  var today = new Date();
  var is_busy = false;
  var agent_online = true;
  var active_interval = false;
  var pusher_timeout;
  var temp;
  var overlay;
  var SITE_URL;
  var ND = "undefined";
  var x_down = false;
  var y_down = false;
  var editor_js = false;
  var editor_js_saving = false;
  var editor_js_loading = false;
  var clientStatus = [
    "Abierto",
    "Presupuesto",
    "Consulta",
    "Contactado",
    "Visitado",
    "Calificado",
    "Confirmado",
    "Pendiente",
    "Resuelto",
    "Pagado",
    "VIP",
    "Descartado",
    "NA",
];

  /*
   * ----------------------------------------------------------
   * External plugins
   * ----------------------------------------------------------
   */

  // miniTip 1.5.3 | (c) 2011, James Simpson | Dual licensed under the MIT and GPL
  $.fn.miniTip = function (t) {
    var e = $.extend(
      {
        title: "",
        content: !1,
        delay: 100,
        anchor: "n",
        event: "hover",
        fadeIn: 100,
        fadeOut: 300,
        aHide: !0,
        maxW: "250px",
        offset: 4,
        stemOff: 0,
        doHide: !1,
      },
      t
    );
    0 == admin.find("#miniTip").length &&
      admin.append('<div id="miniTip" class="sb-tooltip"><div></div></div>');
    var n = admin.find("#miniTip"),
      o = n.find("div");
    return e.doHide
      ? (n.stop(!0, !0).fadeOut(e.fadeOut), !1)
      : this.each(function () {
          var t = $(this),
            i = e.content ? e.content : t.attr("title");
          if ("" != i && void 0 !== i) {
            window.delay = !1;
            var r = !1,
              a = !0;
            e.content || t.removeAttr("title"),
              "hover" == e.event
                ? (t.hover(
                    function () {
                      n.removeAttr("click"), (a = !0), c.call(this);
                    },
                    function () {
                      (a = !1), s();
                    }
                  ),
                  e.aHide ||
                    n.hover(
                      function () {
                        r = !0;
                      },
                      function () {
                        (r = !1),
                          setTimeout(function () {
                            a || n.attr("click") || s();
                          }, 20);
                      }
                    ))
                : "click" == e.event &&
                  ((e.aHide = !0),
                  t.click(function () {
                    return (
                      n.attr("click", "t"),
                      n.data("last_target") !== t
                        ? c.call(this)
                        : "none" == n.css("display")
                        ? c.call(this)
                        : s(),
                      n.data("last_target", t),
                      $("html")
                        .unbind("click")
                        .click(function (t) {
                          "block" != n.css("display") ||
                            $(t.target).closest("#miniTip").length ||
                            ($("html").unbind("click"), s());
                        }),
                      !1
                    );
                  }));
            var c = function () {
                e.show && e.show.call(this, e),
                  e.content && "" != e.content && (i = e.content),
                  o.html(i),
                  e.render && e.render(n),
                  n.hide().width("").width(n.width()).css("max-width", e.maxW);
                var r = t.is("area");
                if (r) {
                  var a,
                    c = [],
                    s = [],
                    d = t.attr("coords").split(",");
                  function f(t, e) {
                    return t - e;
                  }
                  for (a = 0; a < d.length; a++) c.push(d[a++]), s.push(d[a]);
                  var h = $(
                      "img[usemap=\\#" + t.parent().attr("name") + "]"
                    ).offset(),
                    l =
                      parseInt(h.left, 10) +
                      parseInt(
                        (parseInt(c.sort(f)[0], 10) +
                          parseInt(c.sort(f)[c.length - 1], 10)) /
                          2,
                        10
                      ),
                    u =
                      parseInt(h.top, 10) +
                      parseInt(
                        (parseInt(s.sort(f)[0], 10) +
                          parseInt(s.sort(f)[s.length - 1], 10)) /
                          2,
                        10
                      );
                } else
                  (u = parseInt(t.offset().top, 10)),
                    (l = parseInt(t.offset().left, 10));
                var _ = r ? 0 : parseInt(t.outerWidth(), 10),
                  p = r ? 0 : parseInt(t.outerHeight(), 10),
                  v = n.outerWidth(),
                  m = n.outerHeight(),
                  g = Math.round(l + Math.round((_ - v) / 2)),
                  b = Math.round(u + p + e.offset + 8),
                  w =
                    Math.round(v - 16) / 2 -
                    parseInt(n.css("borderLeftWidth"), 10),
                  H = 0,
                  W =
                    l + _ + v + e.offset + 8 > parseInt($(window).width(), 10),
                  k = v + e.offset + 8 > l,
                  T = m + e.offset + 8 > u - $(window).scrollTop(),
                  x =
                    u + p + m + e.offset + 8 >
                    parseInt($(window).height() + $(window).scrollTop(), 10),
                  y = e.anchor;
                k || ("e" == e.anchor && !W)
                  ? ("w" != e.anchor && "e" != e.anchor) ||
                    ((y = "e"),
                    (H = Math.round(
                      m / 2 - 8 - parseInt(n.css("borderRightWidth"), 10)
                    )),
                    (w = -8 - parseInt(n.css("borderRightWidth"), 10)),
                    (g = l + _ + e.offset + 8),
                    (b = Math.round(u + p / 2 - m / 2)))
                  : (W || ("w" == e.anchor && !k)) &&
                    (("w" != e.anchor && "e" != e.anchor) ||
                      ((y = "w"),
                      (H = Math.round(
                        m / 2 - 8 - parseInt(n.css("borderLeftWidth"), 10)
                      )),
                      (w = v - parseInt(n.css("borderLeftWidth"), 10)),
                      (g = l - v - e.offset - 8),
                      (b = Math.round(u + p / 2 - m / 2)))),
                  x || ("n" == e.anchor && !T)
                    ? ("n" != e.anchor && "s" != e.anchor) ||
                      ((y = "n"),
                      (H = m - parseInt(n.css("borderTopWidth"), 10)),
                      (b = u - (m + e.offset + 8)))
                    : (T || ("s" == e.anchor && !x)) &&
                      (("n" != e.anchor && "s" != e.anchor) ||
                        ((y = "s"),
                        (H = -8 - parseInt(n.css("borderBottomWidth"), 10)),
                        (b = u + p + e.offset + 8))),
                  "n" == e.anchor || "s" == e.anchor
                    ? v / 2 > l
                      ? ((g = g < 0 ? w + g : w), (w = 0))
                      : l + v / 2 > parseInt($(window).width(), 10) &&
                        ((g -= w), (w *= 2))
                    : T
                    ? ((b += H), (H = 0))
                    : x && ((b -= H), (H *= 2)),
                  delay && clearTimeout(delay),
                  (delay = setTimeout(function () {
                    n.css({ "margin-left": g + "px", "margin-top": b + "px" })
                      .stop(!0, !0)
                      .fadeIn(e.fadeIn);
                  }, e.delay)),
                  n.attr("class", "sb-tooltip " + y);
              },
              s = function () {
                ((e.aHide || r) && !e.aHide) ||
                  (delay && clearTimeout(delay),
                  (delay = setTimeout(function () {
                    d();
                  }, e.delay)));
              },
              d = function () {
                (e.aHide || r) && !e.aHide
                  ? setTimeout(function () {
                      s();
                    }, 200)
                  : (n.stop(!0, !0).fadeOut(e.fadeOut),
                    e.hide && e.hide.call(this));
              };
          }
        });
  };

  /*
   * ----------------------------------------------------------
   * # Functions
   * ----------------------------------------------------------
   */

  // Language switcher
  $.fn.sbLanguageSwitcher = function (s = [], a = "", i = !1) {
    let t = `<div class="sb-language-switcher" data-source="${a}">`,
      n = [],
      e = $(this).hasClass("sb-language-switcher-cnt")
        ? $(this)
        : $(this).find(".sb-language-switcher-cnt");
    for (var c = 0; c < s.length; c++)
      n.includes(s[c]) ||
        ((t += `<span ${i == s[c] ? 'class="sb-active" ' : ""}data-language="${
          s[c]
        }"><i class="bi-x-lg"></i><img src="${STMBX_URL}/media/flags/${s[
          c
        ].toLowerCase()}.png" /></span>`),
        n.push(s[c]));
    return (
      e.find(".sb-language-switcher").remove(),
      e.append(
        t +
          `<i data-sb-tooltip="${sb_(
            "Add translation"
          )}" class="bi-plus-lg"></i></div>`
      ),
      e.sbInitTooltips(),
      this
    );
  };

  $.fn.sbShowLightbox = function (popup = false, action = "") {
    // Function to center the lightbox
    function centerLightbox() {
      const $lightbox = $(this);
      const marginTopAdjustment = 25; // Adjusted to 25px
      const marginTop = $lightbox.outerHeight() / -2 - marginTopAdjustment; // Center vertically and adjust upwards
      $lightbox.css({
        "margin-top": marginTop + "px",
        "margin-left": $lightbox.outerWidth() / -2 + "px", // Center horizontally
      });
    }

    // Hide any previously shown lightboxes
    admin.find(".sb-lightbox").sbActive(false);
    // Show overlay
    overlay.sbActive(true);
    // Show the current lightbox
    $(this).sbActive(true);

    // If it's a popup lightbox, add specific classes and attributes
    if (popup) {
      $(this).addClass("sb-popup-lightbox").attr("data-action", action);
    } else {
      // Center the lightbox initially
      centerLightbox.call(this);
      // Bind resize event listener to window to keep the lightbox centered
      $(window).on("resize", function () {
        centerLightbox.call(this);
      });
    }

    // Add a class to the body indicating that a lightbox is active
    $("body").addClass("sb-lightbox-active");

    // Set a timeout to remember the currently opened popup after 300 milliseconds
    setTimeout(() => {
      SBAdmin.open_popup = this;
    }, 300);

    // Prevent the default action (e.g., following a link)
    this.preventDefault;

    // Return the jQuery object
    return this;
  };

  $.fn.sbHideLightbox = function () {
    $(this)
      .find(".sb-lightbox,.sb-popup-lightbox")
      .sbActive(false)
      .removeClass("sb-popup-lightbox")
      .removeAttr("data-action");
    overlay.sbActive(false);
    $("body").removeClass("sb-lightbox-active");
    SBAdmin.open_popup = false;
    return this;
  };

  $.fn.sbInitTooltips = function () {
    return $(this).find("[data-sb-tooltip]").each(function () {
      // Get the position of the element relative to the viewport
      var rect = this.getBoundingClientRect();
      // Check if the element is closer to the top or bottom of the viewport
      var closerToTop = rect.top < window.innerHeight / 2;
  
      // Determine the anchor position based on the element's position
      var anchor = closerToTop ? "s" : "w";
  
      // Initialize the tooltip with the determined anchor position
      $(this).miniTip({
        content: $(this).attr("data-sb-tooltip"),
        anchor: anchor, // Use the determined anchor position
        delay: 100,
      });
    });
  };
  

  // Display the bottom card information box
  function showResponse(text, type = false) {
    var card = admin.find(".sb-info-card");
    if (!type) {
      card.removeClass(
        "sb-info-card-error sb-info-card-warning sb-info-card-info"
      );
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        card.sbActive(false);
      }, 1500);
    } else if (type === "error") {
      card.addClass("sb-info-card-error");
      timeout = setTimeout(() => {
        card.sbActive(false);
      }, 4000);
    } else if (type === "warning") {
      card.addClass("sb-info-card-warning");
      timeout = setTimeout(() => {
        card.sbActive(false);
      }, 3000);
    } else {
      card.addClass("sb-info-card-info");
    }
    card.html(`<h3>${sb_(text)}</h3>`).sbActive(true);
  }

  // Access the global user variable
  function activeUser(value) {
    if (typeof value == ND) {
      return window.sb_current_user;
    } else {
      window.sb_current_user = value;
    }
  }

  // Show alert and information lightbox
  function dialog(
    text,
    type,
    onConfirm = false,
    id = "",
    title = "",
    scroll = false
  ) {
    let box = admin.find(".sb-dialog-box").attr("data-type", type);
    let p = box.find("p");
    box
      .attr("id", id)
      .setClass("sb-scroll-area", scroll)
      .css("height", scroll ? parseInt($(window).height()) - 200 + "px" : "");
    box.find(".sb-title").html(title);
    p.html(
      (type == "alert"
        ? '<strong style="font-size: var(--chat-text-size-1-1);color: var(--chat-text-primary">' +
          sb_("Are you sure?") +
          "</strong> "
        : "") + sb_(text)
    );
    box.sbActive(true).css({
      "margin-top": box.outerHeight() / -2 + "px",
      "margin-left": box.outerWidth() / -2 + "px",
    });
    overlay.sbActive(true);
    alertOnConfirmation = onConfirm;
    setTimeout(() => {
      SBAdmin.open_popup = box;
    }, 500);
  }

  // Loading box
  function loadingGlobal(b = !1, i = !0) {
    admin.find(".sb-loading-global").sbActive(b),
      i && (overlay.sbActive(b), $("body").setClass("sb-lightbox-active", b));
  }

  // Check if an element is loading and set it status to loading
  function loading(element) {
    if ($(element).sbLoading()) return true;
    else $(element).sbLoading(true);
    return false;
  }

  // Routin.bot js translations
  function sb_(text) {
    return SB_TRANSLATIONS && text in SB_TRANSLATIONS
      ? SB_TRANSLATIONS[text]
      : text;
  }

  // PWA functions
  function isPWA() {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    );
  }

  function clearCache() {
    if (typeof caches !== ND) caches.delete("sb-pwa-cache");
  }

  // Collapse
  function collapse(target, max_height) {
    target = $(target);
    let content = target.find("> div, > ul");
    content.css({
      height: "",
      "max-height": "",
    });
    if (
      target.hasClass("sb-collapse") &&
      $(content).prop("scrollHeight") > max_height
    ) {
      target.sbActive(true).attr("data-height", max_height);
      target.find(".bi-chevron-down").remove();
      target.append(
        `<a class="sb-btn-text bi-chevron-down">${sb_("View more")}</a>`
      );
      content.css({
        height: max_height + "px",
        "max-height": max_height + "px",
      });
    }
  }

  // Search
  function searchInput(input, searchFunction) {
    let icon = $(input).parent().find("i");
    let search = $(input).val();
    if (!icon.sbLoading()) {
      SBF.search(search, () => {
        icon.sbLoading(true);
        searchFunction(search, icon);
      });
    }
  }

  function scrollPagination(area, check = false, offset = 0) {
    if (check)
      return (
        $(area).scrollTop() + $(area).innerHeight() >=
        $(area)[0].scrollHeight - 1
      );
    $(area).scrollTop($(area)[0].scrollHeight - offset);
  }
  // Save a browser history state
  function pushState(url_parameters) {
    window.history.pushState("", "", url_parameters);
  }

      // Cloud
      function cloudURL() {
        return SB_ADMIN_SETTINGS.cloud ? ('&cloud=' + SB_ADMIN_SETTINGS.cloud.token) : '';
    }

  // Strip URL
  function urlStrip(url) {
    return url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .replace(/\/$/, "");
  }

  // Editor JS
  function editorJSLoad(data = false) {
    if (editor_js_loading) return;
    if (editor_js === false) {
      editor_js = true;
      $.getScript(STMBX_URL + "/vendor/editorjs.js", () => {
        editorJSLoad(data);
      });
      return;
    }
    editorJSDestroy();
    editor_js_loading = true;
    editor_js = new EditorJS({
      data:
        typeof data === "string"
          ? {
              time: Date.now(),
              blocks: [
                data
                  ? { id: "sb", type: "raw", data: { html: data } }
                  : { id: "sb", type: "paragraph", data: { text: "" } },
              ],
            }
          : data,
      i18n: {
        messages: {
          ui: {
            blockTunes: {
              toggler: {
                "Click to tune": sb_("Click to tune"),
              },
            },
            inlineToolbar: {
              converter: {
                "Convert to": sb_("Convert to"),
              },
            },
            toolbar: {
              toolbox: {
                Add: sb_("Add"),
              },
            },
          },
          toolNames: {
            Text: sb_("Text"),
            Heading: sb_("Heading"),
            List: sb_("List"),
            Image: sb_("Image"),
            Code: sb_("Code"),
            "Raw HTML": sb_("Raw HTML"),
            Bold: sb_("Bold"),
            Italic: sb_("Italic"),
            Link: sb_("Link"),
          },
          tools: {
            list: {
              Ordered: sb_("Ordered"),
              Unordered: sb_("Unordered"),
            },
          },
          blockTunes: {
            delete: {
              Delete: sb_("Delete"),
            },
            moveUp: {
              "Move up": sb_("Move up"),
            },
            moveDown: {
              "Move down": sb_("Move down"),
            },
          },
        },
      },
      tools: {
        list: {
          class: List,
          inlineToolbar: true,
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile(file) {
                let form = new FormData();
                form.append("file", file);
                return new Promise((resolve) => {
                  $.ajax({
                    url: STMBX_URL + "/include/upload.php",
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    type: "POST",
                    success: function (response) {
                      response = JSON.parse(response);
                      if (response[0] == "success") {
                        resolve({
                          success: 1,
                          file: {
                            url: response[1],
                          },
                        });
                      } else console.log(response);
                    },
                  });
                });
              },
            },
          },
        },
        header: Header,
        code: CodeTool,
        raw: RawTool,
      },
      onReady: () => {
        editor_js_loading = false;
      },
      minHeight: 50,
    });
  }

  function editorJSHTML(blocks) {
    let code = "";
    blocks.map((block) => {
      switch (block.type) {
        case "header":
          code += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
        case "paragraph":
          code += `<p>${block.data.text}</p>`;
          break;
        case "image":
          code += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><em>${block.data.caption}</em>`;
          break;
        case "list":
          code += '<ul class="sb-ul-' + block.data.style + '">';
          block.data.items.forEach(function (li) {
            code += `<li>${li}</li>`;
          });
          code += "</ul>";
          break;
        case "code":
          code += `<code>${block.data.code}</code>`;
          break;
        case "raw":
          code += `<div class="bxc-raw-html">${block.data.html}</div>`;
          break;
      }
    });
    return code;
  }

  function editorJSDestroy() {
    if (typeof editor_js.destroy !== ND) {
      editor_js.destroy();
      editor_js = false;
    }
  }
  /*
   * ----------------------------------------------------------
   * # Apps
   * ----------------------------------------------------------
   */

  var SBApps = {
    dialogflow: {
      intents: false,
      token: SBF.storage("dialogflow-token"),
      smart_reply_data: false,

      smartReply: function (message) {
        SBF.ajax(
          {
            function: "dialogflow-smart-reply",
            message: message,
            smart_reply_data: this.smart_reply_data
              ? this.smart_reply_data
              : {
                  conversation_id: SBChat.conversation.id,
                },
            token: this.token,
            dialogflow_language: [
              activeUser().language ? activeUser().language : "en",
            ],
            language_detection:
              SB_ADMIN_SETTINGS["smart-reply-language-detection"] &&
              SBChat.conversation &&
              !SBChat.conversation.getLastUserMessage(false, true) &&
              (!SB_ADMIN_SETTINGS["smart-reply-language-detection-bot"] ||
                !SBChat.conversation.getLastUserMessage(false, "bot")),
          },
          (response) => {
            let suggestions = response["suggestions"];
            let code = "";
            let area = conversations_area.find(".sb-conversation .sb-list");
            let is_bottom =
              area[0].scrollTop === area[0].scrollHeight - area[0].offsetHeight;
            let last_conversation_message =
              SBChat.conversation && SBChat.conversation.getLastMessage()
                ? SBChat.conversation.getLastMessage().message
                : false;
            if (response["token"] && this.token != response["token"]) {
              this.token = response["token"];
              SBF.storage("dialogflow-token", response["token"]);
            }
            for (var i = 0; i < suggestions.length; i++) {
              if (suggestions[i] != last_conversation_message) {
                code += `<span>${suggestions[i]}</span>`;
              }
            }
            this.smart_reply_data = response["smart_reply"];
            suggestions_area.html(code);
            if (is_bottom) SBChat.scrollBottom();
          }
        );
      },

      smartReplyUpdate: function (message, user_type = "agent") {
        SBF.ajax({
          function: "dialogflow-smart-reply-update",
          message: message,
          smart_reply_data: this.smart_reply_data
            ? this.smart_reply_data
            : {
                conversation_id: SBChat.conversation.id,
              },
          token: this.token,
          dialogflow_language: [activeUser().language],
          user_type: user_type,
        });
      },

      showCreateIntentBox: function (message_id) {
        let expression = "";
        let message = SBChat.conversation.getMessage(message_id);
        let response = message.message;
        if (SBF.isAgent(message.get("user_type"))) {
          expression = SBChat.conversation.getLastUserMessage(
            message.get("index")
          );
          if (expression && expression.payload("sb-human-takeover"))
            expression = SBChat.conversation.getLastUserMessage(
              expression.get("index")
            );
          if (expression == false) {
            expression = "";
          } else {
            expression = expression.message;
          }
        } else {
          expression = response;
          let messages = SBChat.conversation.messages;
          for (var i = message.get("index"); i < messages.length; i++) {
            if (["agent", "admin"].includes(messages[i].get("user_type"))) {
              response = messages[i].message;
              break;
            }
          }
        }
        if (this.intents === false) {
          SBF.ajax(
            {
              function: "dialogflow-get-intents",
            },
            (response) => {
              let code = "";
              if (Array.isArray(response)) {
                for (var i = 0; i < response.length; i++) {
                  code += `<option value="${response[i].name}">${response[i].displayName}</option>`;
                }
                dialogflow_intent_box.find("#sb-intents-select").append(code);
                this.intents = response;
              } else this.intents = [];
            }
          );
        }
        dialogflow_intent_box.attr("data-message-id", message.id);
        dialogflow_intent_box.find(".sb-type-text:not(.sb-first)").remove();
        dialogflow_intent_box.find(".sb-type-text input").val(expression);
        dialogflow_intent_box.find("textarea").val(response);
        dialogflow_intent_box.find("#sb-intents-select").val("");
        dialogflow_intent_box
          .find(".sb-search-btn")
          .sbActive(false)
          .find("input")
          .val("");
        this.searchIntents("");
        dialogflow_intent_box.sbShowLightbox();
      },

      submitIntent: function (button) {
        if (loading(button)) return;
        let expressions = [];
        let response = dialogflow_intent_box.find("textarea").val();
        let intent_name = dialogflow_intent_box
          .find("#sb-intents-select")
          .val();
        dialogflow_intent_box.find(".sb-type-text input").each(function () {
          if ($(this).val()) {
            expressions.push($(this).val());
          }
        });
        if ((response == "" && !intent_name) || expressions.length == 0) {
          SBForm.showErrorMessage(
            dialogflow_intent_box,
            "Please insert the bot response and at least one user expression."
          );
          $(button).sbLoading(false);
        } else {
          SBF.ajax(
            {
              function:
                intent_name == ""
                  ? "dialogflow-create-intent"
                  : "dialogflow-update-intent",
              expressions: expressions,
              response: response,
              agent_language: dialogflow_intent_box
                .find(".sb-dialogflow-languages select")
                .val(),
              conversation_id: SBChat.conversation.id,
              intent_name: intent_name,
            },
            (response) => {
              $(button).sbLoading(false);
              if (response === true) {
                admin.sbHideLightbox();
                showResponse(
                  intent_name == "" ? "Intent created" : "Intent updated"
                );
              } else {
                let message = "Error";
                if ("error" in response && "message" in response["error"]) {
                  message = response["error"]["message"];
                }
                SBForm.showErrorMessage(dialogflow_intent_box, message);
              }
            }
          );
        }
      },

      searchIntents: function (search) {
        search = search.toLowerCase();
        SBF.search(search, () => {
          let all = search.length > 1 ? false : true;
          let code = all
            ? `<option value="">${sb_("New Intent")}</option>`
            : "";
          let intents = this.intents;
          for (var i = 0; i < intents.length; i++) {
            let found =
              all || intents[i].displayName.toLowerCase().includes(search);
            if (!found && "trainingPhrases" in intents[i]) {
              let training_phrases = intents[i].trainingPhrases;
              for (var j = 0; j < training_phrases.length; j++) {
                for (var y = 0; y < training_phrases[j].parts.length; y++) {
                  if (
                    training_phrases[j].parts[y].text
                      .toLowerCase()
                      .includes(search)
                  ) {
                    found = true;
                    break;
                  }
                }
                if (found) break;
              }
            }
            if (found) {
              code += `<option value="${intents[i].name}">${intents[i].displayName}</option>`;
            }
          }
          dialogflow_intent_box.find("#sb-intents-select").html(code).change();
        });
      },

      previewIntent: function (name) {
        let code = "";
        for (var i = 0; i < this.intents.length; i++) {
          if (this.intents[i].name == name) {
            let training_phrases =
              "trainingPhrases" in this.intents[i]
                ? this.intents[i].trainingPhrases
                : [];
            let count = training_phrases.length;
            if (count > 1) {
              for (var j = 0; j < count; j++) {
                for (var y = 0; y < training_phrases[j].parts.length; y++) {
                  code += `<span>${training_phrases[j].parts[y].text}</span>`;
                  if (y == 15) break;
                }
              }
              dialog(code, "info", false, "intent-preview-box", "", count > 10);
            }
            break;
          }
        }
      },

      translate: function (strings, language_code, onSuccess) {
        if (strings.length) {
          SBF.ajax(
            {
              function: "google-translate",
              strings: strings,
              language_code: language_code,
              token: this.token,
            },
            (response) => {
              this.token = response[1];
              if (Array.isArray(response[0])) {
                onSuccess(response[0]);
              } else {
                SBF.error(
                  JSON.stringify(response[0]),
                  "SBApps.dialogflow.translate"
                );
                return false;
              }
            }
          );
        }
      },
    },

    messenger: {
      check: function (conversation) {
        return ["fb", "ig"].includes(conversation.get("source"));
      },

      send: function (
        PSID,
        facebook_page_id,
        message = "",
        attachments = [],
        metadata,
        onSuccess = false
      ) {
        SBF.ajax(
          {
            function: "messenger-send-message",
            psid: PSID,
            facebook_page_id: facebook_page_id,
            message: message,
            attachments: attachments,
            metadata: metadata,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },
    },

    whatsmeow: {
      check: function (conversation) {
        return conversation.get("source") == "ww";
      },

      send: function (
        to,
        message = "",
        attachments = [],
        phone_id = false,
        onSuccess = false,
        onError = false
      ) {
        SBF.ajax(
          {
            function: "whatsmeow-send-message",
            to: to,
            message: message,
            attachments: attachments,
            phone_id: phone_id,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },

      activeUserPhone: function (user = activeUser()) {
        return user.getExtra("phone")
          ? user.getExtra("phone").value.replace("+", "")
          : false;
      },
    },


    waweb: {
      check: function (conversation) {
        return conversation.get("source") == "wx";
      },

      send: function (
        to,
        message = "",
        attachments = [],
        phone_id = false,
        onSuccess = false,
        onError = false
      ) {
        SBF.ajax(
          {
            function: "waweb-send-message",
            to: to,
            message: message,
            attachments: attachments,
            phone_id: phone_id,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },

      activeUserPhone: function (user = activeUser()) {
        return user.getExtra("phone")
          ? user.getExtra("phone").value.replace("+", "")
          : false;
      },
    },

    

    whatsapp: {
      check: function (conversation) {
        return conversation.get("source") == "wa";
      },

      send: function (
        to,
        message = "",
        attachments = [],
        phone_id = false,
        onSuccess = false
      ) {
        SBF.ajax(
          {
            function: "whatsapp-send-message",
            to: to,
            message: message,
            attachments: attachments,
            phone_id: phone_id,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },

      activeUserPhone: function (user = activeUser()) {
        return user.getExtra("phone")
          ? user.getExtra("phone").value.replace("+", "")
          : false;
      },
    },

    telegram: {
      check: function (conversation) {
        return conversation.get("source") == "tg";
      },

      send: function (
        chat_id,
        message = "",
        attachments = [],
        onSuccess = false
      ) {
        SBF.ajax(
          {
            function: "telegram-send-message",
            chat_id: chat_id,
            message: message,
            attachments: attachments,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },
    },

    gbm: {
      token: false,

      check: function (conversation) {
        return conversation.get("source") == "bm";
      },

      send: function (
        google_conversation_id,
        message = "",
        attachments = [],
        onSuccess = false
      ) {
        SBF.ajax(
          {
            function: "gbm-send-message",
            google_conversation_id: google_conversation_id,
            message: message,
            attachments: attachments,
            token: this.token,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
            this.token = response[2];
          }
        );
      },
    },

    twitter: {
      check: function (conversation) {
        return conversation.get("source") == "tw";
      },

      send: function (
        twitter_id,
        message = "",
        attachments = [],
        onSuccess = false
      ) {
        SBF.ajax(
          {
            function: "twitter-send-message",
            twitter_id: twitter_id,
            message: message,
            attachments: attachments,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },
    },

    is: function (name) {
      if (typeof SB_VERSIONS == ND) return false;
      switch (name) {
        case "gbm":
        case "twitter":
        case "telegram":
        case "messenger":
        case "whatsapp":
        case "waweb":
        case "whatsmeow":
        case "dialogflow":
        case "sb":
          return true;
      }
      return false;
    },
  };

  /*
   * ----------------------------------------------------------
   * # Settings
   * ----------------------------------------------------------
   */

  var SBSettings = {
    init: false,

    save: function (btn) {
      if (loading(btn)) return;
      let external_settings = {};
      let settings = {};
      let tab = settings_area
        .find(" > .sb-tab > .sb-nav .sb-active")
        .attr("id");
      switch (tab) {
        case "tab-articles":
          this.articles.save((response) => {
            showResponse(
              response === true ? "Articles and categories saved" : response
            );
            $(btn).sbLoading(false);
          });
          break;
        case "tab-automations":
          let active = automations_area_nav.find(".sb-active").attr("data-id");
          SBSettings.automations.save((response) => {
            showResponse(response === true ? "Automations saved" : response);
            SBSettings.automations.populate();
            automations_area_nav.find(`[data-id="${active}"]`).click();
            $(btn).sbLoading(false);
          });
          break;
        case "tab-translations":
          this.translations.updateActive();
          SBF.ajax(
            {
              function: "save-translations",
              translations: JSON.stringify(this.translations.to_update),
            },
            () => {
              showResponse("Translations saved");
              $(btn).sbLoading(false);
            }
          );
          break;
        default:
          settings_area.find(".sb-setting").each((i, element) => {
            let setting = this.get(element);
            let setting_id = $(element).data("setting");
            if (setting[0]) {
              if (typeof setting_id != ND) {
                let originals = false;
                if ($(element).find("[data-language]").length) {
                  let language = $(element).find("[data-language].sb-active");
                  originals =
                    setting[0] in this.translations.originals
                      ? this.translations.originals[setting[0]]
                      : false;
                  this.translations.save(
                    element,
                    language.length ? language.attr("data-language") : false
                  );
                  if (originals) {
                    if (typeof originals != "string") {
                      for (var key in originals) {
                        originals[key] = [originals[key], setting[1][key][1]];
                      }
                    }
                  }
                }
                if (!(setting_id in external_settings))
                  external_settings[setting_id] = {};
                external_settings[setting_id][setting[0]] = [
                  originals ? originals : setting[1],
                  setting[2],
                ];
              } else {
                settings[setting[0]] = [setting[1], setting[2]];
              }
            }
          });
          SBF.ajax(
            {
              function: "save-settings",
              settings: JSON.stringify(settings),
              external_settings: external_settings,
              external_settings_translations: this.translations.translations,
            },
            () => {
              showResponse("Settings saved");
              $(btn).sbLoading(false);
              setTimeout(() => {
                location.reload(); // Reload the page
              }, 600);
            }
          );
          break;
      }
    },

    initPlugins: function () {
      settings_area.find("textarea").each(function () {
        $(this).autoExpandTextarea();
        $(this).manualExpandTextarea();
      });
      settings_area
        .find("[data-setting] .sb-language-switcher-cnt")
        .each(function () {
          $(this).sbLanguageSwitcher(
            SBSettings.translations.getLanguageCodes(
              $(this).closest("[data-setting]").attr("id")
            ),
            "settings"
          );
        });
    },

    initColorPicker: function (area = false) {
      $(area ? area : settings_area)
        .find(".sb-type-color input")
        .colorPicker({
          renderCallback: function (t, toggled) {
            $(t.context)
              .closest(".input")
              .find("input")
              .css("background-color", t.text);
          },
        });
    },

    initHTML: function (response) {
      if ("slack-agents" in response) {
        let code = "";
        for (var key in response["slack-agents"][0]) {
          code += `<div data-id="${key}"><select><option value="${response["slack-agents"][0][key]}"></option></select></div>`;
        }
        settings_area.find("#slack-agents .input").html(code);
      }
    },

    get: function (item) {
      item = $(item);
      let id = item.attr("id");
      let type = item.data("type");
      let value = item.attr("value");
      switch (type) {
        case "upload":
        case "range":
        case "number":
        case "text":
        case "password":
        case "color":
          return [id, item.find("input").val(), type];
        case "textarea":
          return [id, item.find("textarea").val(), type];
        case "select":
          return [id, item.find("select").val(), type];
        case "checkbox":
          return [id, item.find("input").is(":checked"), type];
        case "radio":
          let value = item.find("input:checked").val();
          if (SBF.null(value)) value = "";
          return [id, value, type];
        case "upload-image":
          let url = item.find(".image").attr("data-value");
          if (SBF.null(url)) url = "";
          return [id, url, type];
        case "multi-input":
          let multi_inputs = {};
          item.find(".input > div").each((i, element) => {
            let setting = this.get(element);
            if (setting[0]) {
              multi_inputs[setting[0]] = [setting[1], setting[2]];
            }
          });
          return [id, multi_inputs, type];
        case "select-images":
          return [id, item.find(".input > .sb-active").data("value"), type];
        case "repeater":
          return [
            id,
            this.repeater("get", item.find(".repeater-item"), ""),
            type,
          ];
        case "double-select":
          let selects = {};
          item.find(".input > div").each(function () {
            let value = $(this).find("select").val();
            if (value != -1) {
              selects[$(this).attr("data-id")] = [value];
            }
          });
          return [id, selects, type];
        case "select-checkbox":
          return [
            id,
            item
              .find(".sb-select-checkbox input:checked")
              .map(function () {
                return $(this).attr("id");
              })
              .get(),
            type,
          ];
        case "timetable":
          let times = {};
          item.find(".sb-timetable > [data-day]").each(function () {
            let day = $(this).attr("data-day");
            let hours = [];
            $(this)
              .find("> div > div")
              .each(function () {
                let name = $(this).html();
                let value = $(this).attr("data-value");
                if (SBF.null(value)) {
                  hours.push(["", ""]);
                } else if (value == "closed") {
                  hours.push(["closed", "Closed"]);
                } else {
                  hours.push([value, name]);
                }
              });
            times[day] = hours;
          });
          return [id, times, type];
        case "color-palette":
          return [id, item.attr("data-value"), type];
      }
      return ["", "", ""];
    },

    set: function (id, setting) {
      let type = $(setting)[1];
      let value = $(setting)[0];
      id = `#${id}`;
      switch (type) {
        case "color":
        case "upload":
        case "number":
        case "text":
        case "password":
          settings_area.find(`${id} input`).val(value);
          break;
        case "textarea":
          settings_area.find(`${id} textarea`).val(value);
          break;
        case "select":
          settings_area.find(`${id} select`).val(value);
          break;
        case "checkbox":
          settings_area
            .find(`${id} input`)
            .prop("checked", value == "false" ? false : value);
          break;
        case "radio":
          settings_area
            .find(`${id} input[value="${value}"]`)
            .prop("checked", true);
          break;
        case "upload-image":
          if (value) {
            settings_area
              .find(id + " .image")
              .attr("data-value", value)
              .css("background-image", `url("${value}")`);
          }
          break;
        case "multi-input":
          for (var key in value) {
            this.set(key, value[key]);
          }
          break;
        case "range":
          let range_value = value;
          settings_area.find(id + " input").val(range_value);
          settings_area.find(id + " .range-value").html(range_value);
          break;
        case "select-images":
          settings_area.find(id + " .input > div").sbActive(false);
          settings_area
            .find(id + ` .input > [data-value="${value}"]`)
            .sbActive(true);
          break;
        case "select-checkbox":
          for (var i = 0; i < value.length; i++) {
            settings_area.find(`input[id="${value[i]}"]`).prop("checked", true);
          }
          settings_area
            .find(id + " .sb-select-checkbox-input")
            .val(value.join(", "));
          break;
        case "repeater":
          let content = this.repeater(
            "set",
            value,
            settings_area.find(id + " .repeater-item:last-child")
          );
          if (content) {
            settings_area.find(id + " .sb-repeater").html(content);
          }
          break;
        case "double-select":
          for (var key in value) {
            settings_area
              .find(`${id} .input > [data-id="${key}"] select`)
              .val(value[key]);
          }
          break;
        case "timetable":
          for (var key in value) {
            let hours = settings_area.find(
              `${id} [data-day="${key}"] > div > div`
            );
            for (var i = 0; i < hours.length; i++) {
              $(hours[i])
                .attr("data-value", value[key][i][0])
                .html(value[key][i][1]);
            }
          }
          break;
        case "color-palette":
          if (value) {
            settings_area.find(id).attr("data-value", value);
          }
          break;
      }
    },

    repeater: function (action, items, content) {
      content = $(content).html();
      if (action == "set") {
        var html = "";
        if (items.length > 0) {
          $(content).find(".bi-x-lg").remove();
          for (var i = 0; i < items.length; i++) {
            let item = $($.parseHTML(`<div>${content}</div>`));
            for (var key in items[i]) {
              this.setInput(item.find(`[data-id="${key}"]`), items[i][key]);
            }
            html += `<div class="repeater-item">${item.html()}<i class="bi-x-lg"></i></div>`;
          }
        }
        return html;
      }
      if (action == "get") {
        let items_array = [];
        let me = this;
        $(items).each(function () {
          let item = {};
          let empty = true;
          $(this)
            .find("[data-id]")
            .each(function () {
              let value = me.getInput(this);
              if (
                empty &&
                value &&
                $(this).attr("type") != "hidden" &&
                $(this).attr("data-type") != "auto-id"
              ) {
                empty = false;
              }
              item[$(this).attr("data-id")] = value;
            });
          if (!empty) {
            items_array.push(item);
          }
        });
        return items_array;
      }
    },

    repeaterAdd: function (item) {
      let parent = $(item).parent();
      item = $(
        $.parseHTML(
          `<div>${parent.find(".repeater-item:last-child").html()}</div>`
        )
      );
      item.find("[data-id]").each(function () {
        SBSettings.resetInput(this);
        if ($(this).data("type") == "auto-id") {
          let larger = 1;
          parent.find('[data-type="auto-id"]').each(function () {
            let index = parseInt($(this).val());
            if (index > larger) {
              larger = index;
            }
          });
          $(this).attr("value", larger + 1);
        }
      });
      parent
        .find(".sb-repeater")
        .append(`<div class="repeater-item">${item.html()}</div>`);
    },

    repeaterDelete: function (item) {
      let parent = $(item).parent();
      if (parent.parent().find(".repeater-item").length > 1) {
        parent.remove();
      } else {
        parent.find("[data-id]").each((e, element) => {
          this.resetInput(element);
        });
      }
    },

    setInput: function (input, value) {
      value = $.trim(value);
      input = $(input);
      if (input.is("select")) {
        input.find(`option[value="${value}"]`).attr("selected", "");
      } else {
        if (input.is(":checkbox") && value && value != "false") {
          input.attr("checked", "");
        } else {
          if (input.is("textarea")) {
            input.html(value);
          } else {
            let div = input.is("div");
            if (div || input.is("i") || input.is("li")) {
              input.attr("data-value", value);
              if (div && input.hasClass("image")) {
                input.css("background-image", value ? `url("${value}")` : "");
              }
            } else {
              input.attr("value", value);
            }
          }
        }
      }
    },

    getInput: function (input) {
      input = $(input);
      if (input.is(":checkbox")) {
        return input.is(":checked");
      } else {
        if (input.is("div") || input.is("i") || input.is("li")) {
          let value = input.attr("data-value");
          return SBF.null(value) ? "" : value;
        } else {
          return input.val();
        }
      }
      return "";
    },

    resetInput: function (input) {
      input = $(input);
      if (input.is("select")) {
        input.val("").find("[selected]").removeAttr("selected");
      } else {
        if (input.is("checkbox") && value) {
          input.removeAttr("checked").prop("checked", false);
        } else {
          if (input.is("textarea")) {
            input.html("");
          } else {
            input
              .removeAttr("value")
              .removeAttr("style")
              .removeAttr("data-value")
              .val("");
          }
        }
      }
    },

    getSettingObject: function (setting) {
      return $(setting)[0].hasAttribute("data-setting")
        ? $(setting)
        : $(setting).closest("[data-setting]");
    },

    articles: {
      categories: [],
      articles: [],
      translations: {},

      get: function (onSuccess, categories = false, full = true) {
        SBF.ajax(
          {
            function: "get-articles",
            categories: categories,
            articles_language: "all",
            full: full,
          },
          (response) => {
            onSuccess(response);
          }
        );
      },

      save: function (onSuccess = false) {
        this.updateActiveArticle();
        if (editor_js) {
          if (editor_js_saving) {
            editor_js_saving = false;
          } else if (this.activeID() && this.activeID() != -1) {
            editor_js_saving = onSuccess;
            return;
          }
        }
        articles_area.find(".sb-new-category-cnt input").each((i, element) => {
          let value = $.trim($(element).val());
          if (value)
            this.categories.push({
              id: SBF.random(),
              title: value,
            });
          $(element).parents().eq(1).remove();
        });
        if (this.categories.length) {
          this.categories.sort(function (a, b) {
            return a.title.localeCompare(b.title);
          });
        }
        SBF.ajax(
          {
            function: "save-articles",
            articles: this.articles,
            translations: this.translations,
            categories: this.categories.length ? this.categories : "delete_all",
          },
          (response) => {
            articles_area.find(".sb-menu-wide .sb-active").click();
            articles_area
              .find(`.sb-nav [data-id="${this.activeID()}"]`)
              .click();
            this.updateSelect();
            if (onSuccess) onSuccess(response);
          }
        );
        if (SBApps.is("dialogflow"))
          SBF.ajax({
            function: "dialogflow-knowledge",
            articles: this.articles,
          });
      },

      show: function (article_id = false, element = false, language = false) {
        let contents = [-1, "", "", "", ""];
        this.updateActiveArticle();
        this.hide(false);
        let articles = language
          ? language in this.translations
            ? this.translations[language]
            : []
          : this.articles;
        if (article_id === false) article_id = this.activeID();
        for (var i = 0; i < articles.length; i++) {
          if (articles[i]["id"] == article_id) {
            contents = [
              article_id,
              articles[i]["title"],
              articles[i]["content"],
              articles[i]["link"],
              SBF.null(articles[i]["categories"])
                ? [""]
                : articles[i]["categories"],
              SBF.null(articles[i]["parent_category"])
                ? ""
                : articles[i]["parent_category"],
              articles[i]["editor_js"],
            ];
            if (element) {
              $(element).siblings().sbActive(false);
              $(element).sbActive(true);
            }
            break;
          }
        }
        articles_category_selects.val("");
        articles_category_parent_select.val(contents[5]);
        for (var i = 0; i < contents[4].length; i++) {
          articles_category_selects.eq(i).val(contents[4][i]);
        }
        articles_area.sbLanguageSwitcher(
          this.getTranslations(article_id),
          "articles",
          language
        );
        articles_area.find(".sb-content").attr("data-id", contents[0]);
        articles_area.find(".sb-article-title input").val(contents[1]);
        articles_area.find(".sb-article-link input").val(contents[3]);
        articles_area
          .find("#sb-article-id")
          .html(`ID <span>${contents[0]}</span>`);
        if (editor_js || articles_area.find("#editorjs").length) {
          editorJSLoad(contents[6] ? contents[6] : contents[2]);
        } else {
          articles_area.find(".sb-article-content textarea").val(contents[2]);
        }
      },

      add: function () {
        let nav = articles_area.find(".sb-nav > ul");
        let id = SBF.random();
        this.updateActiveArticle();
        this.articles.push({
          id: id,
          title: "",
          content: "",
          link: "",
          categories: [],
        });
        this.hide(false);
        nav.find(".sb-active").sbActive(false);
        nav.find(".sb-no-results").remove();
        nav.append(
          `<li class="sb-active" data-id="${id}">${sb_("Article")} ${
            nav.find("li").length + 1
          }<i class="bi-trash"></i></li>`
        );
        articles_area.find("input, textarea, select").val("");
        articles_area.find(".sb-content").attr("data-id", id);
        articles_area.sbLanguageSwitcher([], "articles");
        editorJSLoad();
      },

      addCategory: function () {
        articles_area.find('[data-type="categories"] .sb-no-results').remove();
        articles_area
          .find(".sb-new-category-cnt")
          .append(
            '<div class="sb-input-setting sb-type-text"><div><input type="text"></div></div>'
          );
      },

      delete: function (element, category = false) {
        let nav = $(element).closest(".sb-nav").find(" > ul");
        let item = $(element).parent();
        let article_id = item.attr("data-id");
        this[category ? "categories" : "articles"].splice(item.index(), 1);
        this.hide();
        if (nav.find("li").length > 1) {
          $(element).parent().remove();
        } else {
          nav.html(
            `<li class="sb-no-results">${sb_("No results found.")}</li>`
          );
        }
        for (var key in this.translations) {
          for (var i = 0; i < this.translations[key].length; i++) {
            if (this.translations[key][i].id === article_id)
              this.translations[key].splice(i, 1);
          }
        }
        if (!category) {
          editorJSDestroy();
        }
      },

      populate: function (items = false, category = false) {
        if (items === false) items = category ? this.categories : this.articles;
        if (Array.isArray(items)) {
          let code = "";
          if (category) {
            this.categories = items;
          } else {
            this.articles = items;
          }
          if (items.length) {
            for (var i = 0; i < items.length; i++) {
              code += `<li data-id="${items[i]["id"]}">${
                category ? "<span>" + items[i]["id"] + "</span>" : ""
              }${items[i]["title"]}<i class="bi-trash${
                category ? " sb-category" : ""
              }"></i></li>`;
            }
          } else {
            code = `<li class="sb-no-results">${sb_("No results found.")}</li>`;
          }
          articles_area
            .find(".sb-add-category,.sb-new-category-cnt")
            .sbActive(category);
          articles_area.find(".sb-add-article").sbActive(!category);
          articles_area
            .find(".sb-nav")
            .attr("data-type", category ? "categories" : "articles");
          articles_area.find(".sb-nav > ul").html(code);
          this.hide();
        } else {
          SBF.error(items, "SBSettings.articles.populate");
        }
      },

      updateActiveArticle: function () {
        let id = this.activeID();
        if (id != -1) {
          let language = articles_area
            .find(`.sb-language-switcher [data-language].sb-active`)
            .attr("data-language");
          let articles = language
            ? language in this.translations
              ? this.translations[language]
              : []
            : this.articles;
          let categories = [];
          articles_category_selects.each(function () {
            if ($(this).val()) categories.push($(this).val());
          });
          for (var i = 0; i < articles.length; i++) {
            if (articles[i]["id"] == id) {
              article = {
                id: id,
                title: articles_area.find(".sb-article-title input").val(),
                content: articles_area
                  .find(".sb-article-content textarea")
                  .val(),
                link: articles_area.find(".sb-article-link input").val(),
                categories: categories,
                parent_category: articles_category_parent_select.val(),
              };
              if (editor_js && typeof editor_js.save !== ND) {
                editor_js
                  .save()
                  .then((outputData) => {
                    article.editor_js = outputData;
                    article.content = editorJSHTML(outputData.blocks);
                    articles[i] = article;
                    if (editor_js_saving) {
                      this.save(editor_js_saving);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } else {
                articles[i] = article;
              }
              if (SBF.null(article.title))
                this.delete(articles_area.find(`.sb-nav [data-id="${id}"] i`));
              break;
            }
          }
        }
      },

      updateSelect: function () {
        let select_values = [];
        let select_parent_value = articles_category_parent_select.val();
        let code = '<option value=""></option>';
        articles_category_selects.each(function () {
          select_values.push($(this).val());
        });
        for (var i = 0; i < this.categories.length; i++) {
          code += `<option value="${this.categories[i]["id"]}">${this.categories[i]["title"]}</option>`;
        }
        articles_category_selects.html(code);
        articles_category_parent_select.html(code);
        articles_category_parent_select.val(select_parent_value);
        for (var i = 0; i < select_values.length; i++) {
          articles_category_selects.eq(i).val(select_values[i]);
        }
      },

      addTranslation: function (article_id = false, language) {
        if (article_id === false) article_id = this.activeID();
        if (this.getTranslations(article_id).includes(article_id)) {
          return console.warn("Article translation already in array.");
        }
        if (!(language in this.translations)) this.translations[language] = [];
        this.translations[language].push({
          id: article_id,
          title: "",
          content: "",
          link: "",
          categories: [],
        });
      },

      getTranslations: function (article_id = false) {
        let translations = [];
        if (article_id === false) article_id = this.activeID();
        for (var key in this.translations) {
          let articles = this.translations[key];
          for (var i = 0; i < articles.length; i++) {
            if (articles[i]["id"] == article_id) {
              translations.push(key);
              break;
            }
          }
        }
        return translations;
      },

      deleteTranslation: function (article_id = false, language) {
        if (article_id === false) article_id = this.activeID();
        if (language in this.translations) {
          let articles = this.translations[language];
          for (var i = 0; i < articles.length; i++) {
            if (articles[i]["id"] == article_id) {
              this.translations[language].splice(i, 1);
              return true;
            }
          }
        }
        return false;
      },

      activeID: function () {
        return articles_area.find(".sb-content").attr("data-id");
      },

      hide: function (hide = true) {
        articles_area.find(".sb-content").setClass("sb-hide", hide);
      },
    },

    automations: {
      items: {
        messages: [],
        emails: [],
        sms: [],
        popups: [],
        design: [],
        more: [],
      },
      translations: {},
      conditions: {
        datetime: [
          "Date time",
          ["Is between", "Is exactly"],
          "dd/mm/yyy hh:mm - dd/mm/yyy hh:mm",
        ],
        repeat: [
          "Repeat",
          ["Every day", "Every week", "Every month", "Every year"],
        ],
        browsing_time: ["Browsing time", [], "seconds"],
        scroll_position: ["Scroll position", [], "px"],
        include_urls: [
          "Include URLs",
          ["Contains", "Does not contain", "Is exactly", "Is not"],
          "URLs parts separated by commas",
        ],
        exclude_urls: [
          "Exclude URLs",
          ["Contains", "Does not contain", "Is exactly", "Is not"],
          "URLs parts separated by commas",
        ],
        referring: [
          "Referring URLs",
          ["Contains", "Does not contain", "Is exactly", "Is not"],
          "URLs parts separated by commas",
        ],
        user_type: [
          "User type",
          [
            "Is visitor",
            "Is lead",
            "Is user",
            "Is not visitor",
            "Is not lead",
            "Is not user",
          ],
        ],
        returning_visitor: [
          "Returning visitor",
          ["First time visitor", "Returning visitor"],
        ],
        countries: ["Countries", [], "Country codes separated by commas"],
        languages: ["Languages", [], "Language codes separated by commas"],
        cities: ["Cities", [], "Cities separated by commas"],
        custom_variable: ["Custom variable", [], "variable=value"],
      },

      get: function (onSuccess) {
        SBF.ajax(
          {
            function: "automations-get",
          },
          (response) => {
            this.items = response[0];
            this.translations =
              Array.isArray(response[1]) && !response[1].length
                ? {}
                : response[1];
            onSuccess(response);
          }
        );
      },

      save: function (onSuccess = false) {
        this.updateActiveItem();
        SBF.ajax(
          {
            function: "automations-save",
            automations: this.items,
            translations: this.translations,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
          }
        );
      },

      show: function (id = false, language = false) {
        this.updateActiveItem();
        let items = language
          ? language in this.translations
            ? this.translations[language]
            : []
          : this.items;
        let area = automations_area.find(" > .sb-tab > .sb-content");
        if (id === false) id = this.activeID();
        this.hide(false);
        for (var key in items) {
          for (var i = 0; i < items[key].length; i++) {
            let item = items[key][i];
            let conditions = item["conditions"];
            if (item["id"] == id) {
              conditions_area.html("");
              for (var key in item) {
                let element = area.find(`[data-id="${key}"]`);
                if (element.hasClass("image")) {
                  element
                    .css("background-image", `url(${item[key]})`)
                    .attr("data-value", item[key]);
                  if (item[key] == "") element.removeAttr("data-value");
                } else if (element.attr("type") == "checkbox") {
                  element.prop("checked", item[key]);
                } else element.val(item[key]);
              }
              if (conditions) {
                for (var key in conditions) {
                  this.addCondition();
                  let condition = conditions_area.find(" > div:last-child");
                  condition.find("select").val(conditions[key][0]);
                  this.updateCondition(condition.find("select"));
                  condition
                    .find(" > div")
                    .eq(1)
                    .find("select,input")
                    .val(conditions[key][1]);
                  if (conditions[key].length > 2) {
                    condition
                      .find(" > div")
                      .eq(2)
                      .find("input")
                      .val(conditions[key][2]);
                  }
                }
              }
              conditions_area.parent().setClass("sb-hide", language);
              area.sbLanguageSwitcher(
                this.getTranslations(id),
                "automations",
                language
              );
              return true;
            }
          }
        }
        return false;
      },

      add: function () {
        let id = SBF.random();
        let name = `${sb_("Item")} ${
          automations_area_nav.find("li:not(.sb-no-results)").length + 1
        }`;
        this.updateActiveItem();
        this.items[this.activeType()].push(
          this.itemArray(this.activeType(), id, name)
        );
        this.hide(false);
        automations_area_nav.find(".sb-active").sbActive(false);
        automations_area_nav.find(".sb-no-results").remove();
        automations_area_nav.append(
          `<li class="sb-active" data-id="${id}">${name}<i class="bi-trash"></i></li>`
        );
        automations_area
          .find(".sb-automation-values")
          .find("input, textarea")
          .val("");
        automations_area.sbLanguageSwitcher([], "automations");
        conditions_area.html("");
      },

      delete: function (element) {
        this.items[this.activeType()].splice($(element).parent().index(), 1);
        $(element).parent().remove();
        // console.log("delte")
        this.hide();
        if (this.items[this.activeType()].length == 0)
          automations_area_nav.html(
            `<li class="sb-no-results">${sb_("No results found.")}</li>`
          );
      },

      populate: function (type = false) {
        if (type === false) type = this.activeType();
        let code = "";
        let items = this.items[type];
        this.updateActiveItem();
        if (items.length) {
          for (var i = 0; i < items.length; i++) {
            code += `<li data-id="${items[i]["id"]}">${items[i]["name"]}<i class="bi-trash"></i></li>`;
          }
        } else {
          code = `<li class="sb-no-results">${sb_("No results found.")}</li>`;
        }
        automations_area_nav.html(code);
        code = "";
        switch (type) {
          case "emails":
            code = `<h2>${sb_(
              "Subject"
            )}</h2><div class="sb-input-setting sb-type-text"><div><input data-id="subject" type="text"></div></div>`;
            break;
          case "popups":
            code = `<h2>${sb_(
              "Title"
            )}</h2><div class="sb-input-setting sb-type-text"><div><input data-id="title" type="text"></div></div><h2>${sb_(
              "Profile image"
            )}</h2><div data-type="upload-image" class="sb-input-setting sb-type-upload-image"><div class="input"><div data-id="profile_image" class="image"><i class="bi-x-lg"></i></div></div></div><h2>${sb_(
              "Message fallback"
            )}</h2><div class="sb-input-setting sb-type-checkbox"><div><input data-id="fallback" type="checkbox"></div></div>`;
            break;
          case "design":
            code = `<h2>${sb_(
              "Header title"
            )}</h2><div class="sb-input-setting sb-type-text"><div><input data-id="title" type="text"></div></div>`;
            for (var i = 1; i < 4; i++) {
              code += `<h2>${sb_(
                (i == 1 ? "Primary" : i == 2 ? "Secondary" : "Tertiary") +
                  " color"
              )}</h2><div data-type="color" class="sb-input-setting sb-type-color"><div class="input"><input data-id="color_${i}" type="text"><i class="sb-close bi-x-lg"></i></div></div>`;
            }
            for (var i = 1; i < 4; i++) {
              code += `<h2>${sb_(
                i == 1
                  ? "Header background image"
                  : i == 2
                  ? "Header brand image"
                  : "Chat button icon"
              )}</h2><div data-type="upload-image" class="sb-input-setting sb-type-upload-image"><div class="input"><div data-id="${
                i == 1 ? "background" : i == 2 ? "brand" : "icon"
              }" class="image"><i class="bi-x-lg"></i></div></div></div>`;
            }
            break;
          case "more":
            code = `<h2>${sb_(
              "Department ID"
            )}</h2><div class="sb-input-setting sb-type-number"><div><input data-id="department" type="number"></div></div><h2>${sb_(
              "Agent ID"
            )}</h2><div class="sb-input-setting sb-type-number"><div><input data-id="agent" type="number"></div></div><h2>${sb_(
              "Tags"
            )}</h2><div class="sb-input-setting sb-type-text"><div><input data-id="tags" type="text"></div></div>`;
            break;
        }
        automations_area.find(".sb-automation-extra").html(code);
        automations_area.attr("data-automation-type", type);
        SBSettings.initColorPicker(automations_area);
        this.hide();
      },

      updateActiveItem: function () {
        let id = this.activeID();
        if (id) {
          let language = automations_area
            .find(`.sb-language-switcher [data-language].sb-active`)
            .attr("data-language");
          let type = this.activeType();
          let items = language
            ? language in this.translations
              ? this.translations[language][type]
              : []
            : this.items[type];
          let conditions = conditions_area.find(" > div");
          for (var i = 0; i < items.length; i++) {
            if (items[i]["id"] == id) {
              items[i] = {
                id: id,
                conditions: [],
              };
              automations_area
                .find(".sb-automation-values")
                .find('input,textarea,[data-type="upload-image"] .image')
                .each(function () {
                  items[i][$(this).attr("data-id")] =
                    $(this).hasClass("image") &&
                    $(this)[0].hasAttribute("data-value")
                      ? $(this).attr("data-value")
                      : $(this).attr("type") == "checkbox"
                      ? $(this).is(":checked")
                      : $(this).val();
                });
              conditions.each(function () {
                let condition = [];
                $(this)
                  .find("input,select")
                  .each(function () {
                    condition.push($(this).val());
                  });
                if (
                  condition[0] &&
                  condition[1] &&
                  (condition.length == 2 || condition[2])
                ) {
                  items[i]["conditions"].push(condition);
                }
              });
              if (SBF.null(items[i].name)) {
                this.delete(automations_area_nav.find(`[data-id="${id}"] i`));
              }
              break;
            }
          }
        }
      },

      addCondition: function () {
        conditions_area.append(
          `<div><div class="sb-input-setting sb-type-select sb-condition-1"><select>${this.getAvailableConditions()}</select></div></div>`
        );
      },

      updateCondition: function (element) {
        $(element).parent().siblings().remove();
        let parent = $(element).parents().eq(1);
        if ($(element).val()) {
          let condition = this.conditions[$(element).val()];
          let code = "";
          if (condition[1].length) {
            code =
              '<div class="sb-input-setting sb-type-select sb-condition-2"><select>';
            for (var i = 0; i < condition[1].length; i++) {
              code += `<option value="${SBF.stringToSlug(
                condition[1][i]
              )}">${sb_(condition[1][i])}</option>`;
            }
            code += "</select></div>";
          }
          parent.append(
            code +
              (condition.length > 2
                ? `<div class="sb-input-setting sb-type-text"><input placeholder="${sb_(
                    condition[2]
                  )}" type="text"></div>`
                : "")
          );
          parent
            .siblings()
            .find(".sb-condition-1 select")
            .each(function () {
              let value = $(this).val();
              $(this).html(
                SBSettings.automations.getAvailableConditions(value)
              );
              $(this).val(value);
            });
        } else {
          parent.remove();
        }
      },

      getAvailableConditions: function (include = "") {
        let code = '<option value=""></option>';
        let existing_conditions = [];
        conditions_area.find(".sb-condition-1 select").each(function () {
          existing_conditions.push($(this).val());
        });
        for (var key in this.conditions) {
          if (!existing_conditions.includes(key) || key == include) {
            code += `<option value="${key}">${sb_(
              this.conditions[key][0]
            )}</option>`;
          }
        }
        return code;
      },

      addTranslation: function (id = false, type = false, language) {
        if (id === false) id = this.activeID();
        if (type === false) type = this.activeType();
        if (this.getTranslations(id).includes(id)) {
          return console.warn("Automation translation already in array.");
        }
        if (!(language in this.translations))
          this.translations[language] = {
            messages: [],
            emails: [],
            sms: [],
            popups: [],
            design: [],
          };
        if (!(type in this.translations[language]))
          this.translations[language][type] = [];
        this.translations[language][type].push(this.itemArray(type, id));
      },

      getTranslations: function (id = false) {
        let translations = [];
        if (id === false) id = this.activeID();
        for (var key in this.translations) {
          let types = this.translations[key];
          for (var key2 in types) {
            let items = types[key2];
            for (var i = 0; i < items.length; i++) {
              if (items[i]["id"] == id) {
                translations.push(key);
                break;
              }
            }
          }
        }
        return translations;
      },

      deleteTranslation: function (id = false, language) {
        if (id === false) id = this.activeID();
        if (language in this.translations) {
          let types = this.translations[language];
          for (var key in types) {
            let items = types[key];
            for (var i = 0; i < items.length; i++) {
              if (items[i]["id"] == id) {
                this.translations[language][key].splice(i, 1);
                return true;
              }
            }
          }
        }
        return false;
      },

      activeID: function () {
        let item = automations_area_nav.find(".sb-active");
        return item.length ? item.attr("data-id") : false;
      },

      activeType: function () {
        return automations_area_select.find("li.sb-active").data("value");
      },

      itemArray: function (type, id, name = "", message = "") {
        return $.extend(
          {
            id: id,
            name: name,
            message: message,
          },
          type == "emails"
            ? {
                subject: "",
              }
            : type == "popups"
            ? {
                title: "",
                profile_image: "",
              }
            : type == "design"
            ? {
                title: "",
                color_1: "",
                color_2: "",
                color_3: "",
                background: "",
                brand: "",
                icon: "",
              }
            : {}
        );
      },

      hide: function (hide = true) {
        automations_area
          .find(" > .sb-tab > .sb-content")
          .setClass("sb-hide", hide);
      },
    },

    translations: {
      translations: {},
      originals: {},
      to_update: {},

      add: function (language) {
        let setting = SBSettings.getSettingObject(language_switcher_target);
        let setting_id = setting.attr("id");
        let active_language = language_switcher_target.find(
          "[data-language].sb-active"
        );
        this.save(
          setting,
          active_language.length ? active_language.attr("data-language") : false
        );
        setting.find('textarea,input[type="text"]').val("");
        this.save(setting, language);
        language_switcher_target.remove();
        setting.sbLanguageSwitcher(
          this.getLanguageCodes(setting_id),
          "settings",
          language
        );
      },

      delete: function (setting, language) {
        setting = SBSettings.getSettingObject(setting);
        let setting_id = setting.attr("id");
        delete this.translations[language][setting_id];
        setting
          .find(`.sb-language-switcher [data-language="${language}"]`)
          .remove();
        this.activate(setting);
      },

      activate: function (setting, language = false) {
        setting = SBSettings.getSettingObject(setting);
        let setting_id = setting.attr("id");
        let values = language
          ? this.translations[language][setting_id]
          : this.originals[setting_id];
        if (typeof values == "string") {
          setting.find("input, textarea").val(values);
        } else {
          for (var key in values) {
            setting
              .find("#" + key)
              .find("input, textarea")
              .val(
                typeof values[key] == "string" ? values[key] : values[key][0]
              );
          }
        }
      },

      updateActive: function () {
        let area = settings_area.find(".sb-translations-list");
        let translations = {
          front: {},
          admin: {},
          "admin/js": {},
          "admin/settings": {},
        };
        let language_code = area.attr("data-value");
        if (SBF.null(language_code)) return;
        for (var key in translations) {
          area
            .find(
              ' > [data-area="' +
                key +
                '"] .sb-input-setting:not(.sb-new-translation)'
            )
            .each(function () {
              translations[key][$(this).find("label").html()] = $(this)
                .find("input")
                .val();
            });
          area
            .find('> [data-area="' + key + '"] .sb-new-translation')
            .each(function () {
              let original = $(this).find("input:first-child").val();
              let value = $(this).find("input:last-child").val();
              if (original && value) {
                translations[key][original] = value;
              }
            });
        }
        this.to_update[language_code] = translations;
      },

      save: function (setting, language = false) {
        setting = SBSettings.getSettingObject(setting);
        let values = {};
        let setting_id = $(setting).attr("id");
        if (setting.data("type") == "multi-input") {
          setting
            .find(".multi-input-textarea,.multi-input-text")
            .each(function () {
              values[$(this).attr("id")] = $(this)
                .find("input, textarea")
                .val();
            });
        } else {
          values = setting.find("input, textarea").val();
        }
        if (language) {
          if (!(language in this.translations)) {
            this.translations[language] = {};
          }
          this.translations[language][setting_id] = values;
        } else {
          this.originals[setting_id] = values;
        }
      },

      load: function (language_code) {
        let area = settings_area.find(".sb-translations > .sb-content");
        area.find(" > .sb-hide").removeClass("sb-hide");
        this.updateActive();
        SBF.ajax(
          {
            function: "get-translation",
            language_code: language_code,
          },
          (translations) => {
            if (language_code in this.to_update)
              translations = this.to_update[language_code];
            let code = "";
            let areas = ["front", "admin", "admin/js", "admin/settings"];
            for (var i = 0; i < areas.length; i++) {
              let translations_area = translations[areas[i]];
              code += `<div${!i ? ' class="sb-active"' : ""} data-area="${
                areas[i]
              }">`;
              for (var key in translations_area) {
                code += `<div class="sb-input-setting sb-type-text"><label>${key}</label><div><input type="text" value="${translations_area[key]}"></div></div>`;
              }
              code += "</div>";
            }
            area
              .find(".sb-translations-list")
              .attr("data-value", language_code)
              .html(code);
            area.find(".sb-menu-wide li").sbActive(false).eq(0).sbActive(true);
            area.sbLoading(false);
          }
        );
        area.sbLoading(true);
      },

      getLanguageCodes: function (setting_id) {
        let languages = [];
        for (var key in this.translations) {
          if (setting_id in this.translations[key]) {
            languages.push(key);
          }
        }
        return languages;
      },
    },
  };

  /*
   * ----------------------------------------------------------
   * # Reports
   * ----------------------------------------------------------
   */

  var SBReports = {
    chart: false,
    active_report: false,

    initChart: function (data, type = "line", label_type = 1) {
      let values = [];
      let labels = [];
      let colors = [
        "#0eacb2",
        "#299fb1",
        "#4492b0",
        "#5d86ae",
        "#7379ac",
        "#867cae",
        "#9b70ad",
        "#b06bae",
        "#c465af",
        "#d65fb1",
      ];
      for (var key in data) {
        values.push(data[key][0]);
        labels.push(key);
      }
      if (type != "line" && values.length > 6) {
        for (var i = 0; i < values.length; i++) {
          colors.push(
            "hsl(" +
              210 +
              ", " +
              Math.floor(Math.random() * 100) +
              "%, " +
              Math.floor(Math.random() * 100) +
              "%)"
          );
        }
      }
      if (this.chart) this.chart.destroy();
      this.chart = new Chart(reports_area.find("canvas"), {
        type: type,
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: type == "line" ? "#d4e7e952" : colors,
              borderColor: type == "line" ? "#5c00ff" : colors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  callback: function (tickValue, index, ticks) {
                    return label_type == 1
                      ? tickValue
                      : label_type == 2
                      ? new Date(tickValue * 1000).toISOString().substr(11, 8)
                      : tickValue;
                  },
                  beginAtZero: true,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, chartData) {
                let index = tooltipItem["index"];
                let value = chartData["datasets"][0]["data"][index];
                switch (label_type) {
                  case 1:
                    return value;
                  case 2:
                    return new Date(values[index] * 1000)
                      .toISOString()
                      .substr(11, 8);
                  case 3:
                    return value + "%";
                  case 4:
                    let tds = reports_area
                      .find(".sb-table tbody tr")
                      .eq(index)
                      .find("td");
                    return tds.eq(0).text() + " " + tds.eq(1).text();
                }
              },
            },
            displayColors: false,
          },
        },
      });
    },

    initTable: function (header, data, inverse = false) {
      let code = "<thead><tr>";
      let index = data[Object.keys(data)[0]].length - 1;
      let list = [];
      for (var i = 0; i < header.length; i++) {
        code += `<th>${header[i]}</th>`;
      }
      code += "</tr></thead><tbody>";
      for (var key in data) {
        if (data[key][index] != 0) {
          list.push([key, data[key][index]]);
        }
      }
      if (inverse) {
        list.reverse();
      }
      for (var i = 0; i < list.length; i++) {
        code += `<tr><td><div>${list[i][0]}</div></td><td>${list[i][1]}</td></tr>`;
      }
      code += "</tbody>";
      reports_area.find("table").html(code);
    },

    initReport: function (name = false, date_range = false) {
      let area = reports_area.find(".sb-tab > .sb-content");
      date_range = SBF.null(date_range)
        ? [false, false]
        : date_range.split(" - ");
      area.sbLoading(true);
      if (name) this.active_report = name;
      if (!this.active_report) return;
      this.getData(
        this.active_report,
        date_range[0],
        date_range[1],
        (response) => {
          if (response == false) {
            area.addClass("sb-no-results-active");
          } else {
            area.removeClass("sb-no-results-active");
            if (this.active_report == "status-client") {
              area.addClass("sb-results-active");
              area
                .find("#" + this.active_report)
                .attr("style", "display:block!important");
              area.find(".sb-reports-tags .sb-tags").html("");

              //Status conversation
              clientStatus.forEach((tag) => {
                let tag_key = tag;
                let tagData = response.data.filter(
                  (item) => item.label == tag_key
                );
                let tagList = "";
                tagData.map((item) => {
                  let $agentList = "";
                  response.extra.map((agent) => {
                    if (agent.user_id == item.user_id) {
                      $agentList += `<li class="add-user agent-name-tags">${agent.first_name}</li>`;
                    }
                  });
                  tagList += `<div class="sb-responsive-tags">${item.first_name} ${item.last_name}<section class="flex-agents">${$agentList}</section></div>`;
                });
                let tagsDetailsDiv = $(
                  `<div style="min-width: 180px;max-width: 554px;" class="sb-tags-details sb-hide"></div>`
                );
                if (tagList.trim() !== "") {
                  tagsDetailsDiv.removeClass("sb-hide"); // Remove sb-hide class if there is data
                }
                tagsDetailsDiv.append(`<div>
								<h4 class="title-tags tags-${tag_key}">
									<div>
										<i class="sb-icon bi-crosshair tags-${tag_key}"></i>
									</div>
									<div class="white-title-elements">
										${tag_key.toUpperCase()}(${tagData.length})
									</div>
									<div>
										<div class="arrow-down-tags white-title-elements">
											<i class="bi-check-lg"></i>
										</div>
									</div>
								</h4>
							</div>
							<div style="overflow: scroll;max-height: 420px;">${tagList}</div>`);
                area.find(".sb-reports-tags .sb-tags").append(tagsDetailsDiv);
              });
            } else {
              area.removeClass("sb-results-active");
              area
                .find("#status-client")
                .attr("style", "display:none!important");
            }
            if (response["chart_type"]) {
              this.initChart(
                response["data"],
                response["chart_type"],
                response["label_type"]
              );
              this.initTable(
                response["table"],
                response["data"],
                response["table-inverse"]
              );
            }
            reports_area.find(".sb-reports-title").html(response["title"]);
            reports_area.find(".sb-reports-text").html(response["description"]);
            reports_area.find(".bi-chevron-down").remove();
            if (!responsive)
              collapse(
                reports_area.find(".sb-collapse"),
                reports_area.find("canvas").outerHeight() - 135
              );
          }
          area.sbLoading(false);
        }
      );
    },

    getData: function (name, date_start = false, date_end = false, onSuccess) {
      SBF.ajax(
        {
          function: "reports",
          name: name,
          date_start: date_start,
          date_end: date_end,
        },
        (response) => {
          onSuccess(response);
        }
      );
    },

    initDatePicker: function () {
      let settings = {
        ranges: {},
        applyClass: "reports-datepicker",
        locale: {
          format: "DD/MM/YYYY",
          separator: " - ",
          applyClass: "reports-datepicker",
          applyLabel: sb_("Apply"),
          cancelLabel: sb_("Cancel"),
          fromLabel: sb_("From"),
          toLabel: sb_("To"),
          // 'customRangeLabel': sb_('Custom'),
          weekLabel: sb_("W"),
          daysOfWeek: [
            sb_("Su"),
            sb_("Mo"),
            sb_("Tu"),
            sb_("We"),
            sb_("Th"),
            sb_("Fr"),
            sb_("Sa"),
          ],
          monthNames: [
            sb_("January"),
            sb_("February"),
            sb_("March"),
            sb_("April"),
            sb_("May"),
            sb_("June"),
            sb_("July"),
            sb_("August"),
            sb_("September"),
            sb_("October"),
            sb_("November"),
            sb_("December"),
          ],
          firstDay: 1,
        },
        showCustomRangeLabel: false,
        alwaysShowCalendars: true,
        autoApply: true,
      };

      settings["ranges"][sb_("Today")] = [moment(), moment()];
      settings["ranges"][sb_("Yesterday")] = [
        moment().subtract(1, "days"),
        moment().subtract(1, "days"),
      ];
      settings["ranges"][sb_("Last 3 Days")] = [
        moment().subtract(2, "days"),
        moment(),
      ];
      settings["ranges"][sb_("Last 5 Days")] = [
        moment().subtract(4, "days"),
        moment(),
      ];
      settings["ranges"][sb_("Last 7 Days")] = [
        moment().subtract(6, "days"),
        moment(),
      ];
      settings["ranges"][sb_("Last 15 Days")] = [
        moment().subtract(14, "days"),
        moment(),
      ];
      settings["ranges"][sb_("This Month")] = [
        moment().startOf("month"),
        moment().endOf("month"),
      ];

      // settings['ranges'][sb_('Last Month')] = [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')];
      reports_area.find("#sb-date-picker").daterangepicker(settings).val("");
    },
  };

  /*
   * ----------------------------------------------------------
   * # Users
   * ----------------------------------------------------------
   */

  var SBUsers = {
    real_time: null,
    datetime_last_user: "2000-01-01 00:00:00",
    sorting: ["creation_time", "DESC"],
    user_types: ["visitor", "lead", "user"],
    user_main_fields: [
      "id",
      "first_name",
      "last_name",
      "email",
      "password",
      "profile_image",
      "user_type",
      "creation_time",
      "token",
      "last_activity",
      "department",
    ],
    search_query: "",
    init: false,
    busy: false,
    table_extra: false,
    history: [],

    // Table menu filter
    filter: function (type) {
      if (type == "all") {
        type = ["visitor", "lead", "user"];
      } else if (type == "agent") {
        type = ["agent", "admin"];
      } else {
        type = [type];
      }
      this.user_types = type;
      this.loading();
      users_pagination = 1;
      users_pagination_count = 1;
      let settings =
        type[0] == "online"
          ? ["get-online-users", SB_ACTIVE_AGENT["id"], this.sorting[0]]
          : ["get-users", -1, this.sorting];
      SBF.ajax(
        {
          function: settings[0],
          sorting: settings[2],
          user_types: type,
          search: this.search_query,
          extra: this.table_extra,
        },
        (response) => {
          this.populate(response);
          this.loading(false);
        }
      );
    },

    // Table menu sort
    sort: function (field, direction = "DESC") {
      this.sorting = [field, direction];
      this.loading();
      users_pagination = 1;
      users_pagination_count = 1;
      SBF.ajax(
          {
              function: "get-users",
              sorting: this.sorting,
              user_types: this.user_types,
              search: this.search_query,
              extra: this.table_extra,
          },
          (response) => {
              this.populate(response);
              this.loading(false);
              console.log("Sorting completed successfully:", response); // Add this line to log the response
          }
      );
  },
  
  
  

    // Search users
    search: function (input) {
      searchInput(input, (search, icon) => {
        users_pagination = 1;
        users_pagination_count = 1;
        SBF.ajax(
          {
            function: search.length > 1 ? "search-users" : "get-users",
            search: search,
            user_types: this.user_types,
            sorting: this.sorting,
            extra: this.table_extra,
          },
          (response) => {
            this.user_types = ["lead"];
            this.populate(response);
            this.search_query = search;
            $(icon).sbLoading(false);
            users_table_menu.find("li").sbActive(false).eq(0).sbActive(true);
          }
        );

      });
    },

    // Populate the table
    populate: function (response) {
      let code = "";
      let count = response.length;
      if (count) {
        for (var i = 0; i < count; i++) {
          code += this.getRow(new SBUser(response[i], response[i].extra));
        }
      } else {
        code = `<p class="sb-no-results">${sb_("No users found.")}</p>`;
      }
      users_table.parent().scrollTop(0);
      users_table.find("tbody").html(code);
      if (this.user_types.includes("agent")) {
        SBF.ajax(
          {
            function: "get-online-users",
            agents: true,
          },
          (response) => {
            let ids = [];
            for (var i = 0; i < response.length; i++) {
              ids.push(response[i].id);
            }
            users_table.find("[data-user-id]").each(function () {
              $(this)
                .find(".sb-td-profile")
                .addClass(
                  "sb-" +
                    (ids.includes($(this).attr("data-user-id"))
                      ? "online"
                      : "offline")
                );
            });
          }
        );
      }
    },

    // Update users and table with new users
    update: function () {
      if (!this.busy) {
        let checks = ["user", "visitor", "lead", "agent"];
        let populate =
          checks.includes(this.user_types[0]) && this.search_query == "";
        let filter = users_table_menu.find(".sb-active").data("type");
        if (filter == "online") {
          this.filter(filter);
        } else {
          this.busy = true;
          SBF.ajax(
            {
              function: "get-new-users",
              datetime: this.datetime_last_user,
            },
            (response) => {
              let count = response.length;
              this.busy = false;
              if (count > 0) {
                let code = "";
                for (var i = 0; i < count; i++) {
                  let user = new SBUser(response[i]);
                  // console.log('new', user);
                  users[user.id] = user;
                  this.updateMenu("add", user.type);

                  if (populate) {
                    code += this.getRow(user);
                  }
                }
                if (populate) {
                  users_table.find("tbody").prepend(code);
                  if (checks.includes(filter)) {
                    let selector = "";
                    for (var i = 0; i < checks.length; i++) {
                      selector +=
                        checks[i] == filter
                          ? ""
                          : `[data-user-type="${checks[i]}"],`;
                    }
                    users_table.find(selector.slice(0, -1)).remove();
                  }
                }
                this.datetime_last_user = response[0]["creation_time"];
              }
            }
          );
        }
      }
    },

    // Tagged colors for users section

    getRow: function (user, tag_key) {
      tag_key = tag_key || "";
      if (user instanceof SBUser) {
        let code = "";
        for (var i = 0; i < this.table_extra.length; i++) {
          let slug = this.table_extra[i];
          code += `<td class="sb-td-${slug}">${
            this.user_main_fields.includes(slug)
              ? user.get(slug)
              : user.getExtra(slug)
          }</td>`;
        }
        return `<tr data-user-id="${user.id}" data-user-type="${
          user.type
        }"><td><input type="checkbox" /></td><td class="sb-td-profile"><a class="sb-profile"><img loading="lazy" src="${
          user.image
        }" class="sb-tags tags-${user.details.label}" style="max-width: 27px;max-height: 27px;padding: 2px;border:none;" /><span style="margin:0px 1px">${
          user.name.length > 25 ? user.name.slice(0, 25) + "..." : user.name
        }</span></a></td>${code}<td style="overflow: hidden;max-width: 80px;text-overflow: ellipsis;overflow-wrap: break-word;" class="sb-td-email"class="sb-td-email">${user.get(
          "email"
        )}</td><td class="sb-td-ut">${sb_(
          user.type
        )}</td><td>${SBF.beautifyTime(
          user.get("last_activity"),
          true
        )}</td><td>${SBF.beautifyTime(
          user.get("creation_time"),
          true
        )}</td></tr>`;
      } else {
        SBF.error("User not of type SBUser", "SBUsers.getRow");
        return false;
      }
      // this.update();

    },

  updateRow: function (user) {
  let row = users_table.find(`[data-user-id="${user.id}"]`);
  if (row.length) {
    let menu_active = users_table_menu.find(".sb-active").data("type");
    if (
      menu_active !== user.type &&
      !(user.type === "admin" && menu_active === "agent") &&
      menu_active !== "all"
    ) {
      let counter = admin.find(
        `[data-type="${user.type === "admin" ? "agent" : user.type}"] span`
      );
      let count = parseInt(counter.attr("data-count"));
      counter.html(count + 1).attr("data-count", count + 1);
      row.remove();
    } else {
      let newRow = this.getRow(user); // Get updated row HTML
      row.replaceWith(newRow); // Replace row in table
      this.updateTagsLabel(user); // Update tags label
    }
  } else {
    users_table.find("tbody").append(this.getRow(user));
  }
},

// Update tags label
updateTagsLabel: function(user) {
  // Update tags label class with user's label
  $(`[data-user-id="${user.id}"] .sb-tags`).removeClass().addClass(`sb-tags tags-${user.details.label}`);
},


    // Update users table menu
    updateMenu: function (action = "all", type = false) {
      let user_types = ["all", "user", "agent", "lead", "visitor"];
      if (action == "all") {
        SBF.ajax(
          {
            function: "count-users",
          },
          (response) => {
            for (var i = 0; i < user_types.length; i++) {
              this.updateMenuItem(
                "set",
                user_types[i],
                response[user_types[i]]
              );
            }
          }
        );
      } else {
        this.updateMenuItem(action, type);
      }
    },

    updateMenuItem: function (action = "set", type = false, count = 1) {
      let item = users_table_menu.find(`[data-type="${type}"] span`);
      let user_types = ["user", "lead", "visitor", "agent"]; // Add 'agent' to the user_types array
      if (action !== "set") {
        count =
          parseInt(item.attr("data-count")) + 1 * (action === "add" ? 1 : -1);
      }
      item
        .html(
          `<span style="vertical-align: sub;color: var(--chat-text-primary); font-weight:bold;">(${count})</span>`
        )
        .attr("data-count", count); // Apply style to count within parentheses
      count = 0;
      for (let i = 0; i < user_types.length; i++) {
        count += parseInt(
          users_table_menu
            .find(`[data-type="${user_types[i]}"] span`)
            .attr("data-count")
        );
      }
      users_table_menu
        .find(`[data-type="all"] span`)
        .html(
          `<span style="vertical-align: sub;color: var(--color-red); font-weight:bold;">(${count})</span>`
        )
        .attr("data-count", count); // Apply style to total count within parentheses
    },

    // Delete a user
    delete: function (user_ids) {
      this.loading();
      if (Array.isArray(user_ids)) {
        // if (SB_ADMIN_SETTINGS.cloud) {
        //   user_ids = SBCloud.removeAdminID(user_ids);
        //   if (!user_ids.length) return;
        // }
        SBF.ajax(
          {
            function: "delete-users",
            user_ids: user_ids,
          },
          () => {
            for (var i = 0; i < user_ids.length; i++) {
              delete users[user_ids[i]];
              users_table.find(`[data-user-id="${user_ids[i]}"]`).remove();
              conversations_admin_list_ul
                .find(`[data-user-id="${user_ids[i]}"]`)
                .remove();
            }
            if (users_table.find("[data-user-id]").length == 0) {
              this.filter(users_table_menu.find(".sb-active").data("type"));
            }
            showResponse("Users deleted");
            this.updateMenu();
            this.loading(false);
          }
        );
      } else {
        users[user_ids].delete(() => {
          let conversation = conversations_admin_list_ul.find(
            `[data-user-id="${user_ids}"]`
          );
          if (activeUser().id == user_ids) {
            activeUser(false);
          }
          if (conversation.sbActive()) {
            SBChat.conversation = false;
            setTimeout(() => {
              SBConversations.clickFirst();
            }, 300);
          }
          delete users[user_ids];
          users_table.find(`[data-user-id="${user_ids}"]`).remove();
          // console.log('conversation delete');
          conversation.remove();
          admin.sbHideLightbox();
          showResponse("User deleted");
          this.updateMenu();
          this.loading(false);
        });
      }
    },

    // Start or stop the real time update of the users and table
    startRealTime: function () {
      if (SBPusher.active) return;
      this.stopRealTime();
      this.real_time = setInterval(() => {
        this.update();
      }, 10000); //10 segundos
    },

    stopRealTime: function () {
      clearInterval(this.real_time);
    },

    // Table loading
    loading: function (show = true) {
      let loading = users_area.find(".sb-loading-table");
      if (show) loading.sbActive(true);
      else loading.sbActive(false);
    },

    // CSV generation and download
    csv: function () {
      SBF.ajax(
        {
          function: "csv-users",
        },
        (response) => {
          const csvFile = JSON.parse(response);
          let content = atob(csvFile.file);
          const format = "data:application/octet-stream;base64";
          let blob = new Blob([content], {
            type: format,
          });
          const csv = document.createElement("a");
          csv.href = window.URL.createObjectURL(blob);
          csv.download = csvFile.filename;
          document.body.appendChild(csv);
          csv.click();
          document.body.removeChild(csv);
        }
      );
    },

    // Update user and agent activity status
    updateUsersActivity: function () {
      SBF.updateUsersActivity(
        agent_online ? SB_ACTIVE_AGENT["id"] : -1,
        activeUser() ? activeUser().id : -1,
        function (response) {
          SBUsers.setActiveUserStatus(response == "online");
        }
      );
    },

    // // Set active agent status
    // setActiveAgentStatus: function (online = true) {
    //   agent_online = online;
    //   header
    //     .find('[data-value="status"]')
    //     .html(sb_(online ? "Online" : "Offline"))
    //     .attr("class", online ? "sb-online" : "sb-offline");
    //   if (SBPusher.active) {
    //     if (online) {
    //       SBPusher.presence();
    //     } else {
    //       SBPusher.presenceUnsubscribe();
    //     }
    //   }
    // },

    // Set active agent status (update)
    setActiveAgentStatus: function (online = true) {
      let label = online ? "online" : "offline";
      agent_online = online;
      header
        .find('[data-value="status"]')
        .html(sb_(SBF.slugToString(label)))
        .attr("class", "sb-" + label);
      if (SBPusher.active) {
        if (online) {
          SBPusher.presence();
        } else {
          SBPusher.presenceUnsubscribe();
        }
      }
      if (!SB_ADMIN_SETTINGS.reports_disabled) {
        SBF.ajax({ function: "reports-update", name: label });
      }
    },

    // Set active user status
    setActiveUserStatus: function (online = true) {
      let labels = conversations_area.find(
        ".sb-conversation .sb-top > .sb-labels"
      );
      labels.find(".sb-status-online").remove();
      if (online)
        labels.prepend(
          `<span class="sb-status-online">${sb_("Online")}</span>`
        );
      SBChat.user_online = online;
    },

    // Notification for new online users
    onlineUserNotification: function (member) {
      let notification = SB_ADMIN_SETTINGS["online-users-notification"];
      if (notification) {
        let message = member.info.first_name + " " + member.info.last_name;
        let icon = this.userProfileImage(member.info.profile_image);
        if (
          SB_ADMIN_SETTINGS["push-notifications"] &&
          "id" in member.info &&
          !this.history.includes(member.info.id)
        ) {
          SBF.ajax({
            function: "push-notification",
            title: notification,
            message: message,
            icon: icon,
            interests: SB_ACTIVE_AGENT["id"],
            user_id: member.info.id,
          });
        } else if (SBConversations.desktop_notifications) {
          SBChat.desktopNotification(
            notification,
            message,
            icon,
            false,
            member.info.id
          );
        }
        this.history.push(member.info.id);
      }
    },

    // Get user profile image
    userProfileImage: function (url) {
      return !url || url.indexOf("user.svg")
        ? SB_ADMIN_SETTINGS["notifications-icon"]
        : url;
    },
  };

  /*
   * ----------------------------------------------------------
   * # Conversations
   * ----------------------------------------------------------
   */

  var SBConversations = {
    real_time: null,
    datetime_last_conversation: "2000-01-01 00:00:00",
    user_typing: false,
    desktop_notifications: false,
    flash_notifications: false,
    busy: false,
    is_search: false,
    menu_count_ajax: false,
    chat_tops: [{}],

    // Open the conversations tab
    open: function (conversation_id = -1, user_id) {
      if (conversation_id != -1) {
        this.openConversation(conversation_id, user_id);
      }
      admin.sbHideLightbox();
      header
        .find(".sb-admin-nav a")
        .sbActive(false)
        .parent()
        .find("#sb-conversations")
        .sbActive(true);
      admin.find(" > main > div").sbActive(false);
      conversations_area
        .sbActive(true)
        .find(".sb-board")
        .removeClass("sb-no-conversation");
      this.startRealTime();
    },

    // Open a single conversation
    openConversation: function (
      conversation_id,
      user_id = false,
      scroll = true
    ) {
      if (user_id === false && conversation_id) {
        SBF.ajax(
          {
            function: "get-user-from-conversation",
            conversation_id: conversation_id,
          },
          (response) => {
            if (!SBF.null(response["id"])) {
              this.openConversation(conversation_id, response["id"], scroll);
            } else
              SBF.error("Conversation not found", "SBAdmin.openConversation");
          }
        );
      } else {
        let area = conversations_area.find(".sb-conversation .sb-list");
        let new_user =
          SBF.null(users[user_id]) || !("email" in users[user_id].details);
        let conversation = conversations_area.find(
          `[data-conversation-id="${conversation_id}"]`
        );
        area.html("");
        area.sbLoading(true);
        // Init the user
        if (new_user) {
          activeUser(
            new SBUser({
              id: user_id,
            })
          );
          activeUser().update(() => {
            users[user_id] = activeUser();
            this.updateUserDetails();
          });
        } else {
          activeUser(users[user_id]);
          this.updateCurrentURL();
        }
        // if (SBPusher.active) {
        //   SBPusher.event("client-typing", (response) => {
        //     if (response.user_id == activeUser().id) {
        //       SBConversations.typing(true);
        //       clearTimeout(pusher_timeout);
        //       pusher_timeout = setTimeout(() => {
        //         SBConversations.typing(false);
        //       }, 1000);
        //     }
        //   });
        //   SBPusher.event("new-message", () => {
        //     SBChat.update();

        //   });
        //   SBPusher.event(
        //     "agent-active-conversation-changed",
        //     (response) => {
        //       if (response.previous_conversation_id == conversation_id) {
        //         conversations_area.find(".sb-conversation-busy").remove();
        //       }
        //     },
        //     "agents"
        //   );
        //   SBPusher.event("init", (response) => {
        //     SBConversations.updateCurrentURL(response.current_url);
        //   });
        // }

        // updated
        if (SBPusher.active) {
          SBPusher.event("client-typing", (response) => {
            if (response.user_id == activeUser().id) {
              SBConversations.typing(true);
              clearTimeout(pusher_timeout);
              pusher_timeout = setTimeout(() => {
                SBConversations.typing(false);
              }, 1000);
            }
          });
          SBPusher.event("new-message", () => {
            SBChat.update();
          });
          SBPusher.event(
            "agent-active-conversation-changed",
            (response) => {
              if (response.previous_conversation_id == conversation_id) {
                conversations_area.find(".sb-conversation-busy").remove();
              }
            },
            "agents"
          );
          SBPusher.event("init", (response) => {
            SBConversations.updateCurrentURL(response.current_url);
          });
          SBPusher.event("message-status-update", (response) => {
            if (SBChat.conversation) {
              SBChat.conversation.updateMessagesStatus(response.message_ids);
            }
          });
        }

        if (SB_ADMIN_SETTINGS["smart-reply"]) suggestions_area.html("");

        // Open the conversation

        conversations_admin_list_ul.find("li").sbActive(false);
        conversation.sbActive(true);
        if (conversation_id != -1) {
          activeUser().getFullConversation(conversation_id, (response) => {
            let conversation_status_code = response.get(
              "conversation_status_code"
            );
            let select = conversations_filters.eq(0);
            let select_status_code = select
              .find(".sb-active")
              .attr("data-value");

              SBChat.setConversation(response);
              SBChat.populate();
  
              this.setReadIcon(conversation_status_code);
              conversations_area.find(".sb-conversation-busy").remove();
              this.updateUserDetails();

              // let phoneNumber = activeUser().getExtra("phone").value;
              // let firstName = response.get("first_name");
              
              // // Construct the HTML with the phone number
              // conversations_area.find(".sb-top > a").html(phoneNumber);
              
              // // Toggle between phone number and first name when clicked
              // conversations_area.find(".sb-top > a").on("click", function() {
              //     if ($(this).text() === phoneNumber) {
              //         $(this).text(firstName);
              //     } else {
              //         $(this).text(phoneNumber);
              //     }
              // });
                        
              // let profileImage = response.get("profile_image");
              // let firstName = response.get("title").length > 27 ? response.get("title").slice(0, 27) + "..." : response.get("title");
              // let phoneNumber = activeUser().getExtra("phone").value;
              // let label = response.get("label");
              
              // // Construct the HTML with the profile image and first name
              // let htmlContent = `<span class="open-profile-name"><img src="${profileImage}" alt="Profile Image" style="width: 2.3rem; vertical-align: bottom; border-radius: 50%; padding-right: 5px;"></span> <span>${firstName}</span>`;
              
              // // Set the HTML content
              // conversations_area.find(".sb-top > a").html(htmlContent);
              
              // // Define the toggle states based on data availability
              // let toggleStates = [];
              // if (phoneNumber) toggleStates.push(phoneNumber);
              // if (label) toggleStates.push(label);
              // toggleStates.push(firstName);
              
              // // Keep track of the current toggle state
              // let currentStateIndex = 0;
              
              // // Handle clicking on the profile image
              // conversations_area.find(".open-profile-name").on("click", function() {
              //     SBProfile.showEdit(activeUser());
              // });
              
              // // Handle clicking on the first name
              // conversations_area.find(".sb-top > a > span:not(.open-profile-name)").on("click", function() {
              //     if (toggleStates.length > 1) {
              //         currentStateIndex = (currentStateIndex + 1) % toggleStates.length;
              //         $(this).text(toggleStates[currentStateIndex]);
              //     }
              // });
              
//               let profileImage = response.get("profile_image");
// let firstName = response.get("title").length > 27 ? response.get("title").slice(0, 27) + "..." : response.get("title");
// let phoneNumber = activeUser().getExtra("phone").value;
// let label = response.get("label");

// // Construct the HTML with the profile image and first name
// let htmlContent = `<span style="padding-right:5px;" class="open-profile-name"><img src="${profileImage}" class="top-image-profile"></span> <span>${firstName}</span>`;

// // Set the HTML content
// conversations_area.find(".sb-top > a").html(htmlContent);

// // Define the toggle states based on data availability
// let toggleStates = [];
// if (phoneNumber) toggleStates.push(`<i style="font-size:1rem" class="bi bi-telephone-fill"></i> ${phoneNumber}`);
// if (label) toggleStates.push(`<i style="font-size:1rem" class="bi bi-chevron-compact-right"></i> ${label}`);
// toggleStates.push(firstName);

// // Keep track of the current toggle state
// let currentStateIndex = 0;

// // Handle clicking on the profile image
// conversations_area.find(".open-profile-name").on("click", function() {
//     SBProfile.showEdit(activeUser());

// });

// // Handle clicking on the first name
// conversations_area.find(".sb-top > a > span:not(.open-profile-name)").on("click", function() {
//     if (toggleStates.length > 1) {
//         currentStateIndex = (currentStateIndex + 1) % toggleStates.length;
//         $(this).html(toggleStates[currentStateIndex]);
//     }
// });


// let profileImage = response.get("profile_image");
// let originalTitle = response.get("first_name");
// let screenWidth = $(window).width();
// let firstName;

// // Determine the character limit based on screen width
// if (screenWidth < 555) {
//     firstName = originalTitle.length > 20 ? originalTitle.slice(0, 20) + "..." : originalTitle;
// } else {
//     firstName = originalTitle.length > 27 ? originalTitle.slice(0, 27) + "..." : originalTitle;
// }

// let phoneNumber = activeUser().getExtra("phone").value;

// // Construct the HTML with the profile image and first name
// let htmlContent = `
//     <span style="padding-right:5px;" class="open-profile-name">
//         <img src="${profileImage}" class="top-image-profile">
//     </span> 
//     <span style="margin: 0px 10px 0px 0px;">${firstName}</span>
// `;

// // Set the HTML content
// conversations_area.find(".sb-top > a").html(htmlContent);

// // Define the toggle state for phone number
// let toggleState = phoneNumber ? `<a style="color:var(--chat-text-primary);position:fixed;right:60px" href="tel:${phoneNumber}"><i class="bi bi-telephone-fill"></i></a>` : '';

// // Keep track of whether additional information is currently shown
// let isAdditionalInfoShown = false;

// // Handle clicking on the profile image
// conversations_area.find(".open-profile-name").on("click", function() {
//     SBProfile.showEdit(activeUser());
// });

// // Handle clicking on the first name
// conversations_area.find(".sb-top > a > span:not(.open-profile-name)").on("click", function() {
//     let currentSpan = $(this).next(".additional-info");
//     if (!isAdditionalInfoShown) {
//         if (currentSpan.length === 0) {
//             currentSpan = $(`<span class="additional-info">${toggleState}</span>`);
//             $(this).after(currentSpan);
//         } else {
//             currentSpan.html(toggleState);
//         }
//         isAdditionalInfoShown = true;
//     } else {
//         currentSpan.remove();
//         isAdditionalInfoShown = false;
//     }
// });
let profileImage = response.get("profile_image");
let originalTitle = response.get("first_name");
let screenWidth = $(window).width();
let firstName;

// Determine the character limit based on screen width
if (screenWidth < 555) {
    firstName = originalTitle.length > 18 ? originalTitle.slice(0, 18) + "..." : originalTitle;
} else {
    firstName = originalTitle.length > 27 ? originalTitle.slice(0, 27) + "..." : originalTitle;
}

let phoneNumber = activeUser().getExtra("phone").value;

// Determine which icon to use based on screen width
let iconClass = screenWidth < 555 ? "bi-telephone-fill" : "bi-skype";

// Construct the HTML with the profile image, first name, and icon
let htmlContent = `
    <span style="padding-right:5px;" class="open-profile-name">
        <img src="${profileImage}" class="top-image-profile">
    </span> 
    <span style="margin: 0px 10px 0px 0px;">${firstName}</span>
    <span class="additional-info">${phoneNumber ? `<a alt="Call from your Phone" href="tel:${phoneNumber}"><i class="styling-caller bi ${iconClass}"></i></a>` : ''}</span>
`;

// Set the HTML content
conversations_area.find(".sb-top > a").html(htmlContent);

// Keep track of whether additional information is currently shown
let isAdditionalInfoShown = false;

// Handle clicking on the profile image or the first name
conversations_area.find(".sb-top > a > span").on("click", function() {
    // Toggle additional info
    let currentSpan = $(this).next(".additional-info");
    if (!isAdditionalInfoShown) {
        currentSpan.show();
    } else {
        currentSpan.hide();
    }
    isAdditionalInfoShown = !isAdditionalInfoShown;
});

// Handle clicking on the profile image
conversations_area.find(".open-profile-name").on("click", function() {
    SBProfile.showEdit(activeUser());
});


    $(".sb-list").prepend(
        '<div class="load-more"><span id="load-more" ><i style="vertical-align:middle;font-size: var(--chat-text-size-1-0);" class="bi-arrow-up-circle"></i> </div>'
    
            );

            // Automatic translation
            SBAdmin.must_translate =
              SB_ADMIN_SETTINGS["translation"] &&
              activeUser().language &&
              SB_ADMIN_SETTINGS["active-agent-language"] !=
                activeUser().language;
            if (SBAdmin.must_translate) {
              let strings = [];
              let message_ids = [];
              let message_user_types = [];
              for (var i = 0; i < response.messages.length; i++) {
                let message = response.messages[i];
                if (message.get("user_type") != "bot" && message.message) {
                  strings.push(message.message);
                  message_ids.push(message.id);
                  message_user_types.push(message.get("user_type"));
                }
              }
              if (strings.length) {
                SBApps.dialogflow.translate(
                  strings,
                  SB_ADMIN_SETTINGS["active-agent-language"],
                  (response) => {
                    if (response) {
                      for (var i = 0; i < response.length; i++) {
                        let message = SBChat.conversation.getMessage(
                          message_ids[i]
                        );
                        if (message) {
                          message.set(
                            "translation",
                            response[i].translatedText
                          );
                          area
                            .find(`[data-id="${message_ids[i]}"]`)
                            .replaceWith(message.getCode(true));
                          area
                            .find(`[data-id="${message_ids[i]}"] .sb-menu`)
                            .prepend(
                              `<li data-value="original">${sb_(
                                SBF.isAgent(message_user_types[i])
                                  ? "View translation"
                                  : "View original message"
                              )}</li>`
                            );
                        }
                      }
                    }
                  }
                );
              }
            }

            // Departments
            let select_departments = conversations_area.find(
              "#conversation-department"
            );
            if (select_departments.length) {
              let item = select_departments.find(
                `[data-id="${response.get("department")}"]`
              );
              select_departments
                .find(" > p")
                .attr("data-value", item.data("value"))
                .html(item.html());
            }

            // Agent assignment
            let select_agents = conversations_area.find("#conversation-agent");
            if (select_agents.length) {
              let item = select_agents.find(
                `[data-id="${response.get("agent_id")}"]`
              );
              select_agents
                .find(" > p")
                .attr("data-value", item.data("id"))
                .html(item.html());
            }

            // Activate conversation
            if ([1, 2].includes(conversation_status_code)) {
              conversation_status_code = 0;
            }
            if (
              select_status_code != conversation_status_code &&
              !$(conversations_admin_list).find(".sb-search-btn").sbActive()
            ) {
              select.find(`[data-value="${conversation_status_code}"]`).click();
              select.find("ul").sbActive(false);
            }
            if (responsive) {
              this.mobileOpenConversation();
            }
            if (
              !conversation.length &&
              (select_status_code == conversation_status_code ||
                (select_status_code == 0 && conversation_status_code == 1))
            ) {
              conversations_admin_list_ul.prepend(
                SBConversations.getListCode(response).replace(
                  "<li",
                  '<li class="sb-active"'
                )
              );
            }
            conversation.sbActive(true);
            if (scroll) {
              this.scrollTo();
            }

            // Check if another agent has the conversation open
            let busy = response.get("busy");
            if (busy) {
              conversations_area
                .find(".sb-editor > .sb-agent-label")
                .html(
                  `<span data-agent="${
                    busy.id
                  }" style="border-radius: 10px 10px 0px 0px;position: absolute;bottom: calc(100% - -1px);background: #006eff;color: #ffffff;padding: 4px 10px;font-size: var(--chat-text-size-9);left: 4px;right: 4px;text-align: center;"><b>${
                    busy.first_name
                  } ${busy.last_name}</b> ${sb_(
                    "was viewing the conversation."
                  )} <i class="bi-check-all" style="vertical-align: middle;"></i></span>`
                );
            }

            // Notes and Tags
            this.tags.update(response.details.tags);
            this.notes.update(response["details"]["notes"]);

            // Attachments
            this.attachments();

            // Suggestions
            if (SB_ADMIN_SETTINGS["smart-reply"]) {
              let e = response.getLastUserMessage();
              suggestions_area.html(""),
                e &&
                  e.payload("sb-human-takeover") &&
                  (e = response.getLastUserMessage(e.get("index"))),
                e &&
                  ((SBApps.dialogflow.smart_reply_data = !1),
                  SBApps.dialogflow.smartReply(e.message));
            }

            // Rating
            for (var i = response.messages.length - 1; i > 0; i--) {
              let payload = response.messages[i].get("payload");
              let break_loop = false;
              if (payload && "rich-messages" in payload) {
                for (var rich_message_id in payload["rich-messages"]) {
                  let rich_message = payload["rich-messages"][rich_message_id];
                  if (rich_message.type == "rating") {
                    conversations_area
                      .find(".sb-profile-list > ul")
                      .append(
                        `<li data-id="rating"><i class="sb-icon bi-${
                          rich_message.result.rating == 1 ? "hand-thumbs-up-fill" : "hand-thumbs-down-fill"
                        }"></i><span>${sb_("User rating")}</span></li>`
                      );
                    // <label>${sb_(rich_message.result.rating == 1 ? 'Helpful' : 'Not helpful')}</label>
                    break_loop = true;
                    break;
                  }
                }
              }
              if (break_loop) break;
            }

            //Populate user conversations on the bottom right area
            activeUser().getConversations(function (response) {
              conversations_area
                .find(".sb-user-conversations")
                .html(activeUser().getConversationsCode(response));
            });

            area.sbLoading(false);
          });
        } else {
          SBChat.clear();
          conversations_admin_list_ul.find("li").sbActive(false);
          area.sbLoading(false);
        }

        // User details
        if (!new_user) {
          this.updateUserDetails();
        }

        // More settings
        conversations_area.find(".sb-board").removeClass("sb-no-conversation");
        SBUsers.updateUsersActivity();
        this.startRealTime();
        if (SBF.getURL("conversation") != conversation_id)
          pushState("?conversation=" + conversation_id);
      }
    },

    // [Deprecated] this method is obsolete and it will be removed soon
    populate: function (conversation_id, user_id, scroll) {
      this.openConversation(conversation_id, user_id, scroll);
    },

    // Populate conversations
    populateList: function (response) {
      let code = "";
      conversations = [];
      let conversionlist = response;
      //console.log(response);
      conversionlist = conversionlist.sort(function (a, b) {
        return (
          new Date(b.creation_time).getTime() -
          new Date(a.creation_time).getTime()
        );
      });

      for (var i = 0; i < conversionlist.length; i++) {
        code += this.getListCode(conversionlist[i]);
        conversations.push(conversionlist[i]);
      }
      if (code == "") {
        code = `<p class="sb-no-results">${sb_("No conversations found.")}</p>`;
      }

      conversations_admin_list_ul.html(code);
      conversations_admin_list_ul.css("position", "relative");
      conversations_admin_list_ul.css("bottom", "15px");
      SBConversations.positionList();
      this.updateMenu();

      SBF.event("SBAdminConversationsLoaded", {
        conversations: response,
      });
    },

    // positionList() {
    // 	let chat_list = document.querySelectorAll('ul.sorting-by-last-message li');
    // 	let totalHeight = 0;

    // 	chat_list.forEach((list, index) => {
    // 		let conversationHeight = list.offsetHeight;
    // 		let conversation_id = list.getAttribute('data-conversation-id');
    // 		this.chat_tops[0][conversation_id] = list.getAttribute('data-time');
    // 		let y_pos = totalHeight;
    // 		let order_css = `border-bottom: 1px solid rgb(122 122 122 / 27%); z-index:${parseInt(chat_list.length) - index};position:absolute;width:-webkit-fill-available;width:-moz-available;transform:translateY(${y_pos}px);`;
    // 		list.style = order_css;
    // 		totalHeight += conversationHeight;
    // 	});

    // },

    positionList() {
      let chat_list = document.querySelectorAll(
        "ul.sorting-by-last-message li"
      );
      let totalHeight = 0;

      chat_list.forEach((list, index) => {
        let conversationHeight = list.offsetHeight;
        let conversation_id = list.getAttribute("data-conversation-id");
        this.chat_tops[0][conversation_id] = list.getAttribute("data-time");

        let order_css = `
				position:relative;
				width: -webkit-fill-available;
				width: -moz-available;
			  `;

        list.style = order_css;
        totalHeight += conversationHeight;
      });
    },

    // Update the left conversations list with new conversations or messages
    update: function () {
      if (
        !this.busy &&
        conversations_filters.eq(0).find("p").attr("data-value") == 0
      ) {
        this.busy = true;
        SBF.ajax(
          {
            function: "get-new-conversations",
            datetime: this.datetime_last_conversation,
            // tag: filters[3]
          },
          (response) => {
            this.busy = false;
            if (response.length) {
              let code_pending = "";
              let code_not_pending = "";
              let active_conversation_id = SBChat.conversation
                ? SBChat.conversation.id
                : -1;
              let item_not_pending;
              let scroll_to_conversation = false;
              let id_check = [];
              this.datetime_last_conversation = response[0]["creation_time"];

              for (var i = 0; i < response.length; i++) {
                if (!id_check.includes(response[i]["conversation_id"])) {
                  // console.log('get-new-conversations', response[i])
                  let item = response[i];
                  let status = item["conversation_status_code"];
                  let user_id = item["user_id"];
                  let conversation_id = item["conversation_id"];
                  let active_conversation =
                    active_conversation_id == conversation_id;

                  let conversation_code = this.getListCode(item, null);

                  let conversation_li = conversations_admin_list_ul.find(
                    `[data-conversation-id="${conversation_id}"]`
                  );
                  let conversation_index = conversation_li.index();

                  let conversation = conversation_li.length;
                  let payload = SBF.null(response[i]["payload"])
                    ? {}
                    : JSON.parse(response[i]["payload"]);

                  // Truncate the message to prevent displaying long messages
                  let message = item["message"];
                  
                  const MAX_CHARACTERS = 40; // Set the maximum number of characters for the message
                  if (message.length > MAX_CHARACTERS) {
                    const truncatedMessage =
                      message.substring(0, MAX_CHARACTERS) + "...";
                    item["message"] = truncatedMessage;
                  }

                  // Active conversation
                  if (active_conversation) {
                    conversation_code = conversation_code.replace(
                      "<li",
                      '<li class="sb-active"'
                    );
                    if (conversation) {
                      if (item["message"]) {
                        conversation_li.replaceWith(conversation_code);
                      }
                      conversations[conversation_index][
                        "conversation_status_code"
                      ] = status;
                      this.setReadIcon(status);
                    } else {
                      scroll_to_conversation = true;
                    }
                  } else if (conversation) {
                    // Conversation already in list but not active
                    conversations[conversation_index] = item;
                    conversations_admin_list_ul
                      .find(`[data-conversation-id="${conversation_id}"]`)
                      .remove();
                  }

                  // Add the user to the global users array if it doesn't exists
                  if (!(user_id in users)) {
                    users[user_id] = new SBUser({
                      id: user_id,
                      first_name: item["first_name"],
                      last_name: item["last_name"],
                      profile_image: item["profile_image"],
                      user_type: item["user_type"],
                    });
                  }

                  // New conversation
                  if (!active_conversation || !conversation) {
                    if (status == 2) {
                      code_pending += conversation_code;
                      conversations.unshift(item);
                    } else if (status == 0 || status == 1) {
                      item_not_pending = conversations_admin_list_ul
                        .find('[data-conversation-status="2"]')
                        .last();

                      if (item_not_pending.length == 0) {
                        code_pending += conversation_code;
                      } else {
                        conversations.splice(
                          item_not_pending.index() + 1,
                          0,
                          item
                        );
                        code_not_pending += conversation_code;
                      }
                    }
                    if (user_id == activeUser().id) {
                      activeUser().getConversations(function (response) {
                        conversations_area
                          .find(".sb-user-conversations")
                          .html(activeUser().getConversationsCode(response));
                      });
                    }
                    SBF.event("SBAdminNewConversation", {
                      conversation: item,
                    });
                  }

                  // Update user
                  if (
                    activeUser() &&
                    (("event" in payload &&
                      payload["event"] == "update-user") ||
                      users[user_id].type != item["user_type"])
                  ) {
                    activeUser().update(() => {
                      this.updateUserDetails();
                      users[activeUser().id] = activeUser();
                    });
                  }
                  if (item.message != "" || item.attachments != "") {
                    SBConversations.newMsgTop(response[i], "add");
                  }

                  // Desktop, flash, sounds notifications
                  if (
                    !SBChat.tab_active &&
                    item["conversation_status_code"] == 2 &&
                    (!SBF.isAgent(item["message_user_type"]) ||
                      "preview" in payload) &&
                    (!SBF.null(item.message) ||
                      !SBF.null(item.attachments) ||
                      "preview" in payload)
                  ) {
                    if (this.desktop_notifications) {
                      let user_details = [
                        item["first_name"] + " " + item["last_name"],
                        SBUsers.userProfileImage(item["profile_image"]),
                      ];
                      let formattedMessage = (
                        "preview" in payload ? payload.preview : "notfimy"
                      )
                        .replace(/\*(.*?)\*/g, "\u200E*$1*\u200E") // bold
                        .replace(/_(.*?)_/g, "\u200E_$1_\u200E") // italic
                        .replace(/~(.*?)~/g, "\u200E~$1~\u200E") // strikethrough
                        .replace(/```(.*?)```/g, "\u200E```\n$1\n```\u200E") // code block
                        .replace(/`(.*?)`/g, "\u200E`$1`\u200E") // inline code
                        .replace(/⟦(.*?)⟧/g, "\u200E⟦$1⟧\u200E"); // custom replacement for ⟦ ⟧

                      SBChat.desktopNotification(
                        user_details[0],
                        formattedMessage,
                        user_details[1],
                        conversation_id,
                        user_id
                      );
                    }
                    if (this.flash_notifications) {
                      SBChat.flashNotification();
                    }
                    if (
                      SBChat.audio &&
                      ["a", "c", "ic", "ag"].includes(
                        SB_ADMIN_SETTINGS["sounds"]
                      )
                    ) {
                      SBChat.audio.play();
                    }
                  }
                  id_check.push(conversation_id);
                }
              }
              if (code_pending) {
                conversations_admin_list_ul.prepend(code_pending);
              }
              if (code_not_pending) {
                $(code_not_pending).insertAfter(item_not_pending);
              }

              if (scroll_to_conversation) {
                this.scrollTo();
              }
              this.updateMenu();
            }
          }
        );
        if (
          SB_ADMIN_SETTINGS["assign-conversation-to-agent"] ||
          SB_ACTIVE_AGENT["department"]
        ) {
          let ids = conversations_admin_list_ul
            .find(" > li")
            .map(function () {
              return $(this).attr("data-conversation-id");
            })
            .get();
          if (ids.length) {
            SBF.ajax(
              {
                function: "check-conversations-assignment",
                conversations_ids: ids,
                agent_id: SB_ADMIN_SETTINGS["assign-conversation-to-agent"]
                  ? SB_ACTIVE_AGENT["id"]
                  : false,
                department: SB_ACTIVE_AGENT["department"],
              },
              (response) => {
                if (response) {
                  for (var i = 0; i < response.length; i++) {
                    conversations_admin_list_ul
                      .find(`[data-conversation-id="${response[i]}"]`)
                      .remove();
                  }
                }
              }
            );
          }
        }
      }
    },

    // // Update the top left filter and inbox counter
    // updateMenu: function () {
    //   let count = conversations_admin_list_ul.find(
    //     '[data-conversation-status="2"]'
    //   ).length;
    //   let item = conversations_filters.eq(0);
    //   let span = item.find(" > p span");
    //   if (count == 100 || this.menu_count_ajax) {
    //     let status_code = item.find("li.sb-active").data("value");
    //     this.menu_count_ajax = true;
    //     SBF.ajax(
    //       {
    //         function: "count-conversations",
    //         status_code: status_code == 0 ? 2 : status_code,
    //       },
    //       (response) => {
    //         span.html(`(${response})`);
    //       }
    //     );
    //   } else {
    //     span.html(`<small class="notif">${count}</small>`);
    //   }
    // },

    updateMenu: function () {
      let count = conversations_admin_list_ul.find('[data-conversation-status="2"]').length;
      let item = conversations_filters.eq(0);
      let anchorTag = item.find(" > a");
      let span = anchorTag.find(" > p span");
      
      let existingFloatingElement = document.getElementById('floatingElement');
      
      if (count == 100 || this.menu_count_ajax) {
        let status_code = item.find("li.sb-active").data("value");
        this.menu_count_ajax = true;
        SBF.ajax(
          {
            function: "count-conversations",
            status_code: status_code == 0 ? 2 : status_code,
          },
          (response) => {
            span.html(`(${response})`);
          }
        );
      } else {
        if (!existingFloatingElement) {
          let floatingElement = document.createElement('div');
          floatingElement.id = 'floatingElement';
          floatingElement.style.cssText = 'position: relative; top: 10px; margin: auto; display: flex; justify-content: center; z-index: 33;';
          
          let notifElement = document.createElement('small');
          notifElement.className = 'notif';
          notifElement.style.cssText = 'font-size: medium; padding: 6px 10px; border-radius: 30px;';
          notifElement.textContent = count;
          
          floatingElement.appendChild(notifElement);
          
          document.getElementById('sb-conversations').appendChild(floatingElement);
        } else {
          let notifElement = existingFloatingElement.querySelector('.notif');
          notifElement.textContent = count;
        }
        
        // Modificar la visibilidad del div que contiene el elemento notif
        let divInsideAnchor = document.getElementById('sb-conversations').querySelector('div');
        if (count === 0) {
          divInsideAnchor.style.visibility = 'hidden';
        } else {
          divInsideAnchor.style.visibility = 'visible';
        }
      }
    },
    

    messageMenu: function (agent) {
      let readTextOption = `<li style="padding: 6px 15px; line-height:20px" data-value="read-text"> <i class="bi-volume-up-fill"></i> ${sb_("Leer")}</li>`;
      return `
				<i class="sb-menu-btn bi-three-dots"></i>
				<ul style="right: 0rem;padding: .4rem;" class="message-menu sb-menu">
					${
            (admin &&
              !SB_ADMIN_SETTINGS["supervisor"] &&
              SB_ADMIN_SETTINGS["allow-agent-delete-message"]) ||
            (SB_ADMIN_SETTINGS["supervisor"] &&
              SB_ADMIN_SETTINGS["allow-supervisor-delete-message"])
              ? `<li style="padding: 6px 15px; line-height:20px" data-value="delete"><i class="bi-trash"></i> ${sb_(
                  "Delete"
                )}</li><hr>`
              : ""
          }
					${readTextOption}
				</ul>`;
    },

    // Update the users details of the conversations area
    updateUserDetails() {
      if (!activeUser()) return;
      var $anchorTag = $('.sb-top > a');
      var originalTitle = activeUser().name;
      var firstName = originalTitle.length > 15 ? originalTitle.slice(0, 15) + "..." : originalTitle;
      var $secondSpan = $anchorTag.find('span').eq(1); // Select the second <span> element
      $secondSpan.html(firstName); // Update its content
      conversations_area.find(".sb-user-details .sb-profile").setProfile();
      SBProfile.populate(activeUser(), conversations_area.find(".sb-profile-list"));
  },
  
    // Set the read status icon
    setReadIcon(conversation_status_code) {
      let unread = conversation_status_code == 2;
      conversations_area
        .find('.sb-top [data-value="read"],.sb-top [data-value="unread"]')
        .sbActive([0, 1, 2].includes(parseInt(conversation_status_code)))
        .attr("data-value", unread ? "read" : "unread")
        .attr(
          "data-sb-tooltip",
          sb_(unread ? "Mark as read" : "Mark as unread")
        )
        .parent()
        .sbInitTooltips()
        .find("i")
        .attr("class", unread ? "bi-check-lg" : "bi-check-all");
    },

    // Return the conversation code of the left conversations list
    getListCode: function (conversation, status) {
      if (conversation instanceof SBConversation) {
        const lastMessage = conversation.getLastMessage();
        conversation = {
          message: lastMessage.message,
          attachments: lastMessage.attachments,
          user_id: conversation.get("user_id"),
          conversation_id: conversation.id,
          conversation_status_code: conversation.get("conversation_status_code"),
          conversation_source: conversation.get("source"),
          label: conversation.get("label"),
          profile_image: conversation.get("profile_image"),
          first_name: conversation.get("first_name"),
          last_name: conversation.get("last_name"),
          creation_time: conversation.get("creation_time"),
          payload: conversation.get("payload"),
        };
      }

      // MESSAGE SPLIT BY WORDS IN LEFT BAR

      let message = conversation.message;
      let truncatedWords = [];

      message = message.replace(/- /g, "• ");

      // Remove specified symbols from the message, including '}'
      message = message.replace(/[\[\]"\,}]/g, "");

      // Remove symbols and words matching the pattern [{,+,0-9]+@s.whatsapp.net}]
      const pattern = /[{,+0-9]+@s\.whatsapp\.net/g;
      message = message.replace(pattern, "");

      // Replace [buttons options="..." message="..."] with <i class="bi-file-text"></i> preserving dynamic content
      message = message.replace(
        /\[buttons\s+options="([^"]+)"\s+message="([^"]+)"\]/g,
        '<i class="bi-file-text" data-options="$1" data-message="$2"></i>'
      );

      // Replace [card image="" header="" description="" link="" link-text=" " extra="" target=""] with <i class="bi-file-text"></i>, including '}'
      message = message.replace(
        /\[card[^\]]*\]/g,
        '<i class="bi-file-text"></i>'
      );

      // Replace the symbols 〚 and 〛 with <i class="bi-pencil-square"></i>
      message = message.replace(/〚/g, "").replace(/〛/g, " ↪️ ");

      const MAX_CHARACTERS = 40;
      const MAX_WORDS = 5;

      if (message.length > MAX_CHARACTERS) {
        const words = message.split(" ");
        let currentLength = 0;
        let wordCount = 0;

        for (const word of words) {
          if (
            wordCount >= MAX_WORDS ||
            currentLength + word.length + 1 > MAX_CHARACTERS
          ) {
            break;
          }
          truncatedWords.push(word);
          currentLength += word.length + 1; // Add 1 for the space
          wordCount++;
        }

        message = truncatedWords.join(" ") + "...";
      }

      const labelname = [conversation.label];
      const cloud_active = SBF.admin_set("whatsapp-cloud")["cloud-active"];

      const reply = pattern.test(message);
      if (reply) {
        truncatedWords = message.replace(/^.*?]/, "");
      }

      let strip = new SBMessage();
      let is_title = !SBF.null(conversation.title);

      if (conversation.payload.includes("preview")) {
        const payload = JSON.parse(conversation.payload.replace("\\'", "'"));
        if (payload && "preview" in payload) {
          message = payload.preview;
        }
      }

      const formatSymbols = {
        "*": "strong",
        "~": "s",
        "```": "code",
      };

      Object.keys(formatSymbols).forEach((symbol) => {
        const regex = new RegExp(`\\${symbol}(.*?)\\${symbol}`, "g");
        if (message.includes(symbol)) {
          message = message.replace(
            regex,
            (match, content) =>
              `<${formatSymbols[symbol]}>${content}</${formatSymbols[symbol]}>`
          );
        }
      });

      if (SBF.null(status)) {
        status = conversation.conversation_status_code;
      }

      //Conversation List Attachments Received

      if (!message && !SBF.null(conversation.attachments)) {
        const files = JSON.parse(conversation.attachments);
        if (Array.isArray(files)) {
          const mediaRegex = /\.(jpg|jpeg|png|webp|mp4)\b/g;
          const docRegex = /\.(docx?|xlsx?|pdf)\b/g;
          const voiceRegex = /\.(mp3|ogg)\b/g;

          const mediaFiles = files.filter((file) => mediaRegex.test(file));
          const docFiles = files.filter((file) => docRegex.test(file));
          const voiceFiles = files.filter((file) => voiceRegex.test(file));

          let mediaMessage = "";
          let docMessage = "";
          let voiceMessage = "";

          if (mediaFiles.length > 0) {
            mediaMessage =
              `<i class="bi-box"></i>` +
              " " +
              sb_("Media") +
              ": " +
              (mediaFiles.length > 1
                ? "+" + (mediaFiles.length - 1)
                : mediaFiles.length);
          }

          if (docFiles.length > 0) {
            docMessage =
              `<i class="bi-file-text"></i>` +
              " " +
              sb_("Doc") +
              ": " +
              (docFiles.length > 1
                ? "+" + (docFiles.length - 1)
                : docFiles.length);
          }

          if (voiceFiles.length > 0) {
            voiceMessage =
              `<i class="bi-mic-fill vertical-align"></i>` +
              " " +
              sb_("Voice") +
              ": " +
              (voiceFiles.length > 1
                ? "+" + (voiceFiles.length - 1)
                : voiceFiles.length);
          }

          // Combine the messages
          if (mediaMessage || docMessage || voiceMessage) {
            message = [mediaMessage, docMessage, voiceMessage]
              .filter(Boolean)
              .join(" ");
          }
        }
      }

      

      let order_css = `
			 `;
      return `<li style="${order_css}" data-user-id="${
        conversation["user_id"]
      }" data-conversation-id="${
        conversation["conversation_id"]
      }"  data-time="${new Date(
        conversation["creation_time"]
      ).getTime()}" data-conversation-status="${status}"${
        !SBF.null(conversation["conversation_source"])
          ? ` data-conversation-source="${conversation["conversation_source"]}"`
          : ""
      }>
			<small class="source-conversation-icon"><img id="conversation-source-icon" class="source-buttons" src="../media/apps/${
        conversation["conversation_source"]
      }.svg">
      </small>
			<div class="sb-profile client-status"><img class="client-icon-status sb-icon tags-${
        conversation["label"]
      } bi-crosshair loading="lazy" src="${
        conversation["profile_image"]
      }">
    
			<h3 class="sb-name${is_title ? " sb-custom-name" : ""}">${
        is_title
          ? conversation.title
          : conversation["first_name"] + " " + conversation["last_name"]
      } </h3>
			<div class="sb-info-conversations" style="min-width: 60px;text-align:right;flex: auto;font-size: .75rem;letter-spacing: .3px;margin: -2px 0px;">${SBF.beautifyTime(
        conversation["creation_time"]
      )}</div>
			</div>
			<div>
			<a class="phone-number" style="color:inherit">${conversation.phone}</a>
			</div>
			<p class="message-received" style="max-width:calc(100% - 145px);">${strip
        .strip(message)
        .replace(/_/g, " ")}</p>
			<div class="conversation-bar">

			<div class="no-read-icon sb-hide" style="margin: 0px 1px;">
				<svg width="20" height="20" viewBox="0 0 24.5 24.5" data-name="Flat Color"
					xmlns="http://www.w3.org/2000/svg" class="icon flat-color">
					<circle cx="12" cy="12" r="10" class="check-circle" />
					<path
						d="M11 16a1 1 0 0 1-.71-.29l-3-3a1 1 0 1 1 1.42-1.42l2.29 2.3 4.29-4.3a1 1 0 0 1 1.42 1.42l-5 5A1 1 0 0 1 11 16Z"
						class="check-inside" />
				</svg>
			</div>
		</div>
		</div>
		</li> 
		`;



    },


    newMsgTop(user = false, status) {
      const chat_list = document.querySelectorAll(
        "ul.sorting-by-last-message li"
      );
      const chat_area = $(".sb-scroll-area");

      if (user) {
        conversations = this.getUniqueChat(conversations, "user_id");
        let conversationsList = conversations
          .slice()
          .sort(
            (a, b) =>
              new Date(b.creation_time).getTime() -
              new Date(a.creation_time).getTime()
          );

        conversationsList.forEach((list, index) => {
          let chat_item = $(
            `.sorting-by-last-message li[data-conversation-id='${list.conversation_id}']`
          );
          let order_css = `
				  transition: all .5s ease;
          webkit-transition: all .5s ease;
				  width:-webkit-fill-available;width:-moz-available;
          
				`;

          chat_item.attr("style", order_css);
        });

        if (chat_area.scrollTop() > 0 && status === "add") {
          requestAnimationFrame(() => this.newMsgTop(user, status));
        }
      }
    },

    getUniqueChat: function (arr, key) {
      let uniqueArr = [];
      arr.filter(function (item) {
        let i = uniqueArr.findIndex((x) => x[key] == item[key]);
        i <= -1 ? uniqueArr.push(item) : null;
      });
      return uniqueArr;
    },
    // Start or stop the real time update of left conversations list and chat
    startRealTime: function () {
      if (SBPusher.active) return;
      this.stopRealTime();
      this.real_time = setInterval(() => {
        this.update();
        this.updateCurrentURL();
      }, 10000); // 10 segundos
      SBChat.startRealTime();
    },
    stopRealTime: function () {
      clearInterval(this.real_time);
      SBChat.stopRealTime();
    },
    timeZoneList: function () {
      const TimeZones = Intl.supportedValuesOf("timeZone");
      let select = document.querySelector("#zones");
      let zoneVal = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!Intl.supportedValuesOf) {
        let opt = new Option(
          "Your browser does not support Intl.supportedValuesOf().",
          null,
          true,
          true
        );
        opt.disabled = true;
        select.options.add(opt);
      } else {
        select.innerHTML += "";
        for (const timeZone of Intl.supportedValuesOf("timeZone")) {
          select.innerHTML += `<option ${
            zoneVal == timeZone ? "selected" : ""
          }>${timeZone}</option>`;
        }
      }
    },

    // Transcript generation and download
    transcript: function (conversation_id, action = false) {
      if (action == "email" && (!activeUser() || !activeUser().get("email")))
        return false;
      SBF.ajax(
        {
          function: "transcript",
          conversation_id: conversation_id,
        },
        (response) => {
          if (action == "email")
            SBChat.sendEmail(
              SB_ADMIN_SETTINGS["transcript-message"],
              [[response, response]],
              true
            );
          else window.open(response);
        }
      );
    },

    // Set the typing status
    typing: function (typing) {
      if (typing) {
        if (!SBChat.user_online) {
          SBUsers.setActiveUserStatus(true);
        }
        if (!this.user_typing) {
          conversations_area
            .find(".sb-conversation .sb-top > .sb-labels")
            .append(
              '<span class="sb-status-typing" style="font-size: var(--chat-text-size-7);">' +
                sb_("Typing") +
                "</span>"
            );
          this.user_typing = true;
        }
      } else if (this.user_typing) {
        conversations_area
          .find(".sb-conversation .sb-top .sb-status-typing")
          .remove();
        this.user_typing = false;
      }
    },

    // Scroll the left conversations list to the active conversation
    scrollTo: function () {
      let active = conversations_admin_list_ul.find(".sb-active");
      let offset = active.length ? active[0].offsetTop : 0;
      conversations_admin_list_ul
        .parent()
        .scrollTop(offset - (responsive ? 120 : 70));
    },

    // Search conversations
    search: function (input) {
      if (!input) return;
      searchInput(input, (search, icon) => {
        pagination_count = 1;
        if (search.length > 1) {
          SBF.ajax(
            {
              function: "search-conversations",
              search: search,
            },
            (response) => {
              SBConversations.populateList(response);
              $(icon).sbLoading(false);
              this.scrollTo();
              this.is_search = true;
            }
          );
        } else {
          let filters = SBConversations.filters();
          pagination = 1;
          SBF.ajax(
            {
              function: "get-conversations",
              status_code: filters[0],
              tag: filters[3],
            },
            (response) => {
              SBConversations.populateList(response);
              $(icon).sbLoading(false);
              this.is_search = false;
            }
          );
        }
      });
    },

    // Get the page URL of the user
    updateCurrentURL: function (url = false) {
      if (url) this.ucurl(url);
      else if (
        SBChat.user_online &&
        activeUser() &&
        activeUser().getExtra("current_url")
      ) {
        SBF.ajax(
          {
            function: "current-url",
          },
          (response) => {
            if (response) this.ucurl(response);
          }
        );
      }
    },

    ucurl(url) {
      let extra = activeUser().getExtra("current_url");
      url = urlStrip(url);
      conversations_area
        .find('.sb-profile-list [data-id="current_url"] label')
        .attr("data-value", url)
        .html(url);
      if (extra) {
        extra.value = url;
        activeUser().setExtra("current_url", extra);
      }
    },

    // Update the department of a conversation
    assignDepartment: function (conversation_id, department, onSuccess) {
      SBF.ajax(
        {
          function: "update-conversation-department",
          conversation_id: conversation_id,
          department: department,
          message: SBChat.conversation.getLastMessage().message,
        },
        (response) => {
          onSuccess(response);
        }
      );
    },

    assignAgent: function (conversation_id, agent_id, onSuccess = false) {
      SBF.ajax(
        {
          function: "update-conversation-agent",
          conversation_id: conversation_id,
          agent_id: agent_id,
          status_code: 6, // Set the status code to 6 for conversations assigned to agents
          message: SBChat.conversation.getLastMessage().message,
        },
        (response) => {
          if (onSuccess) onSuccess(response);
        }
      );
    },

    // Update the UI to display the active department of the conversation
    setActiveDepartment: function (department_id) {
      if (
        SBChat.conversation &&
        SBChat.conversation.get("department") == department_id
      )
        return;
      let select = conversations_area.find("#conversation-department");
      let li = select.find(`[data-id="${department_id}"]`);
      select
        .find(" > p")
        .attr("data-value", li.data("value"))
        .html(li.html())
        .next()
        .sbActive(false);
      SBChat.conversation.set("department", department_id);
      if (
        SB_ACTIVE_AGENT["user_type"] == "agent" &&
        SB_ACTIVE_AGENT["department"] &&
        SB_ACTIVE_AGENT["department"] != department_id
      ) {
        conversations_admin_list_ul
          .find(`[data-conversation-id="${SBChat.conversation.id}"]`)
          .remove();
        SBConversations.clickFirst();
      }
      showResponse("Department updated. The agents have been notified.");
    },

    // Update the UI to display the active agent of the conversation
    setActiveAgent: function (agent_id) {
      let select = conversations_area.find("#conversation-agent");
      let li = select.find(`[data-id="${agent_id}"]`);
      SBChat.conversation.set("agent_id", agent_id);
      select
        .find(" > p")
        .attr("data-value", li.data("value"))
        .html(li.html())
        .next()
        .sbActive(false);
      if (
        SB_ACTIVE_AGENT["user_type"] == "agent" &&
        (!SB_ADMIN_SETTINGS["assign-conversation-to-agent"] || agent_id)
      ) {
        conversations_admin_list_ul
          .find(`[data-conversation-id="${SBChat.conversation.id}"]`)
          .remove();
        SBConversations.clickFirst();
      }
      if (agent_id)
        showResponse("Agent assigned. The agent has been notified.");
    },

    // Mobile conversations menu
    mobileOpenConversation: function () {
      conversations_area.find(".sb-admin-list").sbActive(false);
      conversations_area.find(".sb-conversation").sbActive(true);
      header.addClass("sb-hide");
    },

    mobileCloseConversation: function () {
      conversations_admin_list_ul.find("li.sb-active").sbActive(false);
      conversations_area.find(".sb-admin-list").sbActive(true);
      conversations_area.find(".sb-conversation").sbActive(false);
      header.removeClass("sb-hide");
      window.history.replaceState({}, document.title, SBF.URL());
    },

    // Trigger the click event of the first conversation
    clickFirst: function () {
      let conversations = conversations_admin_list_ul.find("li:first-child");
      if (conversations.length) {
        conversations_admin_list_ul.find("li:first-child").click();
        SBConversations.scrollTo();
      } else
        conversations_area.find(".sb-board").addClass("sb-no-conversation");
    },

    // Saved replies
    savedReplies: function (textarea, value) {
      let last_char = value.charAt(textarea.selectionStart - 1);
      if (last_char == "/") {
        SBChat.editor_listening = true;
      }
      if (SBChat.editor_listening && last_char == " ") {
        let keyword = value.substr(value.lastIndexOf("/") + 1).replace(" ", "");
        SBChat.editor_listening = false;
        for (var i = 0; i < saved_replies_list.length; i++) {
          if (saved_replies_list[i]["reply-name"] == keyword) {
            $(textarea).val(
              value.substr(0, value.lastIndexOf("/")) +
                saved_replies_list[i]["reply-text"]
            );
            return;
          }
        }
      }
    },

    attachments: function () {
      if (attachments_panel.length) {
        let attachments = SBChat.conversation.getAttachments();
        let code = "";
        for (var i = 0; i < attachments.length; i++) {
          let shortenedFilename = attachments[i][0].slice(0, 20);
          code += `<a href="${
            attachments[i][1]
          }" class="bg-attachment" target="_blank"><i class="sb-icon bi-file-earmark-arrow-down"></i>${
            shortenedFilename + "..."
          } </a>`;
        }
        $(attachments_panel).html(
          code == ""
            ? ""
            : `<h3>${sb_(
                "Attachments"
              )}</h3><div class="sb-list-items sb-list-links sb-list-icon">${code}</div>`
        );
        collapse(attachments_panel, 160);
      }
    },

    // Get conversations filters values
    filters: function () {
      let values = [];
      for (var i = 0; i < conversations_filters.length; i++) {
        values.push(
          conversations_filters.eq(i).find("li.sb-active").data("value")
        );
      }
      if (values[1] || values[3]) {
        values[0] = "all";
      }
      return values;
    },

    // Notes
    notes: {
      busy: false,

      add: function (
        conversation_id,
        user_id,
        name,
        message,
        onSuccess = false
      ) {
        let remainder = $("#alertdate").val();
        let zone = $("#zones").val();
        remainder =
          remainder != ""
            ? SBF.getTimezoneOffset(zone) == new Date().getTimezoneOffset()
              ? remainder
              : new Date(remainder).toUTCString()
            : false;

        // Check if browser is Firefox and adjust remainder date accordingly
        if (navigator.userAgent.indexOf("Firefox") > -1) {
          let firefoxRemainder = new Date(remainder);
          firefoxRemainder.setHours(firefoxRemainder.getHours() - 3);
          remainder =
            remainder != ""
              ? SBF.getTimezoneOffset(zone) == new Date().getTimezoneOffset()
                ? moment.utc(remainder).format()
                : new Date(remainder).toUTCString()
              : false;
        }

        // Add browser name and device type to message

        SBF.ajax(
          {
            function: "add-note",
            conversation_id: conversation_id,
            user_id: user_id,
            name: name,
            message: message,
            alert: remainder,
            time_zone: zone,
            status: !remainder ? true : false,
          },
          (response) => {
            if (onSuccess) onSuccess(response);
            $("#alertdate").val("");
          }
        );
      },
      update: function (notes, add = false) {
        if (notes_panel.length) {
          let code = "";
          let div = notes_panel.find(" > div");
          for (var i = 0; i < notes.length; i++) {
            let note = notes[i];
            code += `<div data-id="${note["id"]}"><span class="sb-note-title">${
              note["name"]
            } ${
              SB_ACTIVE_AGENT["id"] == note["user_id"]
                ? '<i class="sb-delete-note bi-x-lg"></i>'
                : ""
            }</span>${
              !note["alert"] && !note["time_zone"]
                ? ""
                : `<small class="note-alert-text" style="margin: 0px 6px;">${
                    !note["alert"]
                      ? ""
                      : SBF.localTime(note["alert"], note["time_zone"])
                  }${
                    note["time_zone"] != undefined
                      ? " " + note["time_zone"]
                      : ""
                  }</small>`
            }<span class="note-content">${note["message"]}</span></div>`;
          }
          if (add) {
            div.append(code);
          } else {
            div.html(code);
          }
          div.attr("style", "display: flex; flex-direction: column-reverse;");
          notes_panel.find(".bi-chevron-down").remove();
          collapse(notes_panel, 155);
          this.busy = false;
        }
      },

      delete: function (conversation_id, note_id, onSuccess = false) {
        if (this.busy) return;
        this.busy = true;
        SBF.ajax(
          {
            function: "delete-note",
            conversation_id: conversation_id,
            note_id: note_id,
          },
          (response) => {
            this.busy = false;
            if (onSuccess) onSuccess(response);
          }
        );
      },

      readmore: function (content, len) {
        if (content.length <= len) {
          $(".dots").hide();
          return content;
        } else {
          let less = content.slice(0, len);
          let more = content.slice(len, content.length);
          let newcontent = `${less}<span class="more" style="display:none">${more}</span><span class="dots">...</span>`;
          return newcontent;
        }
      },
    },

    // Tags
    tags: {
      busy: false,
      list: false,

      update: function (tags) {
        if (tags_panel.length) {
          let code = "";
          let div = tags_panel.find(" > div");
          for (var i = 0; i < tags.length; i++) {
            code += `<span>${tags[i]}</span>`;
          }
          div.html(code);
          this.busy = false;
        }
      },

      getAll: function (exclude_tags = []) {
        let code = "";
        for (var i = 0; i < this.list.length; i++) {
          if (!exclude_tags.includes(this.list[i])) {
            code += `<span>${this.list[i]}</span>`;
          }
        }
        return code;
      },
    },

    // Direct message
    showDirectMessageBox: function (type, user_ids = []) {
      let email = type == "email";
      SBForm.clear(direct_message_box);
      direct_message_box
        .find(".sb-direct-message-users")
        .val(user_ids.length ? user_ids.join(",") : "");
      direct_message_box.find(".sb-bottom > div").html("");
      direct_message_box
        .find(".sb-top-bar > div:first-child")
        .html(sb_(`Broadcast ${type == "sms" ? "text message" : type}`));
      direct_message_box.find(".sb-loading").sbLoading(false);
      direct_message_box
        .find(".sb-direct-message-subject")
        .sbActive(email)
        .find("input")
        .attr("required", email);

      direct_message_box.attr("data-type", type);

      if (type !== "email" && type !== "sms") {
        direct_message_box.find(".sb-selector").removeClass("sb-hide");
        new Metatemplate().init("#user-template-form");
        if (direct_message_box.find(".sb-select").val() === "template") {
          direct_message_box.find(".sb-select").val(null);
        }
      } else {
        direct_message_box.find(".sb-selector").addClass("sb-hide");
        $(".sb-bulk-sender").addClass("sb-hide");
        $(".sb-direct-message-hide").removeClass("sb-hide");
      }

      // Check if "API Cloud bulk sender" option is selected
      direct_message_box.find(".sb-select").on("change", function () {
        if ($(this).find(".active-bulk-sender").is(":selected")) {
          $(".sb-bulk-sender").removeClass("sb-hide");
          $(".sb-direct-message-hide").addClass("sb-hide");
        } else {
          direct_message_box.find(".sb-selector").addClass("sb-hide");
          $(".sb-bulk-sender").addClass("sb-hide");
          $(".sb-direct-message-hide").removeClass("sb-hide");
        }
      });

      direct_message_box.sbShowLightbox();
    },
  };

  /*
   * ----------------------------------------------------------
   * # Profile
   * ----------------------------------------------------------
   */

  var SBProfile = {
    // Get all profile settings
    getAll: function (profile_area) {
      return SBForm.getAll(profile_area);
    },

    // Get a single setting
    get: function (input) {
      return SBForm.get(input);
    },

    // Set a single setting
    set: function (item, value) {
      return SBForm.set(item, value);
    },

    getUserExtra: function (user_id) {
      SBF.ajax(
        {
          function: "get-user-extra",
          user_id: user_id,
        },
        (res) => {
          this.getUserExtra(user_id, response);
        }
      );
    },

    // Display the user box
    show: function (user_id) {
      loadingGlobal();
      activeUser(
        new SBUser({
          id: user_id,
        })
      );
      activeUser().update(() => {
        this.populate(activeUser(), profile_box.find(".sb-profile-list"));
        profile_box.find(".sb-profile").setProfile();
        activeUser().getConversations((response) => {
          let user_type = activeUser().type;
          if (SBF.isAgent(user_type)) {
            this.agentData();
          }
          profile_box
            .find(".sb-user-conversations")
            .html(activeUser().getConversationsCode(response));
          profile_box.find(".sb-top-bar [data-value]").sbActive(false);
          if (!SBF.null(activeUser().get("email"))) {
            profile_box.find(".sb-top-bar [data-value=email]").sbActive(true);
          }
          if (activeUser().getExtra("phone") && SB_ADMIN_SETTINGS["sms"]) {
            profile_box.find(".sb-top-bar [data-value=sms]").sbActive(true);
          }
          this.boxClasses(profile_box, user_type);
          profile_box.attr("data-user-id", activeUser().id).sbShowLightbox();
          loadingGlobal(false, false);
          SBF.event("SBProfileBoxOpened", {
            user_id: user_id,
          });
        });
        users[user_id] = activeUser();
        if (SBF.getURL("user") != user_id) pushState("?user=" + user_id);
      });
    },

    showEdit: function (user) {
      if (user instanceof SBUser) {
        let password = profile_edit_box.find("#password input");
        let current_user_type = user.type;
        let select = profile_edit_box.find("#user_type select");

        profile_edit_box
          .removeClass("sb-user-new")
          .attr("data-user-id", user.id);
        profile_edit_box
          .find(".sb-top-bar .sb-save")
          .html(`<i class="bi-check-lg"></i>${sb_("Save changes")}`);
        profile_edit_box.find(".sb-profile").setProfile();
        profile_edit_box.find(".sb-custom-detail").remove();
        profile_edit_box.find("input,select,textara").removeClass("sb-error");

        // Custom details
        let code = "";
        let default_ids = profile_edit_box
          .find(".sb-additional-details [id]")
          .map(function () {
            return this.id;
          })
          .get()
          .concat([
            "facebook-id",
            "ip",
            "os",
            "current_url",
            "country_code",
            "browser_language",
            "browser",
          ]);
        for (var id in user.extra) {
          if (!default_ids.includes(id)) {
            code += `<div id="${id}" data-type="text" class="sb-input sb-custom-detail"><span>${sb_(
              user.extra[id].name
            )}</span><input type="text"></div>`;
          }
        }
        profile_edit_box
          .find(".sb-additional-details .sb-edit-box")
          .append(code);

        // Set values
        this.populateEdit(user, profile_edit_box);
        this.updateRequiredFields(current_user_type);

        // User type select
        if (
          SB_ACTIVE_AGENT["user_type"] == "admin" &&
          SBF.isAgent(current_user_type)
        ) {
          select.html(
            `<option value="agent">${sb_(
              "Agent"
            )}</option><option value="admin"${
              current_user_type == "admin" ? " selected" : ""
            }>${sb_("Admin")}</option>`
          );
        }

        // Password
        if (password.val()) {
          password.val("********");
        }

        // // Cloud
        // if (SB_ADMIN_SETTINGS.cloud) {
        //   profile_edit_box.setClass(
        //     "sb-cloud-admin",
        //     SB_ADMIN_SETTINGS.cloud.id == user.id
        //   );
        // }

        // Show the edit box
        this.boxClasses(profile_edit_box, current_user_type);
        profile_edit_box.sbShowLightbox();
        SBF.event("SBProfileEditBoxOpened", {
          user_id: user.id,
        });
      } else {
        SBF.error("User not of type SBUser", "SBUsers.showEdit");
        return false;
      }
    },


    // Populate profile
populate: function (user, profile_area) {
  let exclude = ["first_name", "last_name", "password", "profile_image"];
  let code = "";
  if (profile_area.hasClass("sb-profile-list") && SBChat.conversation) {
    var source = SBChat.conversation.get("source");
    var label = SBChat.conversation.get("label");
    code = this.profileRow(
      "conversation-id",
      SBChat.conversation.id,
      sb_("Conversation ID")
    );
    if (!SBF.null(label)) {
      code += this.profileRow(
        "conversation-label",
        label,
        sb_("Client status")
      );
    } else {
      code += this.profileRow(
        "conversation-label",
        "Unknown",
        sb_("Label")
      );
    }
    if (!SBF.null(source)) {
      // Mapping object for source labels
      const sourceLabels = {
        fb: "Facebook",
        ww: "Whatsmeow",
        wx: "waweb",        
        wa: "WhatsApp",
        tm: "Text message",
        ig: "Instagram",
        tg: "Telegram",
        tk: "Tickets",
        wc: "WeChat",
        em: "Email",
        tw: "Twitter",
        bm: "Google"
      };

      // Get the label directly from the mapping object
      const sourceLabel = sourceLabels[source] || source;
      code += this.profileRow(
        "conversation-source",
        sourceLabel,
        sb_("Source")
      );
    } else {
      code += this.profileRow("conversation-source", "Unknown");
    }
  }
  if (SB_ACTIVE_AGENT["user_type"] != "admin") {
    exclude.push("token");
  }
  for (var key in user.details) {
    if (!exclude.includes(key)) {
      code += this.profileRow(key, user.get(key));
    }
  }
  if (user.isExtraEmpty()) {
    SBF.ajax(
      {
        function: "get-user-extra",
        user_id: user.id,
      },
      (response) => {
        //added ↓
        for (var i = 1; i < response.length; i++) {
          let slug = response[i]["slug"];
          user.setExtra(slug, response[i]);
          code += this.profileRow(
            slug,
            response[i].value,
            response[i]["name"]
          );
        }
        profile_area.html(`<ul>${code}</ul>`);
        collapse(profile_area, 56);
      }
    );
  } else {
    for (var key in user.extra) {
      let info = user.getExtra(key);
      code += this.profileRow(key, info.value, info["name"]);
    }
    profile_area.html(
      `<h3 class="sb-user-details-info">${sb_(
        "User information"
      )}</h3><ul>${code}</ul>`
    );
    collapse(profile_area, 56);
  }

  // Listen for change_conversation_source
$("#change-conversation-source").change(function (e) {
  // Save the selected value before updating options
  const selectedValue = e.target.value;

  // Construct the URL using the selected source code
  const url = `${STMBX_URL}/media/apps/${selectedValue}.svg`;

  // Update the image source with the selected source
  $("#conversation-source-icon").attr("src", url);

  // Send an AJAX request to update the conversation source on the server
  SBF.ajax(
    {
      function: "update-conversation-source",
      conversation_id: SBChat.conversation.id,
      source: selectedValue, // Use the saved selected value
    },
    (response) => {
      showResponse("Required reload");
      SBChat.update();
      // Set the selected value back after updating options
      $("#change-conversation-source").val(selectedValue);
    }
  );

  // Update the source icon directly without reloading
  const iconClass = `sb-icon bi-${selectedValue}`;
  $('.sb-profile-list [data-id="conversation-source"] i').attr("class", iconClass);
});


  // $("#change-conversation-source").change(function (e) {
  //     // change icon of source type
  //     if (e.target.value !== "Unknown") {
  //         const name = e.target.options[e.target.selectedIndex].text
  //         const url = `${STMBX_URL}/media/apps/${name.toLowerCase()}.svg`;
  //         $('.sb-profile-list [data-id="conversation-source"] img').attr("src", url);
  //     }

  //     SBF.ajax({
  //         function: 'update-conversation-source',
  //         conversation_id: SBChat.conversation.id,
  //         source: e.target.value
  //     }, (response) => {
  //         showResponse('Reload to change the conversation source');
  //     });
  // });

  $("#change-conversation-labels").change(function (e) {
    // change icon of source type
    if (e.target.value !== "Unknown") {
      const name = e.target.options[e.target.selectedIndex].text;
      let labcolor = `sb-icon bi-crosshair tags-${e.target.value}`;
      $('.sb-profile-list [data-id="conversation-label"] i').attr(
        "class",
        labcolor
      );
      $(`[data-user-id="${activeUser().id}"] .bi-crosshair`).attr(
        "class",
        labcolor
      );
      $(`[data-user-id="${activeUser().id}"] #label-name`).text(name);
    }
    SBProfile.updateLabel(e.target.value);
  });

  //change label
//   $("#CstBtn a").click(function (e) {
//     const label = $(this).attr("id");
//     const name = sb_(SBF.admin_set("label-names")[label] + " ");
//     let labcolor = `sb-icon bi-crosshair tags-${label}`;
//     $('.sb-profile-list [data-id="conversation-label"] i').attr(
//       "class",
//       labcolor
//     );
//     $(`[data-user-id="${activeUser().id}"] .bi-crosshair`).attr(
//       "class",
//       labcolor
//     );
//     $(`[data-user-id="${activeUser().id}"] #label-name`).text(name);
//     SBProfile.updateLabel(label);
//   });
// },


//     getLabel: function (label) {
//       SBF.ajax(
//         {
//           function: "get-clientStatus-conversations",
//           conversation_id: SBChat.conversation.id,
//           label: label,
//         },
//         (response) => {
//           if (SBReports.active_report == "status-client") {
//             SBReports.initReport("status-client");
//           }
//         }
//       );
//     },

//     updateLabel: function (label) {
//       SBF.ajax(
//         {
//           function: "update-clientStatus-conversations",
//           conversation_id: SBChat.conversation.id,
//           label: label,
//         },
//         (response) => {
//           if (SBReports.active_report == "status-client") {
//             SBReports.initReport("status-client");
//           }
         
//         }
//       );
//     },


// Change label
$("#CstBtn a").click(function (e) {
  const label = $(this).attr("id");
  const name = sb_(SBF.admin_set("label-names")[label] + " ");
  let labcolor = `sb-icon bi-crosshair tags-${label}`;
  $('.sb-profile-list [data-id="conversation-label"] i').attr("class", labcolor);
  $(`[data-user-id="${activeUser().id}"] .bi-crosshair`).attr("class", labcolor);
  $(`[data-user-id="${activeUser().id}"] #label-name`).text(name);
  SBProfile.updateLabelUI(label, name, labcolor); // Update UI
  SBProfile.updateLabel(label);
});
},
// Update label UI
updateLabelUI: function(label, name, labcolor) {
  // Update label name and color in UI
  $(`[data-user-id="${activeUser().id}"] .bi-crosshair`).attr("class", labcolor);
  $(`[data-user-id="${activeUser().id}"] #label-name`).text(name);
},

// Get label
getLabel: function (label) {
  SBF.ajax(
    {
      function: "get-clientStatus-conversations",
      conversation_id: SBChat.conversation.id,
      label: label,
    },
    (response) => {
      if (SBReports.active_report == "status-client") {
        SBReports.initReport("status-client");
      }
    }
  );
},

// Update label
updateLabel: function (label) {
  SBF.ajax(
    {
      function: "update-clientStatus-conversations",
      conversation_id: SBChat.conversation.id,
      label: label,
    },
    (response) => {
      if (SBReports.active_report == "status-client") {
        SBReports.initReport("status-client");
      }

    }
  );
},


    profileRow: function (key, value, name = key) {
      if (value == "") return "";
      let icons = {
        id: "person-vcard",
        "conversation-label": "tag",
        "conversation-source": "tickets",
        "conversation-id": "person-vcard",
        full_name: "person-bounding-box",
        email: "envelope",
        phone: "phone",
        user_type: "person-bounding-box",
        last_activity: "calendar",
        creation_time: "calendar",
        token: "shuffle",
        currency: "currency-exchange",
        location: "pin-map",
        country: "flag",
        address: "app",
        city: "app",
        postal_code: "app",
        os: "person-workspace",
        current_url: "radar",
        timezone: "clock",

        
      };

      //added ↑
      let icon = `<i class="sb-icon bi-${
        key in icons ? icons[key] : "app"
      }"></i>`;
      let lowercase;
      let image = false;
      switch (key) {
        case "last_activity":
        case "creation_time":
          value = SBF.beautifyTime(value);
          break;
        case "user_type":
          value = SBF.slugToString(value);
          break;
        case "country_code":
        case "language":
        case "browser_language":
          icon = `<img src="${STMBX_URL}/media/flags/${value.toLowerCase()}.png" />`;
          break;
        case "browser":
          lowercase = value.toLowerCase();
          if (lowercase.includes("chrome")) {
            image = "chrome";
          } else if (lowercase.includes("edge")) {
            image = "edge";
          } else if (lowercase.includes("firefox")) {
            image = "firefox";
          } else if (lowercase.includes("opera")) {
            image = "opera";
          } else if (lowercase.includes("safari")) {
            image = "safari";
          }
          break;
        case "os":
          lowercase = value.toLowerCase();
          if (lowercase.includes("windows")) {
            image = "windows";
          } else if (
            lowercase.includes("mac") ||
            lowercase.includes("apple") ||
            lowercase.includes("ipad") ||
            lowercase.includes("iphone")
          ) {
            image = "apple";
          } else if (lowercase.includes("android")) {
            image = "android";
          } else if (lowercase.includes("linux")) {
            image = "linux";
          } else if (lowercase.includes("ubuntu")) {
            image = "ubuntu";
          }
          break;
        case "conversation-source":
        case "browser":
        case "os":
        case "conversation-source":
          image = value.toLowerCase();
          value = `<select disabled style="background: transparent;border-color: transparent;" id="change-conversation-source">
                                <option  value="tk" ${
                                  value == "Tickets" ? "selected" : ""
                                } value>Live Chat</option>
                                <option value="ww" ${
                                  value == "Whatsmeow" ? "selected" : ""
                                } value>WhatsApp QR</option>
                                <option value="wx" ${
                                  value == "waweb" ? "selected" : ""
                                } value>WhatsApp Web</option>                                
                                <option value="wa" ${
                                  value == "WhatsApp" ? "selected" : ""
                                } value>WhatsApp API</option>
                                <option   hidden value="tg" ${
                                  value == "Telegram" ? "selected" : ""
                                } value>Telegram</option>
                                <option  hidden value="bm" ${
                                  value == "Google" ? "selected" : ""
                                } value>Google</option>
                                <option  hidden value="tm" ${
                                  value == "Text message" ? "selected" : ""
                                } value>Text message</option>
                                <option hidden value="un" ${
                                  value == "Unknown" ? "selected" : ""
                                } value>Facebook</option>                                
                                <option hidden value="ig" ${
                                  value == "Instagram" ? "selected" : ""
                                } value>Instagram</option>
                                <option hidden value="wc" ${
                                  value == "WeChat" ? "selected" : ""
                                } value>WeChat</option>
                                <option hidden value="em" ${
                                  value == "Email" ? "selected" : ""
                                } value>Email</option>
                                <option  hidden value="tw" ${
                                  value == "Twitter" ? "selected" : ""
                                } value>Twitter</option>
                             </select>`;
          if (image && value !== "Unknown") {
            icon = `<img src="${STMBX_URL}/media/${
              key == "conversation-source" ? "apps" : "devices"
            }/${image}.svg" />`;
          }
          // console.log('ok');
          // console.log(this);

          break;
        case "conversation-label":
          let bgselect = value;
          let labelset = clientStatus;
          let optlist = "";

          if (Array.isArray(labelset)) {
            labelset.forEach(function (label) {
              optlist += `<option value="${label}" ${
                value === label ? "selected" : ""
              }>${sb_(SBF.get_value(label) + " ")}</option>`;
            });
          }

          // Determine the class based on the selected value
          let selectedClass = `class="sb-icon bi-crosshair tags-${bgselect}"`;

          value = `<select style="background: transparent; border-color: transparent;" id="change-conversation-labels">
								<option value='unknown'>${sb_("Client status")}</option> ${optlist} </select>`;
          icon = `<i ${selectedClass}></i>`;
      }
      return `<li data-id="${key}">${icon}<span>${sb_(
        SBF.slugToString(name)
      )}</span><label style="overflow-wrap: break-word">${value}</label></li>`;
    },

    // Populate profile edit box
    populateEdit: function (user, profile_edit_area) {
      profile_edit_area.find(".sb-details .sb-input").each((i, element) => {
        this.set(element, user.details[$(element).attr("id")]);
      });
      profile_edit_area
        .find(".sb-additional-details .sb-input")
        .each((i, element) => {
          let key = $(element).attr("id");
          if (key in user.extra) {
            this.set(element, user.extra[key].value);
          } else {
            this.set(element, "");
          }
        });
    },

    // Clear the profile edit area
    clear: function (profile_edit_area) {
      SBForm.clear(profile_edit_area);
    },

    // Check for errors on user input
    errors: function (profile_edit_area) {
      return SBForm.errors(profile_edit_area.find(".sb-details"));
    },

    // Display a error message
    showErrorMessage: function (profile_edit_area, message) {
      SBForm.showErrorMessage(profile_edit_area, message);
    },

    // Agents data area
    agentData: function () {
      let code = `<div class="sb-title">${sb_(
        "Feedback rating"
      )}</div><div class="sb-rating-area sb-loading"></div>`;
      let area = profile_box.find(".sb-agent-area");
      area.html(code);
      SBF.ajax(
        {
          function: "get-rating",
        },
        (response) => {
          if (response[0] == 0 && response[1] == 0) {
            code = `<p class="sb-no-results">${sb_("No ratings yet.")}</p>`;
          } else {
            let total = response[0] + response[1];
            let positive = (response[0] * 100) / total;
            let negative = (response[1] * 100) / total;
            code = `<div><div>${sb_("Helpful")}</div><span data-count="${
              response[0]
            }" style="width: ${Math.round(
              positive * 2
            )}px"></span><div>${positive.toFixed(
              2
            )} %</div></div><div><div>${sb_(
              "Not helpful"
            )}</div><span data-count="${
              response[1]
            }" style="width: ${Math.round(
              negative * 2
            )}px"></span><div>${negative.toFixed(
              2
            )} %</div></div><p class="sb-rating-count">${total} ${sb_(
              "Ratings"
            )}</p>`;
          }
          area.find(".sb-rating-area").html(code).sbLoading(false);
        }
      );
    },

    boxClasses: function (box, user_type = false) {
      $(box)
        .removeClass(
          "sb-type-admin sb-type-agent sb-type-lead sb-type-user sb-type-visitor"
        )
        .addClass(
          `${user_type != false ? `sb-type-${user_type}` : ""} sb-agent-${
            SB_ACTIVE_AGENT["user_type"]
          }`
        );
    },

    updateRequiredFields: function (user_type) {
      let agent = SBF.isAgent(user_type);
      profile_edit_box.find("#password input").prop("required", agent);
      profile_edit_box
        .find("#email input")
        .prop(agent || user_type == "user" || user_type == "lead");
    },
  };

  /*
   * ----------------------------------------------------------
   * # Init
   * ----------------------------------------------------------
   */

  var SBAdmin = {
    dialog: dialog,
    open_popup: false,
    must_translate: false,
    is_logout: false,
    conversations: SBConversations,
    users: SBUsers,
    settings: SBSettings,
    profile: SBProfile,
    apps: SBApps,
  };
  window.SBAdmin = SBAdmin;

  $(document).ready(function () {
    admin = $(".sb-admin");
    header = admin.find("> .sb-header");
    conversations_area = admin.find(".sb-area-conversations");
    conversations_admin_list = conversations_area.find(".sb-admin-list");
    conversations_admin_list_ul =
      conversations_admin_list.find(".sb-scroll-area ul");
    conversations_filters = conversations_admin_list.find(".sb-select");
    users_area = admin.find(".sb-area-users");
    users_table = users_area.find(".sb-table-users");
    users_table_menu = users_area.find(".sb-menu-users");
    profile_box = admin.find(".sb-profile-box");
    profile_edit_box = admin.find(".sb-profile-edit-box");
    settings_area = admin.find(".sb-area-settings");
    automations_area = settings_area.find(".sb-automations-area");
    conditions_area = automations_area.find(".sb-conditions");
    automations_area_select = automations_area.find(" > .sb-select");
    automations_area_nav = automations_area.find(" > .sb-tab > .sb-nav > ul");
    reports_area = admin.find(".sb-area-reports");
    articles_area = settings_area.find(".sb-articles-area");
    articles_category_selects = articles_area.find(
      ".sb-article-categories select"
    );
    articles_category_parent_select = articles_area.find(
      ".sb-article-parent-category select"
    );
    saved_replies = conversations_area.find(".sb-replies");
    chat_status = conversations_area.find(".sb-status-chat");
    overlay = admin.find(".sb-lightbox-overlay");
    SITE_URL =
      typeof STMBX_URL != ND
        ? STMBX_URL.substr(0, STMBX_URL.indexOf("-content") - 3)
        : "";
    notes_panel = conversations_area.find(".sb-panel-notes");
    tags_panel = conversations_area.find(".sb-panel-tags");
    attachments_panel = conversations_area.find(".sb-panel-attachments");
    direct_message_box = admin.find(".sb-direct-message-box");
    dialogflow_intent_box = admin.find(".sb-dialogflow-intent-box");
    suggestions_area = conversations_area.find(".sb-editor > .sb-suggestions");

    // Browser history
    window.onpopstate = function () {
      admin.sbHideLightbox();
      if (
        responsive &&
        conversations_area.sbActive() &&
        conversations_area.find(".sb-conversation").sbActive()
      ) {
        SBConversations.mobileCloseConversation();
      }
      if (SBF.getURL("user")) {
        if (!users_area.sbActive())
          header.find(".sb-admin-nav #sb-users").click();
        SBProfile.show(SBF.getURL("user"));
      } else if (SBF.getURL("area")) {
        header.find(".sb-admin-nav #sb-" + SBF.getURL("area")).click();
      } else if (SBF.getURL("conversation")) {
        if (!conversations_area.sbActive())
          header.find(".sb-admin-nav #sb-conversations").click();
        SBConversations.openConversation(SBF.getURL("conversation"));
      } else if (SBF.getURL("setting")) {
        if (!settings_area.sbActive())
          header.find(".sb-admin-nav #sb-settings").click();
        settings_area.find("#tab-" + SBF.getURL("setting")).click();
      } else if (SBF.getURL("report")) {
        if (!reports_area.sbActive())
          header.find(".sb-admin-nav #sb-reports").click();
        reports_area.find("#" + SBF.getURL("report")).click();
      }
    };

    if (SBF.getURL("area")) {
      setTimeout(() => {
        header.find(".sb-admin-nav #sb-" + SBF.getURL("area")).click();
      }, 300);
    }

    // Installation
    if (typeof SB_ADMIN_SETTINGS == ND) {
      let area = admin.find(".sb-intall");
      $(admin).on("click", ".sb-submit-installation", function () {
        if (loading(this)) return;
        let message = false;
        let account = area.find("#first-name").length;
        if (SBForm.errors(area)) {
          message = account
            ? "All fields are required. Minimum password length is 8 characters. Be sure you have entered a valid email."
            : "All fields are required.";
        } else {
          if (
            account &&
            area.find("#password input").val() !=
              area.find("#password-check input").val()
          ) {
            message = "The passwords do not match.";
          } else {
            let url = window.location.href
              .replace("/admin", "")
              .replace(".php", "")
              .replace(/#$|\/$/, "");
            if (url.includes("?")) url = url.substr(0, url.indexOf("?"));
            $.ajax({
              method: "POST",
              url: url + "/include/ajax.php",
              data: {
                function: "installation",
                details: $.extend(SBForm.getAll(area), {
                  url: url,
                }),
              },
            }).done((response) => {
              response = JSON.parse(response);
              if (response != false) {
                response = response[1];
                if (response === true) {
                  setTimeout(() => {
                    window.location.href = url + "?refresh=true";
                  }, 1000);
                  return;
                } else {
                  switch (response) {
                    case "connection-error":
                      message =
                        "Routin.bot cannot connect to the database. Please check the database information and try again.";
                      break;
                    case "missing-details":
                      message =
                        "Missing database details! Please check the database information and try again.";
                      break;
                    case "missing-url":
                      message = "We cannot get the plugin URL.";
                      break;
                    default:
                      message = response;
                  }
                }
              } else {
                message = response;
              }
              if (message !== false) {
                SBForm.showErrorMessage(area, message);
                $("html, body").animate(
                  {
                    scrollTop: 0,
                  },
                  500
                );
              }
              $(this).sbLoading(false);
            });
          }
        }
        if (message !== false) {
          SBForm.showErrorMessage(area, message);
          $("html, body").animate(
            {
              scrollTop: 0,
            },
            500
          );
          $(this).sbLoading(false);
        }
      });
      return;
    }

    // Initialization
    if (!admin.length) return;
    loadingGlobal();
    admin.removeAttr("style");
    if (isPWA()) {
      admin.addClass("sb-pwa");
    }

    if (localhost) {
      clearCache();
    }
    if (admin.find(" > .sb-rich-login").length) {
      return;
    }
    if (SB_ADMIN_SETTINGS["pusher"]) {
      SBPusher.active = true;
      SBPusher.init(() => {
        SBPusher.presence(1, () => {
          SBUsers.updateUsersActivity();
        });
        SBPusher.event(
          "update-conversations",
          () => {
            SBConversations.update();
            SBChat.update(); //added to update incoming message
          },
          "agents"
        );
        SBPusher.event(
          "set-agent-status",
          (response) => {
            if (response.agent_id == SB_ACTIVE_AGENT["id"]) {
              SBUsers.setActiveAgentStatus(response.status == "online");
            }
          },
          "agents"
        );
        initialization();
      });
    } else {
      initialization();
      setInterval(function () {
        SBUsers.updateUsersActivity();
      }, 10000);
    }
    SBUsers.table_extra = users_table
      .find("th[data-extra]")
      .map(function () {
        return $(this).attr("data-field");
      })
      .get();

    // On Routin.bot close
    $(window).on("beforeunload", function () {
      if (activeUser())
        SBF.ajax({
          function: "on-close",
        });
    });

    // Keyboard shortcuts
    $(window).keydown(function (e) {
      let code = e.which;
      let valid = false;

      if ([13, 27, 46].includes(code)) {
        if (admin.find(".sb-dialog-box").sbActive()) {
          let target = admin.find(".sb-dialog-box");
          switch (code) {
            case 46:
            case 27:
              target.find(".sb-cancel").click();
              break;
            case 32:
            case 13:
              target
                .find(
                  target.attr("data-type") != "info"
                    ? ".sb-confirm"
                    : ".sb-close"
                )
                .click();
              break;
          }
          valid = true;
        } else if ([46].includes(code) && conversations_area.sbActive()) {
          if (conversations_area.find(".sb-editor textarea").is(":focus"))
            return;
          let target = conversations_area.find(" > div > .sb-conversation");
          target
            .find(
              '.sb-top [data-value="' +
                (target.attr("data-conversation-status") == 3
                  ? "delete"
                  : "archive") +
                '"]'
            )
            .click();
          valid = true;
        } else if ([46, 27].includes(code)) {
          if (admin.find(".sb-lightbox").sbActive()) {
            admin.sbHideLightbox();
            valid = true;
          } else {
            let target = admin.find(".sb-search-btn.sb-active");
            if (target.length) {
              target.find("i").click();
              valid = true;
            }
          }
        }
        if (valid) {
          e.preventDefault();
        }
      }
    });

    // Check if the admin is active
    $(document).on("click keydown mousemove", function () {
      SBF.debounce(
        function () {
          if (!SBChat.tab_active) {
            SBF.visibilityChange();
          }
          SBChat.tab_active = true;
          clearTimeout(active_interval);
          active_interval = setTimeout(() => {
            SBChat.tab_active = false;
          }, 10000);
        },
        "#3",
        8000
      );
    });

    // Image from clipboard - screenshot
    var imgcounter = 0;
    document.onpaste = function (pasteEvent) {
      let item = pasteEvent.clipboardData.items[0];
      if (item.type.indexOf("image") === 0) {
        var reader = new FileReader();
        reader.onload = function (event) {};
        var fd = new FormData();
        var fileName = `screenshot-${imgcounter++}.png`;
        var file = item.getAsFile();
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
        reader.readAsDataURL(item.getAsFile());
      }
    };

    $(document).ready(function () {
      $(header).on("click", ".help-center", function () {
        let box = admin.find(".sb-updates-box");
        box.sbShowLightbox();
      });

      // $(admin).on('click', '.sb-updates-box .sb-update', function () {
      // 	let box = admin.find('.sb-updates-box');
      // 	SBF.ajax({
      // 		function: 'update',
      // 		domain: STMBX_URL
      // 	}, (response) => {
      // 		let error = '';
      // 		showResponse('Update completed.');
      // 		$(this).sbLoading(false);
      // 	});
      // });
    });

    // Desktop and flash notifications
    if (
      typeof Notification !== ND &&
      (SB_ADMIN_SETTINGS["desktop-notifications"] == "all" ||
        SB_ADMIN_SETTINGS["desktop-notifications"] == "agents") &&
      !SB_ADMIN_SETTINGS["push-notifications"]
    ) {
      SBConversations.desktop_notifications = true;
    }

    if (
      SB_ADMIN_SETTINGS["flash-notifications"] == "all" ||
      SB_ADMIN_SETTINGS["flash-notifications"] == "agents"
    ) {
      SBConversations.flash_notifications = true;
    }

    // Cron jobs
    if (today.getDate() != SBF.storage("admin-clean")) {
      setTimeout(function () {
        SBF.ajax({
          function: "cron-jobs",
        });
        SBF.storage("admin-clean", today.getDate());
      }, 10000);
    }

    // Collapse button
    $(admin).on("click", ".bi-chevron-down", function () {
      let active = $(this).sbActive();
      let height = active ? $(this).parent().data("height") + "px" : "";
      $(this).html(sb_(active ? "View more" : "Close"));
      $(this).parent().find("> div, > ul").css({
        height: height,
        "max-height": height,
      });
      $(this).sbActive(!active);
    });

    // Close lightbox popup
    $(admin).on("click", ".sb-popup-close", function () {
      admin.sbHideLightbox();
    });

    /*
     * ----------------------------------------------------------
     * # Responsive
     * ----------------------------------------------------------
     */

    if (admin) {
      $(document).on("click", function (event) {
        // Check if the clicked element is not within .sb-menu-mobile and .open-details
        if (!$(event.target).closest(".sb-menu-mobile").length) {
          $(".sb-menu-mobile > i").removeClass("sb-active");
          $(".open-profile").removeClass("sb-hide");
        }
      });

      $(admin).on("click", ".sb-menu-mobile > i", function () {
        $(this).toggleClass("sb-active");
        SBAdmin.open_popup = $(this).parent();
      });

      $(admin).on("click", ".sb-menu-mobile a", function () {
        $(this).closest(".sb-menu-mobile").find(" > i").sbActive(false);
      });

      $(admin).on("click", ".sb-menu-wide,.sb-nav", function () {
        $(this).toggleClass("sb-active");
      });

      $(admin).on(
        "click",
        ".sb-menu-wide > ul > li, .sb-nav > ul > li",
        function (e) {
          let menu = $(this).parent().parent();
          menu.find("li").sbActive(false);
          menu
            .find("> div:not(.sb-menu-wide):not(.sb-btn)")
            .html($(this).html());
          menu.sbActive(false);
          if (menu.find("> .sb-menu-wide").length) {
            menu
              .closest(".sb-scroll-area")
              .scrollTop(
                menu.next()[0].offsetTop -
                  (admin.hasClass("sb-header-hidden") ? 70 : 130)
              );
          }
          e.preventDefault();
          return false;
        }
      );

      $(admin)
        .find(
          ".sb-admin-list .sb-scroll-area, main > div > .sb-scroll-area,.sb-area-settings > .sb-tab > .sb-scroll-area,.sb-area-reports > .sb-tab > .sb-scroll-area"
        )
        .on("scroll", function () {
          let scroll = $(this).scrollTop();
          if (scrolls["last"] < scroll - 10 && scrolls["header"]) {
            admin.addClass("sb-header-hidden");
            scrolls["header"] = false;
          } else if (
            scrolls["last"] > scroll + 10 &&
            !scrolls["header"] &&
            !scrolls["always_hidden"]
          ) {
            admin.removeClass("sb-header-hidden");
            scrolls["header"] = true;
          }
          scrolls["last"] = scroll;
        });

        $(admin).on("click", ".sb-search-btn i, .sb-filter-btn i", function () {
          if ($(this).parent().sbActive()) {
              // If the search or filter button is active
              $(".sb-top").css("top", "+=0px"); // Add 75px to top position
              if ($(this).parent().hasClass("sb-filter-btn")) {
                  $(".sb-search-btn, .inbox, .non-hover").addClass("sb-hide");
              }
              // Change the icon to bi-arrow-right-circle
              if ($(this).hasClass("bi-search")) {
                  $(this).removeClass("bi-search").addClass("bi-x-lg");
              } else if ($(this).hasClass("bi-x-lg")) {
                  $(this).removeClass("bi-x-lg").addClass("bi-filter");
              } else if ($(this).hasClass("bi-filter")) {
                  $(this).removeClass("bi-filter").addClass("bi-filter-circle");
              }
          } else {
              // If the search or filter button is not active
              scrolls["always_hidden"] = false;
              if (conversations_admin_list_ul.parent().scrollTop() < 10) {
                  admin.removeClass("sb-header-hidden");
                  if ($(this).parent().hasClass("sb-filter-btn")) {
                      $(".sb-search-btn, .inbox, .non-hover").removeClass("sb-hide");
                  }
                  // Change the icon back to bi-search
                  if ($(this).hasClass("bi-filter-circle")) {
                      $(this).removeClass("bi-filter-circle").addClass("bi-filter");
                  } else if ($(this).hasClass("bi-filter")) {
                      $(this).removeClass("bi-filter").addClass("bi-x-lg");
                  } else if ($(this).hasClass("bi-x-lg")) {
                      $(this).removeClass("bi-x-lg").addClass("bi-search");
                  }
              }
          }
      });
      

      $(admin).on("click", "#open-modal-button", function () {
        console.log("open", admin.find(".sb-send-template-box"));
        admin.find(".sb-send-template-box").sbShowLightbox();
      });

      $(admin).on("click", "#meta-broadcast-button", function () {
        console.log("open");
        admin.find(".meta-broadcast-box").sbShowLightbox();
      });

      $(admin).on("click", ".sb-top .sb-btn-back", function () {
        SBConversations.mobileCloseConversation();
      });

      if ($(window).width() < 555) {
        $(users_table).find("th:first-child").html(sb_("Order by"));
      }

      $(users_table).on("click", "th:first-child", function () {
        $(this).parent().toggleClass("sb-active");
      });
    }

    //hide conversation list
    $(conversations_area).on(
      "click",
      "> .sb-btn-collapse, .collapse",
      function () {
        $(this).toggleClass("sb-active");
        conversations_area
          .find($(this).hasClass("sb-left") ? ".sb-admin-list" : ".sb-top")
          .toggleClass("sb-active");
      }
    );

    $(conversations_area).on("click", ".sb-conversation", function () {
      $(
        ".sb-admin-list, .sb-btn-collapse.sb-left.bi-arrow-left-short.sb-active"
      ).removeClass("sb-active");
    });

    //hide user-details
    $(conversations_area).on("click", ".sb-list, .sb-editor", function () {
      $(
        ".sb-admin-list, .sb-btn-collapse.sb-left.bi-arrow-left-short.sb-active"
      ).removeClass("sb-active");
      $(".sb-user-details.sb-top.sb-active, .sb-top.sb-active").removeClass(
        "sb-active"
      );
    });
    /*
     * ----------------------------------------------------------
     * # Left nav
     * ----------------------------------------------------------
     */

    $(header).on("click", " .sb-admin-nav a", function () {
      let id = $(this).attr("id");
      header.find(".sb-admin-nav a").sbActive(false);
      admin.find(" > main > div").sbActive(false);
      admin
        .find("." + $(this).attr("id").replace("sb-", "sb-area-"))
        .sbActive(true);
      $(this).sbActive(true);
      SBF.deactivateAll();

      switch (id) {
        case "sb-conversations":
          if (!responsive && !SBF.getURL("conversation")) {
            SBConversations.clickFirst();
          }
          SBConversations.update();
          SBConversations.startRealTime();
          SBUsers.stopRealTime();
          break;
        case "sb-users":
          SBUsers.startRealTime();
          SBConversations.stopRealTime();
          if (!SBUsers.init) {
            loadingGlobal();

            users_pagination = 1;
            users_pagination_count = 1;
            SBF.ajax(
              {
                function: "get-users",
                user_types: ["user", "visitor", "lead"],
                extra: SBUsers.table_extra,
              },
              (response) => {
                SBUsers.populate(response);
                SBUsers.updateMenu();
                SBUsers.init = true;
                SBUsers.datetime_last_user = SBF.dateDB("now");
                loadingGlobal(false);
              }
            );
          }
          break;
        case "sb-settings":
          if (!SBSettings.init) {
            loadingGlobal();
            SBF.ajax(
              {
                function: "get-all-settings",
              },
              (response) => {
                if (response) {
                  let translations = response["external-settings-translations"];
                  SBSettings.initHTML(response);
                  SBSettings.translations.translations =
                    Array.isArray(translations) && !translations.length
                      ? {}
                      : translations;
                  delete response["external-settings-translations"];
                  for (var key in response) {
                    SBSettings.set(key, response[key]);
                  }
                }
                SBSettings.initPlugins();
                SBSettings.init = true;
                loadingGlobal(false);
              }
            );
          }
          SBUsers.stopRealTime();
          SBConversations.stopRealTime();
          break;
        case "sb-reports":
          if (reports_area.sbLoading()) {
            $.getScript(STMBX_URL + "/vendor/moment.min.js", () => {
              $.getScript(STMBX_URL + "/vendor/daterangepicker.min.js", () => {
                $.getScript(STMBX_URL + "/vendor/chart.min.js", () => {
                  SBReports.initDatePicker();
                  SBReports.initReport("conversations");
                  reports_area.sbLoading(false);
                });
              });
            });
          }
          SBUsers.stopRealTime();
          SBConversations.stopRealTime();
          break;
      }
      let slug = id.substr(3);
      let url_area = SBF.getURL("area");
      //current selected reports activate url
      if (slug == "reports") {
        $("#" + SBReports.active_report).click();
      }
      if (
        url_area != slug &&
        ((slug == "conversations" && !SBF.getURL("conversation")) ||
          (slug == "users" && !SBF.getURL("user")) ||
          (slug == "settings" && !SBF.getURL("setting")) ||
          (slug == "reports" && !SBF.getURL("report")))
      )
        pushState("?area=" + slug);
    });

    $(header).on("click", ".sb-profile", function () {
      $(this).next().toggleClass("sb-active");
    });

    $(header).on("click", '[data-value="logout"],.logout', function () {
      SBAdmin.is_logout = true;
      SBF.ajax({
        function: "on-close",
      });
      SBUsers.stopRealTime();
      SBConversations.stopRealTime();
      SBF.logout();
    });

    $(header).on(
      "click",
      '[data-value="edit-profile"],.edit-profile',
      function () {
        loadingGlobal();
        let user = new SBUser({
          id: SB_ACTIVE_AGENT["id"],
        });
        user.update(() => {
          activeUser(user);
          conversations_area.find(".sb-board").addClass("sb-no-conversation");
          conversations_admin_list_ul.find(".sb-active").sbActive(false);
          SBProfile.showEdit(user);
        });
      }
    );

    $(header).on("click", '[data-value="status"]', function () {
      SBUsers.setActiveAgentStatus(!$(this).hasClass("sb-online"));
    });

    $(header)
      .find(".sb-account")
      .setProfile(
        SB_ACTIVE_AGENT["full_name"],
        SB_ACTIVE_AGENT["profile_image"]
      );

    /*
     * ----------------------------------------------------------
     * # Conversations area
     * ----------------------------------------------------------
     */

    // Open the conversation clicked on the left menu
    $(conversations_admin_list_ul).on("click", "li", function () {
      new SBMessage().setLoad(30);

      SBConversations.openConversation(
        $(this).attr("data-conversation-id"),
        $(this).attr("data-user-id"),
        false
      );
      SBF.deactivateAll();
    });

    // Open the user conversation clicked on the bottom right area or user profile box
    $(admin).on("click", ".sb-user-conversations li", function () {
      SBConversations.openConversation(
        $(this).attr("data-conversation-id"),
        activeUser().id,
        $(this).attr("data-conversation-status")
      );
    });

    // Archive, delete or restore conversations
    $(conversations_area).on("click", ".sb-top ul a", function () {
      let status_code = -1;
      let message = "The conversation will be ";
      let value = $(this).attr("data-value");
      let chat_html = document.querySelectorAll(
        "ul.sorting-by-last-message li"
      );
      let conversation_id = SBChat.conversation.id;

      switch (value) {
        case "inbox":
          status_code = 0;
          message += "restored.";
          break;
        case "archive":
          message += "archived.";
          status_code = 3;
          break;
        case "follow-up":
          message += "assigned for follow-up.";
          status_code = 6;
          break;
        case "delete":
          message += "moved to the Bot container. Bot flow restarted.";
          status_code = 4;
          break;
        case "empty-trash":
          status_code = 5;
          message =
            "The bot will permanently delete all conversations in the container, including their messages.";
          break;
        case "transcript":
          SBConversations.transcript(
            conversation_id,
            $(this).attr("data-action")
          );
          break;
        case "read":
          status_code = 0;
          message += "marked as read.";
          break;
        case "unread":
          status_code = 2;
          message += "marked as unread.";
          break;
      }

      if (status_code != -1) {
        dialog(message, "alert", function () {
          SBF.ajax(
            {
              function: "update-conversation-status",
              conversation_id: conversation_id,
              status_code: status_code,
            },
            () => {
              // Update conversation status in the UI
              if ([0, 3, 4, 6].includes(status_code)) {
                for (var i = 0; i < conversations.length; i++) {
                  if (conversations[i]["conversation_id"] == conversation_id) {
                    conversations[i]["conversation_status_code"] = status_code;
                    break;
                  }
                }
              }

              // Additional logic for specific actions
              if (SB_ADMIN_SETTINGS["close-message"] && status_code == 3) {
                SBF.ajax({
                  function: "close-message",
                  conversation_id: conversation_id,
                  bot_id: SB_ADMIN_SETTINGS["bot-id"],
                });
                if (SB_ADMIN_SETTINGS["close-message-transcript"])
                  SBConversations.transcript(conversation_id, "email");
              }
              if ([0, 2].includes(status_code)) {
                conversations_admin_list_ul
                  .find(".sb-active")
                  .attr("data-conversation-status", status_code);
                SBConversations.setReadIcon(status_code);
              }
              if (value == "inbox" || ![0, 2].includes(status_code)) {
                conversations_filters.eq(0).find("li.sb-active").click();
                conversations_filters.eq(0).find("ul").sbActive(false);
              }
              if (SBApps.is("slack") && [3, 4].includes(status_code)) {
                SBF.ajax({
                  function: "archive-slack-channels",
                  conversation_user_id: SBChat.conversation.get("user_id"),
                });
              }
            }
          );
          if (SBChat.conversation && SBChat.conversation.id == conversation_id)
            SBChat.conversation.set("conversation_status_code", status_code);
        });
      }
    });

    // new function added to switch on click each li read unread icon
    $(function () {
      $(conversations_area).on(
        "click",
        'ul.sorting-by-last-message li[data-conversation-status="2"]',
        function () {
          // Extract conversation ID and other necessary data
          const conversation_id = $(this).attr("data-conversation-id");
          const status_code = 0; // ORIGINALLY 0 (inbox) Change to the desired new status code

          // Perform an AJAX call to update the conversation status
          SBF.ajax(
            {
              function: "update-conversation-status",
              conversation_id: conversation_id,
              status_code: status_code,
            },
            function () {
              // Update the UI or perform any additional actions after the status update
              $(this).attr("data-conversation-status", status_code);
              conversations_admin_list_ul
                .find(".sb-active")
                .attr("data-conversation-status", status_code);
              SBConversations.setReadIcon(status_code);
            }
          );

          // Shorten text content in elements with class "sb-name span-profile-detail"
          const nameElement = $(this).find(".sb-name.span-profile-detail");
          const text = nameElement.text();
          if (text.length > 20) {
            nameElement.text(text.slice(0, 17) + "...");
          }
        }
      );

      $(conversations_area).on("click", ".sb-top .open-profile", function () {
        $([conversations_area.find(".sb-user-details"), this]).toggleClass(
          "sb-active"
        );
      });
    });

    // Saved replies
    SBF.ajax(
      {
        function: "saved-replies",
      },
      (response) => {
        let code = `<p class="sb-no-results">${sb_(
          "No saved replies found. Add new saved replies via Settings > Admin"
        )}</p>`;
        if (Array.isArray(response)) {
          if (response.length > 0 && response[0]["reply-name"]) {
            code = "";
            saved_replies_list = response;
            for (var i = 0; i < response.length; i++) {
              code += `<li><div>${"/" + response[i]["reply-name"]}</div><div>${
                response[i]["reply-text"]
              }</div></li>`;
            }
          }
        }
        saved_replies.find(".sb-replies-list > ul").html(code).sbLoading(false);
      }
    );

    $(conversations_area).on("click", ".bi-envelope-arrow-up", function () {
      saved_replies.sbTogglePopup(this);
    });

    $(saved_replies).on("click", ".sb-replies-list li", function () {
      SBChat.insertText($(this).find("div:last-child").html());
      SBF.deactivateAll();
      admin.removeClass("sb-popup-active");
    });

    $(saved_replies).on("input", ".sb-search-btn input", function () {
      let search = $(this).val().toLowerCase();
      SBF.search(search, () => {
        let code = "";
        let all = search.length > 1 ? false : true;
        for (var i = 0; i < saved_replies_list.length; i++) {
          if (
            all ||
            saved_replies_list[i]["reply-name"]
              .toLowerCase()
              .includes(search) ||
            saved_replies_list[i]["reply-text"].toLowerCase().includes(search)
          ) {
            code += `<li><div>${saved_replies_list[i]["reply-name"]}</div><div>${saved_replies_list[i]["reply-text"]}</div></li>`;
          }
        }
        saved_replies.find(".sb-replies-list > ul").html(code);
      });
    });

    $(conversations_area).on("click", ".bi-crosshair", function () {
      chat_status.sbTogglePopup(this);
    });

    // Pagination for conversations
    $(conversations_admin_list)
      .find(".sb-scroll-area")
      .on("scroll", function () {
        if (
          !is_busy &&
          !SBConversations.is_search &&
          scrollPagination(this, true) &&
          pagination_count
        ) {
          let parent = conversations_area.find(".sb-admin-list");
          let filters = SBConversations.filters();
          is_busy = true;
          parent.append('<div class="sb-loading-global sb-loading"></div>');
          SBF.ajax(
            {
              function: "get-conversations",
              pagination: pagination,
              status_code: filters[0],
              user_type: "agent",
              department: filters[1],
              source: filters[2],
              tag: filters[3], //no
            },
            (response) => {
              setTimeout(() => {
                is_busy = false;
              }, 500);
              pagination_count = response.length;
              response.sort(function (a, b) {
                return (
                  new Date(b.creation_time).getTime() -
                  new Date(a.creation_time).getTime()
                );
              });
              if (pagination_count) {
                let code = "";
                for (var i = 0; i < pagination_count; i++) {
                  code += SBConversations.getListCode(response[i], "append");
                  conversations.push(response[i]);
                }
                pagination++;
                conversations_admin_list_ul.append(code);
                // SBConversations.update(); // added now
                SBConversations.positionList();

                scrollPagination(this, false, 1000);
              }
              parent.find(" > .sb-loading").remove();
              SBF.event("SBAdminConversationsLoaded", {
                conversations: response,
              });
            }
          );
        }
      });

    // Event: message deleted
    $(document).on("SBMessageDeleted", function () {
      let last_message = SBChat.conversation.getLastMessage();

      if (last_message != false) {
        let conversation_id = last_message.details.conversation_id;
        let last_time = new Date(last_message.details.creation_time).getTime();
        SBConversations.newMsgTop(last_message.details, "add");
        conversations_admin_list_ul
          .find("li.sb-active p")
          .html(last_message.message);
        conversations_admin_list_ul
          .find("li.sb-active .sb-profile .sb-time")
          .html(last_message.details.creation_time);
      } else {
        SBConversations.newMsgTop(
          { conversation_id: SBChat.conversation.id },
          "deleted"
        );
        conversations_admin_list_ul.find("li.sb-active").remove();
        SBConversations.clickFirst();
        SBConversations.scrollTo();
      }
    });

    // Event: message sent
    $(document).on("SBMessageSent", function (e, response) {
      let conversation_id = response.conversation_id;
      let item = conversations_admin_list_ul.find(
        `[data-conversation-id="${conversation_id}"]`
      );
      let message_part = sb_("Error. Message not sent to");
      let conversation = response.conversation;
      let user = response.user;
      if (response.message) {
        item.find("p").html(response.message);
      }
      if (response["conversation_status_code"] != -1) {
        item.attr(
          "data-conversation-status",
          response.conversation_status_code
        );
        SBConversations.updateMenu();
      }
      if (SBApps.messenger.check(conversation)) {
        SBApps.messenger.send(
          user.getExtra("facebook-id").value,
          conversation.get("extra"),
          response.message,
          response.attachments,
          response.message_id,
          (response) => {
            if (response && "error" in response) {
              dialog(
                message_part + " Messenger: " + response.error.message,
                "info"
              );
            }
          }
        );
      }

      var ratequs = SBF.get_value(
        SBF.admin_set("rate-and-review")["rate-review"]
      );
      if (SBApps.whatsapp.check(conversation)) {
        SBApps.whatsapp.send(
          SBApps.whatsapp.activeUserPhone(user),
          response.message === "[rating]" ? ratequs : response.message,
          response.attachments,
          conversation.get("extra"),
          (response) => {
            // Log the response to the console
            // console.log("Server response:", response);

            // Check if the response indicates success
            if (response && !response.error) {
              showResponse(
                "<i class='bi-wind'></i> Message ent successfully"
              );
            } else {
              showResponse(
                "<i class='bi-send-exclamation'></i> Message could not be sent to API Cloud",
                "warning"
              );
            }
          },
          (error) => {
            showResponse(
              "<i class='bi-info-circle'></i> Failed to send message. Please try again later",
              "warning"
            );
            console.error("Error sending message to WhatsApp:", error);
          }
        );
      }

      var ratequs = SBF.get_value(
        SBF.admin_set("rate-and-review")["rate-review"]
      );
      if (SBApps.whatsmeow.check(conversation)) {
        const messageId = response.message_id;

        if (response.message == "[rating]") {
          response.message = ratequs;
        }

        SBApps.whatsmeow.send(
          SBApps.whatsapp.activeUserPhone(user),
          response.message,
          response.attachments,
          conversation.get("extra"),
          (response) => {
            if (response.status) {
              showResponse(
                "<i class='bi-whatsapp'></i> Message Sent to WhatsApp mobile"
              );
            } else {
              showResponse(
                "<i class='bi-send-exclamation'></i> Message could not be sent. Please check your connection. ",
                "warning"
              );
            }
          },
          (error) => {
            showResponse(
              "<i class='bi-info-circle'></i> Error with WhatsApp API. Please check your connection. ",
              "error"
            );
            // console.error("Error sending message to WhatsApp:", error);
          }
        );
      }

      var ratequs = SBF.get_value(
        SBF.admin_set("rate-and-review")["rate-review"]
      );
      if (SBApps.waweb.check(conversation)) {
        const messageId = response.message_id;

        if (response.message == "[rating]") {
          response.message = ratequs;
        }

        SBApps.waweb.send(
          SBApps.whatsapp.activeUserPhone(user),
          response.message,
          response.attachments,
          conversation.get("extra"),
          (response) => {
            if (response.status) {
              showResponse(
                "<i class='bi-whatsapp'></i> Message Sent to WhatsApp mobile"
              );
            } else {
              showResponse(
                "<i class='bi-send-exclamation'></i> Message could not be sent. Please check your connection. ",
                "warning"
              );
            }
          },
          (error) => {
            showResponse(
              "<i class='bi-info-circle'></i> Error with WhatsApp API. Please check your connection. ",
              "error"
            );
            // console.error("Error sending message to WhatsApp:", error);
          }
        );
      }      

      if (SBApps.telegram.check(conversation)) {
        if (response.message == "[rating]") {
          response.message = ratequs;
        }
        SBApps.telegram.send(
          conversation.get("extra"),
          response.message,
          response.attachments,
          (response) => {
            if (!("ok" in response) || !response.ok) {
              dialog(
                message_part + " Telegram: " + JSON.stringify(response),
                "info"
              );
            }
          }
        );
      }

      if (SBApps.twitter.check(conversation)) {
        if (response.message == "[rating]") {
          response.message = ratequs;
        }
        SBApps.twitter.send(
          user.getExtra("twitter-id").value,
          response.message,
          response.attachments,
          (response_2) => {
            if (response_2 && !("event" in response_2)) {
              dialog(JSON.stringify(response_2), "info");
            } else if (response.attachments.length > 1) {
              showResponse(
                "Only the first attachment was sent to Twitter.",
                "info"
              );
            }
          }
        );
      }
      if (SBApps.gbm.check(conversation)) {
        if (response.message == "[rating]") {
          response.message = ratequs;
        }
        SBApps.gbm.send(
          user.getExtra("gbm-id").value,
          response.message,
          response.attachments,
          (response) => {
            if (response[0] && "error" in response[0]) {
              dialog(
                message_part + " Google: " + response[0].error.message,
                "info"
              );
            }
          }
        );
      }

      if (SB_ADMIN_SETTINGS["smart-reply"]) {
        suggestions_area.html("");
      }
      if (
        SB_ADMIN_SETTINGS["assign-conversation-to-agent"] &&
        SBF.null(conversation.get("agent_id"))
      ) {
        SBConversations.assignAgent(
          conversation_id,
          SB_ACTIVE_AGENT["id"],
          () => {
            if (SBChat.conversation.id == conversation_id) {
              SBChat.conversation.set("agent_id", SB_ACTIVE_AGENT["id"]);
              $(conversations_area)
                .find("#conversation-agent > p")
                .attr("data-value", SB_ACTIVE_AGENT["id"])
                .html(SB_ACTIVE_AGENT["full_name"]);
            }
          }
        );
      }
    });

    // Event: new message of active chat conversation received
    $(document).on("SBNewMessagesReceived", function (e, response) {
      let payload = response.get("payload");

      let area = conversations_area.find(".sb-conversation");
      let agent = SBF.isAgent(response.get("user_type"));
      setTimeout(function () {
        area.find(".sb-top .sb-status-typing").remove();
      }, 300);
      if (SB_ADMIN_SETTINGS["smart-reply"]) {
        if (agent) {
          if (SB_ADMIN_SETTINGS["smart-reply-agent-assistant"])
            SBApps.dialogflow.smartReplyUpdate(response.message);
        } else {
          SBApps.dialogflow.smartReply(response.message);
        }
      }
      if (SBAdmin.must_translate) {
        let message = SBChat.conversation.getMessage(response.id);
        let message_html = area.find(`[data-id="${response.id}"]`);
        let message_original =
          "original-message" in payload ? payload["original-message"] : false;
        if (message_original) {
          message.set("translation", message_original);
          message_html.replaceWith(message.getCode(true));
          area
            .find(`[data-id="${response.id}"] .sb-menu`)
            .prepend(
              `<li data-value="original">${sb_("View translation")}</li>`
            );
        } else if (response.message) {
          SBApps.dialogflow.translate(
            [response.message],
            SB_ADMIN_SETTINGS["active-agent-language"],
            (response_2) => {
              if (response_2) {
                message.set("translation", response_2[0].translatedText);
                message_html.replaceWith(message.getCode(true));
                area
                  .find(`[data-id="${response.id}"] .sb-menu`)
                  .prepend(
                    `<li data-value="original">${sb_(
                      "View original message"
                    )}</li>`
                  );
              }
            }
          );
        }
      }
      if (
        "queryResult" in payload &&
        "fulfillmentMessages" in payload.queryResult
      ) {
        let messages = payload.queryResult.fulfillmentMessages;
        for (var i = 0; i < messages.length; i++) {
          if ("payload" in messages[i]) {
            let message_payload = messages[i].payload;
            if ("department" in message_payload) {
              SBConversations.setActiveDepartment(message_payload.department);
              break;
            }
            if ("agent" in message_payload) {
              SBConversations.setActiveAgent(message_payload.agent);
              break;
            }
          }
        }
      }
      if ("ErrorCode" in payload) {
        dialog(
          "Error. Message not sent to WhatsApp. Error message: " +
            payload["ErrorMessage"],
          "info"
        );
      }
      if ("whatsapp-fallback" in payload) {
        showResponse(
          `Message sent as text message.${
            "whatsapp-template-fallback" in payload
              ? " The user has been notified via WhatsApp Template notification."
              : ""
          }`
        );
      }
      if (
        "whatsapp-template-fallback" in payload &&
        !("whatsapp-fallback" in payload)
      ) {
        showResponse(
          "The user has been notified via WhatsApp Template notification."
        );
      }
      if (
        !agent &&
        SBChat.conversation.id == response.get("conversation_id") &&
        !SBChat.user_online
      ) {
        SBUsers.setActiveUserStatus();
      }
      SBConversations.update();
    });

    // Event: new conversation created
    $(document).on("SBNewConversationCreated", function () {
      SBConversations.update();
    });

    // Event: email notification sent
    $(document).on("SBEmailSent", function () {
      showResponse(`The user has been notified by email.`);
    });

    // Event: SMS notification sent
    $(document).on("SBSMSSent", function () {
      showResponse("The user has been notified by text message.");
    });

    // Event: Message notifications
    $(document).on("SBNotificationsSent", function (e, response) {
      showResponse(
        `The user has been notified by email${
          response.includes("sms") ? " and text message" : ""
        }.`
      );
    });

    // Event: user typing status change
    $(document).on("SBTyping", function (e, response) {
      SBConversations.typing(response);
    });

    $(conversations_admin_list).on(
      "input",
      ".sb-search-btn input",
      function () {
        SBConversations.search(this);
      }
    );


 // This code handles click events on search buttons within the admin list.
// It triggers search functionality, toggles visibility of certain elements,
// and adjusts styling properties when search buttons are clicked.

$(conversations_area).on(
  "click",
  ".sb-admin-list .sb-search-btn i",
  function () {
    SBF.searchClear(this, () => {
      SBConversations.search($(this).next());
    });
    $(".non-hover, .sb-filter-btn").toggleClass("sb-hide");
    $("#hideOnSearchClick").toggleClass("sb-hide");
  }
);

$(".bi-search").click(function () {
  $("#hideOnSearchClick li:first-child").toggleClass("sb-invisible").find("div").toggle();
  $("#hideOnSearchClick li:nth-child(2)").toggleClass("sb-invisible").css("margin-right", function(index, value) {
    return value === '80px' ? '0px' : '80px';
  });
});










    // Conversations filter
    $(conversations_area).on(
      "click",
      ".sb-admin-list .sb-select li",
      function () {
        let parent = conversations_admin_list_ul.parent();

        // Check if loading, if true, return
        if (loading(parent)) {
          return;
        }

        // Delayed execution of the following code
        setTimeout(() => {
          let filters = SBConversations.filters();

          // Reset pagination variables
          pagination = 1;
          pagination_count = 1;

          // Make an AJAX request to get conversations based on filters
          SBF.ajax(
            {
              function: "get-conversations", //to check
              status_code: filters[0],
              department: filters[1],
              agent: SB_ACTIVE_AGENT["id"],
              source: filters[2],
              tag: filters[3],
            },
            (response) => {
              SBConversations.populateList(response);

              // Set conversation status attribute and handle UI interactions
              conversations_area
                .find(".sb-conversation")
                .attr("data-conversation-status", filters[0]);
              if (response.length) {
                if (!responsive) {
                  if (SBChat.conversation) {
                    let conversation = conversations_admin_list_ul.find(
                      `[data-conversation-id="${SBChat.conversation.id}"]`
                    );
                    if (conversation.length) {
                      conversation.sbActive(true);
                    } else if (
                      filters[0] ==
                      SBChat.conversation.get("conversation_status_code")
                    ) {
                      conversations_admin_list_ul.prepend(
                        SBConversations.getListCode(
                          SBChat.conversation
                        ).replace("<li", '<li class="sb-active"')
                      );
                    }
                  } else {
                    SBConversations.clickFirst();
                    SBConversations.scrollTo();
                  }
                }
              } else {
                conversations_area
                  .find(".sb-board")
                  .addClass("sb-no-conversation");
                SBChat.conversation = false;
              }

              // Remove loading state
              parent.sbLoading(false);
            }
          );
        }, 100);
      }
    );

    // Display the user details box
    $(conversations_area).on(
      "click",
      ".sb-user-details .sb-scroll-area div.sb-profile",
      function () {
        let user_id = conversations_admin_list_ul
          .find(".sb-active")
          .attr("data-user-id");
        if (activeUser().id != user_id) {
          activeUser(users[user_id]);
        }
        SBProfile.show(activeUser().id);
      }
    );
    // custom to display location wa, tg, ww
    $(admin).on("click", '.sb-profile-list [data-id="location"]', function () {
      let location = $(this).find("label").html().replace(", ", "+");
      dialog(
        '<iframe src="https://maps.google.com/maps?q=' +
          location +
          '&output=embed"></iframe>',
        "map"
      );
    });

    // custom to get address
    $(admin).on(
      "click",
      '.sb-profile-list [data-id="address"], .sb-profile-list [data-id="city"], .sb-profile-list [data-id="country"]',
      function () {
        let address = "";
        let city = "";
        let country = "";

        // Extract values based on data-id
        if ($(this).data("id") === "address") {
          address = $(this).find("label").text();
          city = $('.sb-profile-list [data-id="city"] label').text();
          country = $('.sb-profile-list [data-id="country"] label').text();
        } else if ($(this).data("id") === "city") {
          address = $('.sb-profile-list [data-id="address"] label').text();
          city = $(this).find("label").text();
          country = $('.sb-profile-list [data-id="country"] label').text();
        } else if ($(this).data("id") === "country") {
          address = $('.sb-profile-list [data-id="address"] label').text();
          city = $('.sb-profile-list [data-id="city"] label').text();
          country = $(this).find("label").text();
        }

        // Construct the search query for the map
        let searchQuery = encodeURIComponent(`${address}, ${city}, ${country}`);
        dialog(
          `<iframe src="https://maps.google.com/maps?q=${searchQuery}&output=embed"></iframe>`,
          "map"
        );
      }
    );

    $(admin).on("click", '.sb-profile-list [data-id="timezone"]', function () {
      SBF.getLocationTimeString(activeUser().extra, (response) => {
        loadingGlobal(false);
        dialog(response, "info");
      });
    });
    $(admin).on(
      "click",
      '.sb-profile-list [data-id="current_url"]',
      function () {
        let label = $(this).find("label");
        window.open(
          SBF.null(label.attr("data-value"))
            ? label.html()
            : label.attr("data-value")
        );
      }
    );
    $(admin).on(
      "click",
      '.sb-profile-list [data-id="conversation-source"]',
      function (e) {
        let source = $(this).find("option:selected").html().toLowerCase();

        if (
          (source == "whatsapp" || source == "whatsmeow" || source == "waweb") &&
          activeUser().getExtra("phone")
        ) {
          // window.open('https://wa.me/' + SBApps.whatsapp.activeUserPhone());
        } else if (source == "facebook") {
          //window.open('https://www.facebook.com/messages/t/' + SBChat.conversation.get('extra'));
        } else if (source == "instagram") {
          //window.open('https://www.instagram.com/direct/inbox/');
        } else if (source == "twitter") {
          //window.open('https://twitter.com/messages/');
        }
      }
    );

    // Dialogflow
    $(conversations_area).on(
      "click",
      '.sb-menu [data-value="bot"]',
      function () {
        SBApps.dialogflow.showCreateIntentBox(
          $(this).closest("[data-id]").attr("data-id")
        );
      }
    );

    $(dialogflow_intent_box).on(
      "click",
      '.sb-intent-add [data-value="add"]',
      function () {
        dialogflow_intent_box
          .find("> div > .sb-type-text")
          .last()
          .after(
            '<div class="sb-input-setting sb-type-text"><input type="text"></div>'
          );
      }
    );

    $(dialogflow_intent_box).on(
      "click",
      '.sb-intent-add [data-value="previous"],.sb-intent-add [data-value="next"]',
      function () {
        let input = dialogflow_intent_box.find(".sb-first input");
        let message = input.val();
        let next = $(this).attr("data-value") == "next";
        let messages = SBChat.conversation.getUserMessages();
        let messages_length = messages.length;
        for (var i = 0; i < messages_length; i++) {
          if (
            messages[i].message == message &&
            ((next && i < messages_length - 1) || (!next && i > 0))
          ) {
            i = i + (next ? 1 : -1);
            input.val(messages[i].message);
            dialogflow_intent_box.attr("data-message-id", messages[i].id);
            break;
          }
        }
      }
    );

    $(dialogflow_intent_box).on("click", ".sb-send", function () {
      SBApps.dialogflow.submitIntent(this);
    });

    $(dialogflow_intent_box).on("input", ".sb-search-btn input", function () {
      SBApps.dialogflow.searchIntents($(this).val());
    });

    $(dialogflow_intent_box).on("click", ".sb-search-btn i", function () {
      SBF.searchClear(this, () => {
        SBApps.dialogflow.searchIntents($(this).val());
      });
    });

    $(dialogflow_intent_box).on("click", "#sb-intent-preview", function () {
      SBApps.dialogflow.previewIntent(
        dialogflow_intent_box.find("#sb-intents-select").val()
      );
    });

    $(dialogflow_intent_box).on("change", "#sb-intents-select", function () {
      dialogflow_intent_box
        .find(".sb-bot-response")
        .css("opacity", $(this).val() ? 0.5 : 1);
    });

    // Departments
    $(conversations_area).on(
      "click",
      "#conversation-department li",
      function (e) {
        let select = $(this).parent().parent();
        if ($(this).data("value") == select.find(" > p").attr("data-value"))
          return true;
        if (!SBChat.conversation) {
          $(this).parent().sbActive(false);
          e.preventDefault();
          return false;
        }
        if (!select.sbLoading())
          dialog(
            `${sb_(
              "All agents assigned to the new department will be notified. The new department will be"
            )} ${$(this).html()}.`,
            "alert",
            () => {
              let value = $(this).data("id");
              select.sbLoading(true);
              SBConversations.assignDepartment(
                SBChat.conversation.id,
                value,
                () => {
                  SBConversations.setActiveDepartment(value);
                  select.sbLoading(false);
                  select.find(" > p").attr("data-value", value);
                }
              );
            }
          );
        e.preventDefault();
        return false;
      }
    );

    // Agent assignment
    $(conversations_area).on("click", "#conversation-agent li", function (e) {
      let select = $(this).parent().parent();
      let agent_id = $(this).data("id");
      if (
        agent_id == select.find(" > p").attr("data-value") ||
        agent_id == SB_ACTIVE_AGENT["id"]
      )
        return true;
      if (!SBChat.conversation) {
        $(select).addClass("sb-active sb-responsive-absolute-position"); // Add both classes to the select element
        e.preventDefault();
        return false;
      }
      if (!select.sbLoading()) {
        dialog(
          `${sb_("The new agent will be")} ${$(this).html()}.`,
          "alert",
          () => {
            select.sbLoading(true);
            SBConversations.assignAgent(
              SBChat.conversation.id,
              agent_id,
              () => {
                SBConversations.setActiveAgent(agent_id);
                select.sbLoading(false);
              }
            );
          }
        );
      }
      e.preventDefault();
      return false;
    });

    function loadDefaultDateTime(showAlert) {
      let now = moment();
      now.local();
      $("#alertdate").val(now.format("MM/DD/YY hh:mm A"));
      SBConversations.timeZoneList();
    }

    notes_panel.on("click", "> i", function (e) {
      admin.find(".sb-notes-box").sbShowLightbox();

      // Function to load Moment.js
      function loadMoment() {
        // Load Moment.js from CDN
        $.getScript("https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js")
          .done(() => {
            loadDefaultDateTime(true);
          })
          .fail(() => {
            // If CDN loading fails, load Moment.js from local source
            $.getScript(STMBX_URL + "/vendor/moment.min.js", () => {
              loadDefaultDateTime(true);
            });
          });
      }

      // Call the function to load Moment.js
      loadMoment();

      e.preventDefault();
      return false;
    });

    notes_panel.on("click", ".sb-delete-note", function () {
      let item = $(this).parents().eq(1);
      SBConversations.notes.delete(
        SBChat.conversation.id,
        item.attr("data-id"),
        (response) => {
          if (response === true) item.remove();
          else SBF.error(response);
        }
      );
    });

    notes_panel.on("click", ".sb-note-contain", function () {
      const toggle = $(this).find(".note-content .more");
      const dot = $(this).find(".note-content .dots");
      toggle.css("display") == "none" ? toggle.show() : toggle.hide();
      toggle.css("display") == "none" ? dot.show() : dot.hide();
    });

    $(admin).on("click", ".sb-add-note", function () {
      let textarea = $(this).parent().parents().eq(1).find("textarea");
      let message = textarea.val();
      if (message.length == 0) {
        SBForm.showErrorMessage(
          admin.find(".sb-notes-box"),
          "Please write something..."
        );
      } else {
        if (loading(this)) return;
        SBConversations.notes.add(
          SBChat.conversation.id,
          SB_ACTIVE_AGENT["id"],
          SB_ACTIVE_AGENT["full_name"],
          message,
          (response) => {
            if (Number.isInteger(response)) {
              $(this).sbLoading(false);
              admin.sbHideLightbox();
              SBConversations.notes.update(
                [
                  {
                    id: response,
                    conversation_id: SBChat.conversation.id,
                    user_id: SB_ACTIVE_AGENT["id"],
                    name: SB_ACTIVE_AGENT["full_name"],
                    message: message,
                    alert: $("#alertdate").val(),
                    time_zone: $("#zones").val(),
                    status: false,
                  },
                ],
                true
              );
              textarea.val("");
              showResponse("New note successfully added.");
              loadDefaultDateTime(true);
            } else {
              SBForm.showErrorMessage(response);
            }
          }
        );
      }
    });

    tags_panel.on("click", "> i", function (e) {
      let box = $(admin).find(".sb-tags-box");
      let area = box.find(".sb-tags-cnt");
      let code = "";
      let tags = SBChat.conversation.details.tags;
      let add = '<i id="sb-add-tag" class="bi-plus-lg sb-btn-icon"></i>';
      for (var i = 0; i < tags.length; i++) {
        code += `<span class="sb-active">${tags[i]}</span>`;
      }
      if (!SBConversations.tags.list) {
        box.sbLoading(true);
        SBF.ajax(
          {
            function: "get-tags",
          },
          (response) => {
            SBConversations.tags.list = response;
            area.html(code + SBConversations.tags.getAll(tags) + add);
            box.sbLoading(false);
          }
        );
      } else {
        area.html(code + SBConversations.tags.getAll(tags) + add);
      }
      box.sbShowLightbox();
      e.preventDefault();
      return false;
    });

    // Event delegation for click events on .tagged spans within the #tags-container
    $(document).on("click", "#tags-container.tagged > span", function () {
      let clickedTag = $(this);
      let tagText = clickedTag.text();
      let conversation_id = SBChat.conversation.id;

      // Make an AJAX request to update tags with a null value to delete the tag
      SBF.ajax(
        {
          function: "update-tags",
          conversation_id: conversation_id,
          tags: [null], // Send the tagged tag as null
        },
        (response) => {
          // Handle the response if necessary
          showResponse(
            response[0] === true
              ? "The bot is deleting tags in database..."
              : response
          );

          // Remove the corresponding span if the update was successful
          if (response[0] === true) {
            clickedTag.remove();

            // Remove all spans with class 'sb-active' from the .sb-tags-cnt element
            $(".sb-tags-box .sb-tags-cnt span.sb-active").remove();
          }
        }
      );
    });

    $(admin).on("click", ".sb-tags-cnt > span", function () {
      $(this).toggleClass("sb-active");
    });

    $(admin).on("click", "#sb-add-tag", function () {
      $('<input type="text">').insertBefore(this);
    });

    $(admin).on("click", "#sb-save-tags", function () {
      if (loading(this)) return;
      let tags = admin
        .find(".sb-tags-box")
        .find("span.sb-active,input")
        .map(function () {
          return $(this).is("span") ? $(this).html() : $(this).val();
        })
        .toArray();
      let conversation_id = SBChat.conversation.id;
      SBF.ajax(
        {
          function: "update-tags",
          conversation_id: conversation_id,
          tags: tags,
        },
        (response) => {
          $(this).sbLoading(false);
          SBConversations.tags.list = response[1];
          if (response[0] === true) {
            SBConversations.tags.update(tags);
            if (
              SBChat.conversation &&
              conversation_id == SBChat.conversation.id
            ) {
              let tag_filter = SBConversations.filters()[3];
              SBChat.conversation.set("tags", tags);
              if (tag_filter && !tags.includes(tag_filter)) {
                conversations_admin_list_ul
                  .find(`[data-conversation-id="${conversation_id}"]`)
                  .remove();
                SBConversations.clickFirst();
              }
            }
          }
          admin.sbHideLightbox();
          showResponse(
            response[0] === true
              ? "Tags have been successfully updated."
              : response
          );
        }
      );
    });

    // Suggestions
    $(suggestions_area).on("click", "span", function () {
      SBChat.insertText($(this).html());
      suggestions_area.html("");
    });

    // Message menu
    $(conversations_area).on("click", ".sb-list .sb-menu > li", function () {
      let message = $(this).closest("[data-id]");
      let message_id = message.attr("data-id");
      let message_user_type = SBChat.conversation
        .getMessage(message_id)
        .get("user_type");
      let value = $(this).attr("data-value");
      // console.log('message deleted', message_id)
      switch (value) {
        case "delete":
          if (SBChat.user_online) {
            SBF.ajax(
              {
                function: "update-message",
                message_id: message_id,
                message: "",
                attachments: [],
                payload: {
                  event: "delete-message",
                },
              },
              () => {
                SBChat.conversation.deleteMessage(message_id);
                message.remove();
              }
            );
          } else {
            SBChat.deleteMessage(message_id);
          }
          break;
        case "translation":
        case "original":
          let translation = value == "translation";
          let agent = SBF.isAgent(message_user_type);
          message.replaceWith(
            SBChat.conversation.getMessage(message_id).getCode(translation)
          );
          conversations_area
            .find(`[data-id="${message_id}"] .sb-menu`)
            .prepend(
              `<li data-value="${
                translation ? "original" : "translation"
              }">${sb_(
                (agent && !translation) || (!agent && translation)
                  ? "View original message"
                  : "View translation"
              )}</li>`
            );
          break;
      }
    });

    // Conversations filter
    $(conversations_area).on("click", ".sb-filter-btn i", function () {
      $(this).parent().toggleClass("sb-active");
    });

    /*
     * ----------------------------------------------------------
     * # Users area
     * ----------------------------------------------------------
     */

    // Open user box by URL
    if (SBF.getURL("user")) {
      header.find(".sb-admin-nav #sb-users").click();
      setTimeout(() => {
        SBProfile.show(SBF.getURL("user"));
      }, 500);
    }

    // Checkbox selector
    $(users_table).on("click", "th :checkbox", function () {
      users_table.find("td :checkbox").prop("checked", $(this).prop("checked"));
    });

    $(users_table).on("click", ":checkbox", function () {
      let button = users_area.find('[data-value="delete"]');
      if (users_table.find("td input:checked").length) {
        button.removeAttr("style");
      } else {
        button.hide();
      }
    });

    // Table menu filter
    $(users_table_menu).on("click", "li", function () {
      SBUsers.filter($(this).data("type"));
    });

    // Search users
    $(users_area).on("input", ".sb-search-btn input", function () {
      SBUsers.search(this);
    });

    $(users_area).on("click", ".sb-search-btn i", function () {
      SBF.searchClear(this, () => {
        SBUsers.search($(this).next());
      });
    });

    // Sorting
    $(users_table).on("click", "th:not(:first-child)", function () {
      let direction = $(this).hasClass("sb-order-asc") ? "DESC" : "ASC";
      $(this).toggleClass("sb-order-asc");
      $(this).siblings().sbActive(false);
      $(this).sbActive(true);
      SBUsers.sort($(this).data("field"), direction);
    });

    // Pagination for users
    $(users_table)
      .parent()
      .on("scroll", function () {
        if (
          !is_busy &&
          !SBUsers.search_query &&
          scrollPagination(this, true) &&
          users_pagination_count
        ) {
          is_busy = true;
          users_area.append(
            '<div class="sb-loading-global sb-loading sb-loading-pagination"></div>'
          );
          SBF.ajax(
            {
              function: "get-users",
              pagination: users_pagination,
              sorting: SBUsers.sorting,
              user_types: SBUsers.user_types,
              search: SBUsers.search_query,
              extra: SBUsers.table_extra,
            },
            (response) => {
              setTimeout(() => {
                is_busy = false;
              }, 500);
              users_pagination_count = response.length;
              if (users_pagination_count) {
                let code = "";
                for (var i = 0; i < users_pagination_count; i++) {
                  let user = new SBUser(response[i], response[i].extra);
                  code += SBUsers.getRow(user);
                  users[user.id] = user;
                }
                users_pagination++;
                users_table.find("tbody").append(code);
                scrollPagination(this, false, 1000);
              }
              users_area.find(" > .sb-loading-pagination").remove();
            }
          );
        }
      });

    // Delete user button
    $(profile_edit_box).on("click", ".sb-delete", function () {
      dialog(
        "This user will be deleted permanently including all linked data, conversations, and messages.",
        "alert",
        function () {
          SBUsers.delete(activeUser().id);
        }
      );
    });

    // Display user box
    $(users_table).on("click", "td:not(:first-child)", function () {
      SBProfile.show($(this).parent().attr("data-user-id"));
    });

    // Display edit box
    $(profile_box).on("click", ".sb-top-bar .sb-edit", function () {
      SBProfile.showEdit(activeUser());
    });

    // Display new user box
    $(users_area).on("click", ".sb-new-user", function () {
      profile_edit_box.addClass("sb-user-new");
      profile_edit_box
        .find(".sb-top-bar .sb-profile span")
        .html(sb_("Add new user"));
      profile_edit_box
        .find(".sb-top-bar .sb-save")
        .html(`<i class="bi-check-lg"></i>${sb_("Add user")}`);
      profile_edit_box.find("input,select,textara").removeClass("sb-error");
      // profile_edit_box.removeClass("sb-cloud-admin");
      if (SB_ACTIVE_AGENT["user_type"] == "admin") {
        profile_edit_box
          .find("#user_type")
          .find("select")
          .html(
            `<option value="lead">${sb_(
              "Lead"
            )}</option><option value="agent">${sb_(
              "Agent"
            )}</option><option value="admin">${sb_("Admin")}</option>`
          );
      }

      SBProfile.clear(profile_edit_box);
      SBProfile.boxClasses(profile_edit_box);
      SBProfile.updateRequiredFields("user");
      profile_edit_box.sbShowLightbox();
    });

    // Add or update user
    $(profile_edit_box).on("click", ".sb-save", function () {
      if (loading(this)) return;
      let new_user = profile_edit_box.hasClass("sb-user-new") ? true : false;
      let user_id = profile_edit_box.attr("data-user-id");

      // Get settings
      let settings = SBProfile.getAll(profile_edit_box.find(".sb-details"));
      let settings_extra = SBProfile.getAll(
        profile_edit_box.find(".sb-additional-details")
      );

      // Errors check
      if (SBProfile.errors(profile_edit_box)) {
        SBProfile.showErrorMessage(
          profile_edit_box,
          SBF.isAgent(profile_edit_box.find("#user_type :selected").val())
            ? "First name, last name, password and a valid email are required. Minimum password length is 8 characters."
            : profile_edit_box.hasClass("sb-user-new")
            ? "First name, last name, and a valid email are required."
            : `First name and last name ${
                settings.user_type[0] == "user" ||
                settings.user_type[0] == "lead"
                  ? "email"
                  : ""
              } are required.`
        );
        $(this).sbLoading(false);
        return;
      }

      // Save the settings
      SBF.ajax(
        {
          function: new_user ? "add-user" : "update-user",
          user_id: user_id,
          settings: settings,
          settings_extra: settings_extra,
        },
        (response) => {
          if (
            SBF.errorValidation(response, "duplicate-email") ||
            SBF.errorValidation(response, "duplicate-phone")
          ) {
            SBProfile.showErrorMessage(
              profile_edit_box,
              `This ${
                SBF.errorValidation(response, "duplicate-email")
                  ? "email"
                  : "phone number"
              } is already in use.`
            );
            $(this).sbLoading(false);
            return;
          }
          if (new_user) {
            user_id = response;
            activeUser(
              new SBUser({
                id: user_id,
              })
            );
          }
          activeUser().update(() => {
            users[user_id] = activeUser();
            if (new_user) {
              SBProfile.clear(profile_edit_box);
              SBUsers.update();
            } else {
              SBUsers.updateRow(activeUser());
              if (conversations_area.sbActive()) {
                SBConversations.updateUserDetails();
              }
              if (user_id == SB_ACTIVE_AGENT["id"]) {
                SBF.loginCookie(response[1]);
                SB_ACTIVE_AGENT["full_name"] = activeUser().name;
                SB_ACTIVE_AGENT["profile_image"] = activeUser().image;
                header.find(".sb-account").setProfile();
              }
            }
            $(this).sbLoading(false);
            profile_edit_box.find(".sb-profile").setProfile();
            showResponse(new_user ? "New user added" : "User updated");
            admin.sbHideLightbox();
            // closes the box after update/add user
          });
          SBF.event("SBUserUpdated", {
            new_user: new_user,
            user_id: user_id,
          });
        }
      );
    });
    $(".sb-area-users").on("click", "#csv_contacts", function () {
      $("#csvimport").click();
    });
    $("#csvimport").on("change", function (e) {
      var fd = new FormData();
      fd.append("csv", this.files[0]);
      fd.append("function", "csv-users-add");
      event.preventDefault();
      $.ajax({
        url: STMBX_URL + "/include/ajax.php",
        method: "POST",
        data: fd,
        dataType: "json",
        contentType: false,
        cache: false,
        processData: false,
        success: function (data) {
          showResponse(data.success);
          $("#csvimport").val("");
        },
        error: function (xhr, err, status) {
          SBF.error("csv-users-add", status);
          $("#csvimport").val("");
        },
      });
    });
    // Set and unset required visitor fields
    $(profile_edit_box).on("change", "#user_type", function () {
      let value = $(this).find("option:selected").val();
      SBProfile.boxClasses(profile_edit_box, value);
      SBProfile.updateRequiredFields(value);
    });

    // Open a user conversation
    $(profile_box).on("click", ".sb-user-conversations li", function () {
      SBConversations.open(
        $(this).attr("data-conversation-id"),
        $(this).find("[data-user-id]").attr("data-user-id")
      );
    });

    // Start a new user conversation 'ww'
    $(profile_box).on("click", ".sb-start-qr-conversation", function () {
      SBConversations.open(-1, activeUser().id);
      SBConversations.openConversation(-1, activeUser().id);
      if (responsive) SBConversations.mobileOpenConversation();
    });

    $(profile_box).on("click", ".sb-start-tk-conversation", function () {
      SBConversations.open(-1, activeUser().id);
      SBConversations.openConversation(-1, activeUser().id);
      if (responsive) SBConversations.mobileOpenConversation();
    });

    // Start a new user conversation 'wa'
    $(profile_box).on("click", ".sb-start-conversation", function () {
      SBConversations.open(-1, activeUser().id);
      SBConversations.openConversation(-1, activeUser().id);
      if (responsive) SBConversations.mobileOpenConversation();
      SBChat.sendMessage(-1, false, false, false);

      admin.find(".sb-send-template-box").sbShowLightbox();
    });

    // Show direct message box from user profile
    $(profile_box).on("click", ".sb-top-bar [data-value]", function () {
      SBConversations.showDirectMessageBox($(this).attr("data-value"), [
        activeUser().id,
      ]);
    });

    // Top icons menu
    $(users_area).on("click", ".sb-top-bar [data-value]", function () {
      let value = $(this).data("value");
      let user_ids = [];
      users_table.find("tr").each(function () {
        if ($(this).find('td input[type="checkbox"]').is(":checked")) {
          user_ids.push($(this).attr("data-user-id"));
        }
      });
      switch (value) {
        case "message":
        case "email":
        case "sms":
          SBConversations.showDirectMessageBox(value, user_ids);
          break;
        case "csv":
          SBUsers.csv();
          break;
        case "delete":
          if (user_ids.includes(SB_ACTIVE_AGENT.id)) {
            return showResponse("You cannot delete yourself.", "error");
          }
          dialog(
            "The bot will delete all selected users and their related data, conversations, and messages permanently.",
            "alert",
            () => {
              SBUsers.delete(user_ids);
              $(this).hide();
              users_table.find("th:first-child input").prop("checked", false);
            }
          );
          break;
      }
    });

    $(admin).on("change", ".sb-select", function () {
      console.log("sb-select change event triggered");
      let sendertype = $(this).val();
      let direct_message_box = $(this).closest(".sb-direct-message-box");
      direct_message_box.attr("data-type", sendertype);
    });

    $(admin).on("click", ".sb-send-direct-message", function (e) {
      console.log("sb-send-direct-message click event triggered");
      e.preventDefault();
      let direct_message_box = $(this).closest(".sb-direct-message-box");
      let type = direct_message_box.attr("data-type");
      let subject = direct_message_box
        .find(".sb-direct-message-subject input")
        .val();
      let message = direct_message_box.find("textarea").val();
      let user_ids = direct_message_box
        .find(".sb-direct-message-users")
        .val()
        .replace(/ /g, "");
      let payload = null;

      console.log("Type:", type);
      console.log("Subject:", subject);
      console.log("Message:", message);
      console.log("User IDs:", user_ids);

      if (type === "template") {
        payload = new Metatemplate().payload("#user-template-form");
        console.log("Payload:", payload);
      }
      if (loading(this)) return;

      if (type == "message") {
        SBF.ajax(
          {
            function: "direct-message",
            user_ids: user_ids,
            message: message,
          },
          (response) => {
            $(this).sbLoading(false);
            let send_email = SB_ADMIN_SETTINGS["notify-user-email"];
            let send_sms = SB_ADMIN_SETTINGS["sms-active-users"];
            if (SBF.errorValidation(response)) {
              return SBForm.showErrorMessage(
                direct_message_box,
                "An error has occurred. Please make sure all user ids are correct."
              );
            }
            if (send_email || send_sms) {
              SBF.ajax(
                {
                  function: "get-users-with-details",
                  user_ids: user_ids,
                  details:
                    send_email && send_sms
                      ? ["email", "phone"]
                      : [send_email ? "email" : "phone"],
                },
                (response) => {
                  if (send_email && response["email"].length) {
                    recursiveSending(
                      response["email"],
                      message,
                      0,
                      send_sms ? response["phone"] : [],
                      "email",
                      subject
                    );
                  } else if (send_sms && response["phone"].length) {
                    recursiveSending(response["phone"], message, 0, [], "sms");
                  } else {
                    admin.sbHideLightbox();
                  }
                }
              );
            }
            showResponse(`${SBF.slugToString(type)} sent to all users.`);
          }
        );
      }
      if (type == "template") {
        console.log("Sending messages...");

        SBF.ajax(
          {
            function: "direct-message",
            user_ids: user_ids,
            message: message,
            template: type === "template" ? true : false, // Set to true only when type is 'template'
            payload: payload,
          },
          (response) => {
            console.log("Direct message response:", response);
            $(this).sbLoading(false);

            if (SBF.errorValidation(response)) {
              console.log("Error validation occurred");
              return SBForm.showErrorMessage(
                direct_message_box,
                "An error has occurred. Please make sure all user IDs are correct."
              );
            }

            if (response["template_phone"]) {
              recursiveSending(
                response["template_phone"],
                payload.BodyTemplate,
                0,
                [],
                "template"
              );
              return;
            }

            let send_email = SB_ADMIN_SETTINGS["notify-user-email"];
            let send_sms = SB_ADMIN_SETTINGS["sms-active-users"];

            if (send_email || send_sms) {
              console.log("Getting users with details...");

              SBF.ajax(
                {
                  function: "get-users-with-details",
                  user_ids: user_ids,
                  details:
                    send_email && send_sms
                      ? ["email", "phone"]
                      : [send_email ? "email" : "phone"],
                },
                (response) => {
                  console.log("Users with details response:", response);

                  if (send_email && response["email"].length) {
                    recursiveSending(
                      response["email"],
                      message,
                      0,
                      send_sms ? response["phone"] : [],
                      "email",
                      subject
                    );
                  } else if (send_sms && response["phone"].length) {
                    recursiveSending(response["phone"], message, 0, [], "sms");
                  } else {
                    admin.sbHideLightbox();
                  }
                }
              );
            }

            showResponse(`${SBF.slugToString(type)} sent to all users.`);
          }
        );
      } else {
        console.log("Type is not 'message', getting users with details...");

        let slug = type == "email" ? "email" : "phone";
        SBF.ajax(
          {
            function: "get-users-with-details",
            user_ids: user_ids,
            details: [slug],
          },
          (response) => {
            console.log("Users with details response:", response);

            if (response[slug].length) {
              recursiveSending(
                response[slug],
                message,
                0,
                [],
                type == "email" ? "custom-email" : "sms",
                subject
              );
            } else {
              $(this).sbLoading(false);
              return SBForm.showErrorMessage(
                direct_message_box,
                "No users found."
              );
            }
          }
        );
      }
    });

    function recursiveSending(
      user_ids,
      message,
      i = 0,
      user_ids_sms = [],
      type,
      subject = false
    ) {
      let settings =
        type == "custom-email"
          ? [
              "send-custom-email",
              "emails",
              " users with an email",
              "direct-emails",
            ]
          : type == "sms"
          ? [
              "whatsmeow-send-message",
              "waweb-send-message",
              "messages",
              " with a phone number",
              "direct-sms",
            ]
          : ["create-email", "emails", " with an email", false];
      settings =
        type == "template"
          ? [
              "whatsapp-send-meta-template",
              "template",
              "users a phone number",
              "direct-messages",
            ]
          : settings;
      //update recursive sending template
      let payload = new Metatemplate().payload("#user-template-form");
      payload["to"] = user_ids[i];
      let requests =
        type == "template"
          ? {
              function: settings[0],
              payload: payload,
            }
          : {
              function: settings[0],
              to: user_ids[i].value,
              recipient_id: user_ids[i]["id"],
              sender_name: SB_ACTIVE_AGENT["full_name"],
              sender_profile_image: SB_ACTIVE_AGENT["profile_image"],
              subject: subject,
              message: message,
              template: false,
            };
      SBF.ajax(requests, (response) => {
        let user_ids_length = user_ids.length;
        direct_message_box
          .find(".sb-bottom > div")
          .html(
            `${sb_("Sending")} ${settings[1]}... ${i + 1} / ${user_ids_length}`
          );
        if (!response) console.warn(response);
        if (response?.error) {
          response?.error.code == 132000 || response?.error.code == 100
            ? SBForm.showErrorMessage(
                direct_message_box,
                `${response?.error.message}`
              )
            : dialog(`${response?.error.message}`, "info");
          console.warn(response);
          return;
        }
        // if (response !== true && 'status' in response && response.status == 400) {
        // 	dialog(`${response.message} Details at ${response.more_info}`, 'info');
        // 	console.warn(response);
        // 	return;
        // }
        if (i < user_ids_length - 1) {
          return recursiveSending(
            user_ids,
            message,
            i + 1,
            user_ids_sms,
            type,
            subject
          );
        } else {
          if (user_ids_sms.length) {
            recursiveSending(user_ids_sms, message, 0, [], "sms", false);
          } else {
            admin.sbHideLightbox();
            // if (settings[3]) SBF.ajax({ function: 'reports-update', name: settings[3], value: message.substr(0, 28) + ' | ' + user_ids_length });
            if (settings[3])
              SBF.ajax({
                function: "reports-update",
                name: settings[3],
                value: message + " | " + user_ids_length,
              });
          }
          showResponse(
            user_ids_length == 1
              ? "Message sent"
              : `${SBF.slugToString(settings[1])} sent to all users${
                  settings[2]
                }.`
          );
        }
      });
    }

    /*
     * ----------------------------------------------------------
     * # Settings area
     * ----------------------------------------------------------
     */

    // Open settings area by URL
    if (SBF.getURL("setting")) {
      header.find(".sb-admin-nav #sb-settings").click();
      setTimeout(() => {
        settings_area.find("#tab-" + SBF.getURL("setting")).click();
      }, 300);
    }

    // Settings history
    $(settings_area).on("click", " > .sb-tab > .sb-nav [id]", function () {
      let id = $(this).attr("id").substr(4);
      if (SBF.getURL("setting") != id) pushState("?setting=" + id);
    });

    // Upload image
    $(settings_area).on(
      "click",
      '[data-type="upload-image"] .image',
      function () {
        upload_target = this;
        admin.find(".sb-upload-form-admin .sb-upload-files").click();
      }
    );

    $(settings_area).on(
      "click",
      '[data-type="upload-image"] .image > i',
      function (e) {
        $(this).parent().removeAttr("data-value").css("background-image", "");
        e.preventDefault();
        return false;
      }
    );

    // Repeater
    $(settings_area).on("click", ".sb-repeater-add", function () {
      SBSettings.repeaterAdd(this);
    });

    $(settings_area).on("click", ".repeater-item > i", function () {
      SBSettings.repeaterDelete(this);
    });

    // Color picker
    SBSettings.initColorPicker();

    $(settings_area)
      .find('[data-type="color"]')
      .focusout(function () {
        let t = $(this).closest(".input-color");
        let color = t.find("input").val();
        setTimeout(function () {
          t.find("input").val("");
          t.find(".color-preview").css("background-color", color);
        }, 300);
        SBSettings.set($(this).attr("id"), color);
      });

    $(settings_area).on("click", ".sb-type-color .input i", function (e) {
      $(this).parent().find("input").removeAttr("style").val("");
    });

    // Color palette
    $(settings_area).on("click", ".sb-color-palette span", function () {
      let active = $(this).hasClass("sb-active");
      $(this).closest(".sb-repeater").find(".sb-active").sbActive(false);
      $(this).sbActive(!active);
    });

    $(settings_area).on("click", ".sb-color-palette ul li", function () {
      $(this)
        .parent()
        .parent()
        .attr("data-value", $(this).data("value"))
        .find("span")
        .sbActive(false);
    });

    // Select images
    $(settings_area).on(
      "click",
      '[data-type="select-images"] .input > div',
      function () {
        $(this).siblings().sbActive(false);
        $(this).sbActive(true);
      }
    );

    // Select checkbox
    $(settings_area).on("click", ".sb-select-checkbox-input", function () {
      $(this).toggleClass("sb-active");
    });

    $(settings_area).on("click", ".sb-select-checkbox input", function () {
      let parent = $(this).closest("[data-type]");
      parent
        .find(".sb-select-checkbox-input")
        .val(SBSettings.get(parent)[1].join(", "));
    });

    // Save
    $(settings_area).on("click", ".sb-save-changes", function () {
      SBSettings.save(this);
    });

    // Miscellaneous
    $(settings_area).on(
      "change",
      '#user-additional-fields [data-id="extra-field-slug"], #saved-replies [data-id="reply-name"], [data-id="rich-message-name"]',
      function () {
        $(this).val(SBF.stringToSlug($(this).val()));
      }
    );

    $(settings_area).on("click", "#timetable-utc input", function () {
      if ($(this).val() == "") {
        $(this).val(Math.round(today.getTimezoneOffset() / 60));
      }
    });

    // $(settings_area).on('click', '#dialogflow-button .sb-btn', function (e) {
    // 	let client_id = settings_area.find('#google-client-id input').val();
    // 	if (client_id) {
    // 		window.open(`https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com/auth/dialogflow%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-translation&response_type=code&access_type=offline&redirect_uri=${STMBX_URL}/include/google.php&client_id=${client_id}&prompt=consent`);
    // 	} else window.open('https://steambox.dev/?service=dialogflow&plugin_url=' + 'https://example.com' + cloudURL());
    // 	e.preventDefault();
    // 	return false;
    // });

    // $(settings_area).on('click', '#dialogflow-saved-replies .sb-btn', function (e) {
    // 	if (!loading(this)) {
    // 		SBF.ajax({
    // 			function: 'dialogflow-saved-replies'
    // 		}, () => {
    // 			$(this).sbLoading(false)
    // 		});
    // 	}
    // 	e.preventDefault();
    // 	return false;
    // });

    $(settings_area).on(
      "click",
      "#test-email-user .sb-btn, #test-email-agent .sb-btn",
      function () {
        let email = $(this).parent().find("input").val();
        if (email && email.indexOf("@") > 0 && !loading(this)) {
          SBF.ajax(
            {
              function: "send-test-email",
              to: email,
              email_type:
                $(this).parent().parent().attr("id") == "test-email-user"
                  ? "user"
                  : "agent",
            },
            () => {
              dialog("Email successfully sent. Check your emails!", "info");
              $(this).sbLoading(false);
            }
          );
        }
      }
    );

    $(settings_area).on(
      "click",
      ".sb-timetable > div > div > div",
      function () {
        let timetable = $(this).closest(".sb-timetable");
        let active = $(this).sbActive();
        $(timetable).find(".sb-active").sbActive(false);
        if (active) {
          $(this).sbActive(false).find(".sb-custom-select").remove();
        } else {
          let select = $(timetable).find("> .sb-custom-select").html();
          $(timetable).find(" > div .sb-custom-select").remove();
          $(this)
            .append(`<div class="sb-custom-select">${select}</div>`)
            .sbActive(true);
        }
      }
    );

    $(settings_area).on(
      "click",
      ".sb-timetable .sb-custom-select span",
      function () {
        let value = [$(this).html(), $(this).attr("data-value")];
        $(this)
          .closest(".sb-timetable")
          .find("> div > div > .sb-active")
          .html(value[0])
          .attr("data-value", value[1]);
        $(this).parent().sbActive(false);
      }
    );

    $(settings_area).on("click", "#system-requirements a", function (e) {
      let box = admin.find(".sb-requirements-box");
      let code = "";
      SBF.ajax(
        {
          function: "system-requirements",
        },
        (response) => {
          for (var key in response) {
            code += `<div class="sb-input"><span>${sb_(
              SBF.slugToString(key)
            )}</span><div${response[key] ? ' class="sb-green"' : ""}>${
              response[key] ? sb_("Success") : sb_("Error")
            }</div></div>`;
          }
          loadingGlobal(false);
          box.find(".sb-main").html(code);
          box.sbShowLightbox();
        }
      );
      box.sbActive(false);
      loadingGlobal(true);
      e.preventDefault();
      return false;
    });

    $(settings_area).on("click", "#sb-path a", function (e) {
      SBF.ajax(
        {
          function: "path",
        },
        (response) => {
          dialog(response, "info");
        }
      );
      e.preventDefault();
      return false;
    });

    $(settings_area).on("click", "#delete-leads a", function (e) {
      if (!$(this).sbLoading()) {
        dialog(
          "All leads, including all the linked conversations and messages, will be deleted permanently.",
          "alert",
          () => {
            $(this).sbLoading(true);
            SBF.ajax(
              {
                function: "delete-leads",
              },
              () => {
                dialog("Leads and conversations successfully deleted.", "info");
                $(this).sbLoading(false);
              }
            );
          }
        );
      }
      e.preventDefault();
      return false;
    });

    $(settings_area).on(
      "click",
      "#dialogflow-smart-reply-generate a",
      function (e) {
        if (loading(this)) return;
        SBF.ajax(
          {
            function: "dialogflow-smart-reply-generate-conversations-data",
          },
          (response) => {
            dialog(
              "Conversations data successfully generated. Folder: " + response,
              "info"
            );
            $(this).sbLoading(false);
          }
        );
        e.preventDefault();
        return false;
      }
    );

    $(settings_area).on("click", "#sb-export-settings a", function (e) {
      if (loading(this)) return;
      SBF.ajax(
        {
          function: "export-settings",
        },
        (response) => {
          window.open(response);
          dialog(
            `${sb_(
              "For security reasons, delete the settings file after downloading it. Close this window to automatically delete it. File location:"
            )}<pre>${response}</pre>`,
            "info",
            false,
            "sb-export-settings-close",
            "Settings exported"
          );
          $(this).sbLoading(false);
        }
      );
      e.preventDefault();
      return false;
    });

    $(settings_area).on("click", "#sb-import-settings a", function (e) {
      if (loading(this)) return;
      upload_target = this;
      upload_on_success = (response) => {
        SBF.ajax(
          {
            function: "import-settings",
            file_url: response,
          },
          (response) => {
            if (response)
              showResponse(
                "Settings successfully imported. Reload the admin area to apply the new settings."
              );
            else dialog(response, "info");
            $(this).sbLoading(false);
          }
        );
        upload_on_success = false;
      };
      admin.find(".sb-upload-form-admin .sb-upload-files").click();
      e.preventDefault();
      return false;
    });

    $(admin).on("click", "#sb-export-settings-close .sb-close", function () {
      SBF.ajax({
        function: "delete-file",
        path: admin.find(".sb-dialog-box p pre").html(),
      });
    });

    // // Messenger
    // $(settings_area).on('click', '#messenger-button .sb-btn', () => {
    // 	alert("Este servicio requiere implementación y aprobación de Facebook. Te llevaremos al chat para que converses con un asesor especializado en el tema");
    // 	window.open('https://steambox.dev/?service=messenger&plugin_url=' + '');

    // 	return false;
    // });



// WHATSMEOW
function handleWhatsmeowButtonClick(event, action) {
  event.preventDefault();

  let inputSelector = "#whatsmeow-go-qr input";
  let qrInput = settings_area.find(inputSelector).val();
  let url = action === "start" ? "/get_ww.php?qrurl=" : "/reset_ww.php";

  if (action === "start") {
      $("#qr_loading1").show();

      fetch(STMBX_URL + url + qrInput)
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
                      let imageUrl = 'data:image/png;base64,' + jsonResponse.image;
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
                      fetch(STMBX_URL + url + qrInput)
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
          data: { qrurl: qrInput },
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

// Event handler for the start button
$(settings_area).on(
  "click",
  "#whatsmeow-go-start .sb-btn",
  function (event) {
      handleWhatsmeowButtonClick(event, "start");
  }
);

// Event handler for the restart button
$(settings_area).on(
  "click",
  "#whatsmeow-go-restart .sb-btn",
  function (event) {
      handleWhatsmeowButtonClick(event, "restart");
  }
);


//WAWEB
function handlewawebButtonClick(event, action) {
  event.preventDefault();

  let inputSelector = "#waweb-go-qr input";
  let qrInput = settings_area.find(inputSelector).val();
  let url = action === "start" ? "/get_wx.php?qrurl=" : "/reset_wx.php";

  if (action === "start") {
      $("#qr_loading2").show();

      fetch(STMBX_URL + url + qrInput)
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
                      let imageUrl = 'data:image/png;base64,' + jsonResponse.image;
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
          data: { qrurl: qrInput },
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



    // Event handler for the start button
    $(settings_area).on(
      "click",
      "#waweb-go-start .sb-btn",
      function (event) {
        handlewawebButtonClick(event, "start");
      }
    );

    // Event handler for the restart button
    $(settings_area).on(
      "click",
      "#waweb-go-restart .sb-btn",
      function (event) {
        handlewawebButtonClick(event, "restart");
      }
    );

    $(document).ready(function(){
      $(document).on("click", '#get-templates-api .sb-btn', function(event){
          event.preventDefault();
          $.ajax({
              type: "GET",
              url: STMBX_URL + '/include/templates.php',
              success: function(data){
                  dialog("Meta's WhatsApp Business API Cloud templates loaded successfully.","info");
              },
              error: function(xhr, status, error){
                  dialog("Meta Business Manager configuration incomplete. Please provide the Business Manager User ID, save, and retry.", "info");
              }
          });
      });
  });
  
    $(settings_area).on(
      "click",
      "#whatsapp-twilio-btn .sb-btn, #sms-btn .sb-btn, #wechat-btn .sb-btn, #twitter-callback .sb-btn, #gbm-webhook .sb-btn",
      function (e) {
        let id = $(this).closest("[id]").attr("id");
        dialog(
          `<code style=" margin: auto; word-break: break-word; text-align: center; font-size: .9rem; ">${
            STMBX_URL +
            (id == "sms-btn"
              ? "/include/api.php"
              : "/apps/" +
                (id == "wechat-btn"
                  ? "wechat"
                  : id == "twitter-callback"
                  ? "twitter"
                  : id == "gbm-webhook"
                  ? "gbm"
                  : "whatsapp") +
                "/post.php") +
            cloudURL().replace("&", "?")
          }</code>`,
          "info"
        );
        return false;
      }
    );

    $(settings_area).on("click", "#telegram-button .sb-btn", function (t) {
      let e = settings_area.find("#telegram-token input").val().trim();
      return (
        t.preventDefault(),
        !(!e || loading(this)) &&
          (SBF.ajax(
            {
              function: "telegram-synchronization",
              token: e,
              cloud_token: cloudURL(),
            },
            () => {
              dialog("Telegram Synchronization completed.", "info"),
                $(this).sbLoading(!1);
            }
          ),
          !1)
      );
    });

    $(settings_area).on(
      "click",
      "#whatsapp-test-template .sb-btn",
      function (t) {
        t.preventDefault();
        let n = $(this).parent().find("input").val();
        if (!(!n || loading(this)))
          return (
            SBF.ajax(
              {
                function: "whatsapp-send-template",
                phone: n,
              },
              (t) => {
                dialog(
                  t
                    ? "error" in t
                      ? t.error.message
                      : "Message sent, check your WhatsApp!"
                    : t,
                  "info"
                ),
                  $(this).sbLoading(!1);
              }
            ),
            !1
          );
      }
    );

    // Twitter
    $(settings_area).on("click", "#twitter-subscribe .sb-btn", function (e) {
      e.preventDefault();
      if (loading(this)) return false;
      SBF.ajax(
        {
          function: "twitter-subscribe",
          cloud_token: cloudURL(),
        },
        (response) => {
          dialog(
            response === true
              ? "Synchronization completed."
              : JSON.stringify(response),
            "info"
          );
          $(this).sbLoading(false);
        }
      );
      return false;
    });

    // Email piping manual sync
    $(settings_area).on("click", "#email-piping-sync a", function (e) {
      if (loading(this)) return;
      SBF.ajax(
        {
          function: "email-piping",
          force: true,
        },
        (response) => {
          dialog(
            response === true ? "Syncronization completed." : response,
            "info"
          );
          $(this).sbLoading(false);
        }
      );
      e.preventDefault();
    });

    // Automations
    $(settings_area).on("click", "#tab-automations", function () {
      SBSettings.automations.get(() => {
        SBSettings.automations.populate();
        loadingGlobal(false);
      }, true);
      loadingGlobal();
    });

    $(automations_area).on("click", ".sb-add-condition", function () {
      SBSettings.automations.addCondition();
    });

    $(automations_area).on("change", ".sb-condition-1 select", function () {
      SBSettings.automations.updateCondition(this);
    });

    $(automations_area_select).on("click", "li", function () {
      SBSettings.automations.populate($(this).data("value"));
    });

    $(automations_area_nav).on("click", "li", function () {
      SBSettings.automations.show($(this).attr("data-id"));
    });

    $(automations_area).on("click", ".sb-add-automation", function () {
      SBSettings.automations.add();
    });

    $(automations_area_nav).on("click", "li i", function () {
      dialog(`The automation will be deleted permanently.`, "alert", () => {
        SBSettings.automations.delete(this);
      });
    });

  /*
     * ----------------------------------------------------------
     * Recording MP3 for chat
     * ----------------------------------------------------------
     */

  const recButton = document.getElementById("recordButton");
  const stopButton = document.getElementById("stopButton");
  const sending = document.querySelector(".bi-arrow-up-circle-fill");
  const textArea = document.querySelector(".sb-textarea>textarea");

  sending.addEventListener("click", () => {
    recButton.classList.remove("sb-hide");
    setTimeout(() => {
      sending.classList.add("sb-hide");
    }, 10);
  });

  textArea.addEventListener("input", () => {
    if (textArea.value.trim() === "") {
      sending.classList.add("sb-hide");
    } else {
      sending.classList.remove("sb-hide");
      recButton.classList.remove("sb-hide");
    }
  });

  recButton.addEventListener("click", () => {
    document.querySelector(".bi-mic-fill").classList.add("sb-hide");
    // Show the send icon after a timeout
    showSendIconAfterTimeout();
  });

  stopButton.addEventListener("click", () => {
    document.querySelector(".bi-mic-fill").classList.remove("sb-hide");
    // Show the send icon after a timeout
    showSendIconAfterTimeout();
  });

  // Function to show the send icon after a timeout
  function showSendIconAfterTimeout() {
    setTimeout(() => {
      document.querySelector(".bi-arrow-up-circle-fill").classList.remove("sb-hide");
    }, 500); // Adjust the timeout duration as needed
  }


    /*
     * ----------------------------------------------------------
     * # Reports area
     * ----------------------------------------------------------
     */

    $(reports_area).on("click", ".sb-nav [id]", function () {
      let id = $(this).attr("id");
      SBReports.active_report = false;
      reports_area.find("#sb-date-picker").val("");
      reports_area.attr("class", "sb-area-reports sb-active sb-report-" + id);
      SBReports.initReport($(this).attr("id"));
      if (SBF.getURL("report") != id) pushState("?report=" + id);
    });

    $(reports_area).on("change", "#sb-date-picker", function () {
      SBReports.initReport(false, $(this).val());
    });

    if (SBF.getURL("report")) {
      if (!reports_area.sbActive())
        header.find(".sb-admin-nav #sb-reports").click();
      setTimeout(() => {
        reports_area.find("#" + SBF.getURL("report")).click();
      }, 500);
    }

   

    /*
     * ----------------------------------------------------------
     * # Components
     * ----------------------------------------------------------
     */

    // Language switcher
    $(admin).on("click", ".sb-language-switcher > i", function () {
      let a = $(this).parent(),
        t = a
          .find("[data-language]")
          .map(function () {
            return $(this).attr("data-language");
          })
          .get(),
        e = admin.find(".sb-languages-box"),
        s = "";
      for (var n in (t.push("en"), SB_LANGUAGE_CODES))
        t.includes(n) ||
          (s += `<div data-language="${n}"><img src="${STMBX_URL}/media/flags/${n}.png" />${sb_(
            SB_LANGUAGE_CODES[n]
          )}</div>`);
      (language_switcher_target = a),
        e.attr("data-source", a.attr("data-source")),
        e.find(".sb-main").html(s),
        e.sbShowLightbox();
    }),
      $(admin).on("click", ".sb-language-switcher img", function () {
        let a = $(this).parent(),
          t = a.sbActive(),
          e = !t && a.attr("data-language");
        switch (a.parent().attr("data-source")) {
          case "articles":
            SBSettings.articles.show(!1, !1, e);
            break;
          case "automations":
            SBSettings.automations.show(!1, e);
            break;
          case "settings":
            let s = a.parent().find("[data-language].sb-active");
            SBSettings.translations.save(
              a,
              t
                ? a.attr("data-language")
                : !!s.length && s.attr("data-language")
            ),
              SBSettings.translations.activate(a, e);
        }
        a.siblings().sbActive(!1), a.sbActive(!t);
      }),
      $(admin).on("click", ".sb-language-switcher span > i", function () {
        let a = $(this).parent(),
          t = a.attr("data-language");
        dialog(
          sb_("The {T} translation will be deleted.").replace(
            "{T}",
            sb_(SB_LANGUAGE_CODES[t])
          ),
          "alert",
          () => {
            switch (a.parent().attr("data-source")) {
              case "articles":
                SBSettings.articles.deleteTranslation(!1, t),
                  SBSettings.articles.show();
                break;
              case "automations":
                SBSettings.automations.deleteTranslation(!1, t),
                  SBSettings.automations.show();
                break;
              case "settings":
                SBSettings.translations.delete(a, t);
            }
            a.remove();
          }
        );
      }),
      $(admin).on("click", ".sb-languages-box [data-language]", function () {
        let a = $(this).parents().eq(1),
          t = $(this).attr("data-language");
        switch (a.attr("data-source")) {
          case "articles":
            SBSettings.articles.addTranslation(!1, t),
              SBSettings.articles.show(!1, !1, t);
            break;
          case "automations":
            SBSettings.automations.addTranslation(!1, !1, t),
              SBSettings.automations.show(!1, t);
            break;
          case "settings":
            SBSettings.translations.add(t);
        }
        admin.sbHideLightbox();
      });

    // Lightbox
    $(admin).on("click", ".sb-lightbox .sb-top-bar .sb-close", function () {
      admin.sbHideLightbox();
    });

    $(admin).on("click", ".sb-lightbox .sb-info", function () {
      $(this).sbActive(false);
    });

    // Alert and information box
    $(admin).on("click", ".sb-dialog-box a", function () {
      let s = $(this).closest(".sb-lightbox");
      $(this).hasClass("sb-confirm") && alertOnConfirmation(),
        1 == admin.find(".sb-lightbox.sb-active").length &&
          overlay.sbActive(!1),
        (SBAdmin.open_popup = !1),
        s.sbActive(!1);
    });

    /*
     * ----------------------------------------------------------
     * # Miscellaneous
     * ----------------------------------------------------------
     */

    $(admin).on("click", ".sb-menu-wide li, .sb-nav li", function () {
      $(this).siblings().sbActive(!1), $(this).sbActive(!0);
    });
    $(admin).on(
      "click",
      ".sb-nav:not(.sb-nav-only) li:not(.sb-tab-nav-title)",
      function () {
        let t = $(this).closest(".sb-tab"),
          n = $(t)
            .find(" > .sb-content > div")
            .sbActive(!1)
            .eq($(this).parent().find("li:not(.sb-tab-nav-title)").index(this));
        n.sbActive(!0),
          n.find("textarea").each(function () {
            $(this).autoExpandTextarea(), $(this).manualExpandTextarea();
          }),
          t.find(".sb-scroll-area").scrollTop(0);
      }
    );
    $(admin).sbInitTooltips(),
      $(admin).on("click", '[data-button="toggle"]', function () {
        let s = admin.find("." + $(this).data("show")),
          i = admin.find("." + $(this).data("hide"));
        s.addClass("sb-show-animation").show(),
          i.hide(),
          (SBAdmin.open_popup =
            !!(s.hasClass("sb-lightbox") || s.hasClass("sb-popup")) && s);
      }),
      $(admin).on("click", ".sb-info-card", function () {
        $(this).sbActive(!1);
      });
    $(admin).on(
      "change",
      ".sb-upload-form-admin .sb-upload-files",
      function (a) {
        $(this).sbUploadFiles(function (a) {
          "success" == (a = JSON.parse(a))[0]
            ? ("upload-image" ==
                $(upload_target).closest("[data-type]").data("type") &&
                $(upload_target)
                  .attr("data-value", a[1])
                  .css("background-image", `url("${a[1]}")`),
              upload_on_success && upload_on_success(a[1]))
            : console.log(a[1]);
        });
      }
    );
    $(admin).on("click", ".sb-accordion > div > span", function (i) {
      let s = $(this).parent(),
        t = $(s).sbActive();
      $(i.target).is("span") && (s.siblings().sbActive(!1), s.sbActive(!t));
    });
    $(admin).on("mousedown", function (s) {
      if ($(SBAdmin.open_popup).length) {
        let e = $(SBAdmin.open_popup);
        e.is(s.target) ||
          0 !== e.has(s.target).length ||
          ["sb-btn-saved-replies", "bi-emoji-grin"].includes(
            $(s.target).attr("class")
          ) ||
          (e.hasClass("sb-popup")
            ? e.sbTogglePopup()
            : e.hasClass("sb-select")
            ? e.find("ul").sbActive(!1)
            : e.hasClass("sb-menu-mobile")
            ? e.find("i").sbActive(!1)
            : e.hasClass("sb-menu")
            ? e.sbActive(!1)
            : admin.sbHideLightbox(),
          (SBAdmin.open_popup = !1));
      }
    });
  });

  function initialization() {
    SBF.ajax({ function: "get-conversations" }, (i) => {
      0 == i.length &&
        conversations_area.find(".sb-board").addClass("sb-no-conversation"),
        SBConversations.populateList(i),
        responsive && conversations_area.find(".sb-admin-list").sbActive(!0),
        SBF.getURL("conversation")
          ? (conversations_area.sbActive() ||
              header.find(".sb-admin-nav #sb-conversations").click(),
            SBConversations.openConversation(SBF.getURL("conversation")))
          : responsive ||
            SBF.getURL("user") ||
            SBF.getURL("setting") ||
            SBF.getURL("report") ||
            (SBF.getURL("area") && "conversations" != SBF.getURL("area")) ||
            SBConversations.clickFirst(),
        SBConversations.startRealTime(),
        (SBConversations.datetime_last_conversation =
          SB_ADMIN_SETTINGS["now-db"]),
        loadingGlobal(!1);
    }),
      SBPusher.initServiceWorker(),
      SB_ADMIN_SETTINGS["push-notifications"] &&
        SBPusher.initPushNotifications();
  }
})(jQuery);

/*
 * ----------------------------------------------------------
 * tinyColorPicker v1.1.1 2016-08-30
 * ----------------------------------------------------------
 */

!(function (r, t) {
  "object" == typeof exports
    ? (module.exports = t(r))
    : "function" == typeof define && define.amd
    ? define("colors", [], function () {
        return t(r);
      })
    : (r.Colors = t(r));
})(this, function (r, t) {
  "use strict";
  function o(r, o, i, n, s) {
    if ("string" == typeof o) {
      var o = _.txt2color(o);
      (p[(i = o.type)] = o[i]), (s = s !== t ? s : o.alpha);
    } else if (o) for (var l in o) r[i][l] = c(o[l] / a[i][l][1], 0, 1);
    return s !== t && (r.alpha = c(+s, 0, 1)), e(i, n ? r : t);
  }
  function e(r, t) {
    var o,
      e,
      c,
      g = t || p,
      $ = _,
      f = h.options,
      b = a,
      d = g.RND,
      v = "",
      x = "",
      m = { hsl: "hsv", rgb: r },
      y = d.rgb;
    if ("alpha" !== r) {
      for (var k in b)
        if (!b[k][k])
          for (v in (r !== k &&
            ((x = m[k] || "rgb"), (g[k] = $[x + "2" + k](g[x]))),
          d[k] || (d[k] = {}),
          (o = g[k])))
            d[k][v] = u(o[v] * b[k][v][1]);
      (y = d.rgb),
        (g.HEX = $.RGB2HEX(y)),
        (g.equivalentGrey =
          f.grey.r * g.rgb.r + f.grey.g * g.rgb.g + f.grey.b * g.rgb.b),
        (g.webSave = e = i(y, 51)),
        (g.webSmart = c = i(y, 17)),
        (g.saveColor =
          y.r === e.r && y.g === e.g && y.b === e.b
            ? "web save"
            : y.r === c.r && y.g === c.g && y.b === c.b
            ? "web smart"
            : ""),
        (g.hueRGB = _.hue2RGB(g.hsv.h)),
        t &&
          (g.background =
            ((C = y),
            (w = g.rgb),
            (B = g.alpha),
            (G = h.options.grey),
            ((M = {}).RGB = { r: C.r, g: C.g, b: C.b }),
            (M.rgb = { r: w.r, g: w.g, b: w.b }),
            (M.alpha = B),
            (M.equivalentGrey = u(G.r * C.r + G.g * C.g + G.b * C.b)),
            (M.rgbaMixBlack = s(w, { r: 0, g: 0, b: 0 }, B, 1)),
            (M.rgbaMixWhite = s(w, { r: 1, g: 1, b: 1 }, B, 1)),
            (M.rgbaMixBlack.luminance = n(M.rgbaMixBlack, !0)),
            (M.rgbaMixWhite.luminance = n(M.rgbaMixWhite, !0)),
            h.options.customBG &&
              ((M.rgbaMixCustom = s(w, h.options.customBG, B, 1)),
              (M.rgbaMixCustom.luminance = n(M.rgbaMixCustom, !0)),
              (h.options.customBG.luminance = n(h.options.customBG, !0))),
            M));
    }
    var C,
      w,
      B,
      G,
      M,
      R,
      E,
      z,
      F,
      H,
      D,
      X,
      S,
      A,
      q = g.rgb,
      P = g.alpha,
      N = "luminance",
      L = g.background;
    return (
      ((R = s(q, { r: 0, g: 0, b: 0 }, P, 1))[N] = n(R, !0)),
      (g.rgbaMixBlack = R),
      ((E = s(q, { r: 1, g: 1, b: 1 }, P, 1))[N] = n(E, !0)),
      (g.rgbaMixWhite = E),
      f.customBG &&
        (((z = s(q, L.rgbaMixCustom, P, 1))[N] = n(z, !0)),
        (z.WCAG2Ratio =
          ((F = z[N]),
          (H = L.rgbaMixCustom[N]),
          (D = 1),
          u(
            100 *
              (D = F >= H ? (F + 0.05) / (H + 0.05) : (H + 0.05) / (F + 0.05))
          ) / 100)),
        (g.rgbaMixBGMixCustom = z),
        (z.luminanceDelta = l.abs(z[N] - L.rgbaMixCustom[N])),
        (z.hueDelta =
          ((X = L.rgbaMixCustom),
          (S = z),
          (A = !0),
          ((l.max(X.r - S.r, S.r - X.r) +
            l.max(X.g - S.g, S.g - X.g) +
            l.max(X.b - S.b, S.b - X.b)) *
            (A ? 255 : 1)) /
            765))),
      (g.RGBLuminance = n(y)),
      (g.HUELuminance = n(g.hueRGB)),
      f.convertCallback && f.convertCallback(g, r),
      g
    );
  }
  function i(r, t) {
    var o = {},
      e = 0,
      i = t / 2;
    for (var n in r) (e = r[n] % t), (o[n] = r[n] + (e > i ? t - e : -e));
    return o;
  }
  function n(r, t) {
    for (
      var o = t ? 1 : 255,
        e = [r.r / o, r.g / o, r.b / o],
        i = h.options.luminance,
        n = e.length;
      n--;

    )
      e[n] =
        e[n] <= 0.03928 ? e[n] / 12.92 : l.pow((e[n] + 0.055) / 1.055, 2.4);
    return i.r * e[0] + i.g * e[1] + i.b * e[2];
  }
  function s(r, o, e, i) {
    var n = {},
      s = e !== t ? e : 1,
      c = i !== t ? i : 1,
      a = s + c * (1 - s);
    for (var l in r) n[l] = (r[l] * s + o[l] * c * (1 - s)) / a;
    return (n.a = a), n;
  }
  function c(r, t, o) {
    return r > o ? o : t > r ? t : r;
  }
  var a = {
      rgb: { r: [0, 255], g: [0, 255], b: [0, 255] },
      hsv: { h: [0, 360], s: [0, 100], v: [0, 100] },
      hsl: { h: [0, 360], s: [0, 100], l: [0, 100] },
      alpha: { alpha: [0, 1] },
      HEX: { HEX: [0, 16777215] },
    },
    l = r.Math,
    u = l.round,
    h = {},
    p = {},
    g = { r: 0.298954, g: 0.586434, b: 0.114612 },
    $ = { r: 0.2126, g: 0.7152, b: 0.0722 },
    f = function (r) {
      (this.colors = { RND: {} }),
        (this.options = {
          color: "rgba(0,0,0,0)",
          grey: g,
          luminance: $,
          valueRanges: a,
        }),
        b(this, r || {});
    },
    b = function (r, e) {
      var i,
        n = r.options;
      for (var s in (d(r), e)) e[s] !== t && (n[s] = e[s]);
      (i = n.customBG),
        (n.customBG = "string" == typeof i ? _.txt2color(i).rgb : i),
        (p = o(r.colors, n.color, t, !0));
    },
    d = function (r) {
      h !== r && ((h = r), (p = r.colors));
    };
  (f.prototype.setColor = function (r, i, n) {
    return (
      d(this),
      r
        ? o(this.colors, r, i, t, n)
        : (n !== t && (this.colors.alpha = c(n, 0, 1)), e(i))
    );
  }),
    (f.prototype.setCustomBackground = function (r) {
      return (
        d(this),
        (this.options.customBG = "string" == typeof r ? _.txt2color(r).rgb : r),
        o(this.colors, t, "rgb")
      );
    }),
    (f.prototype.saveAsBackground = function () {
      return d(this), o(this.colors, t, "rgb", !0);
    }),
    (f.prototype.toString = function (r, t) {
      return _.color2text((r || "rgb").toLowerCase(), this.colors, t);
    });
  var _ = {
    txt2color: function (r) {
      var t = {},
        o = r.replace(/(?:#|\)|%)/g, "").split("("),
        e = (o[1] || "").split(/,\s*/),
        i = o[1] ? o[0].substr(0, 3) : "rgb",
        n = "";
      if (((t.type = i), (t[i] = {}), o[1]))
        for (var s = 3; s--; )
          (n = i[s] || i.charAt(s)), (t[i][n] = +e[s] / a[i][n][1]);
      else t.rgb = _.HEX2rgb(o[0]);
      return (t.alpha = e[3] ? +e[3] : 1), t;
    },
    color2text: function (r, t, o) {
      var e = !1 !== o && u(100 * t.alpha) / 100,
        i = "number" == typeof e && !1 !== o && (o || 1 !== e),
        n = t.RND.rgb,
        s = t.RND.hsl,
        c = "hex" === r && i,
        a = "hex" === r && !c,
        l =
          "rgb" === r || c
            ? n.r + ", " + n.g + ", " + n.b
            : a
            ? "#" + t.HEX
            : s.h + ", " + s.s + "%, " + s.l + "%";
      return a
        ? l
        : (c ? "rgb" : r) +
            (i ? "a" : "") +
            "(" +
            l +
            (i ? ", " + e : "") +
            ")";
    },
    RGB2HEX: function (r) {
      return (
        (r.r < 16 ? "0" : "") +
        r.r.toString(16) +
        (r.g < 16 ? "0" : "") +
        r.g.toString(16) +
        (r.b < 16 ? "0" : "") +
        r.b.toString(16)
      ).toUpperCase();
    },
    HEX2rgb: function (r) {
      return {
        r: +("0x" + (r = r.split(""))[0] + r[r[3] ? 1 : 0]) / 255,
        g: +("0x" + r[r[3] ? 2 : 1] + (r[3] || r[1])) / 255,
        b: +("0x" + (r[4] || r[2]) + (r[5] || r[2])) / 255,
      };
    },
    hue2RGB: function (r) {
      var t = 6 * r,
        o = ~~t % 6,
        e = 6 === t ? 0 : t - o;
      return {
        r: u(255 * [1, 1 - e, 0, 0, e, 1][o]),
        g: u(255 * [e, 1, 1, 1 - e, 0, 0][o]),
        b: u(255 * [0, 0, e, 1, 1, 1 - e][o]),
      };
    },
    rgb2hsv: function (r) {
      var t,
        o,
        e,
        i = r.r,
        n = r.g,
        s = r.b,
        c = 0;
      return (
        s > n && ((n = s + ((s = n), 0)), (c = -1)),
        (o = s),
        n > i && ((i = n + ((n = i), 0)), (c = -2 / 6 - c), (o = l.min(n, s))),
        (t = i - o),
        {
          h:
            1e-15 > (e = i ? t / i : 0)
              ? (p && p.hsl && p.hsl.h) || 0
              : t
              ? l.abs(c + (n - s) / (6 * t))
              : 0,
          s: i ? t / i : (p && p.hsv && p.hsv.s) || 0,
          v: i,
        }
      );
    },
    hsv2rgb: function (r) {
      var t = 6 * r.h,
        o = r.s,
        e = r.v,
        i = ~~t,
        n = t - i,
        s = e * (1 - o),
        c = e * (1 - n * o),
        a = e * (1 - (1 - n) * o),
        l = i % 6;
      return {
        r: [e, c, s, s, a, e][l],
        g: [a, e, e, c, s, s][l],
        b: [s, s, a, e, e, c][l],
      };
    },
    hsv2hsl: function (r) {
      var t = (2 - r.s) * r.v,
        o = r.s * r.v;
      return (
        (o = r.s ? (1 > t ? (t ? o / t : 0) : o / (2 - t)) : 0),
        { h: r.h, s: r.v || o ? o : (p && p.hsl && p.hsl.s) || 0, l: t / 2 }
      );
    },
    rgb2hsl: function (r, t) {
      var o = _.rgb2hsv(r);
      return _.hsv2hsl(t ? o : (p.hsv = o));
    },
    hsl2rgb: function (r) {
      var t = 6 * r.h,
        o = r.s,
        e = r.l,
        i = 0.5 > e ? e * (1 + o) : e + o - o * e,
        n = e + e - i,
        s = ~~t,
        c = i * (i ? (i - n) / i : 0) * (t - s),
        a = n + c,
        l = i - c,
        u = s % 6;
      return {
        r: [i, l, n, n, a, i][u],
        g: [a, i, i, l, n, n][u],
        b: [n, n, a, i, i, l][u],
      };
    },
  };
  return f;
}),
  (function (r, t) {
    "object" == typeof exports
      ? (module.exports = t(r, require("jquery"), require("colors")))
      : "function" == typeof define && define.amd
      ? define(["jquery", "colors"], function (o, e) {
          return t(r, o, e);
        })
      : t(r, r.jQuery, r.Colors);
  })(this, function (r, t, o, e) {
    "use strict";
    function i(r) {
      return (
        r.value ||
        r.getAttribute("value") ||
        t(r).css("background-color") ||
        "#FFF"
      );
    }
    function n(r) {
      return (r =
        r.originalEvent && r.originalEvent.touches
          ? r.originalEvent.touches[0]
          : r).originalEvent
        ? r.originalEvent
        : r;
    }
    function s(r) {
      return t(r.find(b.doRender)[0] || r[0]);
    }
    function c(o) {
      var n = t(this),
        c = n.offset(),
        l = t(r),
        u = b.gap;
      o
        ? (((d = s(n))._colorMode = d.data("colorMode")),
          ($.$trigger = n),
          (
            _ ||
            (t("head")[b.cssPrepend ? "prepend" : "append"](
              '<style type="text/css" id="tinyColorPickerStyles">' +
                (b.css || H) +
                (b.cssAddon || "") +
                "</style>"
            ),
            t(F)
              .css({ margin: b.margin })
              .appendTo("body")
              .show(0, function () {
                ($.$UI = _ = t(this)),
                  (E = b.GPU && _.css("perspective") !== e),
                  (v = t(".cp-z-slider", this)),
                  (x = t(".cp-xy-slider", this)),
                  (m = t(".cp-xy-cursor", this)),
                  (y = t(".cp-z-cursor", this)),
                  (k = t(".cp-alpha", this)),
                  (C = t(".cp-alpha-cursor", this)),
                  b.buildCallback.call($, _),
                  _.prepend("<div>")
                    .children()
                    .eq(0)
                    .css("width", _.children().eq(0).width()),
                  (_._width = this.offsetWidth),
                  (_._height = this.offsetHeight);
              })
              .hide())
          )
            .css(
              b.positionCallback.call($, n) || {
                left:
                  (_._left = c.left) -
                  ((_._left += _._width - (l.scrollLeft() + l.width())) + u > 0
                    ? _._left + u
                    : 0),
                top:
                  (_._top = c.top + n.outerHeight()) -
                  ((_._top += _._height - (l.scrollTop() + l.height())) + u > 0
                    ? _._top + u
                    : 0),
              }
            )
            .show(b.animationSpeed, function () {
              !0 !== o &&
                ((k.toggle(!!b.opacity)._width = k.width()),
                (x._width = x.width()),
                (x._height = x.height()),
                (v._height = v.height()),
                f.setColor(i(d[0])),
                p(!0));
            })
            .off(".tcp")
            .on(M, ".cp-xy-slider,.cp-z-slider,.cp-alpha", a))
        : $.$trigger &&
          t(_)
            .hide(b.animationSpeed, function () {
              p(!1), ($.$trigger = null);
            })
            .off(".tcp");
    }
    function a(r) {
      var o = this.className
        .replace(/cp-(.*?)(?:\s*|$)/, "$1")
        .replace("-", "_");
      (r.button || r.which) > 1 ||
        (r.preventDefault && r.preventDefault(),
        (r.returnValue = !1),
        (d._offset = t(this).offset()),
        (o = "xy_slider" === o ? l : "z_slider" === o ? u : h)(r),
        p(),
        w
          .on(R, function () {
            w.off(".tcp");
          })
          .on(G, function (r) {
            o(r), p();
          }));
    }
    function l(r) {
      var t = n(r),
        o = t.pageX - d._offset.left,
        e = t.pageY - d._offset.top;
      f.setColor(
        { s: (o / x._width) * 100, v: 100 - (e / x._height) * 100 },
        "hsv"
      );
    }
    function u(r) {
      var t = n(r).pageY - d._offset.top;
      f.setColor({ h: 360 - (t / v._height) * 360 }, "hsv");
    }
    function h(r) {
      var t = (n(r).pageX - d._offset.left) / k._width;
      f.setColor({}, "rgb", t);
    }
    function p(r) {
      var t = f.colors,
        o = t.hueRGB,
        i = (t.RND.rgb, t.RND.hsl, b.dark),
        n = b.light,
        s = f.toString(d._colorMode, b.forceAlpha),
        c = t.HUELuminance > 0.22 ? i : n,
        a = t.rgbaMixBlack.luminance > 0.22 ? i : n,
        l = (1 - t.hsv.h) * v._height,
        u = t.hsv.s * x._width,
        h = (1 - t.hsv.v) * x._height,
        p = t.alpha * k._width,
        $ = E ? "translate3d" : "",
        _ = d[0].value,
        w = d[0].hasAttribute("value") && "" === _ && r !== e;
      (x._css = {
        backgroundColor: "rgb(" + o.r + "," + o.g + "," + o.b + ")",
      }),
        (m._css = {
          transform: $ + "(" + u + "px, " + h + "px, 0)",
          left: E ? "" : u,
          top: E ? "" : h,
          borderColor: t.RGBLuminance > 0.22 ? i : n,
        }),
        (y._css = {
          transform: $ + "(0, " + l + "px, 0)",
          top: E ? "" : l,
          borderColor: "transparent " + c,
        }),
        (k._css = { backgroundColor: "#" + t.HEX }),
        (C._css = {
          transform: $ + "(" + p + "px, 0, 0)",
          left: E ? "" : p,
          borderColor: a + " transparent",
        }),
        (d._css = {
          backgroundColor: w ? "" : s,
          color: w ? "" : t.rgbaMixBGMixCustom.luminance > 0.22 ? i : n,
        }),
        (d.text = w ? "" : _ !== s ? s : ""),
        r !== e ? g(r) : z(g);
    }
    function g(r) {
      x.css(x._css),
        m.css(m._css),
        y.css(y._css),
        k.css(k._css),
        C.css(C._css),
        b.doRender && d.css(d._css),
        d.text && d.val(d.text),
        b.renderCallback.call($, d, "boolean" == typeof r ? r : e);
    }
    var $,
      f,
      b,
      d,
      _,
      v,
      x,
      m,
      y,
      k,
      C,
      w = t(document),
      B = t(),
      G = "touchmove.tcp mousemove.tcp pointermove.tcp",
      M = "touchstart.tcp mousedown.tcp pointerdown.tcp",
      R = "touchend.tcp mouseup.tcp pointerup.tcp",
      E = !1,
      z =
        r.requestAnimationFrame ||
        r.webkitRequestAnimationFrame ||
        function (r) {
          r();
        },
      F =
        '<div class="cp-color-picker"><div class="cp-z-slider"><div class="cp-z-cursor"></div></div><div class="cp-xy-slider"><div class="cp-white"></div><div class="cp-xy-cursor"></div></div><div class="cp-alpha"><div class="cp-alpha-cursor"></div></div></div>',
      H =
        ".cp-color-picker{position:absolute;overflow:hidden;padding:6px 6px 0;background-color:#444;color:#bbb;font-family:Arial,Helvetica,sans-serif;font-size: var(--chat-text-size-8);font-weight:400;cursor:default;border-radius:5px}.cp-color-picker>div{position:relative;overflow:hidden}.cp-xy-slider{float:left;height:128px;width:128px;margin-bottom:6px;background:linear-gradient(to right,#FFF,rgba(255,255,255,0))}.cp-white{height:100%;width:100%;background:linear-gradient(rgba(0,0,0,0),#000)}.cp-xy-cursor{position:absolute;top:0;width:10px;height:10px;margin:-5px;border:1px solid #fff;border-radius:100%;box-sizing:border-box}.cp-z-slider{float:right;margin-left:6px;height:128px;width:20px;background:linear-gradient(red 0,#f0f 17%,#00f 33%,#0ff 50%,#0f0 67%,#ff0 83%,red 100%)}.cp-z-cursor{position:absolute;margin-top:-4px;width:100%;border:4px solid #fff;border-color:transparent #fff;box-sizing:border-box}.cp-alpha{clear:both;width:100%;height:16px;margin:6px 0;background:linear-gradient(to right,#444,rgba(0,0,0,0))}.cp-alpha-cursor{position:absolute;margin-left:-4px;height:100%;border:4px solid #fff;border-color:#fff transparent;box-sizing:border-box}",
      D = function (r) {
        (b = (f = this.color = new o(r)).options), ($ = this);
      };
    (D.prototype = { render: p, toggle: c }),
      (t.fn.colorPicker = function (o) {
        var e = this,
          n = function () {};
        return (
          (o = t.extend(
            {
              animationSpeed: 150,
              GPU: !0,
              doRender: !0,
              customBG: "#FFF",
              opacity: !0,
              renderCallback: n,
              buildCallback: n,
              positionCallback: n,
              body: document.body,
              scrollResize: !0,
              gap: 4,
              dark: "#222",
              light: "#DDD",
            },
            o
          )),
          !$ &&
            o.scrollResize &&
            t(r).on("resize.tcp scroll.tcp", function () {
              $.$trigger && $.toggle.call($.$trigger[0], !0);
            }),
          (B = B.add(this)),
          (this.colorPicker = $ || new D(o)),
          (this.options = o),
          t(o.body)
            .off(".tcp")
            .on(M, function (r) {
              -1 === B.add(_).add(t(_).find(r.target)).index(r.target) && c();
            }),
          this.on("focusin.tcp click.tcp", function (r) {
            ($.color.options = t.extend($.color.options, (b = e.options))),
              c.call(this, r);
          })
            .on("change.tcp", function () {
              f.setColor(this.value || "#FFF"), e.colorPicker.render(!0);
            })
            .each(function () {
              var r = i(this),
                e = r.split("("),
                n = s(t(this));
              n
                .data("colorMode", e[1] ? e[0].substr(0, 3) : "HEX")
                .attr("readonly", b.preventFocus),
                o.doRender &&
                  n.css({
                    "background-color": r,
                    color: function () {
                      return f.setColor(r).rgbaMixBGMixCustom.luminance > 0.22
                        ? o.dark
                        : o.light;
                    },
                  });
            })
        );
      }),
      (t.fn.colorPicker.destroy = function () {
        t("*").off(".tcp"), $.toggle(!1), (B = t());
      });
  });

/*
 * ----------------------------------------------------------
 *	Loader for chat
 * ----------------------------------------------------------
 */


 // Function to hide the overlay and fade in the content
function showContent() {
  const overlay = document.getElementById("overlay");
  const html = document.documentElement;

  overlay.style.display = "none";
  html.style.animation = "fade-in .1s ease-in";
}

// Function to initialize the loading animation
function initLoadingAnimation() {
  const overlay = document.getElementById("overlay");
  const loader = document.getElementById("loader");

  // Trigger the loading animation
  overlay.style.animation = "load 1.6s ease-out";

  // Listen for the end of the loading animation
  overlay.addEventListener("animationend", function () {
    // Hide the overlay and fade in the content
    showContent();
  });
}

// Event listener for when all resources have loaded
window.addEventListener("load", function () {
  // Initialize the loading animation
  initLoadingAnimation();
});


/*
 * ----------------------------------------------------------
 *	Toggle for settings
 * ----------------------------------------------------------
 */

document.addEventListener("click", (s) => {
  if (s.target.classList.contains("settings-button")) {
    let e = s.target.closest(".sb-setting"),
      t = e.querySelector(".active");
    t.classList.contains("sb-hide")
      ? (t.classList.remove("sb-hide"),
        e.querySelector(".input").classList.remove("sb-hide"))
      : (t.classList.add("sb-hide"),
        e.querySelector(".input").classList.add("sb-hide"));
  } else if (s.target.classList.contains("sb-revert")) {
    let i = s.target.closest(".sb-setting");
    i.querySelector(".active").classList.add("sb-hide"),
      i.querySelector(".input").classList.add("sb-hide");
  }
});

/*
 * ----------------------------------------------------------
 *	Dropdown for tags
 * ----------------------------------------------------------
 */

function ExtraButton() {
  document.getElementById("CstBtn").classList.toggle("show");
}
window.onclick = function (t) {
  if (!t.target.matches(".cst-btn")) {
    var n,
      s = document.getElementsByClassName("cstdown-content");
    for (n = 0; n < s.length; n++) {
      var e = s[n];
      e.classList.contains("show") && e.classList.remove("show");
    }
  }
};

/*
 * ----------------------------------------------------------
 *	Chat with Support
 * ----------------------------------------------------------
 */

//  document.addEventListener("DOMContentLoaded", function () {
//   const helpCenter = document.querySelector(".help-center");
//   const customerSupportFrame = document.getElementById("customer-support");

//   helpCenter.addEventListener("click", function () {
//     // Verificamos que el iframe exista
//     if (customerSupportFrame) {
//       // Actualizamos el contenido del iframe con el estado de la conexión
//       const iframeContent = `
//         <html>
//           <head>
//             <title>Estado de la conexión</title>
//           </head>
//           <body>
//             <h1>Estado de la conexión</h1>
//             <p>¡Aquí va el estado de la conexión!</p>
//             <!-- Puedes agregar más contenido dinámico aquí -->
//           </body>
//         </html>
//       `;
//       const iframeDoc = customerSupportFrame.contentDocument;
//       iframeDoc.open();
//       iframeDoc.write(iframeContent);
//       iframeDoc.close();

//       // Mostramos el iframe
//       customerSupportFrame.style.display = "block";
//     } else {
//       console.error("No se encontró el elemento iframe con el id 'customer-support'");
//     }
//   });
// });
