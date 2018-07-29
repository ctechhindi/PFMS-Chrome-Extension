function main() {
    var w = window;
    var app = {

        /**
         * Not Show This Javascript Alert Messages
         */
        notShowAlert : function (msg) {
            if (msg == "Sorry, right click is not allowed...") {
                return false;
            }
        }
    }

    if (w.alert) {
        w.alert = function alert(msg) {

            /**
             * Set Javascript Alert Message Type ['d', 's']
             */
            var alert_style = 'd';

            /**
             * Show All Javascript Alert in Console
             */
            console.log('%c ' + msg + ' ', 'background: #EBEBEB; color: #000000;');

            // remove alert message in localStorage
            localStorage.removeItem("current_alert_message_v1");
            localStorage.removeItem("updation_error_alert_message_v1");


            /**
             * Match Errors : Application Pause
             * --------------------------------------
             * 1. There must be 25 days difference between Penta-1/DPT1 and Penta-2 date
             * 2. You are not authorized !
             */
            var update_errors = [
                "There must be 25 days difference between Penta-1/DPT1 and Penta-2 date",
                "You cannot Enter Pentavalent-1 if you are Entering DPT 1 Dose",
                "You are not authorized !",

                "BCG date should be greater than date of birth !",
                "OPV date should be greater than date of birth !",
                "Pentavalent 1 date should be greater than date of birth",
                "OPV 1 date should be greater than date of birth",
                "Pentavalent 2 date should be greater than date of birth!",
                "OPV 2 date should be greater than date of birth!",
                "Pentavalent 3 date should be greater than date of birth!",
                "OPV 3 date should be greater than date of birth!",
                "Measles date should be greater than date of birth!",
                "Vitamin A Dose-1 date should be greater than date of birth!",
            ];

            if (msg == "Please Enter Child ID !") {
                localStorage.setItem("current_alert_message_v1", msg);
            } else if (msg == "Please select the ANM !") {
                localStorage.setItem("current_alert_message_v1", msg);
            } else if (msg == "Please select the ASHA !") {
                localStorage.setItem("current_alert_message_v1", msg);
            } else if (msg == "Record Not Found") {
                localStorage.setItem("current_alert_message_v1", msg);
            } else if (msg == "Record Updated Successfully") {
                localStorage.setItem("current_alert_message_v1", msg);
                // Show Success Alert Box 
                var alert_style = 's';
            } else if (update_errors.indexOf(msg) !== -1) {
                // Application Pause : Errors Array
                localStorage.setItem("updation_error_alert_message_v1", msg);
            } else {
                console.log(msg);
            }

            // include css in page
            if (typeof CustomAlertStyle == 'undefined') {
                function CustomAlertStyle(css) {
                    var head = document.head || document.getElementsByTagName('head')[0];
                    if (head) {
                        var style = document.createElement("style");
                        style.type = "text/css";
                        style.appendChild(document.createTextNode(css));
                        head.appendChild(style);
                    }
                }
            }

            CustomAlertStyle("#custom_alert {\
                font: 14px/16px sans-serif !important;\
                position: fixed !important;\
                top: 0 !important;\
                right: 0 !important;\
                margin: 0 !important;\
                padding: 0 !important;\
                list-style-type: none !important;\
                float: left !important;\
                cursor: pointer !important;\
                text-align: left !important;\
                z-index: 9999 !important;\
            }\
            #custom_alert ALERTBOX {\
                border-width: 0 1px 4px 1px;\
                float: right !important;\
                border-radius: 10px;\
                overflow: hidden;\
                clear: both !important;\
                overflow: hidden !important;\
                font-size: 23px !important;\
                white-space: pre-wrap !important;\
                outline: 0 !important;\
                -webkit-box-shadow: 0px 2px 8px rgba(0,0,0,0.2);\
                -moz-box-shadow: 0px 2px 8px rgba(0,0,0,0.3);\
                box-shadow: 0px 2px 8px rgba(0,0,0,0.3);\
            }\
            .danger {\
                background-color: #ff4136 !important;\
                color: rgb(255, 255, 255) !important;\
            }\
            .success {\
                background-color: #05bd13 !important;\
                color: rgb(255, 255, 255) !important;\
            }\
            ");

            var alert_controller = document.getElementById('custom_alert') || document.createElement('ALERTGROUP');
            alert_controller.id = 'custom_alert';
            document.documentElement.appendChild(alert_controller);

            // alert click remove function
            alert_controller.addEventListener('click', function (e) {
                var t = e.target;
                if (t.tagName == 'ALERTBOX') {
                    var h = t.clientHeight - 18;
                    t.style.height = h + 'px';
                    var i = 9;
                    var closing = setInterval(function () {
                        i--;
                        t.style.opacity = i / 10;
                        t.style.paddingTop = parseInt(t.style.paddingTop) - 1 + 'px';
                        t.style.paddingBottom = parseInt(t.style.paddingBottom) - 1 + 'px';
                        var currentHeight = parseInt(t.style.height) - h / 10;
                        t.style.height = (currentHeight < 0 ? 0 : currentHeight) + 'px';
                        if (i < 1) {
                            t.style.display = 'none';
                            clearInterval(closing);
                        }
                    }, 30);
                }
            }, false);

            var cache = document.createElement('ALERTBOX');
            cache.style.margin = '5px 10px 8px';
            cache.style.padding = '10px 30px';
            cache.style.opacity = 12;
            cache.tabIndex = 0;

            // show alert in the page
            (w.alert = function alert(msg, type) {

                // console.log(type);

                // Not Show [declare] Alert
                if (app.notShowAlert(msg) === false) {
                    return false;
                }

                var box = cache.cloneNode(false);
                box.appendChild(document.createTextNode(msg));
                alert_controller.appendChild(box);
                var i = 1;
                var showing = setInterval(function () {
                    box.style.opacity = 1;
                    i++;
                    box.style.paddingTop = parseInt(box.style.paddingTop) + 1 + 'px';
                    box.style.paddingBottom = parseInt(box.style.paddingBottom) + 1 + 'px';
                    if (alert_style == 's') {
                        box.className = 'success';
                    } else {
                        box.className = 'danger';
                    }
                    if (i > 9) {
                        clearInterval(showing);
                    }
                }, 30);
            })(msg);
        }
    }
}
if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('(' + main + ')();'));
    document.documentElement.appendChild(script);
}
