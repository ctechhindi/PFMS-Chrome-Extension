var pfms = {
  // Add Beneficiary Data Same in Options.js [NOT UPDATE]
  addBeneficiary: {
    isRunScript: false,
    // Beneficiary Type
    isBeneficiaryType: false,
    beneficiaryType: '165',
    // Gender
    isGender: false,
    gender: "F",
    // Scheme Specific ID
    isSpecificID: false,
    specificID: "090401903",
    // Address1 , Pincode Field
    isAddress1: false,
    address1: "Mundapandey",
    isPincode: false,
    pincode: "244001",
    // Get Address Code
    isGetAddressCode: false,
    // State
    isState: false,
    state: '31',
    // District
    isDistrict: false,
    district: '500',
    // Rural/Urban
    isRural: false,
    rural: '0',
    // Block/Tehsil
    isBlock: false,
    block: '169',
    // Panchayat/Town
    isPanchayat: false,
    panchayat: '33134',
    // Village/Ward
    isVillage: false,
    village: '598954',
    // Bank
    isBank: false,
    bank: "STATE BANK OF INDIA(Y)",
    // Remove Loading
    isRemoveLoading: false,
    // Set tabIndex in Input Element's
    isSetTabIndex: false,
    // Uppercase First Name
    isUppercaseFName: false,
    // Uppercase Father/Husband Name
    isUppercaseHName: false,
    // Uppercase Address1
    isUppercaseAdd1Name: false,
    // Village Name AutoComplete
    isAutoCompleteAdd: false,
    villageDataBase: "AFJALPUR,AHROLA,AKKA DILARI,AKKA PANDAY BHOJPUR,AKKA PANDEY,AKKA RAIPUR,BARWARA KHAS,BHADASANA,BHAEPUR,BHAJAN PURI,BHAYPUR,BHEET KHERA,BHIT KHERA,BIKANPUR,BINA BALA,BIRPUR BARYAN,BIRPUR THAN,BOOJ PUR ASHA,BOOJ PUR MAAN,BUJHPUR ASHA,BUJPUR MAAN,CHAK LAL PUR,CHAMAR PURA DAAN,CHAMARPURA,CHAMRAUA,CHANDAN PUR,CHANDANPUR ISAPUR,CHAPARA,CHATAR NATKA KHERA,DALPATPUR,DAULARA,DAULARI,DAULATPUR,DAULATPUR AZMATPUR,DEVAPUR,DHATURA MEGHA NAGLA,DILARI,DILRA RAIPUR,DUPERA,DUPERA KA MANJHRA,GADAI KHERA,GANESH GHAT,GATAURA,GAUTORA,GHOSHI PURA,GOVERDHANPUR,GOVIND PUR KALA,GOVIND PUR KHURD,HALA NAGLA,HARDIYA PUR,HARSAIN PUR,HASAN GANJ,HEERAN KHERA,HIRAN KHEDA,ILAR RASULABAD,IMLAKH,JAGATPUR,JAGATPUR RAMRAY,JAGRAMPURA,JAIT PUR BISAT,JAITIA SADULLAPUR,JAITPURA BISHAT,JAITYA,JHONDA,KAMRU,KARANPUR,KHABARIYA BHUR,KHAI KHERA,KHAIR KHATA,KHAN PUR,KHANPUR LAKKHI,KHARAGPUR BAZE,KHARAGPUR JAGATPUR,KISVA NAGLA,LADPUR,LAL TIKAR,LALPUR TITRI,LAXMIPUR KATII,LODHI PUR BASU,MAAN PUR PATTI,MACHARIYA,MACHHARIYA,MADNAPUR,MAHESHPUR BHEELA,MANI MATI PUR,MANJHARA JHANDAIL,MANKARA,MANPUR PATTI,MATI URF MAINI,MAULA GARH,MILAK BHOBHI,MILAK BOOJ PUR ASHA,MILAK DAULARI,MILAK DHOBI,MILAK DHOVI VALI,MILAK DILARI,MILAK GAUTORA,MILAK KHADAKPUR BAJE,MILAK KUNDA,MILAK MANKARA,MILAK SAIF PUR PALLA,MILAK SAIJNA,MILAK SIHORA,MILAK KHAIR KHATA,MOHAAMAD KULIPUR URF NAGALA,MOHAMADPUR,MUDIYA ETMALI,MUDIYA MALUKPUR,MUNDAPANDEY,MUNDIYA BAHI PUR,MUNEMPUR,NABABPURA,NABBA NAGLA,NAJAR PUR BHARAT SINGH,NAR KHERA,NARKHERA,NAZARPUR,NIYAMATPUR,PAIPATPURA,PARSUPURA,PARSUPURA BAZE,PEDURIYA,RAFATPUR,RAJHODA,RAMPUR BHEELA,RANIYA THER,RASUL PUR NAGLI,RONDA,RUSTAMPUR BADHMAR,SAHARIYA,SAIFPUR PALLA,SAIJANA,SAKTU NAGLA,SALEMPUR,SAMDA,SAMDA RAM SHAHAY,SAMDI,SARKADA KHAS,SEHARIYA,SHARIYA,SHIVPURI,SIHORA BAJE,SIKANDARPUR PATTI,SIRAS KHEDA,SIRSA INAYATPUR,TAHANAYAK,VEERPUR THAN,VEERPUR VARYAR,VIKAN PUR,JETPUR VISHAT,PEPTPURA,MUNDIYA MALUKPUR",
    // Scan Aadhaar QR-Code
    isScanAadhaarNo: false,
  },

  el: {
    bType: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlSubCategory'); },
    bFName: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtFname'); },
    bFHName: function () { return $('#ctl00_ctl00_cphBody_cphBody_FatherHusbandName'); },
    gender: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlGender'); },
    sid: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId'); },
    uidNumber: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtUIDNumber'); },
    state: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlState'); },
    dist: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlDistrict'); },
    rural: function () { return $('#ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_0'); },
    urban: function () { return $('#ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_1'); },
    block: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlTehsilBlock'); },
    panchayat: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlTownPanchayat'); },
    village: function () { return $('#ctl00_ctl00_cphBody_cphBody_ddlWardVillage'); },
    bank: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtBank'); },
    accountNo: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtAccountNo'); },
    address1: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtAddress1'); },
    address2: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAddress2"); },
    address3: function () { return $("#ctl00_ctl00_cphBody_cphBody_txtAddress3"); },
    pincode: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtPinCode'); },
    specifiedId: function () { return $('#ctl00_ctl00_cphBody_cphBody_txtSchemeSpecifiedId'); },
    subBtn: $('#ctl00_ctl00_cphBody_cphBody_btnSubmit'),
  },

  removeLoading: function () {
    if (pfms.addBeneficiary.isRemoveLoading === true) {
      $("#shadow").css("display", "none");
      $("#wait").css("display", "none");
    }
  },

  /**
   * Set Extensions LocalStorage Data
   */
  setLocalData: function () {
    var custom_local_data = (JSON.parse(localStorage.getItem('pfms_addBeneficiary')));
    if (custom_local_data !== null) {
      pfms.addBeneficiary = custom_local_data;
    }
  },

  // Select Gender
  selectGender: function () {
    if (pfms.addBeneficiary.isGender === true) {
      if (pfms.el.gender().val() === "-1") {
        pfms.el.gender().val(pfms.addBeneficiary.gender);
      }
    }
  },

  // Fill Address Another Fields Data
  fillAnotherData: function () {

    /**
     * Fill Address1 Field : Custom Data
     */
    if (pfms.addBeneficiary.isAddress1 !== undefined && pfms.addBeneficiary.isAddress1 === true) {
      if (pfms.el.address1().val() === "") {
        pfms.el.address1().val(pfms.addBeneficiary.address1);
      }
    }

    /**
     * Fill Pincode Field : Custom Data
     */
    if (pfms.addBeneficiary.isPincode !== undefined && pfms.addBeneficiary.isPincode === true) {
      if (pfms.el.pincode().val() === "") {
        pfms.el.pincode().val(pfms.addBeneficiary.pincode);
      }
    }

    /**
     * Fill Scheme Specific ID / Reg No : Custom Data
     */
    if (pfms.addBeneficiary.isSpecificID !== undefined && pfms.addBeneficiary.isSpecificID === true) {
      if (pfms.el.specifiedId().val() === "") {
        pfms.el.specifiedId().val(pfms.addBeneficiary.specificID);
      }
    }
  },

  /**
   * Set tabIndex for HTML Input Element's in Add Beneficiary Page
   */
  setTabIndexAddBeneficiary: function () {

    var isTabIndex = pfms.addBeneficiary.isSetTabIndex;

    if (isTabIndex !== undefined && isTabIndex === true) {
      pfms.el.bFName().attr('tabIndex', 1);
      pfms.el.bFHName().attr('tabIndex', 2);
      pfms.el.sid().attr('tabIndex', 3);
      pfms.el.uidNumber().attr('tabIndex', 4);
      pfms.el.address1().attr('tabIndex', 5);
      pfms.el.bank().attr('tabIndex', 6);
      pfms.el.accountNo().attr('tabIndex', 7);
      pfms.el.subBtn.attr('tabIndex', 8);

      // Focus Field
      pfms.el.bFName().focus();
    }
  },

  /**
   * Add Beneficiary Page : Other Methods
   */
  setOtherMethods: function () {

    var isFName = pfms.addBeneficiary.isUppercaseFName;
    var isFatherName = pfms.addBeneficiary.isUppercaseHName;

    // Uppercase Text in First Name Field
    if (isFName !== undefined && isFName === true) {
      pfms.el.bFName().keyup(function () {
        $(this).val($(this).val().toUpperCase());
      });
    }

    // Uppercase Text in Father/Husband Name Field
    if (isFatherName !== undefined && isFatherName === true) {
      pfms.el.bFHName().keyup(function () {
        $(this).val($(this).val().toUpperCase());
      });
    }
  },

  /**
   * Uppercase Text in Address1 Field
   */
  uppAddress1Field: function () {
    var isAddress1Name = pfms.addBeneficiary.isUppercaseAdd1Name;

    // Uppercase Text in Address1 Field
    if (isAddress1Name !== undefined && isAddress1Name === true) {
      pfms.el.address1().keyup(function () {
        $(this).val($(this).val().toUpperCase());
      });
    }
  },

  /**
   * Village Name AutoComplete in Address1 Field
   */
  autoCompleteAddress1: function () {
    var isActive = pfms.addBeneficiary.isAutoCompleteAdd;
    var villageData = pfms.addBeneficiary.villageDataBase;

    if (isActive !== undefined && isActive === true) {
      var availableVillageData = villageData.split(",");
      pfms.el.address1().autocomplete({
        source: availableVillageData,
        autoFocus: true,
        minLength: 2
      });
    }
  },

  /**
   * InnerHTML: Button Disabled Attribute ON/OFF
   */
  innerHTML: function () {
    // pfms.el.subBtn.css("margin-left", "-82px");
    $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > table > tbody > tr > td.right").removeClass("right");
    $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > table > tbody > tr:nth-child(1) > td:nth-child(1)").append('\
        <br><br><a class="Button" onclick="pfms.submitBtnAction();">Enable Submit Button</a> \
    ');
  },

  /**
   * Submit Button Disabled Attribute ON/OFF
   */
  submitBtnAction: function () {
    if (pfms.el.subBtn.is(":disabled") === true) {
      pfms.el.subBtn.prop("disabled", false);
    }
  },

  // Close Model Box
  closeModel: function () {
    $('#popup_ok').click();
  },

  /**
   * [MODEL] Scan Aadhar Card with Bar Code
   */
  aadharCardBarCodeDataModel: function () {

    var modelShowTableData = '<textarea rows="8" cols="80" id="aadharXMLText" style="border: 1px solid rgba(0, 0, 0, 0.4);" placeholder="Scan Aadhaar Bar Code"></textarea>';
    modelShowTableData += "<br><br>";
    modelShowTableData += '<button onClick="pfms.importAadhaarXMLData()" style="padding: 6px 13px;font-size: 13px;">Import Data</button>';
    modelShowTableData += "";

    jAlert(modelShowTableData, "Scan Aadhaar Bar Code");
    $("#popup_message").css('padding-left', '0px');
    document.getElementById("popup_container").style["max-width"] = "100%";

    // Handling Enter Key on Textarea
    $("#aadharXMLText").keyup(function (e) {
      if ((e.keyCode || e.which) == 13) { //Enter keycode
        var v = $("#aadharXMLText").val();
        if (v !== undefined && v !== null && v !== "") {
          pfms.importAadhaarXMLData();
        } else {
          alert("ERROR: Invalid Aadhaar XML Code.");
        }
      }
    });

    $("#popup_ok").click(function () {
      // Focus Field
      pfms.el.bFName().focus();
    });
  },

  /**
   * Import Aadhaar Bar Code XML Data
   */
  importAadhaarXMLData: function () {
    var v = $("#aadharXMLText").val();
    if (v !== undefined && v !== null && v !== "") {

      var oParser = new DOMParser();
      var oDOM = oParser.parseFromString(v, "application/xml");
      var isValid = oDOM.documentElement.nodeName == "parsererror" ? "error while parsing" : oDOM.documentElement.nodeName;

      if (isValid === "PrintLetterBarcodeData") {

        s = oDOM.getElementsByTagName('PrintLetterBarcodeData');
        var uid = s[0].getAttribute('uid');
        var name = s[0].getAttribute('name');
        var gender = s[0].getAttribute('gender');
        var yob = s[0].getAttribute('yob');
        var co = s[0].getAttribute('co');
        var lm = s[0].getAttribute('lm');
        var loc = s[0].getAttribute('loc'); // village
        var street = s[0].getAttribute('street'); // city
        var vtc = s[0].getAttribute('vtc');
        var po = s[0].getAttribute('po');
        var dist = s[0].getAttribute('dist');
        var subdist = s[0].getAttribute('subdist');
        var state = s[0].getAttribute('state');
        var pc = s[0].getAttribute('pc');
        var dob = s[0].getAttribute('dob');

        // Set Aadhaar Data in Site
        pfms.el.uidNumber().val(uid);
        pfms.el.bFName().val(name.toUpperCase());

        // Father Name
        if (co !== null && co !== "") {
          var fatherHusbandName = co.split(":")[1];
          if (fatherHusbandName !== undefined) {
            pfms.el.bFHName().val(fatherHusbandName.toUpperCase().trim());
          } else {
            var fatherHusbandName = co.replace("W/O ", "");
            var fatherHusbandName = fatherHusbandName.replace("S/O ", "");
            pfms.el.bFHName().val(fatherHusbandName.toUpperCase());
          }
        }

        // Address
        if (lm !== null) {
          pfms.el.address1().val(lm.toUpperCase());
          pfms.el.address2().val(vtc.toUpperCase());
          pfms.el.address3().val(po.toUpperCase());
        } else if (loc !== null) {
          pfms.el.address1().val(loc.toUpperCase());
          pfms.el.address2().val(vtc.toUpperCase());
          pfms.el.address3().val(po.toUpperCase());
        } else if (vtc !== null) {
          pfms.el.address1().val(vtc.toUpperCase());
          pfms.el.address2().val(po.toUpperCase());
        }

        // Address For City
        if (street !== null) {
          pfms.el.address1().val(street.toUpperCase());
          pfms.el.address2().val(vtc.toUpperCase());
          pfms.el.address3().val(po.toUpperCase());
        }

        pfms.el.pincode().val(pc);

        // Close Model
        pfms.closeModel();

        // Focus Field Name
        pfms.el.bank().focus();
      } else {
        alert("ERROR: Invalid Aadhaar XML Code. Type: " + isValid);
      }

    } else {
      alert("ERROR: Invalid Aadhaar XML Code.");
    }
  },
}

