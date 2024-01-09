export const api = {
  // api_url: 'http://192.168.1.222:8081/api'
 //api_url: 'http://172.16.1.250:7778/api'

// api_url: 'https://sskapi.trio-s.com/api'
api_url: 'http://localhost:8081/api'
}
export const Common_variable = {
    Save: 'Save',
    Update: 'Update',
    Save_continue: 'Save & Continue',
    Close: 'Close',
    Yes: 'Yes',
    No: 'No',
    Active: 'Active',
    Inactive: 'Inactive',
    Edit: 'Edit',
    Delete: 'Delete',
    Confirmation: 'Confirmation',
    Add: 'Add',
    Show: 'Show',
    Status:"Status",
    TransType:2,
    Regax_validation: /^\p{Lu}\p{Ll}+( \p{Lu}\p{Ll}+)*$/,
    characters_pattern: /^[a-zA-Z0-9]*$/,
    numbercharacters_pattern: /^[a-zA-Z0-9-@._ ]*$/,
    itemname_pattern: /^[a-zA-Z0-9-@._+ ]*$/,
    numberpattern: /^[0-9]*$/,
    numberdotpattern: /^[0-9.]*$/,
    specialcharacters_pattern: /^[a-zA-Z-@._ ]*$/,
    onlycharacters: /^[a-zA-Z0-9-_]*$/
} 

//UNIT MESSAGE
export const UNIT_MASTER = {
    UNITNAME_ERROR: 'Please enter unit name',
    UNITNAME_VALIDATION_ERROR: 'Please enter valid unit name',
    NOOF_DECIMALS_ERROR: 'Please select no.of decimals',
    SYMBOL_ERROR: 'Please enter symbol',
    SYMBOL_VALIDATION_ERROR: 'Please enter valid symbol',
    UNITNAME: 'Unit Name',
    SYMBALNAME: 'Symbol',
    UNITNAME_TAMIL: 'Unit Name in Tamil',
    NOOF_DECIMALS: 'No.of Decimals',
    DELETE_MESSAGE: 'Are you sure you want to delete this unit ?',
    DECIMAL_LIST: [
      { value: 0, label: 0 },
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 }
    ]
    
}

  //  STACK LOCATION
export const STACK_LOCATION = {
    STOCK_NAME: 'Stock Location Name',
    STOCK_TAMILNAME: 'Stock Location Tamil Name',
    ADD_STOCK: 'Add Stock Location',
    DELETE_MESSAGE: 'Are you sure you want to delete this item group ?',
    LOCATIONNAME_ERROR: 'Please enter stock location name',
    LOCATION_NAME_ERROR:'Please enter valid stock location name',
    LOCATIONNAME_VALIDATION_ERROR: 'Please enter valid stock location name',
    BRANCH_ERROR: 'Please select branch name',
    LOCATION_VALIDATION:  /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/
}

//Business partner
export const BUSINESS = {
    PERTNER_NAME:"Please enter business partner name",
    PERTNER_NAME_VALID:"Please enter valid business partner name",
    CATEGORY_NAME:"Please select business partnercategory",
    MOBILE_ERROR:"Please enter mobile number",
    MOBILE_VALIDATION:/^((\\+91-?)|0)?[0-9]{10}$/,
    MOBILE_VALIDATIONERROR: 'Please enter valid mobile number',
    BusinessPartnerName_VALIDATION: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    BusinessPartnerName_VALIDATIONERROR: 'Please enter valid business partner name',
    BUSINESS_CATEGORY:"Business Partner Category",
    PARTNER_NAME:"Business Partner Name",
    PARTNER_TAMIL:" Business Partner Tamil Name",
    ADDRESS_1:"Address Line - 1",
    ADDRESS_2:"Address Line - 2",
    CITY:"City",
    PINCODE:"Pincode",
    CONTACT_PERSON:"Contact Person",
    EMAIL:"Email",
    MOBILE:"Mobile",
    WHATSAPP:"Whatsapp",
    TELEPHONE:"Telephone",
    PARTNER_DELETE:" Are you sure you want to delete this partner ?"
}
 
  // USER MESSAGE
