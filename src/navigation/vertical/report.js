// ** Icons Import
import { FileText, Circle, Square, UserCheck } from 'react-feather'
import {FaChartLine, FaChartPie} from "react-icons/fa"
import { IoMdClock } from "react-icons/io"
import { GiCash } from "react-icons/gi"
export default [
  {
    header: 'Reports'
  },
 
  {
    id: 'cashClosure',
    title: 'Cash Closure',
    permissions: ['admin', 'editor'],
     navLink: '/reports/cash-closure'
  },
  {
    id: 'receiptReport',
    title: 'Receipt Report',
    permissions: ['admin', 'editor'],
     navLink: '/reports/receipt-report'
  }
]
