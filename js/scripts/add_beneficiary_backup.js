var addBen = {

  // Data Same in Options.js and add_beneficiary_make_payment.js [NOT UPDATE]
  makeBeneficiaryPayment: {
    isRunScript: false,
  },

  el: {
    type: function () { return $("#ctl00_ctl00_cphBody_cphBody_ddlSubCategory"); },
    fName: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtFname"); },
    fatherName: function () { return $("#ctl00_ctl00_cphBody_cphBody_FatherHusbandName"); },
    gender: function () { return $("#ctl00_ctl00_cphBody_cphBody_ddlGender"); },
    id: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId"); },
    uid: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtUIDNumber"); },
    address: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAddress1"); },
    address2: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAddress2"); },
    address3: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAddress3"); },
    pinCode: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtPinCode"); },
    bank: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtBank"); },
    bankNo: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAccountNo"); },
    submit: function () { return $("#ctl00_ctl00_cphBody_cphBody_btnSubmit"); },
    clear: function () { return $("#ctl00_ctl00_cphBody_cphBody_btnClear"); },
  },

  /**
   * Fetch/Set Extensions LocalStorage Data
   */
  setLocalData: function () {
    var custom_local_data = (JSON.parse(localStorage.getItem('pfms_beneficiaryMakePayment')));
    if (custom_local_data !== null) {
      addBen.makeBeneficiaryPayment = custom_local_data;
    }
  },

	/**
	 * Fetch Data
	 */
  fetchData: function () {
    var typeID = document.getElementById("ctl00_ctl00_cphBody_cphBody_ddlSubCategory");
    var genderName = document.getElementById("ctl00_ctl00_cphBody_cphBody_ddlGender");

    var benData = {
      "typeID": addBen.el.type().val(),
      "typeName": typeID.options[typeID.selectedIndex].text,
      "fName": addBen.el.fName().val(),
      "fatherName": addBen.el.fatherName().val(),
      "genderID": addBen.el.gender().val(),
      "genderName": genderName.options[genderName.selectedIndex].text,
      "id": addBen.el.id().val(),
      "uid": addBen.el.uid().val(),
      "address": addBen.el.address().val(),
      "bank": addBen.el.bank().val(),
      "bankNo": addBen.el.bankNo().val(),
      "message": ""
    };

    return benData;
  },

	/**
	 * Check Beneficiary Data in Local Storage Database
	 */
  setBeneficiaryData: function () {

    var genderElem = document.getElementById("ctl00_ctl00_cphBody_cphBody_ddlGender");

    // Data Validation
    if (addBen.el.fName().val() === "" || addBen.el.type().val() === "0" || addBen.el.address().val() === "") {
      return false;
    }

    if (addBen.el.gender().val() === "-1" && genderElem.options[genderElem.selectedIndex].text === "----Select----") {
      return false;
    }

    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData === null) {
      // Local Storage Data Not Found!
      addBen.createBeneficiaryData(addBen.fetchData());
    } else {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length === 0) {
        // Local Storage Data Not Found!
        addBen.createBeneficiaryData(addBen.fetchData());
      } else {
        // Local Storage Data Found!
        addBen.insertBeneficiaryData(benJSONData, addBen.fetchData());
      }
    }
  },

	/**
	 * Create Beneficiary Data in Local Storage Database
	 * @param: {array} beneficiary data
	 */
  createBeneficiaryData: function (data) {
    var arrayData = [];
    arrayData.push(data);
    localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(arrayData));
  },

	/**
	 * Insert New Beneficiary Data in Local Storage Database
	 * @param: {array} old beneficiary data
	 * @param: {array} new beneficiary data
	 */
  insertBeneficiaryData: function (oldBenData, newBenData) {
    if (oldBenData !== undefined && oldBenData !== null && oldBenData.length !== 0) {
      oldBenData.push(newBenData);
      localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(oldBenData));
    }
  },

	/**
	 * Update Beneficiary [Insert/Update]: Message
	 * "Records Saved Successfully"
	 * "UID Already Exist for this beneficiary Type & Agency"
	 */
  updateBeneficiaryMessage: function () {
    var mesg = $("#ctl00_ctl00_cphBody_cphBody_lblErrorMessage").text();
    if (mesg !== "") {
      var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
      if (benData !== null) {
        var array = JSON.parse(benData);
        var lastArray = array.slice(-1).pop();
        if (lastArray !== undefined) {
          lastArray.message = mesg;
          localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(array));
        }
      }

      // Automatic Reset (AddNewBeneficiary.aspx) Page: 2 seconds
      if (mesg === "Records Saved Successfully") {
        setTimeout(function () {
          $("#ctl00_ctl00_cphBody_cphBody_btnClear").click();
        }, 2000);
      }
    }
    return false;
  },

	/**
	 * Append HTML
	 */
  appendHTML: function () {
    if ($("#isBenBackupDataTable").length === 0) {
      $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > fieldset:nth-child(3) > table > tbody").append('\
        <tr> \
          <td class= "right" width="20%"></td > \
          <td class="left" width="30%"  id="isAadhaarCardScanTable"></td > \
          <td></td> \
          <td class="left" id="isBenBackupDataTable"></td> \
        </tr> \
      ');
    }

    $("#isBenBackupDataTable").append('\
      <span id="benLocalData" title="No of Beneficiary"></span> \
      <span> | \
        <a onclick="addBen.importBenLocalDataModel()" style="color: mediumvioletred;font-size: 11px; font-weight: 600;">Import JSON Data</a> \
      </span> \
      <span> | \
        <a id="downloadAnchorElem" style="display:none"></a> \
        <a onclick="addBen.exportBenLocalData()" style="color: #068c3cbd;font-size: 11px; font-weight: 600;">Export Data</a> \
      </span> \
    ');
  },

  /**
   * Show Beneficiary Data [JS MODEL]
   */
  showBeneficiaryData: function () {

    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData !== null) {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length === 0) {
        return false;
      } else {

        var modelShowTableData = "";
        modelShowTableData += '<table style="padding-left: 20px" cellpadding="2" cellspacing="1" width="100%"><tbody>';
        modelShowTableData += '<tr><td class="right" width="10%"></td><td class="left" width="30%"></td><td class="right" width="0%" valign="top"></td>';
        modelShowTableData += '<td class="left" valign="top" width="55%">';
        modelShowTableData += '<select style="margin-right: 5px;" id="select_custom_checkbox" onchange="addBen.selectCustomCheckbox()"><option value="">Select Checkbox</option><option value="s">Green</option><option value="w">Yellow</option><option value="d">Red</option><option value="empty">Default</option></select>';
        modelShowTableData += '<button style="margin-right: 5px;" onclick="addBen.copyAadharNoBeneficiaryWithCheckbox()" title="Copy Beneficiary Aadhar No">Copy Aadhar No</button>';
        modelShowTableData += '<button style="margin-right: 5px;" onclick="addBen.exportBenLocalDataWithCheckbox()" title="Export JSON Data">Download JSON Data</button>';
        modelShowTableData += '<button onclick="addBen.deleteBeneficiaryWithCheckbox()" title="Multiple Beneficiary Delete">Delete Beneficiary</button>';
        modelShowTableData += '<button style="margin-left: 5px;" onclick="addBen.closeModel()" title="Close Model">Close</button>';
        modelShowTableData += '</td></tr></tbody></table>';

        modelShowTableData += "<table style='background-color:White;border-color:Black;border-width:1px;border-style:Solid;width:100%;border-collapse:collapse;'>";
        modelShowTableData += "<thead>";
        modelShowTableData += "<tr style='display:block;position:relative;'><th style='width: 42px;'><input type='checkbox' id='select_all'/></th><th style='width: 102px;'>Type</th><th style='width: 118px;'>Name</th><th style='width: 180px;'>Husband</th><th style='width: 110px;'>Account</th><th style='width: 119px;'>Aadhaar</th><th style='width: 271px;'>Message</th><th style='width: 73px;'>Action</th><th style='width: 62px;'>Action</th></tr>";
        modelShowTableData += "</thead>";
        modelShowTableData += "<tbody id='benTableTbody' style='display:block;height:500px;overflow:auto;width:100%;'>";

        benJSONData.forEach(function (v, i) {
          if (v !== undefined && v !== null && v !== "") {
            // Payment Status
            var statusBackgroundColor = "none;";
            if (v.status !== undefined && v.status !== "") {
              if (v.status === "s") {
                statusBackgroundColor = "#24e82487;";
              } else if (v.status === "w") {
                statusBackgroundColor = "#f1f142ab;";
              } else if (v.status === "d") {
                statusBackgroundColor = "#ea292959;";
              }
            }
            // Payment Status Message
            var statusMsg = "";
            if (v.status_msg !== undefined && v.status_msg !== "") {
              statusMsg = v.status_msg;
            }
            modelShowTableData += "<tr style='background-color: " + statusBackgroundColor + "'><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'><input type='checkbox' id='benTableCheckbox" + i + "' name='new_beneficiary' value=" + i + "></td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.typeName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.fName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.fatherName + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.bankNo + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'>" + v.uid + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px; width: 260px;' title='" + statusMsg + "'>" + v.message + "</td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'><a onclick='addBen.deleteBeneficiaryData(" + i + ")' style='color:red;'>Delete</a></td><td style='border: 1px solid #000000;text-align: center;font-size: 14px;padding: 0px 11px 0px;'><a onclick='addBen.restoreBeneficiaryData(" + i + ")' style='color: black;'>Restore</a></td></tr>";
          }
        });

        modelShowTableData += "</tbody>";
        modelShowTableData += "</table>";

        jAlert(modelShowTableData, "Beneficiary Local Data");
        $("#popup_message").css('padding-left', '0px');
        document.getElementById("popup_container").style["max-width"] = "100%";
        document.getElementById("popup_container").style["height"] = "100%";
        // document.getElementById("popup_container").style["overflow"] = "scroll";
        // document.getElementById("popup_container").style["right"] = "100px";
        document.getElementById("popup_container").style["left"] = "100px";
        document.getElementById("popup_container").style["top"] = "10px";
        document.getElementById("popup_content").style["padding"] = "0px";
        document.getElementById("popup_content").style["background-image"] = "none";

        // Select All Checkbox and Deselect All Checkbox
        $('#select_all').on('click', function () {
          if (this.checked) {
            $.each($("input[name='new_beneficiary']"), function () {
              $(this).attr("checked", "checked");
            });
          } else {
            $.each($("input[name='new_beneficiary']"), function () {
              $(this).removeAttr("checked");
            });
          }
        });

        $(window).on("resize", addBen.modelHeightSize);
        addBen.modelHeightSize();
      }
    }
  },

  /**
   * Copy output of a variable to the clipboard
   * @param {*} text 
   */
  copyToClipboard: function (text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  },

  /**
   * Dynamic Model Height Change when changing screen size
   */
  modelHeightSize: function () {
    var s_height = $(window).height();
    $("#benTableTbody").css('height', (s_height - 125) + 'px');
  },

  // Close Model Box
  closeModel: function () {
    $('#popup_ok').click();
  },

  /**
   * Copy Beneficiary Aadhaar No from checkbox
   */
  copyAadharNoBeneficiaryWithCheckbox: function () {
    var selectedBen = $("input[name='new_beneficiary']:checked").length;
    if (selectedBen > 0) {
      var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
      if (benData !== null) {
        var benJSONData = JSON.parse(benData);
        if (benJSONData.length === 0) {
          return false;
        } else {
          var copyAadharNo = "";
          $.each($("input[name='new_beneficiary']:checked"), function () {
            var isExist = benJSONData[parseInt($(this).val())];
            if (isExist !== null && isExist !== undefined && isExist !== "" && isExist.uid !== "" && isExist.uid !== undefined) {
              copyAadharNo += isExist.uid + ",";
            }
          });
          addBen.copyToClipboard(copyAadharNo.slice(0, -1));
        }
      }
    } else {
      alert("Please Select Beneficiary Checkbox.");
      return false;
    }
  },

  /**
   * Select Checkbox (success, warning, danger)
   */
  selectCustomCheckbox: function () {
    var select_custom_checkbox = document.getElementById("select_custom_checkbox");
    var selected = select_custom_checkbox.options[select_custom_checkbox.selectedIndex].value;

    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData !== null) {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length === 0) {
        return false;
      } else {
        benJSONData.forEach(function (v, i) {
          if (v.status !== undefined && v.status !== "") {
            $("#benTableCheckbox" + i).prop('checked', false);
            if (v.status === selected) {
              $("#benTableCheckbox" + i).prop('checked', true);
            } else if (v.status === selected) {
              $("#benTableCheckbox" + i).prop('checked', true);
            } else if (v.status === selected) {
              $("#benTableCheckbox" + i).prop('checked', true);
            }

          } else {
            $("#benTableCheckbox" + i).prop('checked', false);
            if (selected === "empty") {
              $("#benTableCheckbox" + i).prop('checked', true);
            }
          }
        });
      }
    }
    return false;
  },

  /**
   * Delete Beneficiary Data
   * @param {int} array_index
   */
  deleteBeneficiaryData: function (index) {
    if (index === undefined) {
      return false;
    }

    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData !== null) {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length === 0) {
        return false;
      } else {
        var isExist = benJSONData[index];
        if (isExist !== null && isExist !== undefined && isExist !== "") {
          var isDeleteData = confirm("Are you sure delete data?");
          if (isDeleteData) {

            // TODO: Delete Fix
            // console.log(benJSONData);
            // console.log(index);
            benJSONData.splice(index, 1);
            // console.log(benJSONData);

            localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(benJSONData));

            addBen.construct();

            // Model Close Button
            $("#popup_ok").click();
          }
        }
      }
    }
    return false;
  },

  /**
   * Multiple/Single Delete Beneficiary Data
   */
  deleteBeneficiaryWithCheckbox: function () {
    var selectedBen = $("input[name='new_beneficiary']:checked").length;
    if (selectedBen > 0) {
      var isDeleteData = confirm("Are you sure delete beneficiary (" + selectedBen + ") data?");
      if (isDeleteData) {
        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData !== null) {
          var benJSONData = JSON.parse(benData);
          if (benJSONData.length === 0) {
            return false;
          } else {
            var removeValFrom = [];
            $.each($("input[name='new_beneficiary']:checked"), function () {
              removeValFrom.push(parseInt($(this).val()));
            });

            benJSONData = benJSONData.filter(function (value, index) {
              return removeValFrom.indexOf(index) == -1;
            });

            localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(benJSONData));

            addBen.construct();

            // Model Close Button
            $("#popup_ok").click();
          }
        }
      }
    } else {
      alert("Please Select Beneficiary Checkbox.");
      return false;
    }
  },

  /**
   * Restore Beneficiary Data in Page (AddNewBeneficiary.aspx)
   * @param {int} array_index
   */
  restoreBeneficiaryData: function (index) {
    if (index === undefined) {
      return false;
    }

    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData !== null) {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length === 0) {
        return false;
      } else {
        var isExist = benJSONData[index];
        if (isExist !== null && isExist !== undefined && isExist !== "") {
          addBen.el.type().val(isExist.typeID);
          addBen.el.fName().val(isExist.fName);
          addBen.el.fatherName().val(isExist.fatherName);
          addBen.el.gender().val(isExist.genderID);
          addBen.el.id().val(isExist.id);
          addBen.el.uid().val(isExist.uid);
          addBen.el.address().val(isExist.address);
          addBen.el.bank().val(isExist.bank);
          addBen.el.bankNo().val(isExist.bankNo);
          // Click Model OK Button
          $("#popup_ok").click();
        }
      }
    }
    return false;
  },

  /**
   * [MODEL] Show Model for Import Beneficiary JSON Data in the LocalStorage
   */
  importBenLocalDataModel: function () {

    var modelShowTableData = '<textarea rows="8" cols="80" id="JSONDataElm" style="border: 1px solid rgba(0, 0, 0, 0.4);" placeholder="Enter Beneficiary JSON Data"></textarea>';
    modelShowTableData += "<br><br>";
    modelShowTableData += '<button id="importBenLocalData" onclick="addBen.importBenLocalData()" style="padding: 6px 13px;font-size: 13px;">Import Data</button>';
    modelShowTableData += "";

    jAlert(modelShowTableData, "JSON Beneficiary Data");
    $("#popup_message").css('padding-left', '0px');
    document.getElementById("popup_container").style["max-width"] = "100%";
  },

  /**
   * Import Beneficiary JSON Data in the LocalStorage
   */
  importBenLocalData: function () {
    var jsonDataString = $("#JSONDataElm").val();
    if (jsonDataString !== undefined && jsonDataString !== "" && jsonDataString !== null) {
      try {
        var jsonData = JSON.parse(jsonDataString);

        // Disable Import Button
        $("#importBenLocalData").attr('disabled', 'disabled');

        // Check OLD Beneficiary Data
        var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
        if (benData !== null) {
          // Update Data
          var benJSONData = JSON.parse(benData);
          if (benJSONData.length !== 0) {
            benJSONData = benJSONData.concat(jsonData);
            localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", JSON.stringify(benJSONData));
            // Empty Data
            $("#JSONDataElm").val("");
            alert("JSON Data has been inserted successfully.");
            location.reload();
          } else {
            // Insert Data
            localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", jsonDataString);
            alert("JSON Data has been inserted successfully.");
            location.reload();
          }
        } else {
          // Insert Data
          localStorage.setItem("PFMS_ADD_BENEFICIARY_DATA", jsonDataString);
          alert("JSON Data has been inserted successfully.");
          location.reload();
        }

        // Remove Disable Attr
        $("#importBenLocalData").removeAttr('disabled');

      } catch (err) {
        alert("ERROR:: Invalid JSON Data.");
        console.error("ERROR:: Invalid JSON Data.");
        return false;
      }
    }
    return false;
  },

  /**
   * Export Beneficiary Data in JSON Format
   */
  exportBenLocalData: function () {
    // Check OLD Beneficiary Data
    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData !== null) {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length !== 0) {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(benJSONData));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "beneficiary_data.json");
        dlAnchorElem.click();
        return true;
      } else {
        alert("No Data Found!");
        return false;
      }
    }
    alert("No Data Found!");
    return false;
  },

  /**
   * Export Beneficiary Data in JSON Format With Checkbox
   */
  exportBenLocalDataWithCheckbox: function () {
    var selectedBen = $("input[name='new_beneficiary']:checked").length;
    if (selectedBen > 0) {
      var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
      if (benData !== null) {
        var benJSONData = JSON.parse(benData);
        if (benJSONData.length === 0) {
          return false;
        } else {
          var downloadBenData = [];
          $.each($("input[name='new_beneficiary']:checked"), function () {
            var isExist = benJSONData[$(this).val()];
            if (isExist !== null && isExist !== undefined && isExist !== "") {
              // console.log(isExist);
              downloadBenData.push(isExist);
            } else {
              alert("Beneficiary Data Not Found: " + $(this).val());
            }
          });

          var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(downloadBenData));
          var dlAnchorElem = document.getElementById('downloadAnchorElem');
          dlAnchorElem.setAttribute("href", dataStr);
          dlAnchorElem.setAttribute("download", "beneficiary_data_" + selectedBen + ".json");
          dlAnchorElem.click();
          return true;
        }
      }
    } else {
      alert("Please Select Beneficiary Checkbox.");
      return false;
    }
  },

  /**
   * Run First Function
   */
  construct: function () {
    var benData = localStorage.getItem("PFMS_ADD_BENEFICIARY_DATA");
    if (benData !== null) {
      var benJSONData = JSON.parse(benData);
      if (benJSONData.length === 0) {
        // Local Storage Data Not Found!
        $("#benLocalData").html("<span style='color:#ea671a;'>Local Storage Data Not Found!</span>");
      } else {
        // Local Storage Data Found!
        $("#benLocalData").html("<span style='color: #0e0e0d; font-size: 14px; font-weight: 700;'><a onclick='addBen.showBeneficiaryData()'>" + benJSONData.length + "</a></span>");
      }

    } else {
      $("#benLocalData").html("<span style='color:#ea671a;'>Local Storage Data Not Found!</span>");
    }
  },
};

/**
 * Fetch Extensions LocalStorage Data
 */
addBen.setLocalData();

/**
 * Check Run Script
 */
if (addBen.makeBeneficiaryPayment.isRunScript === true) {

  addBen.appendHTML();

  addBen.construct();

  addBen.updateBeneficiaryMessage();
  // Click Submit Button
  addBen.el.submit().click(function (e) {
    addBen.setBeneficiaryData();
  });
}
