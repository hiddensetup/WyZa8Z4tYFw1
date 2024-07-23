


function sb_count_fallback_messages($conversation_id)
{
    return sb_db_get('SELECT COUNT(*) AS count FROM sb_messages WHERE payload LIKE \'%"fallback_message"%\' AND conversation_id = ' . sb_db_escape($conversation_id, true))['count'];
}

function sb_option_assign_reply($option, $conversation_id, $flowData = null, $flowKey = 'main_flow')
{
    $opt = "option";
    $wel = "welcome";
    $reply = [];

    // Convert the input option to lowercase
    $option = strtolower($option);

    // If flowData is null, get the JSON flow data and decode it
    if (is_null($flowData)) {
        $jsonFlow = sb_get_multi_setting("welcome-message", "json-flow");
        $flowData = json_decode($jsonFlow, true);
    }

    if (json_last_error() === JSON_ERROR_NONE && isset($flowData[$flowKey])) {
        $matched = false;
        foreach ($flowData[$flowKey] as $flow) {
            foreach ($flow as $response) {
                // Check if the provided option matches any of the keywords in the JSON flow
                if (isset($response['keywords']) && is_array($response['keywords'])) {
                    foreach ($response['keywords'] as $keyword) {
                        if ($option === strtolower($keyword)) {
                            $reply["option"] = $keyword;
                            // Handle replies as an array
                            $bot_replies = isset($response['bot_reply']) ? $response['bot_reply'] : [];
                            $reply["reply"] = is_array($bot_replies) ? $bot_replies : [$bot_replies]; // Ensure $reply["reply"] is always an array
                            $reply["assign"] = isset($response['assign']) ? $response['assign'] : [];
                            $matched = true;
                            break 3; // Exit all loops once a match is found
                        }
                    }
                }
            }
        }
        
        if (!$matched) {
            // If no keywords matched, consider fallback logic
            $fallback_count = sb_count_fallback_messages($conversation_id);

            if ($fallback_count < 3) {
                // If not sent 3 times, send fallback message
                $message = sb_get_multi_setting("welcome-message", "fallback-msg");
                return [
                    "id" => sb_send_message(sb_get_bot_id(), $conversation_id, $message, [], -1, ["fallback_message" => true])["id"],
                    "message" => $message,
                ];
            } else {
                // If already sent 3 times, do not send anything
                return false;
            }
        }

        // If a reply was matched
        if (!empty($reply)) {
            $bot_replies = $reply["reply"];
            $response_ids = [];
            foreach ($bot_replies as $bot_reply) {
                // Ensure $bot_reply is an array if it isn't already
                $message = is_array($bot_reply) ? $bot_reply['message'] : $bot_reply;
                $delay = isset($bot_reply['delay']) ? (int)$bot_reply['delay'] : 0;

                $response_id = sb_send_message(sb_get_bot_id(), $conversation_id, $message)["id"];
                sb_messaging_platforms_send_message($message, $conversation_id, $response_id);
                $response_ids[] = $response_id;

                // Apply delay between messages
                if ($delay > 0) {
                    usleep($delay * 1000); // Convert milliseconds to microseconds
                }
            }

            foreach ($reply["assign"] as $assignment) {
                if (!empty($assignment['nested_flow'])) {
                    // Recursively call the function if there's a nested flow
                    return sb_option_assign_reply($option, $conversation_id, $flowData, $assignment['nested_flow']);
                } elseif (!empty($assignment['department'])) {
                    sb_update_conversation_department($conversation_id, $assignment['department'], false);
                }
            }

            return [
                "ids" => $response_ids,
                "messages" => $bot_replies,
            ];
        }
    }

    // In case no valid reply was found and fallback is not applicable
    return false;
}

function sb_fetch_api_response($url)
{
    // Fetch response from the API endpoint
    $response = file_get_contents($url);
    if ($response === FALSE) {
        return false;
    }

    // Parse response (assuming JSON for simplicity, adjust if necessary)
    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return false;
    }

    return $data;
}

function sb_get_user_detail($conversation_id)
{
    return $conversation = sb_db_get(
        "SELECT user_id, agent_id, source FROM sb_conversations WHERE id = " .
            sb_db_escape($conversation_id, true)
    );
}









exaclty what json require:

{
  "main_flow": {
    "flow_1": [
      {
        "keywords": [
          "weather"
        ],
        "bot_reply": [
          {
            "message": "*Bot*\n Just a moment...",
            "delay": 1000
          },
          {
            "message": "*Bot*\n The current weather is sunny with a temperature of 75°F.",
            "delay": 2000
          },
          {
            "message": "*Bot*\n If you have more questions, type *more*",
            "delay": 2000
          }
        ],
        "assign": [
          {
            "department": null,
            "transfer": "nested_flow",
            "nested_flow": "nested_flow_1"
          }
        ]
      }
    ],
    "flow_2": [
      {
        "keywords": [
          "news"
        ],
        "bot_reply": [
          {
            "message": "*Bot*\n One moment please...",
            "delay": 1000
          },
          {
            "message": "*Bot*\n Today's top news: Local library is hosting a book fair this weekend.",
            "delay": 2000
          },
          {
            "message": "*Bot*\n Let me know if you need more information!",
            "delay": 2000
          }
        ],
        "assign": [
          {
            "department": 1,
            "transfer": null,
            "nested_flow": null
          }
        ]
      }
    ],
    "nested_flow_1": [
      {
        "keywords": [
          "more"
        ],
        "bot_reply": [
          {
            "message": "*Bot*\n Checking the latest weather update...",
            "delay": 1000
          },
          {
            "message": "*Bot*\n The weather update is: Cloudy with a chance of rain.",
            "delay": 2000
          },
          {
            "message": "*Bot*\n Do you need more details or anything else?",
            "delay": 2000
          }
        ],
        "assign": [] 
      }
    ]
  }
}
