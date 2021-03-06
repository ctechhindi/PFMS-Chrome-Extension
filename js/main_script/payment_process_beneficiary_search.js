/**
 * Main Function
 */
(function ($) {

    var app = {

        include: {
            alasql: 'https://cdn.jsdelivr.net/alasql/0.3/alasql.min.js',
            xlsx: 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.7.12/xlsx.core.min.js',
        },

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
            paymentProcessBeneficiarySearch: "objectVal__paymentProcessBeneficiarySearch",
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
        chrome.storage.local.get(app.getDataElement.paymentProcessBeneficiarySearch, function (budget) {
            if (budget.objectVal__paymentProcessBeneficiarySearch !== undefined) {
                // console.log(budget.objectVal__paymentProcessBeneficiarySearch);
                localStorage.setItem("pfms_paymentProcessBeneficiarySearch", JSON.stringify(budget.objectVal__paymentProcessBeneficiarySearch));
            }
        });

        /**
        * Run Main Script
        */
        var script = `var pay = {
  dev: true,
  // Payment Process Beneficiary Search
  paymentProcessBeneficiarySearch: {
    isRunScript: false,
    importBeneficiaryArray: [],
    // Check Records : Field's
    isPFMSId: true,
    isAadharNo: false,
    isAccountNo: false,
    // Show Import Data Logs
    isSuccessLogs: false,
    isErrorLogs: false,
  },

  // Number for import beneficiary data
  totalBeneficiaryAmount: 0,
  totalBeneficiaryData: 0,
  totalSuccessImportBenData: 0,
  totalErrorImportBenData: 0,

  // Import Beneficiary data in Json
  totalSuccessImportBenJsonData: [],
  totalErrorImportBenJsonData: [],

  el: {
    BeneficiaryTable: function () { return $('#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails'); },
  },

  /**
   * Debug Application
   * @param : text message
   * @param : type message ['info', 'danger', 'warning', 'success']
   */
  debug: function (text, type) {
    if (pay.dev === true) {
      if (type == "info") {
        console.info('%c ' + text + ' ', 'background: #337ab7; color: #fff; font-size: 15px;');
      } else if (type == "danger") {
        console.error('%c ' + text + ' ', 'background: #d9534f; color: #fff; font-size: 15px;');
      } else if (type == "warning") {
        console.info('%c ' + text + ' ', 'background: #f0ad4e; color: #fff; font-size: 15px;');
      } else if (type == "success") {
        console.info('%c ' + text + ' ', 'background: #5cb85c; color: #fff; font-size: 15px;');
      } else if (type == undefined) {
        console.info(text);
      }
    }
  },

  /**
   * Export All Beneficiary to Excel
   */
  exportBeneficiaryInExcel: function () {

    var mainData = [];

    if (mainData.length === 0) {
      var table = $("#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails > tbody");
      table.find('tr').each(function (i, el) {
        var $tds = $(this).find('td');
        var beneficiaryData = {
          "Beneficiary Code": $tds.eq(1).text(),
          "Beneficiary Name": $tds.eq(3).text(),
          "Aadhaar No": $tds.eq(5).text(),
          "Account No": $tds.eq(6).text()
        };
        mainData.push(beneficiaryData);
      });
    }

    var opts = [{
      sheetid: 'Beneficiary Data',
      header: true
    }];

    alasql('SELECT * INTO XLSX("Beneficiary_Data.xlsx",?) FROM ?', [opts, [mainData]]);
  },

  /**
   * Set Attributes in Table for Payment
   */
  setAttributesForImportPayment: function () {
    var table = $("#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails > tbody");
    table.find('tr').each(function (i, el) {
      var $tds = $(this).find('td');
      var pfms_id = $tds.eq(1);
      var aadhar_no = $tds.eq(5);
      var account_no = $tds.eq(6);
      var payment = $tds.eq(10);

      // Set Attributes 
      payment.attr("data-pfmsId", pfms_id.text());
      payment.attr("data-aadhar", aadhar_no.text());
      payment.attr("data-account", account_no.text());
    });
  },

  /**
   * Import Beneficiary Payment
   */
  importBeneficiaryPayment: function () {
    var c = confirm("Import Beneficiary Payment Data");

    if (c) {

      console.clear();
      pay.totalBeneficiaryAmount = 0;
      pay.totalBeneficiaryData = 0;
      pay.totalSuccessImportBenData = 0;
      pay.totalErrorImportBenData = 0;
      pay.totalSuccessImportBenJsonData = [];
      pay.totalErrorImportBenJsonData = [];

      var jsonBeneficiaryData = JSON.parse(pay.paymentProcessBeneficiarySearch.importBeneficiaryArray);

      if (jsonBeneficiaryData.length > 0) {
        jsonBeneficiaryData.forEach(function (item, key) {

          ++pay.totalBeneficiaryData;

          /**
           * Check Beneficiary Records
           * @keys : pfms_id
           * @keys : beneficiary_name
           * @keys : aadhar_no
           * @keys : account_no
           * @keys : amount
           */
          if (pay.paymentProcessBeneficiarySearch.isPFMSId !== true && pay.paymentProcessBeneficiarySearch.isAadharNo !== true && pay.paymentProcessBeneficiarySearch.isAccountNo !== true) {
            pay.debug("Please Select Check Records", "danger");
            return;
          }

          var checkElement = "";
          if (pay.paymentProcessBeneficiarySearch.isPFMSId === true) {
            if (item.pfms_id !== undefined) {
              var pfmsID = (item.pfms_id === "") ? "''" : item.pfms_id;
              checkElement += "[data-pfmsId=" + pfmsID.toString() + "]";
            }
          }
          if (pay.paymentProcessBeneficiarySearch.isAadharNo === true) {
            if (item.aadhar_no !== undefined) {
              var aadharNO = (item.aadhar_no === "") ? "''" : item.aadhar_no;
              checkElement += "[data-aadhar=" + aadharNO.toString() + "]";
            }
          }
          if (pay.paymentProcessBeneficiarySearch.isAccountNo === true) {
            if (item.account_no !== undefined) {
              var accountNO = (item.account_no === "") ? "''" : item.account_no;
              checkElement += "[data-account=" + accountNO.toString() + "]";
            }
          }
          var isExists = $(checkElement);

          if (isExists.length !== 0) {
            isExists.find('input').each(function (i, el) {
              // Increase Total Successful Import Data 
              ++pay.totalSuccessImportBenData;
              //var state_amm = $(el).val();
              $(el).val(item.amount);
              $(el).css("background-color", "#6eff23");

              pay.totalSuccessImportBenJsonData.push(item);

              if (pay.paymentProcessBeneficiarySearch.isSuccessLogs === true) {
                pay.debug("ID : " + (key) + ", PFMS ID: " + item.pfms_id + ", Aadhar No: " + item.aadhar_no + ", Account No: " + item.account_no, 'success')
              }
            });
          } else {
            // Increase Total Successful Import Data 
            ++pay.totalErrorImportBenData;

            pay.totalErrorImportBenJsonData.push(item);

            if (pay.paymentProcessBeneficiarySearch.isErrorLogs === true) {
              pay.debug("ID : " + (key) + ", PFMS ID: " + item.pfms_id + ", Aadhar No: " + item.aadhar_no + ", Account No: " + item.account_no, 'danger')
              console.log(isExists);
            }
          }
        });

        $("#importTotalData").html(pay.totalBeneficiaryData);
        $("#importSuccessData").html(pay.totalSuccessImportBenData);
        $("#importErrorData").html(pay.totalErrorImportBenData);

      } else {
        pay.debug("Please Enter Import Beneficiary Data", 'warning')
      }
    }
  },

  /**
   * Export Total Successful Import Beneficiary Data in Execel
   */
  exportTotalSuccessImportBenData: function () {
    if (pay.totalSuccessImportBenJsonData.length > 0) {
      var opts = [{
        sheetid: 'Successful Import Beneficiary Data',
        header: true
      }];
      alasql('SELECT * INTO XLSX("Successful_Import_Beneficiary_Data.xlsx",?) FROM ?', [opts, [pay.totalSuccessImportBenJsonData]]);
    }
  },

  /**
   * Export Total Error Import Beneficiary Data in Execel
   */
  exportTotalErrorImportBenData: function () {
    if (pay.totalErrorImportBenJsonData.length > 0) {
      var opts = [{
        sheetid: 'Error Import Beneficiary Data',
        header: true
      }];
      alasql('SELECT * INTO XLSX("Error_Import_Beneficiary_Data.xlsx",?) FROM ?', [opts, [pay.totalErrorImportBenJsonData]]);
    }
  },

  /**
   * Set Extensions LocalStorage Data
   */
  setLocalData: function () {
    var custom_local_data = (JSON.parse(localStorage.getItem('pfms_paymentProcessBeneficiarySearch')));
    if (custom_local_data !== null) {
      pay.paymentProcessBeneficiarySearch = custom_local_data;
    }
  },
}

/**
 * Set Extensions LocalStorage Data
 */
pay.setLocalData();


/**
 * Check Run Script
 */
if (pay.paymentProcessBeneficiarySearch.isRunScript === true) {

  /**
   * Check is Exists Beneficiary Search Table
   */
  if (pay.el.BeneficiaryTable().length > 0) {

    /**
     * Insert HTML Data in Page
     */
    $("#ctl00_ctl00_cphBody_cphBody_pnlGrdDetails").prepend('\
      <table width="99%" cellpadding="2" cellspacing="0" align="center" border="0" style="padding: 7px;"> \
        <tbody> \
          <tr> \
            <td align="right" style="font-weight: bold; color: #24476F; font-size: 12px; width: 50%;"> \
              <a onclick="pay.importBeneficiaryPayment()" style="background-color: #44b757; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Import Beneficiary Payment for Excel File</a> \
            </td> \
            <td align="left"> \
              <h1 style="display: inline;"> \
                [ \
                  <span title="Total Beneficiary Data" style="color: #1570b1;" id="importTotalData"></span> , \
                  <span title="Total Successful Import" style="color: #0aad0a;" id="importSuccessData" onClick="pay.exportTotalSuccessImportBenData()"></span> , \
                  <span title="Total Unsuccessful Import" style="color: red;" id="importErrorData" onClick="pay.exportTotalErrorImportBenData()"></span> \
                ]  \
              </h1> \
            </td> \
          </tr> \
          <tr> \
            <td align="right" style="font-weight: bold; color: #24476F; font-size: 12px;"> \
              <a onclick="pay.exportBeneficiaryInExcel()" style="background-color: #4487b7; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Export All Beneficiary to Excel File</a> \
            </td> \
            <td align="left"></td> \
          </tr> \
        </tbody> \
      </table> \
    ');

    pay.setAttributesForImportPayment();
  }

} else {
  console.error("Application Script Stop");
}`;

        var paymentProcessBeneficiarySearch_script = app.generateScriptDataUrl(script);

        // include jquery
        app.injectScript(app.include.alasql);
        app.injectScript(app.include.xlsx);

        setTimeout(function () {
            app.injectScript(paymentProcessBeneficiarySearch_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();