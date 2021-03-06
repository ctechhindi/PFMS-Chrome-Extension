/**
 * Main Function
 */
(function ($) {

    var app = {
        generateScriptDataUrl: function (jscript) {
            var b64 = 'data:text/javascript';
            // base64 may be smaller, but does not handle unicode characters
            // attempt base64 first, fall back to escaped text
            try {
                b64 += (';base64,' + btoa(jscript));
            }
            catch (e) {
                b64 += (';charset=utf-8,' + encodeURIComponent(jscript));
            }

            return b64;
        },
        injectScript: function (src, where) {
            var elm = document.createElement('script');
            elm.src = src;
            document[where || 'head'].appendChild(elm);
        },

        /**
         * Get Application Data
         */
        getDataElement: {
            knowPayment: "objectVal__knowPaymentDetails",
        },

        /**
         * Check Application Status : [true/false]
         */
        checkApplicationStatus: function () {
            return new Promise(function (resolve, reject) {
                chrome.storage.local.get('switchVal__appStatus', function (budget) {
                    if (budget.switchVal__appStatus === true) {
                        resolve("Start");
                    } else {
                        reject("Application Stop");
                    }
                });
            });
        },
    }

    /**
     * Check Application Status : [true/false]
     */
    app.checkApplicationStatus().then(function (resp) {

        /**
        * Custom Data : Fetch All Extension Local Storage Key Data
        */
        chrome.storage.local.get(app.getDataElement.knowPayment, function (budget) {
            if (budget.objectVal__knowPaymentDetails !== undefined) {
                // console.log(budget.objectVal__knowPaymentDetails);
                localStorage.setItem("pfms_knowPayment", JSON.stringify(budget.objectVal__knowPaymentDetails));
            }
        });

        /**
        * Run Main Script
        */
        var script = `var know = {

  // Know Your Payments
  knowPayment: {
    isRunScript: false,
  },

  el: {
    bank: function () {
      return document.getElementById('txtBank');
    },
    account: function () {
      return document.getElementById('txtAccountNo');
    },
    confirmAccount: function () {
      return document.getElementById('txtConfirmAccountNo');
    },
    search: function () {
      return document.getElementById('btnSearch');
    },
    reset: function () {
      return document.getElementById('btnReset');
    },
    // captcha: function() {
    //     return document.getElementById('txtCaptcha');
    // },
    // imgCaptcha: function() {
    //     return document.getElementById('imgCaptcha');
    // }
  },

  // Get Captcha Image Text
  // getCaptchaText: function() {
  //     var url = know.el.imgCaptcha().src;
  //     var split = url.split("=");
  //     return split[1];
  // },

  /**
   * Settings for Account Number
   */
  runAccountNumber: function () {
    know.el.account().attributes["type"].value = "text";
    know.el.confirmAccount().attributes["type"].value = "text";

    know.el.account().onkeyup = function () {
      var v = know.el.account().value;
      know.el.confirmAccount().value = v;
    };

    // know.el.captcha().value = know.getCaptchaText();
  },

  /**
   * Set Extensions LocalStorage Data
   */
  setLocalData: function () {
    var custom_local_data = (JSON.parse(localStorage.getItem('pfms_knowPayment')));
    if (custom_local_data !== null) {
      know.knowPayment = custom_local_data;
    }
  },
}

/**
 * Set Extensions LocalStorage Data
 */
know.setLocalData();

/**
 * Check Run Script
 */
if (know.knowPayment.isRunScript === true) {

  // Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);
  // function endRequestHandler(sender, args) {
  //     var elem = sender._postBackSettings.sourceElement.id;
  //     // console.log(elem);
  //     if (document.getElementById('divAccountPayment')) {
  //         // Account Number Script
  //     } else {
  //         // Aadhar Number Script
  //     }
  // }

  know.runAccountNumber();
}`;

        var know_payment_script = app.generateScriptDataUrl(script);

        setTimeout(function () {
            app.injectScript(know_payment_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();