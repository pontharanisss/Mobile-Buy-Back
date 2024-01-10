import React, { useState, useRef, useEffect } from "react"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { Button, Card, Col, Row, CardBody } from "reactstrap"
import xlsx from "xlsx"
import "@styles/react/libs/tables/react-dataTable-component.scss"
import "./import_css.scss"
import { toast } from 'react-hot-toast'
import UILoader from "@components/ui-loader"
import '../../../assets/style/style.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getUserData } from '@utils'
import { importProduct, handleStatusFlag } from '../store'
import { useDispatch, useSelector } from 'react-redux'

const TotalRecordsCard = ({ totalRecords }) => {
  return (
    <div className="card_box">
      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bolder mb-0">{totalRecords}</h2>
            <p className="card-text">Total Records</p>
          </div>
          <div style={{marginLeft:"20px"}} className="avatar avatar-stats p-50 bg-light-primary">
            <div className="avatar-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
            </div>
          </div>
        </div>
      </CardBody>
    </div>
  )
}

const CustomHeader = ({ onImportClick, totalRecords }) => {
  return (
    <div className="invoice-list-table-header w-100">
      <Row className="mb-0">
        <Col sm="2" className="d-flex align-items-center justify-content-center">
          <Button color="primary" onClick={onImportClick}>
            Import
          </Button>
        </Col>
        <Col md="4" className="d-flex align-items-center ml-auto">
          <TotalRecordsCard totalRecords={totalRecords} />
        </Col>
        
      </Row>
    </div>
  )
}

const Import = () => {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const user = getUserData()
  const dispatch = useDispatch()
  const store = useSelector(state => state.Process)

  useEffect(() => {
    console.log(store.statusFlag, 'statusFlag')
    if (store.statusFlag === 1) {
      setLoading(false)
      dispatch(handleStatusFlag(0))
      setTableData([])
       toast.success(store.message, { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })     
    } else if (store.statusFlag === 2) {
      setLoading(false)
      dispatch(handleStatusFlag(0)) 
      toast.error(store.message, { duration: 2000, style:{color:'#000', backgroundColor:'#d7d2d2'} })
    }
  }, [store.statusFlag])
  

  const handleSort = () => {
    // Define sorting logic here
  }

  const onImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onSubmit = () => {
    // Submit logic here
    setLoading(true)
    dispatch(
      importProduct({
        user_id: user && user.id,
        import_data: tableData ? tableData : []
      })
    ) 
    
  }

  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.name.endsWith(".xlsx")) {
        setLoading(true)
        const reader = new FileReader()

        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result)
          const workbook = xlsx.read(data, { type: "array" })
          const sheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[sheetName]
          const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
          const header = jsonData[0]
          const dataRows = jsonData.slice(1)
          const formattedData = dataRows.map((row) => header.reduce(
            (acc, key, index) => {
              acc[key] = row[index]
              return acc
            },
            {}
          )
          )
          setTableData(formattedData)
          setLoading(false)
        }

        reader.readAsArrayBuffer(file)
      } else {
        // Show toast notification for invalid file
        toast.error("Please choose a .xlsx file only", {
          duration: 2000,
          style: { color: "#000", backgroundColor: "#d7d2d2" }
        })
        // Clear the file input
        e.target.value = null
      }
    }
  }

  const columns = Object.keys(tableData[0] || {}).map((key) => ({
    name: key,
    selector: key,
    sortable: true
  }))

  return (
    <UILoader blocking={loading}>
    <div className="invoice-list-wrapper">     
      <Card>
        <div className="invoice-list-dataTable">
          <div className="datatable-header header sticky">
            <CustomHeader onImportClick={onImportClick} totalRecords={tableData.length} />
          </div>
          <div className="datatable-content react-dataTable" style={{position: 'relative', marginTop: '150px'}}>
            <DataTable
              pagination={false}
              noDataComponent=""
              columns={columns}
              data={tableData}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              onSort={handleSort}
              noHeader={true}
            />
          </div>
         

          <div className="card-footer d-flex justify-content-end">
            <Button color="success" onClick={onSubmit} className="floatcss">
              Submit
            </Button>
          </div>
        </div>
      </Card>
      
      <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={onFileChange} />
      
    </div></UILoader>
  )
}

export default Import
