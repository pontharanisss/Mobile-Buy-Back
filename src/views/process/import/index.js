// ** React Imports

import { useState, useEffect } from "react"
// ** Custom Components

import "@styles/react/libs/flatpickr/flatpickr.scss"

import { ChevronDown, Trash } from "react-feather"
import DataTable from "react-data-table-component"

import "../../../assets/style/style.css"
import { toast } from "react-hot-toast"
import { ReactSpreadsheetImport } from "react-spreadsheet-import"
import Select from "react-select"
import UILoader from '@components/ui-loader'
import moment from 'moment'
// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Row,
  Col,
  Card,
  UncontrolledTooltip
} from "reactstrap"

// ** Styles
import "@styles/react/apps/app-invoice.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

import { api } from "../../../utility/constants"

const CustomHeader = ({
  showItemPopup,
  handleCompanyValue,
  companyValue,
  companyList,
  handleImportTypeValue,
  importTypeValue,
  importTypeList
}) => {
  return (

    <div className="invoice-list-table-header w-100 py-2">
      <Row className="pb-2">
        <Col md="10" className="actions-right d-flex align-items-center">
          <Col md="5" className="me-1">
            <div className="d-flex align-items-center">
              <label htmlFor="search-invoice">Company</label>
              <Select
                isClearable={false}
                options={companyList}
                className="react-select ms-50 me-2 "
                value={companyList.filter((e) => e.value === companyValue)[0]}
                onChange={(e) => handleCompanyValue(e)}
              />
            </div>
          </Col>
          <Col md="5" className="me-1">
            <div className="d-flex align-items-center">
              <label htmlFor="search-invoice">Import Type</label>
              <Select
                isClearable={false}
                options={importTypeList}
                className="react-select ms-50 me-2 "
                value={importTypeList.filter((e) => e.value === importTypeValue)[0]}
                onChange={(e) => handleImportTypeValue(e)}
              />
            </div>
          </Col>

          <div
            className="d-flex align-items-center"
            style={{ paddingRight: "10px" }}
          >
            <Button color="primary" onClick={() => showItemPopup(importTypeValue)}>
              Import
            </Button>
          </div>

        </Col>
      </Row>
    </div>
  
  )
}

