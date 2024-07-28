<!-- TRIGGERS TO ASSIGN NOT WELCOME MESSAGE
-THE WELCOME MESSAGE WORKS IN OTHER CODE FIRST.  -->

<?php

function sb_count_fallback_messages($conversation_id)
{
    return sb_db_get('SELECT COUNT(*) AS `count` FROM sb_messages WHERE payload LIKE \'%"fallback_message"%\' AND conversation_id = ' . sb_db_escape($conversation_id, true))['count'];
}

function sb_fetch_api_response($url)
{
    $response = file_get_contents($url);
    if ($response === FALSE) {
        return false;
    }
    $data = json_decode($response, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        return false;
    }
    return $data;
}

function sb_option_assign_reply($option, $conversation_id)
{
    $opt = "option";
    $wel = "welcome";
    $reply = [];
    $option = strtolower($option);
    $jsonFlow = sb_get_multi_setting("welcome-message", "json-flow");
    $flowData = json_decode($jsonFlow, true);

    if (json_last_error() === JSON_ERROR_NONE && isset($flowData['main_flow'])) {
        foreach ($flowData['main_flow'] as $flow) {
            foreach ($flow as $response) {
                if (isset($response['keywords']) && is_array($response['keywords'])) {
                    foreach ($response['keywords'] as $keyword) {
                        if ($option === strtolower($keyword)) {
                            $reply["option"] = $keyword;
                            $bot_replies = isset($response['bot_reply']) ? $response['bot_reply'] : [];
                            $reply["reply"] = is_array($bot_replies) ? $bot_replies : [$bot_replies];
                            $reply["assign"] = isset($response['assign']) ? $response['assign'] : '';
                            break 3;
                        }
                    }
                }
            }
        }
    }

    if (sb_db_get('SELECT COUNT(*) AS `count` FROM sb_messages WHERE payload LIKE "{\"' . $opt . '_assigned%" AND creation_time > "' . gmdate("Y-m-d H:i:s", time() - 864000) . '" AND conversation_id = ' . sb_db_escape($conversation_id, true))["count"] == 0) {
        if (!empty($reply)) {
            if (!empty($reply["assign"]) && filter_var($reply["assign"], FILTER_VALIDATE_URL)) {
                $api_response = sb_fetch_api_response($reply["assign"]);
                $bot_replies = $api_response ? (is_array($api_response) ? $api_response : [$api_response]) : ["No se pudo obtener la respuesta del servidor."];
            } else {
                $bot_replies = $reply["reply"];
            }

            $response_ids = [];
            foreach ($bot_replies as $bot_reply) {
                $message = is_array($bot_reply) ? $bot_reply['message'] : $bot_reply;
                $delay = isset($bot_reply['delay']) ? (int)$bot_reply['delay'] : 0;

                if (!empty($reply["assign"]) && !filter_var($reply["assign"], FILTER_VALIDATE_URL)) {
                    sb_update_conversation_department($conversation_id, $reply["assign"], false);
                    $response_id = sb_send_message(sb_get_bot_id(), $conversation_id, $message, [], -1, ["option_assigned" => $reply["option"]])["id"];
                    sb_messaging_platforms_send_message($message, $conversation_id, $response_id);
                    $response_ids[] = $response_id;
                } else {
                    sb_db_query('UPDATE sb_messages SET payload = "" WHERE payload LIKE "{\"' . $wel . '_option%" AND creation_time > "' . gmdate("Y-m-d H:i:s", time() - 864000) . '" AND conversation_id = ' . sb_db_escape($conversation_id, true));
                    $response_id = sb_send_message(sb_get_bot_id(), $conversation_id, $message)["id"];
                    sb_messaging_platforms_send_message($message, $conversation_id, $response_id);
                    $response_ids[] = $response_id;
                }

                if ($delay > 0) {
                    usleep($delay * 1000);
                }
            }

            return [
                "ids" => $response_ids,
                "messages" => $bot_replies,
            ];
        } else {
            $fallback_count = sb_count_fallback_messages($conversation_id);
            if ($fallback_count < 3) {
                $message = sb_get_multi_setting("welcome-message", "fallback-msg");
                return [
                    "id" => sb_send_message(sb_get_bot_id(), $conversation_id, $message, [], -1, ["fallback_message" => true])["id"],
                    "message" => $message,
                ];
            } else {
                return false;
            }
        }
    }

    return false;
}

?>
