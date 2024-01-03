import { lazy } from 'react'


const CashClosure = lazy(() => import('../../views/reports/cash_closure'))
const ReceiptReport = lazy(() => import('../../views/reports/receipt_report'))

const ReportRoutes = [

    {
      path: '/reports/cash-closure',
      element: <CashClosure />
    },
    {
      path: '/reports/receipt-report',
      element: <ReceiptReport />
    }
  ]
  
  export default ReportRoutes