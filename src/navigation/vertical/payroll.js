// ** Icons Import
import { FileText, Circle, Square, UserCheck } from 'react-feather'
import {FaDonate, FaCreditCard} from "react-icons/fa"
import { IoIosCash } from "react-icons/io"
import { GiWallet } from "react-icons/gi"

export default [
  {
    header: 'PayRoll'
  },    
      {
        id: 'salaryprocess',
        title: 'Salary Process',
        icon: <IoIosCash size={12} />,
        permissions: ['admin', 'editor'],
         navLink: '/payroll/salaryprocess'
      },
      {
        id: 'salarypayout',
        title: 'Salary Payout',
        icon: <GiWallet size={12} />,
        permissions: ['admin', 'editor'],
         navLink: '/payroll/salarypayout'
      }
]
