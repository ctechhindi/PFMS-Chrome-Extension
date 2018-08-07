var know = {

    // Know Your Payments
    knowPayment: {
        isRunScript: false,
    },

    el: {
        bank: function() {
            return document.getElementById('txtBank');
        },
        account: function() {
            return document.getElementById('txtAccountNo');
        },
        confirmAccount: function() {
            return document.getElementById('txtConfirmAccountNo');
        },
        search: function() {
            return document.getElementById('btnSearch');
        },
        reset: function() {
            return document.getElementById('btnReset');
        },
        captcha: function() {
            return document.getElementById('txtCaptcha');
        },
        imgCaptcha: function() {
            return document.getElementById('imgCaptcha');
        }
    },

    // Get Captcha Image Text
    getCaptchaText: function() {
        var url = know.el.imgCaptcha().src;
        var split = url.split("=");
        return split[1];
    },

    /**
     * Settings for Account Number
     */
    runAccountNumber: function() {
        know.el.account().attributes["type"].value = "text";
        know.el.confirmAccount().attributes["type"].value = "text";
        
        know.el.account().onkeyup = function() {
            var v = know.el.account().value;
            know.el.confirmAccount().value = v;
        };
        
        know.el.captcha().value = know.getCaptchaText();
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

    Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);
    function endRequestHandler(sender, args) {
        var elem = sender._postBackSettings.sourceElement.id;
        // console.log(elem);
        if (document.getElementById('divAccountPayment')) {
            // Account Number Script
            know.runAccountNumber();
        } else {
            // Aadhar Number Script
        }
    }
}
