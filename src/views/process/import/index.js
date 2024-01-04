import React, { useState, useRef } from "react"
import { ChevronDown } from "react-feather"
import DataTable from "react-data-table-component"
import { ReactSpreadsheetImport } from "react-spreadsheet-import"
import { Button, Card, Col, Row } from "reactstrap"
import xlsx from "xlsx"
import "@styles/react/apps/app-invoice.scss"
import "@styles/react/libs/tables/react-dataTable-component.scss"

const CustomHeader = ({ onImportClick }) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row className="pb-2">
        <Col md="10" className="actions-right d-flex align-items-center">
          <div
            className="d-flex align-items-center"
            style={{ paddingRight: "10px" }}
          >
            <Button color="primary" onClick={onImportClick}>
              Import
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const Import = () => {
  const [isImportPopupOpen, setImportPopupOpen] = useState(false)
  const [tableData, setTableData] = useState([])

  const fileInputRef = useRef(null)

  const handleSort = () => {
    // Define sorting logic here
  }

  const onImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onClose = () => {
    setImportPopupOpen(false)
  }

  const onSubmit = () => {
    setImportPopupOpen(false)
  }

  const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result)
        const workbook = xlsx.read(data, { type: "array" })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
        const header = jsonData[0]
        const dataRows = jsonData.slice(1)
        const formattedData = dataRows.map((row) => header.reduce((acc, key, index) => {
          acc[key] = row[index]
          return acc
        }, {})
        )
        setTableData(formattedData)
      }
      reader.readAsArrayBuffer(file)
    }
  }
  const columns = Object.keys(tableData[0] || {}).map((key) => ({
    name: key,
    selector: key,
    sortable: true
  }))
  return (
    <div className="invoice-list-wrapper">
      <Card>
        <div
          className="invoice-list-dataTable react-dataTable"
          style={{ marginBottom: "15px" }}
        >
          <DataTable
            pagination
            noDataComponent="There are no records to display"
            subHeader={true}
            columns={columns}
            data={tableData}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            subHeaderComponent={<CustomHeader onImportClick={onImportClick} />}
            onSort={handleSort}
          />
        </div>
      </Card>

      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 999
        }}
      >
        <Button color="success" onClick={onSubmit}>
          Submit
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={onFileChange}
      />

      <ReactSpreadsheetImport
        isOpen={isImportPopupOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        fields={[] /* Add your actual fields here */}
        matchColumnsStepHook={(table, rawData, columns) => {
          console.log(table, "table")
          console.log(rawData, "rawData")
          console.log(columns, "columns")
          return table
        }}
      />
    </div>
  )
}

export default Import