/**
 * Set Extensions LocalStorage Data
 */
pfms.setLocalData();

/**
 * Check Run Script
 */
if (pfms.addBeneficiary.isRunScript === true) {

  // Select Beneficiary Type
  if (pfms.addBeneficiary.isBeneficiaryType === true) {
    if (pfms.el.bType().val() === "0") {
      pfms.el.bType().val(pfms.addBeneficiary.beneficiaryType);
      // color
      $("#ctl00_ctl00_cphBody_cphBody_ddlSubCatgoryUpadtePanel").css("background-color", "rgb(9, 232, 181)");
    }
  }

  // Select State : [UTTAR PRADESH : 31]
  if (pfms.addBeneficiary.isState === true) {
    if (pfms.el.state().val() !== pfms.addBeneficiary.state) {
      pfms.el.state().val(pfms.addBeneficiary.state).change();
    } else if (pfms.el.dist().val() !== pfms.addBeneficiary.district) {
      pfms.el.dist().val(pfms.addBeneficiary.district).change();
    } else {
      if (pfms.addBeneficiary.rural === "0") {
        if (pfms.el.rural().val() === "0") {
          pfms.el.rural().prop('checked', true).trigger("click");
        }
      } else {
        if (pfms.el.urban().val() === "0") {
          pfms.el.urban().prop('checked', true).trigger("click");
        }
      }
    }
  }

  Sys.WebForms.PageRequestManager.getInstance().add_initializeRequest(initRequestHandler);
  Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endRequestHandler);

  function endRequestHandler(sender, args) {
    // console.log(sender);
    if (sender._postBackSettings.sourceElement !== undefined) {

      var elem = sender._postBackSettings.sourceElement.id;
      // console.log(elem);

      // tabIndex for HTML Input Element's in Add Beneficiary Page
      pfms.setTabIndexAddBeneficiary();

      // Uppercase Text in Address1 Field
      pfms.uppAddress1Field();

      // Village Name AutoComplete in Address1 Field
      pfms.autoCompleteAddress1();

      if (elem === "ctl00_ctl00_cphBody_cphBody_ddlSubCategory") {
        // Select Gender
        pfms.selectGender();
      } else {
        // Select Gender
        pfms.selectGender();
      }

      if (elem === "ctl00_ctl00_cphBody_cphBody_ddlState") {

        // Select District : [MORADABAD : 500]
        if (pfms.addBeneficiary.isDistrict === true) {
          pfms.el.dist().val(pfms.addBeneficiary.district).change();
        }

      } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlDistrict") {

        // Check Rural : [0]
        if (pfms.addBeneficiary.isRural === true) {
          if (pfms.addBeneficiary.rural == 0) {
            pfms.el.rural().prop('checked', true).trigger("click");
          }

          if (pfms.addBeneficiary.rural == 1) {
            pfms.el.urban().prop('checked', true).trigger("click");
          }
        }

      } else if (elem === "ctl00_ctl00_cphBody_cphBody_rdlRuralUrban_0") {

        // Select Block : [MUNDA PANDEY : 169]
        if (pfms.addBeneficiary.isBlock === true) {
          pfms.el.block().val(pfms.addBeneficiary.block).change();
        }
      } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlTehsilBlock") {

        // Select Panchayat : [MUNDHA PANDE : 33134]
        if (pfms.addBeneficiary.isPanchayat === true) {
          pfms.el.panchayat().val(pfms.addBeneficiary.panchayat).change();
        }

      } else if (elem === "ctl00_ctl00_cphBody_cphBody_ddlTownPanchayat") {

        // Select Village : [MUNDHA PANDE : 598954]
        if (pfms.addBeneficiary.isVillage === true) {
          pfms.el.village().val(pfms.addBeneficiary.village);
        }
      }
    }
  }

  function initRequestHandler(sender, args) {
    pfms.removeLoading();
  }

  // Input Bank
  if (pfms.addBeneficiary.isBank === true) {
    // console.log(pfms.el.bank().val());
    pfms.el.bank().val(pfms.addBeneficiary.bank);
  }

  // tabIndex for HTML Input Element's in Add Beneficiary Page
  pfms.setTabIndexAddBeneficiary();

  // Other Methods
  pfms.setOtherMethods();
  pfms.uppAddress1Field();
  pfms.innerHTML();

  // Village Name AutoComplete in Address1 Field
  pfms.autoCompleteAddress1();

  // Fill Another Data
  pfms.fillAnotherData();
}

/**
 * Check Run Script: Scan Aadhaar QR Code
 */
if (pfms.addBeneficiary.isScanAadhaarNo === true) {

  if ($("#isAadhaarCardScanTable").length === 0) {
    $("#aspnetForm > table > tbody > tr.fullh > td.border.vtop.center.fullw > fieldset:nth-child(3) > table > tbody").append('\
      <tr> \
        <td class= "right" width="20%"></td > \
        <td class="left" width="30%"  id="isAadhaarCardScanTable"></td > \
        <td></td> \
        <td class="left" id="isBenBackupDataTable"></td> \
      </tr> \
    ');
  }

  $("#isAadhaarCardScanTable").append('\
    <a onclick="pfms.aadharCardBarCodeDataModel()" style="color: mediumvioletred;font-size: 11px; font-weight: 600;">Scan Aadhar Card</a>\
  ');
}