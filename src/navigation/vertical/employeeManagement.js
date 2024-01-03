// ** Icons Import
import { FileText, Circle, Square, UserCheck } from 'react-feather'
import { FaUserTie, FaBriefcase, FaUniversity, FaClipboardList } from "react-icons/fa"
import { VscTypeHierarchy } from "react-icons/vsc"
export default [
  {
    header: 'Employee Managament'
  },    
      {
        id: 'designationMaster',
        title: 'Designation',
        icon: <VscTypeHierarchy size={12} />,
        permissions: ['admin', 'editor'],
        navLink: 'employee/designation'
      },
      {
        id: 'departmentMaster',
        title: 'Department',
        icon: <FaUniversity size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/employee/department'
      },
      {
        id: 'employeeMaster',
        title: 'Employee',
        icon: <FaUserTie size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/employee/employee'
      }
]