export const USER = {
    EMPLOYEENAME_ERROR: 'Please enter employee name',
    USERNAME_ERROR: 'Please enter user name',
    EMPLOYEENAMETAMIL_ERROR: 'Please enter employee name in tamil',
    PASSWORD_ERROR: 'Please enter password',
    USERROLE_ERROR: 'Please select user role',
    BRANCHNAME_ERROR: 'Please select branch name',
    NEWPASSWORD_ERROR: 'Please enter password',
    CONFORMPASSWORD_ERROR: 'Please enter confrim password',
    EQUALCONFORMPASSWORD_ERROR: 'password and conform password dose not match',
    NAME_VALIDATION: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    USERNAME_VALIDATION: /^[a-zA-Z0-9]+$/,
    EMPLOYEENAME_VALIDATIONERROR: 'Please enter valid employee name',
    USERNAME_VALIDATIONERROR: 'Please enter valid user name',
    PASSWORD_VALIDATION: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/,
    PASSWORD_VALIDATIONERROR: 'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    DEVICEID_ERROR: 'Please enter device ID',
    PASSCODE_ERROR: 'Passcode should be 4 characters'
  }

  // VARIANCE MESSAGE
  export const VARIANCE = {
    VARIANCENAME_ERROR: "Please enter variance name",
    VARIANCENAMETAMIL_ERROR: "Please enter variance name in tamil",
    WEIGHT_ERROR: "Please select weight",
    UNITWEIGHT_ERROR: "Please enter unit weight",
    PACKAGEWEIGHT_ERROR: "Please enter package weight",
    PACKAGE_UNIT_WEIGHT_ERROR: "Packing weight is greater than unit weight",
    VARIANCENAME_VALIDATION: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    VARIANCENAME_VALIDATIONERROR: "Please enter valid variance name"
  }

  // MASTER
  export const ITEMGROUP = {
    ITEMGROUPNAME_ERROR: "Please enter item group name",
    ITEMGROUPNAMETAMIL_ERROR: "Please enter item group name in tamil",
    ITEMCATEGORYNAME_ERROR: "Please select item category name",
    ITEMGROUPNAME_VALIDATION: /^[a-zA-Z0-9]+$/,
    ITEMGROUPNAME_VALIDATIONERROR: "Please enter valid item group name"
  }

  // ITEM MASTER
  export const ITEM = {
    ITEMSIZENAME_ERROR: "Please select size",
    ITEMGROUPNAME_ERROR: "Please select item group name",
    ITEMNAME_ERROR: "Please enter item name",
    ITEMSTKLOCATION_ERROR: "Please select stock location",
    ITEMUNITLIST_ERROR: "Please select unit",
    ITEMVARIANCE_ERROR: "Please select variance",
    ITEMUOM_ERROR: "Please select UOM",
    ITEMUPP_ERROR: "Please select UPP",
    ITEMUPP_UNIT_ERROR: "Please select UPP unit",
    ITEMUPPWEIGHT_ERROR: "Please select UPP Weight",
    ITEMUNITWEIGHT_ERROR:"Please select unit weight",
    ITEMTYPE_ERROR: "Please select item type",
    PARENTITEM_ERROR:"Please select parent item",
    ITEMGROUPNAME_ERROR: "Please select item group",
    ITEMGROUPNAMETAMIL_ERROR: "Please enter item group in Tamil",
    ITEMCATEGORYNAME_ERROR: "Please select item category",
    ITEMGROUPNAME_VALIDATION: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    ITEMGROUPNAME_VALIDATIONERROR: "Please enter valid item group"
  }

  // Company MASTER
  export const COMPANY = {
    characters_pattern: /^[a-zA-Z0-9]*$/,
    numbercharacters_pattern: /^[a-zA-Z0-9-@._ ]*$/,
    itemname_pattern: /^[a-zA-Z0-9-@._+ ]*$/,
    numberpattern: /^[0-9]*$/,
    numberdotpattern: /^[0-9.]*$/,
    specialcharacters_pattern: /^[a-zA-Z-@._ ]*$/,
    onlycharacters: /^[a-zA-Z0-9-_]*$/,
    ITEMSIZENAME_ERROR: "Please select size",
    ITEMGROUPNAME_ERROR: "Please select item group name",
    COMPANYNAME_ERROR: "Please enter company name",
    ADDRESS_ERROR: "Please enter address",
    CITY_ERROR: "Please enter city",
    STATE_ERROR: "Please select state",
    ITEMUOM_ERROR: "Please select UOM",
    ITEMUPP_ERROR: "Please select UPP",
    ITEMUPP_UNIT_ERROR: "Please select UPP unit",
    ITEMUPPWEIGHT_ERROR: "Please select UPP Weight",
    ITEMUNITWEIGHT_ERROR:"Please select unit weight",
    ITEMTYPE_ERROR: "Please select item type",
    PARENTITEM_ERROR:"Please select parent item",
    ITEMGROUPNAME_ERROR: "Please select item group",
    ITEMGROUPNAMETAMIL_ERROR: "Please enter item group in Tamil",
    ITEMCATEGORYNAME_ERROR: "Please select item category",
    ITEMGROUPNAME_VALIDATION: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/,
    ITEMGROUPNAME_VALIDATIONERROR: "Please enter valid item group"
  }


//Settings Screen 
export const SETTINGS = {
  FINANCIAL_YEAR: "Financial Year",
  FROM_DATE: "From Date",
  TO_DATE: "To Date",
  DELETE_MESSAGE: 'Are you sure you want to delete this financial year ?'
}

  export const Process_mapping = {
    In_out_list: [
      { value: 1, label: 'Input' },
      { value: 2, label: 'Output' }
    ]
  }

  export const itemcategorycode = {
    rawmaterial: 1,
    finishedgood: 2,
    packingmaterial: 3,
    byproducts: 4,
    semifinished: 5,
    wastage: 6,
    freeitem: 7
  }


  export const locationcode = {
    packinglocation: 1,
    stores: 3
  }
