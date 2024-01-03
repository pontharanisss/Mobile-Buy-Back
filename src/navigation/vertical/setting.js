// ** Icons Import
import {Settings } from 'react-feather'
import { HiArrowCircleRight } from "react-icons/hi"
export default [
  {
    id: 'Settings',
    title: 'Settings',
    icon: <Settings size={20} />,
    children: [
      {
        id: 'financialyear',
        title: 'Financial Year',
        icon: <HiArrowCircleRight size={16} />,
        permissions: ['admin', 'editor'],
        navLink: '/setting/financialyear'
      }
    ]
  }
]
