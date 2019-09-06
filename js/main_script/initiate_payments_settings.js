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
            backupImportSettings: "objectVal__initiatePaymentsSettings",
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
        chrome.storage.local.get(app.getDataElement.backupImportSettings, function (budget) {
            if (budget.objectVal__initiatePaymentsSettings !== undefined) {
                // console.log(budget.objectVal__initiatePaymentsSettings);
                localStorage.setItem("pfms_initiatePaymentsSettings", JSON.stringify(budget.objectVal__initiatePaymentsSettings));
            }
        });

        /**
        * Run Main Script
        */
        var script = `/**
 * Initiate Payments Settings
 */
var payPS = {

  locKey: "PFMS_PAYMENT_FILL_BENEFICIARY",
  el: {
    bType: function () { return $('#ctl00_ctl00_cphBody_cphBody_lblBenfType'); },
    BeneficiaryTable: function () { return $('#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails'); },
  },

  /**
   * Initiate Payments Settings
   * \js\options.js [UPDATE]
   */
  initiatePaymentsSettings: {
    isActiveBackupRestore: false,
    isMakePaymentDifferentMode: false,
  },

  /**
   * Format Date
   * -----------------------------------------------
   * console.log(formatDate(new Date()));
   * 15-1-2019:TIME:9:59
   */
  formatDate: function (date) {
    var AM_PM = date.getHours() >= 12 ? 'PM' : 'AM';
    return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ':TIME:' + date.getHours() + ':' + date.getMinutes() + '-' + AM_PM;
  },

  /**
   * Set Attributes in Table for Payment
   */
  setAttributesForImportPayment: function () {
    var table = $("#ctl00_ctl00_cphBody_cphBody_grdBeneficiaryDetails > tbody");
    table.find('tr').each(function (i, el) {
      var $tds = $(this).find('td');
      var pfms_id = $tds.eq(1);
      var ben_name = $tds.eq(3); // Beneficiary Name Registered/AsPerBank	
      var aadhar_no = $tds.eq(5);
      var account_no = $tds.eq(6);
      var payment = $tds.eq(10);

      var benShortName = "";
      // Beneficiary Name Split
      if (ben_name.text() !== "") {
        var benNameArray = ben_name.text().split("/");
        if (benNameArray[0] !== "") {
          benShortName = benNameArray[0];
        }
      }

      // Set Attributes 
      payment.attr("data-benname", benShortName);
      payment.attr("data-pfmsid", pfms_id.text());
      payment.attr("data-aadhar", aadhar_no.text());
      payment.attr("data-account", account_no.text());
    });
  },

  /**
   * [FIRST] Backup Data
   */
  backupData: function () {
    var backupData = [];
    var totalBeneficiary = 0;
    var totalAmount = 0;
    var beneficiaryType = payPS.el.bType().html();

    $("[data-pfmsId]").each(function (i, el1) {
      $(el1).find('input').each(function (i, el2) {
        var stateShare = $(el2).val();
        // Count Total Beneficiary
        if (stateShare !== "") {
          ++totalBeneficiary;

          totalAmount += parseInt(stateShare);

          var beneficiaryID = $(el1).attr("data-pfmsid");
          var beneficiaryName = $(el1).attr("data-benname");
          var beneficiaryData = {
            "BeneficiaryName": beneficiaryName,
            "BeneficiaryCode": beneficiaryID,
            "StateShare": stateShare,
          };
          backupData.push(beneficiaryData);
        }
      });
    });

    if (totalBeneficiary > 0 || totalAmount > 0) {

      // Check Backup Data in Exists
      var localData = localStorage.getItem(payPS.locKey);
      if (localData !== null && localData !== undefined && localData !== "") {
        var localDataArray = JSON.parse(localData);
        if (localDataArray.length > 0) {

          // Data Already Exists
          localDataArray.push({
            time: payPS.formatDate(new Date()),
            totalBeneficiary: totalBeneficiary,
            totalAmount: totalAmount,
            beneficiaryType: beneficiaryType,
            data: backupData,
          });

          localStorage.setItem(payPS.locKey, JSON.stringify(localDataArray));
          alert("Backup Data Saved: " + payPS.formatDate(new Date()) + ", Total Beneficiary : " + totalBeneficiary + ", Total Amount : " + totalAmount);
        }

      } else {
        // Save First Time LocalStorage Data
        var d = [];
        d.push({
          time: payPS.formatDate(new Date()),
          totalBeneficiary: totalBeneficiary,
          totalAmount: totalAmount,
          beneficiaryType: beneficiaryType,
          data: backupData,
        });

        localStorage.setItem(payPS.locKey, JSON.stringify(d));
        alert("Backup Data Saved: " + payPS.formatDate(new Date()) + ", Total Beneficiary : " + totalBeneficiary + ", Total Amount : " + totalAmount);
      }
    } else {
      console.error("Total Beneficiary Empty.");
      alert("Total Beneficiary Data Empty.");
    }
  },

  /**
   * Show LocalStorage Data
   */
  showLocalStorageData: function () {
    var localData = localStorage.getItem(payPS.locKey);

    if (localData !== null && localData !== undefined && localData !== "") {
      var localDataArray = JSON.parse(localData);
      if (localDataArray.length > 0) {

        var modelTableData = "<table style='background-color:White;border-color:Black;border-width:1px;border-style:Solid;width:100%;border-collapse:collapse;'>";
        modelTableData += "<thead>";
        modelTableData += "<tr><th>Beneficiary Type</th><th>Time</th><th>Total Beneficiary</th><th>Total Amount</th><th>Action</th><th>Action</th><th>Action</th></tr>";
        modelTableData += "</thead>";
        modelTableData += "<tbody>";

        localDataArray.forEach(function (v, i) {
          if (v !== undefined && v !== null && v !== "") {
            modelTableData += "<tr><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.beneficiaryType + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.time + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.totalBeneficiary + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.totalAmount + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'><a onclick='payPS.restoreBackupData(" + i + ")'>Restore Data</a></td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'><a onclick='payPS.deleteBackupData(" + i + ")'>Delete Data</a></td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'><a onclick='payPS.showBackupData(" + i + ")'>Show Data</a></td></tr>";
          }
        });

        // modelTableData += "<tr><td style='border: 1px solid #000000;text-align: center;'>January</td><td style='border: 1px solid #000000;text-align: center;'>3</td><td style='border: 1px solid #000000;text-align: center;'>3</td></tr>";
        modelTableData += "</tbody>";
        modelTableData += "</table>";

        jAlert(modelTableData, "Backup LocalStorage Database");
        $("#popup_message").css('padding-left', '0px');

      } else {
        console.error("LocalStorage Data not Found!");
        alert("LocalStorage Data not Found!");
      }

    } else {
      console.error("LocalStorage Data not Found!");
      alert("LocalStorage Data not Found!");
    }
  },

  /**
   * [SECOND] Restore Backup Data
   * @param: {int} array index
   */
  restoreBackupData: function (array_index) {
    var localData = localStorage.getItem(payPS.locKey);

    if (localData !== null && localData !== undefined && localData !== "") {
      var localDataArray = JSON.parse(localData);
      if (localDataArray.length > 0) {

        var restoreData = localDataArray[array_index];
        if (restoreData !== null && restoreData !== undefined && restoreData !== "") {
          if (restoreData.data === null || restoreData.data === undefined || restoreData.data === "") {
            console.error("Array Data Object : " + array_index + " Data Not Found!");
            return false;
          }

          var totalRestoreAmount = 0;
          var totalRestoreBeneficiary = 0;

          restoreData.data.forEach(function (v) {
            if (v.StateShare !== "") {
              var id = $("[data-pfmsid=" + v.BeneficiaryCode + "]")
              if (id.length === 1) {
                id.find('input').each(function (i, el) {
                  var onKeyFunction = $(el).attr("onkeyup");
                  $(el).val(v.StateShare);
                  $(el).css("background-color", "#6eff23");
                  eval(onKeyFunction)
                });

                totalRestoreAmount += parseInt(v.StateShare);
                ++totalRestoreBeneficiary;

                // console.log("Payment Inserted: " + v.BeneficiaryCode + " , Amount: " + v.StateShare)

              } else {
                console.error("Payment Not Insert: " + v.BeneficiaryCode + " , Amount: " + v.StateShare)
              }
            }
          });

          alert("Total Restore Beneficiary: " + totalRestoreBeneficiary + ", Total Restore Amount: " + totalRestoreAmount);

        } else {
          console.error("Array Index : " + array_index + " Data Not Found!");
          alert("Array Index : " + array_index + " Data Not Found!");
        }

      } else {
        console.error("LocalStorage Data not Found!");
        alert("LocalStorage Data not Found!");
      }
    } else {
      console.error("LocalStorage Data not Found!");
      alert("LocalStorage Data not Found!");
    }
  },

  /**
   * [THIRD] Restore Backup Data
   * @param: {int} array index
   */
  deleteBackupData: function (array_index) {
    var localData = localStorage.getItem(payPS.locKey);

    if (localData !== null && localData !== undefined && localData !== "") {
      var localDataArray = JSON.parse(localData);
      if (localDataArray.length > 0) {

        var existData = localDataArray[array_index];
        if (existData !== null && existData !== undefined && existData !== "") {
          var isDeleteData = confirm("Are you sure delete data?");
          if (isDeleteData) {

            delete localDataArray[array_index];

            localStorage.setItem(payPS.locKey, JSON.stringify(localDataArray));

            // Model Close Button
            $("#popup_ok").click();
          }
          return false;

        } else {
          console.error("Array Index : " + array_index + " Data Not Found!");
          alert("Array Index : " + array_index + " Data Not Found!");
        }

      } else {
        console.error("LocalStorage Data not Found!");
        alert("LocalStorage Data not Found!");
      }
    } else {
      console.error("LocalStorage Data not Found!");
      alert("LocalStorage Data not Found!");
    }
  },

  /**
   * [FOURTH] Show Backup Data
   * @param {int} array_index 
   */
  showBackupData: function (array_index) {
    var localData = localStorage.getItem(payPS.locKey);

    if (localData !== null && localData !== undefined && localData !== "") {
      var localDataArray = JSON.parse(localData);
      if (localDataArray.length > 0) {

        var beneficiary = localDataArray[array_index];
        if (beneficiary !== null && beneficiary !== undefined && beneficiary !== "") {
          if (beneficiary.data === null || beneficiary.data === undefined || beneficiary.data === "") {
            console.error("Array Data Object : " + array_index + " Data Not Found!");
            return false;
          }

          var modelShowTableData = "<table style='background-color:White;border-color:Black;border-width:1px;border-style:Solid;width:100%;border-collapse:collapse;'>";
          modelShowTableData += "<thead>";
          modelShowTableData += "<tr><th>Beneficiary Code</th><th>Beneficiary Name</th><th>Total Amount</th></tr>";
          modelShowTableData += "</thead>";
          modelShowTableData += "<tbody>";

          beneficiary.data.forEach(function (v, i) {
            if (v !== undefined && v !== null && v !== "") {
              modelShowTableData += "<tr><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.BeneficiaryCode + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.BeneficiaryName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;'>" + v.StateShare + "</td></tr>";
            }
          });

          modelShowTableData += "</tbody>";
          modelShowTableData += "</table>";

          jAlert(modelShowTableData, "Backup LocalStorage Database");
          $("#popup_message").css('padding-left', '0px');

        } else {
          console.error("Array Index : " + array_index + " Data Not Found!");
          alert("Array Index : " + array_index + " Data Not Found!");
        }

      } else {
        console.error("LocalStorage Data not Found!");
        alert("LocalStorage Data not Found!");
      }
    } else {
      console.error("LocalStorage Data not Found!");
      alert("LocalStorage Data not Found!");
    }
  },

  /**
   * InnerHTML
   */
  innerHTMLBackupRestore: function () {
    $("#main_page2 > div:nth-child(9) > div:nth-child(1) > fieldset > table > tbody").append('\
      <tr> \
        <td style="float: left;"> \
          <a onclick="payPS.backupData()" style="background-color: #555555; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Backup Data</a> \
          <a onclick="payPS.showLocalStorageData()" style="background-color: #555555; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Restore Payment</a> \
        </td> \
      </tr> \
    ');
  },

  /**
   * InnerHTML
   */
  innerHTMLPaymentDifferentMode: function () {
    $("#main_page2 > div:nth-child(9) > div:nth-child(1) > fieldset > table > tbody").append('\
      <tr> \
        <td style="float: left;"> \
          <a onclick="payPS.showMakePaymentModel()" style="background-color: #44b757; border: none; color: white; padding: 5px 9px; text-align: center; text-decoration: none; display: inline-block; font-size: 11px;">Make Payment With Aadhar, Account, PFMS No</a> \
        </td> \
      </tr> \
    ');
  },

  /**
   * [MODEL] Make Payment with Beneficiary Numbers [Aadhaar, Account, PFMS No]
   */
  showMakePaymentModel: function () {
    var modelShowTableData = "";
    modelShowTableData += "<span style='font-size: larger;'>Beneficiary Default Amount Set : </span><input type='text' id='defaultBenAmount_ForPayment' style='margin: 0px 0px 11px;' autofocus></input>";
    modelShowTableData += "<br>";
    modelShowTableData += "<span style='font-size: larger;color: red;'>Beneficiary Numbers/Comma separated values can be used for searching multiple records:</span>";
    modelShowTableData += "<br><br>";
    modelShowTableData += '<textarea rows="8" cols="80" onchange="payPS.countTotalPaymentNo(this)" id="benPaymentNo_ForPayment" style="border: 1px solid rgba(0, 0, 0, 0.4);"></textarea>';
    modelShowTableData += "<br><br>";
    modelShowTableData += "<strong style='float: right;font-size: small;color: brown;' id='totalCountBenPayNo' title='Total Beneficiary Payment Number'>(0)</strong>";
    modelShowTableData += '<a onclick="payPS.makePaymentWithAadhaarNo()" style="margin-bottom: 6px;background-color: #4CAF50;border: none;color: white;padding: 6px 13px;text-align: center;text-decoration: none;display: inline-block;font-size: 13px;cursor: pointer;">Make Payment From Aadhaar</a><br>';
    modelShowTableData += '<a onclick="payPS.makePaymentWithAccountNo()" style="margin-bottom: 6px;background-color: #d4823c;border: none;color: white;padding: 6px 13px;text-align: center;text-decoration: none;display: inline-block;font-size: 13px;cursor: pointer;">Make Payment From Account No</a><br>';
    modelShowTableData += '<a onclick="payPS.makePaymentWithPFMSNo()" style="background-color: #4c61af;border: none;color: white;padding: 6px 13px;text-align: center;text-decoration: none;display: inline-block;font-size: 13px;cursor: pointer;">Make Payment From PFMS No</a>';
    modelShowTableData += "<br><br>";
    modelShowTableData += '<div>';
    modelShowTableData += '<span style="font-size: larger;color: #3da224;">Total Pay Beneficiary No : </span>';
    modelShowTableData += '<strong style="font-size: larger;color: #3da224;" id="totalPayBeneficiaryNo">(0)</strong>';
    modelShowTableData += '</div>';
    modelShowTableData += '<div style="margin: 5px 0px 0px;">';
    modelShowTableData += '<span style="font-size: larger;color: #e82916fa;">Total Not Pay Beneficiary No : </span>';
    modelShowTableData += '<strong style="font-size: larger;color: #e82916fa;" id="totalNotPayBeneficiaryNo">(0)</strong>';
    modelShowTableData += '</div>';

    jAlert(modelShowTableData, "Make Payment with Beneficiary Number");
    $("#popup_message").css('padding-left', '0px');
    document.getElementById("popup_container").style["max-width"] = "100%";
    document.getElementById("popup_content").style["background-image"] = "none";
    // document.getElementById("popup_container").style["height"] = "100%";
    // document.getElementById("popup_container").style["overflow"] = "scroll";
    // document.getElementById("popup_container").style["right"] = "100px";
    // document.getElementById("popup_container").style["left"] = "100px";
  },

  /**
   * Make Payment from Beneficiary Aadhaar Number
   */
  makePaymentWithAadhaarNo: function () {
    var defAmount = $("#defaultBenAmount_ForPayment");
    var benAadhaarNo = $("#benPaymentNo_ForPayment");

    if (defAmount.val() === undefined || defAmount.val() === "" || defAmount.val() === null) {
      alert("Please Enter Beneficiary Default Amount");
      var defaultBenAmount_ForPayment = document.getElementById("defaultBenAmount_ForPayment");
      defaultBenAmount_ForPayment.focus();
      defaultBenAmount_ForPayment.scrollIntoView();
      return false;
    } else if (benAadhaarNo.val() === undefined || benAadhaarNo.val() === "" || benAadhaarNo.val() === null) {
      alert("Please Enter Beneficiary Aadhaar Number");
      return false;
    } else {

      var benAadhaarArray = benAadhaarNo.val().split(",");
      if (benAadhaarArray.length > 0) {
        // {LOOP}
        var totalSuccessAadhaar = 0;
        var totalErrorAadhaar = 0;
        var errorAadhaarNo = "";
        benAadhaarArray.forEach(function (aadhaarNo) {
          if (aadhaarNo.length === 12) {
            var benAadharNoExist = $("[data-aadhar=" + aadhaarNo + "]");
            if (benAadharNoExist.length === 1) {

              benAadharNoExist.find('input').each(function (i, el) {
                // Fill Beneficiary Default Amount
                if (defAmount.val() !== undefined && defAmount.val() !== "") {
                  var onKeyFunction = $(el).attr("onkeyup");
                  $(el).val(defAmount.val());
                  $(el).css("background-color", "#6eff23");
                  eval(onKeyFunction);
                  ++totalSuccessAadhaar;
                }
                // Focus Field
                $(el).focus();
                $(el).css("background-color", "#6eff23");
              });

            } else {
              ++totalErrorAadhaar;
              errorAadhaarNo += aadhaarNo + ",";
              // alert("Error :: Aadhaar No Not Found : " + aadhaarNo);
              console.error("Error :: Aadhaar No Not Found : " + aadhaarNo);
            }
          } else {
            ++totalErrorAadhaar;
            errorAadhaarNo += aadhaarNo + ",";
            alert("Beneficiary Aadhaar Number Invalid : " + aadhaarNo);
            return false;
          }
        });

        $("#totalPayBeneficiaryNo").html("(" + totalSuccessAadhaar + ")");
        $("#totalNotPayBeneficiaryNo").html("(" + totalErrorAadhaar + ")");
        $("#benPaymentNo_ForPayment").val(errorAadhaarNo);

        console.log("Total Pay Aadhaar Numbers : " + totalSuccessAadhaar);
        console.log("Total Not Pay Aadhaar Numbers : " + totalErrorAadhaar);

      } else {
        alert("Beneficiary Aadhaar Number Not Found!");
        return false;
      }
    }
  },

  /**
   * Make Payment from Beneficiary Account Number
   */
  makePaymentWithAccountNo: function () {
    var defAmount = $("#defaultBenAmount_ForPayment");
    var benAccountNo = $("#benPaymentNo_ForPayment");

    if (defAmount.val() === undefined || defAmount.val() === "" || defAmount.val() === null) {
      alert("Please Enter Beneficiary Default Amount");
      var defaultBenAmount_ForPayment = document.getElementById("defaultBenAmount_ForPayment");
      defaultBenAmount_ForPayment.focus();
      defaultBenAmount_ForPayment.scrollIntoView();
      return false;
    } else if (benAccountNo.val() === undefined || benAccountNo.val() === "" || benAccountNo.val() === null) {
      alert("Please Enter Beneficiary Account Number");
      return false;
    } else {

      var benAccountArray = benAccountNo.val().split(",");
      if (benAccountArray.length > 0) {

        // {LOOP}
        var totalSuccessBenPayment = 0;
        var totalErrorBenPayment = 0;
        var errorBeneficiaryPayment = "";

        benAccountArray.forEach(function (accountNo) {
          if (accountNo.length > 0) {
            var benAccountNoExist = $("[data-account=" + accountNo + "]");
            if (benAccountNoExist.length === 1) {

              benAccountNoExist.find('input').each(function (i, el) {
                // Fill Beneficiary Default Amount
                if (defAmount.val() !== undefined && defAmount.val() !== "") {
                  var onKeyFunction = $(el).attr("onkeyup");
                  $(el).val(defAmount.val());
                  $(el).css("background-color", "#6eff23");
                  eval(onKeyFunction);
                  ++totalSuccessBenPayment;
                }
                // Focus Field
                $(el).focus();
                $(el).css("background-color", "#6eff23");
              });

            } else {
              ++totalErrorBenPayment;
              errorBeneficiaryPayment += accountNo + ",";
              // alert("Error :: Account No Not Found : " + accountNo);
              console.error("Error :: Account No Not Found : " + accountNo);
            }
          } else {
            ++totalErrorBenPayment;
            errorBeneficiaryPayment += accountNo + ",";
            alert("Beneficiary Account Number Invalid : " + accountNo);
            return false;
          }
        });

        $("#totalPayBeneficiaryNo").html("(" + totalSuccessBenPayment + ")");
        $("#totalNotPayBeneficiaryNo").html("(" + totalErrorBenPayment + ")");
        $("#benPaymentNo_ForPayment").val(errorBeneficiaryPayment);

        console.log("Total Pay Account Numbers : " + totalSuccessBenPayment);
        console.log("Total Not Pay Account Numbers : " + totalErrorBenPayment);

      } else {
        alert("Beneficiary Account Number Not Found!");
        return false;
      }
    }
  },

  /**
   * Make Payment from Beneficiary PFMS Number
   */
  makePaymentWithPFMSNo: function () {
    var defAmount = $("#defaultBenAmount_ForPayment");
    var benPFMSNo = $("#benPaymentNo_ForPayment");

    if (defAmount.val() === undefined || defAmount.val() === "" || defAmount.val() === null) {
      alert("Please Enter Beneficiary Default Amount");
      var defaultBenAmount_ForPayment = document.getElementById("defaultBenAmount_ForPayment");
      defaultBenAmount_ForPayment.focus();
      defaultBenAmount_ForPayment.scrollIntoView();
      return false;
    } else if (benPFMSNo.val() === undefined || benPFMSNo.val() === "" || benPFMSNo.val() === null) {
      alert("Please Enter Beneficiary PFMS Number");
      return false;
    } else {

      var benPFMSArray = benPFMSNo.val().split(",");
      if (benPFMSArray.length > 0) {

        // {LOOP}
        var totalSuccessBenPayment = 0;
        var totalErrorBenPayment = 0;
        var errorBeneficiaryPayment = "";

        benPFMSArray.forEach(function (pfmsNo) {
          if (pfmsNo.length > 0) {
            var benPFMSNoExist = $("[data-pfmsid=" + pfmsNo + "]");
            if (benPFMSNoExist.length === 1) {

              benPFMSNoExist.find('input').each(function (i, el) {
                // Fill Beneficiary Default Amount
                if (defAmount.val() !== undefined && defAmount.val() !== "") {
                  var onKeyFunction = $(el).attr("onkeyup");
                  $(el).val(defAmount.val());
                  $(el).css("background-color", "#6eff23");
                  eval(onKeyFunction);
                  ++totalSuccessBenPayment;
                }
                // Focus Field
                $(el).focus();
                $(el).css("background-color", "#6eff23");
              });

            } else {
              ++totalErrorBenPayment;
              errorBeneficiaryPayment += pfmsNo + ",";
              // alert("Error :: PFMS No Not Found : " + pfmsNo);
              console.error("Error :: PFMS No Not Found : " + pfmsNo);
            }
          } else {
            ++totalErrorBenPayment;
            errorBeneficiaryPayment += pfmsNo + ",";
            alert("Beneficiary PFMS Number Invalid : " + pfmsNo);
            return false;
          }
        });

        $("#totalPayBeneficiaryNo").html("(" + totalSuccessBenPayment + ")");
        $("#totalNotPayBeneficiaryNo").html("(" + totalErrorBenPayment + ")");
        $("#benPaymentNo_ForPayment").val(errorBeneficiaryPayment);

        console.log("Total Pay PFMS Numbers : " + totalSuccessBenPayment);
        console.log("Total Not Pay PFMS Numbers : " + totalErrorBenPayment);

      } else {
        alert("Beneficiary PFMS Number Not Found!");
        return false;
      }
    }
  },

  /**
   * [Event] {onChange}
   * Count Total Beneficiary Numbers [Aadhaar, Account, PFMS No]
   * @param {object} Element
   */
  countTotalPaymentNo: function (el) {
    var paymentNoElm = $(el);
    if (paymentNoElm.val() !== undefined && paymentNoElm.val() !== "" && paymentNoElm.val() !== null) {
      var paymentNoArray = paymentNoElm.val().split(",");
      $("#totalCountBenPayNo").html("(" + paymentNoArray.length + ")");
    }
    return false;
  },

  /**
   * Set Extensions LocalStorage Data
   */
  setLocalData: function () {
    var custom_local_data = (JSON.parse(localStorage.getItem('pfms_initiatePaymentsSettings')));
    if (custom_local_data !== null) {
      payPS.initiatePaymentsSettings = custom_local_data;
    }
  },
}

/**
 * Set Extensions LocalStorage Data
 */
payPS.setLocalData();

/**
 * [ON] Initiate Payments Settings: Backup/Import Beneficiary Amount
 */
if (payPS.initiatePaymentsSettings.isActiveBackupRestore === true) {

  /**
   * Check is Exists Beneficiary Search Table
   */
  if (payPS.el.BeneficiaryTable().length > 0) {

    payPS.setAttributesForImportPayment();
    payPS.innerHTMLBackupRestore();
  }

}

/**
 * [ON] Initiate Payments Settings: Make Payment With Aadhar, Account, PFMS No
 */
if (payPS.initiatePaymentsSettings.isMakePaymentDifferentMode === true) {

  /**
   * Check is Exists Beneficiary Search Table
   */
  if (payPS.el.BeneficiaryTable().length > 0) {

    payPS.setAttributesForImportPayment();
    payPS.innerHTMLPaymentDifferentMode();
  }
}`;

        var payment_process_search_script = app.generateScriptDataUrl(script);

        setTimeout(function () {
            app.injectScript(payment_process_search_script, 'body');
        }, 120); // [milliseconds]

    }).catch(function (error) {
        console.error(error);
    });
})();