const EmployeeList = () => {

  const DefaultSalesMappingColumns = [
    {
      label: "Inv Date",
      key: "inv_date",
      alternateMatches: ["InvoiceDate", "Inv Date", "Primary Inv Date", "Invoice Date"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Invoice Date is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Inv No",
      key: "inv_no",
      alternateMatches: ["InvoiceDocNo", "Inv No", "InvoiceNo", "Invoice Number"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Invoice Number is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },
    {
      label: "Against Inv Date",
      key: "against_inv_date",
      alternateMatches: ["InvoiceDate", "Inv Date", "Primary Inv Date", "Invoice Date", "Against InvoiceDate",  "Against Inv Date", "Against Invoice Date"],
      fieldType: {
        type: "input"
      }

    },

    {
      label: "Against Inv No",
      key: "against_inv_no",
      alternateMatches: ["InvoiceDocNo", "Inv No", "InvoiceNo", "Invoice Number", "Against InvoiceDocNo", "Against Inv No", "Against InvoiceNo", "Against Invoice Number"],
      fieldType: {
        type: "input"
      }
 
    },

    {
      label: "Party Name",
      key: "party_name",
      alternateMatches: ["Party Name", "RetailerName", "Retailer Name"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Party Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },
    {
      label: "Customer Code",
      key: "customer_code",
      alternateMatches: ["Retailer Code", "Customer Code", "RetailerCode"],
      fieldType: {
        type: "input"
      }  
    },
    {
      label: "GSTIN",
      key: "gstin",
      alternateMatches: ["GSTIN", "GSTINNO", "Party GSTN No", "Retailer GSTIN"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Product",
      key: "product",
      alternateMatches: ["Product", "ProductName", "Product Name"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Product Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Ref",
      key: "ref",
      alternateMatches: ["Ref", "ref"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Commodity Code",
      key: "commodity_code",
      alternateMatches: ["Commodity Code"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "HSN Code",
      key: "hsn_code",
      alternateMatches: ["HSNCode", "HSN Code"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Price Level",
      key: "price_level",
      alternateMatches: ["Price Level", "PriceLevel"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Actual",
      key: "actual",
      alternateMatches: ["Actual", "actual"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Quantity",
      key: "billed",
      alternateMatches: ["Billed", "Quantity"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Quantity is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Unit Rate",
      key: "unit_rate",
      alternateMatches: ["Unit Rate", "Rate"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Unit Rate is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Unit",
      key: "unit",
      alternateMatches: ["Unit"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Vch Type",
      key: "vch_type",
      alternateMatches: ["Vch Type", "VchType"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Vch No",
      key: "vch_no",
      alternateMatches: ["Vch No", "VchNo"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "GST Class",
      key: "gst_class",
      alternateMatches: ["GST Class", "GSTClass"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Sales Value",
      key: "sales_value",
      alternateMatches: ["Sales Value", "SalesValue"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Disc Per",
      key: "disc_per",
      alternateMatches: ["Disc Per", "DiscPer"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Disc Amt",
      key: "disc_amt",
      alternateMatches: ["Disc Amt", "Disc Amt", "TotalDiscount"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Taxable Value",
      key: "taxable_value",
      alternateMatches: ["Taxable Value", "TaxableValue", "Taxable Amount", "TaxableAmount"],
      fieldType: {
        type: "input"
      },
       validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Taxable Value is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "GST Per",
      key: "gst_per",
      alternateMatches: ["GST Per", "GST_Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "GST Value",
      key: "gst_value",
      alternateMatches: ["GSTAmount", "GST Value", "GST"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "CGST Per",
      key: "cgst_per",
      alternateMatches: ["CGST Per", "CGST_Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "CGST Value",
      key: "cgst_value",
      alternateMatches: ["CGSTAmount", "CGST Value", "CGST"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "SGST Per",
      key: "sgst_per",
      alternateMatches: ["SGST_Per", "SGST Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "SGST Value",
      key: "sgst_value",
      alternateMatches: ["SGSTAmount", "SGST Value", "SGST"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "IGST Per",
      key: "igst_per",
      alternateMatches: ["IGST_Per", "IGST Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "IGST Value",
      key: "igst_value",
      alternateMatches: ["IGSTAmount", "IGST Value", "IGST"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Total Amt",
      key: "total_amt",
      alternateMatches: ["Total Amt", "NetAmount"],
      fieldType: {
        type: "input"
      }
    },    
    {
      label: "State",
      key: "state",
      alternateMatches: ["State"],
      fieldType: {
        type: "input"
      }
    }
    
  ]
  const DefaultPurchaseMappingColumns = [
    {
      label: "Inv Date",
      key: "inv_date",
      alternateMatches: ["InvoiceDate", "Inv Date", "Primary Inv Date", "Invoice Date"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Invoice Date is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Inv No",
      key: "inv_no",
      alternateMatches: ["InvoiceDocNo", "Inv No", "InvoiceNo", "Invoice Number"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Invoice Number is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Supplier Name",
      key: "party_name",
      alternateMatches: ["Supplier Name", "SupplierName", "Party Name", "RetailerName", "Retailer Name"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Supplier Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },
    {
      label: "Customer Code",
      key: "customer_code",
      alternateMatches: ["Retailer Code", "Customer Code", "RetailerCode", "Supplier Code", "SupplierCode"],
      fieldType: {
        type: "input"
      }  
    },
    {
      label: "GSTIN",
      key: "gstin",
      alternateMatches: ["GSTIN", "GSTINNO", "Party GSTN No", "Retailer GSTIN"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Product",
      key: "product",
      alternateMatches: ["Product", "ProductName", "Product Name"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Product Name is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Ref",
      key: "ref",
      alternateMatches: ["Ref", "ref"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Commnodity Code",
      key: "commodity_code",
      alternateMatches: ["Commonity Code", "CommunityCode"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "HSN Code",
      key: "hsn_code",
      alternateMatches: ["HSNCode", "HSN Code"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Price Level",
      key: "price_level",
      alternateMatches: ["Price Level", "PriceLevel"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Actual",
      key: "actual",
      alternateMatches: ["Actual", "actual"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Quantity",
      key: "billed",
      alternateMatches: ["Billed", "Quantity"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Quantity is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Unit Rate",
      key: "unit_rate",
      alternateMatches: ["Unit Rate", "Rate"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Unit Rate is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Unit",
      key: "unit",
      alternateMatches: ["Unit"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Vch Type",
      key: "vch_type",
      alternateMatches: ["Vch Type", "VchType"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Vch No",
      key: "vch_no",
      alternateMatches: ["Vch No", "VchNo"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "GST Class",
      key: "gst_class",
      alternateMatches: ["GST Class", "GSTClass"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Purchase Value",
      key: "purchase_value",
      alternateMatches: ["Pur Value", "Purchase Value"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Disc Per",
      key: "disc_per",
      alternateMatches: ["Disc Per", "DiscPer"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Disc Amt",
      key: "discount_amount",
      alternateMatches: ["Disc Amt", "Disc Amt", "TotalDiscount"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Taxable Value",
      key: "taxable_value",
      alternateMatches: ["Taxable Value", "TaxableValue"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Taxable Value is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "GST Per",
      key: "gst_per",
      alternateMatches: ["GST Per", "GST_Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "GST Paid",
      key: "gst_value",
      alternateMatches: ["GSTAmount", "GST Value", "GST Paid"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "CGST Per",
      key: "cgst_per",
      alternateMatches: ["CGST Per", "CGST_Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "CGST Paid",
      key: "cgst_value",
      alternateMatches: ["CGSTAmount", "CGST Value", "CGST Paid"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "SGST Per",
      key: "sgst_per",
      alternateMatches: ["SGST_Per", "SGST Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "SGST Paid",
      key: "sgst_value",
      alternateMatches: ["SGSTAmount", "SGST Value", "SGST Paid"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "IGST Per",
      key: "igst_per",
      alternateMatches: ["IGST_Per", "IGST Per"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "IGST Paid",
      key: "igst_value",
      alternateMatches: ["IGSTAmount", "IGST Value", "IGST Paid"],
      fieldType: {
        type: "input"
      }
    },

    {
      label: "Total Amt",
      key: "total_amt",
      alternateMatches: ["Total Amt", "NetAmount"],
      fieldType: {
        type: "input"
      }
    },
    {
      label: "Supplier Inv Date",
      key: "supplier_inv_date",
      alternateMatches: ["InvoiceDate", "Primary Inv Date", "Supplier Inv Date", "Invoice Date", "Doc.Date"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Invoice Date is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },

    {
      label: "Supplier Inv No",
      key: "supplier_inv_no",
      alternateMatches: ["InvoiceDocNo", "Inv No", "InvoiceNo", "Invoice Number", "Doc.Number"],
      fieldType: {
        type: "input"
      },
      validations: [
        {
          // Can be "required" / "unique" / "regex"
          rule: "required",
          errorMessage: "Invoice Number is required",
          // There can be "info" / "warning" / "error" levels. Optional. Default "error".
          level: "error"
        }
      ]
    },
    {
      label: "State",
      key: "state",
      alternateMatches: ["State"],
      fieldType: {
        type: "input"
      }
    }
  ]
  // ** Store vars
  const user_id = JSON.parse(localStorage.getItem("userDetails"))

  const [EmployeeDeleteModal, setEmployeeDeleteModal] = useState(false)
  const [DuplicationModal, setDuplicationModal] = useState(false)
  const [EmployeeMasterList, setEmployeeMasterList] = useState([])
  const [loader, setloader] = useState(false)

  const [OpenImportPopup, setOpenImportPopup] = useState(false)
  const [transactionType, setTransactionType] = useState("")
  const [currentUser, setCurrentUser] = useState("")
  const [mappingColumns, setMappingcolumns] = useState([])// For saving the mapping columns
  const [userDetails] = useState(user_id)
  const [companyValue, setCompanyValue] = useState(0)
  const [companyList, setCompanyList] = useState([])
  const [duplicateList, setDuplicateList] = useState([])
  const [importTypeValue, setImportTypeValue] = useState('Sales')
  const [importTypeList, setImportTypeList] = useState([])
  const [voucherTypeName, setVoucherTypeName] = useState('')


  const [columnMappingList, setColumnMappingList] = useState([]) //Fot assigning mapping columns

  const onClose = () => {
    setTransactionType("")
    setOpenImportPopup(false)
  } // list api call
  const getListApi = () => {
    setEmployeeMasterList([])
    const userId = userDetails
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({ user_id: userId.user_id })
    }
    try {
      fetch(`${api.api_url}/sales-import/listoutSalesJwt`, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          if (status === 200) {
            const token = json ? (json.body ? json.body.token : "") : ""
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({ jwtToken: token })
            }
            // Login API call
            fetch(
              `${api.api_url}/sales-import/listoutSales`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  setEmployeeMasterList(json.body.Sales_array)
                }
              })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const getCompanyList = () => {
    const userId = userDetails
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({ user_id: userId.user_id })
    }
    try {
      fetch(`${api.api_url}/sales-import/listoutCompanyJwt`, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          if (status === 200) {
            const token = json ? (json.body ? json.body.token : "") : ""
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({ jwtToken: token })
            }
            // Login API call
            fetch(
              `${api.api_url}/sales-import/listoutCompany`,
              listRequestOptions
            )
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  const arrayToSend = []
                  const companyArray = json ? json.body ? json.body.Company_array : [] : []
                  companyArray.forEach((e) => {
                    const companyJson = {
                      label: e.company_name,
                      value: e.id,
                      voucher_type_name: e.voucher_type_name
                    }
                    arrayToSend.push(companyJson)
                  })
                  setCompanyList(arrayToSend)
                }
              })
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  const saveMappingColumns = () => {

    const filteredMappingcolumns = mappingColumns.filter((e) => e.type === 2)
    try {
      filteredMappingcolumns.forEach((a) => {
        delete a.index
        delete a.type
      })
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          // 'Authorization': 'Bearer my-token',
        },
        body: JSON.stringify({
          company_id: companyValue, transaction_type: importTypeValue
        })
      }
      console.log(filteredMappingcolumns, 'filteredMappingcolumns')
      fetch(`${api.api_url}/sales-import/saveMappingColumnsJwt`, requestOptions)
      .then((res) => res.json())
      .then((json) => {
        let status = 0
        status = json ? (json.body ? json.body.status : 0) : 0
        if (status === 200) {
          const token = json ? (json.body ? json.body.token : "") : ""
          const listRequestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
              // 'Authorization': 'Bearer my-token',
            },
            body: JSON.stringify({
              jwtToken: token,
              mappingsList: filteredMappingcolumns
            })
          }
          // List API call
          fetch(`${api.api_url}/sales-import/saveMappingColumns`, listRequestOptions)
            .then((res) => res.json())
            .then((json) => {
              let status = 0
              status = json ? (json.body ? json.body.status : 0) : 0
              if (status === 200) {
              }
            })
        }
      })


    } catch (error) {
      console.log(error, "error")
      toast.error("Something went to be wrong", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
    }
  }
  const onSubmit = (data1) => {
    console.log(data1.validData, 'data1.validdata')
    setloader(true)
    saveMappingColumns()
    const userId = userDetails
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({
        user_id: userId.user_id,
        company_id: companyValue,
        transaction_type: transactionType,
        voucher_type_name:voucherTypeName
      })
    }
    try {
      fetch(`${api.api_url}/sales-import/salesImportJwt`, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          if (status === 200) {
            const token = json ? (json.body ? json.body.token : "") : ""
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({
                jwtToken: token,
                salesList: data1 ? data1.validData : []
              })
            }
            // List API call
            fetch(`${api.api_url}/sales-import/salesImport`, listRequestOptions)
              .then((res) => res.json())
              .then((json) => {
                setloader(false)
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  toast.success("Imported Sucessfully", {
                    duration: 2000,
                    style: { color: "#000", backgroundColor: "#d7d2d2" }
                  })
                  getListApi()
                } else if (status === 409) {
                  setDuplicateList(json ? (json.body ? json.body.duplicateRecords : []) : [])
                  setDuplicationModal(true)
                } else {
                  toast.error("Something went to be wrong", {
                    duration: 2000,
                    style: { color: "#000", backgroundColor: "#d7d2d2" }
                  })
                }
                setloader(false)
              })
          }
        })
        
    } catch (error) {
      setloader(false)
      toast.error("Something went to be wrong", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
    }
 
  }
  const getMappingColumns = (transactionType) => {
   
    const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
    // 'Authorization': 'Bearer my-token',
  },
  body: JSON.stringify({ company_id: companyValue, transaction_type: transactionType })
}
try {
  fetch(
    `${api.api_url}/sales-import/listoutColumnMappingsJwt`,
    requestOptions
  )
    .then((res) => res.json())
    .then((json) => {
      let status = 0
      status = json ? (json.body ? json.body.status : 0) : 0
      if (status === 200) {
        const token = json ? (json.body ? json.body.token : "") : ""
        const listRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
            // 'Authorization': 'Bearer my-token',
          },
          body: JSON.stringify({ jwtToken: token })
        }
        // Login API call
        fetch(
          `${api.api_url}/sales-import/listoutColumnMappings`,
          listRequestOptions
        )
          .then((res) => res.json())
          .then((json) => {
            let status = 0
            status = json ? (json.body ? json.body.status : 0) : 0
            if (status === 200) {
              const arrayToSend = []
              const mappingsArray = json ? json.body ? json.body.Mappings_array : [] : []
              mappingsArray.forEach((e) => {
                const mappingJson = {
                  label: e.label,
                  key: e.key,
                  alternateMatches: [e.header],
                  fieldType: {
                    type: "input"
                  }
                }
                arrayToSend.push(mappingJson)
                console.log(arrayToSend, 'Before arrayToSend')
              })

              if (transactionType === 'Sales' || transactionType === 'SalesReturn') {
                DefaultSalesMappingColumns.forEach((e) => {
                  const checkKeyExists = arrayToSend.findIndex((a) => a.key.toLowerCase() === e.key.toLowerCase())             
                  if (checkKeyExists === -1) {
                    arrayToSend.push(e)
                  }
                })
                console.log(arrayToSend, 'DefaultSalesMappingColumns')
              } else {
                DefaultPurchaseMappingColumns.forEach((e) => {
                  const checkKeyExists = arrayToSend.findIndex((a) => a.key.toLowerCase() === e.key.toLowerCase())             
                  if (checkKeyExists === -1) {
                    arrayToSend.push(e)
                  }
                })
                console.log(arrayToSend, 'DefaultPurchaseMappingColumns')
              }             
           
            
              if (arrayToSend.length > 0) setColumnMappingList(arrayToSend)
              console.log(arrayToSend, 'arrayToSend')
            }
          })
      }
    })
} catch (error) {
  console.log(error)
}
}
  // add click
  const showItemPopup = (transactionType) => {
   
    if (companyValue === "" || companyValue === 0) {
      toast.error("Please select the company", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
      return false
    }
    setTransactionType(transactionType)
    
    // Match the default mapping columns
    if (transactionType === 'Sales' || 'SalesReturn') setColumnMappingList(DefaultSalesMappingColumns)
    else setColumnMappingList(DefaultPurchaseMappingColumns)
  
   
    // Match the mapping columns by api call if the company have any mapping
    getMappingColumns(transactionType)
    setOpenImportPopup(!OpenImportPopup)
  }

  // Delete Click
  const deleteEmployee = (data) => {
    setCurrentUser(data)
    setEmployeeDeleteModal(!EmployeeDeleteModal)
  }
  const deletedata = () => {
    setEmployeeDeleteModal(!EmployeeDeleteModal)
    const userDetail = currentUser
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Authorization': 'Bearer my-token',
      },
      body: JSON.stringify({
        transaction_no: userDetail.transactionno,
        transaction_type: userDetail.type
      })
    }
    try {
      fetch(`${api.api_url}/sales-import/deleteSaleJwt`, requestOptions)
        .then((res) => res.json())
        .then((json) => {
          let status = 0
          status = json ? (json.body ? json.body.status : 0) : 0
          if (status === 200) {
            const token = json ? (json.body ? json.body.token : "") : ""
            const listRequestOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // 'Authorization': 'Bearer my-token',
              },
              body: JSON.stringify({ jwtToken: token })
            }
            // List API call
            fetch(`${api.api_url}/sales-import/deleteSale`, listRequestOptions)
              .then((res) => res.json())
              .then((json) => {
                let status = 0
                status = json ? (json.body ? json.body.status : 0) : 0
                if (status === 200) {
                  toast.success("Deleted Sucessfully", {
                    duration: 2000,
                    style: { color: "#000", backgroundColor: "#d7d2d2" }
                  })
                  getListApi()
                }
              })
          }
        })
    } catch (error) {
      toast.error("Sales not found", {
        duration: 2000,
        style: { color: "#000", backgroundColor: "#d7d2d2" }
      })
    }
  }

  //table cloums
  const columns = [
    {
      name: "S.No",
      sortField: "rownum",
      maxWidth: "10px",
      sortable: false,
      cell: (row, index) => <span>{index + 1}</span>
    },
    {
      name: "TXN ID",
      minWidth: "50px",
      sortable: false,
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              # {row.transactionno}
            </h6>
          </div>
        )
      }
    },
    {
      name: "Action",
      minWidth: "130px",
      sortable: false,
      cell: (row) => (
        <div className="column-action d-flex align-items-center">
          <Trash
            size={14}
            style={{ cursor: "pointer" }}
            className="me-50"
            id={`delete-tooltip-${row.id}`}
            onClick={() => deleteEmployee(row)}
          />
          <UncontrolledTooltip
            placement="top"
            style={{ cursor: "pointer" }}
            target={`delete-tooltip-${row.id}`}
          >
            Delete
          </UncontrolledTooltip>
        </div>
      )
    },
    {
      name: "Company",
      sortable: false,
      minWidth: "230px",
      sortField: "company_name",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              {row.company_name}
            </h6>
          </div>
        )
      }
    },
    
    {
      name: "START DATE",
      sortable: false,
      minWidth: "230px",
      sortField: "start_date",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              { moment(row.start_date)
            .local()
            .format("DD/MM/YYYY ")}
            </h6>
          </div>
        )
      }
    },
    {
      name: "END DATE",
      sortable: false,
      minWidth: "230px",
      sortField: "end_date",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
            { moment(row.end_date)
            .local()
            .format("DD/MM/YYYY ")}
            </h6>
          </div>
        )
      }
    },
    {
      name: "NO OF BILLS",
      sortable: false,
      minWidth: "120px",
      sortField: "totalbills",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              {row.totalbills}
            </h6>
          </div>
        )
      }
    },
    {
      name: "NO OF ITEMS",
      sortable: false,
      minWidth: "120px",
      sortField: "totalitems",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              {row.totalitems}
            </h6>
          </div>
        )
      }
    },
    {
      name: "TOTAL AMOUNT",
      sortable: false,
      minWidth: "120px",
      sortField: "total_amount",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              {row.total_amount ? row.total_amount.replace('?', '') : '-'}
            </h6>
          </div>
        )
      }
    },
    {
      name: "TYPE",
      sortable: false,
      minWidth: "120px",
      sortField: "type",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              {row.type}
            </h6>
          </div>
        )
      }
    },
  
    {
      name: "IMPORTED AT",
      sortable: false,
      minWidth: "230px",
      sortField: "created_date",
      cell: (row) => {
        return (
          <div className="justify-content-left align-items-center paddingtop-1">
            <h6 className="user-name text-truncate mb-0 wraptext vertical_align">
              {row.created_date}
            </h6>
          </div>
        )
      }
    }


  ]

  useEffect(() => {
    setCompanyValue(0)
    setVoucherTypeName('')
    setCompanyList([])
    setloader(false)
    getCompanyList()
    setImportTypeValue('Sales')
    setImportTypeList([
      { label: "Sales", value: "Sales" },
      { label: "Purchase", value: "Purchase" },
      { label: "Sales Return", value: "SalesReturn" },
      { label: "Purchase Return", value: "PurchaseReturn" }
    ])
    getListApi()
    setDuplicateList(['1001', '2001'])
    setColumnMappingList([])
  }, [])
  const handleImportTypeValue = (e) => {
 
    setImportTypeValue(e.value)
  }
  const handleCompanyValue = (e) => {
    
    setCompanyValue(e.value)
    setVoucherTypeName(e.voucher_type_name)
  
  }

  // for sorting
  const handleSort = (column, sortDirection) => {
    const sortable = column.sortField
    const employeeList = EmployeeMasterList.sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? 1 : -1
      } else if (sortDirection === "desc") {
        return a[sortable].toLowerCase() < b[sortable].toLowerCase() ? -1 : 1
      }
      setEmployeeMasterList(employeeList)
    })
  }

  //react-datatable
  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div
          className="invoice-list-dataTable react-dataTable"
          style={{ marginBottom: "15px" }}
        >
          <UILoader blocking={loader}>
            <DataTable
              title="Import List"
              pagination
              noDataComponent="There are no records to display"
              subHeader={true}
              columns={columns}
              responsive={true}
              onSort={handleSort}
              data={EmployeeMasterList}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              defaultSortField="invoiceId"
              subHeaderComponent={
                <CustomHeader
                  showItemPopup={showItemPopup}
                  companyValue={companyValue}
                  companyList={companyList}
                  handleCompanyValue={handleCompanyValue}
                  importTypeValue={importTypeValue}
                  importTypeList={importTypeList}
                  handleImportTypeValue={handleImportTypeValue}
                />
              }
            />
          </UILoader>
        </div>
      </Card>

      <Modal
        isOpen={EmployeeDeleteModal}
        className="vertically-centered-modal"
        fade={false}
      >
        <ModalHeader
          toggle={() => setEmployeeDeleteModal(!EmployeeDeleteModal)}
        >
          Confirmation
        </ModalHeader>
        <ModalBody>
          <div className="mb-2">
            <Label className="form-label" for="email">
              Are you sure you want to delete this import ?
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => deletedata()}>
            Yes
          </Button>{" "}
          <Button
            color="primary"
            outline
            onClick={() => setEmployeeDeleteModal(!EmployeeDeleteModal)}
          >
            No
          </Button>{" "}
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={DuplicationModal}
        toggle={() => setDuplicationModal(!DuplicationModal)}
        className="vertically-centered-modal"
        fade={false}
      >
        <ModalHeader
          toggle={() => setDuplicationModal(!DuplicationModal)}
        >
          Information
        </ModalHeader>
        <ModalBody>
          <div className="mb-2">
            <Label className="form-label" for="email">
              Duplications are occured
              {{duplicateList}}
            </Label>
          </div>
        </ModalBody>
        <ModalFooter>
          
          <Button
            color="primary"
            outline
            onClick={() => setDuplicationModal(!DuplicationModal)}
          >
            OK
          </Button>{" "}
        </ModalFooter>
      </Modal>

      <ReactSpreadsheetImport
        isOpen={OpenImportPopup}
        onClose={onClose}
        onSubmit={onSubmit}
        customTheme={{
          colors: {
            background: "white"
          },
          components: {
            Button: {
              baseStyle: {
                borderRadius: "none"
              },
              defaultProps: {
                colorScheme: "blue"
              }
            }
          }
        }}
        translations={{
          uploadStep: {
            title: "Upload File",
            manifestTitle: " ",
            manifestDescription: " "
          }
        }}
        fields={columnMappingList}
        matchColumnsStepHook={(table, rawData, columns) => {
          console.log(table, "table")
          console.log(rawData, "rawData")
          console.log(columns, "columns")
          setMappingcolumns(columns)
          return table
        }}
      />
    </div>
  )
}

export default EmployeeList
