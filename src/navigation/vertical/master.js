// ** Icons Import
import { FileText } from 'react-feather'
// import { GiLargeDress } from "react-icons/gi"
// import { RiPencilRuler2Fill } from "react-icons/ri"
export default [
  {
    id: 'masters',
    title: 'Masters',
    icon: <FileText size={20} />,
    children: [    
      {
        id: 'companyMaster',
        title: 'Company',
        permissions: ['admin', 'editor'],
        navLink: '/masters/companyMaster'
      },
      // {
      //   id: 'itemGroup',
      //   title: 'Item Group',
      //   icon: <FaObjectUngroup size={12} />,
      //   permissions: ['admin', 'editor'],
      //   navLink: '/masters/itemgroup'
      // },
      // {
      //   id: 'itemMaster',
      //   title: 'Item',
      //   icon: <GiLargeDress size={12} />,
      //   permissions: ['admin', 'editor'],
      //   navLink: '/masters/item'
      // },
      {
        id: 'userMaster',
        title: 'Agent Management',
        permissions: ['admin', 'editor'],
        navLink: '/masters/usermanagement'
      }
      // {
      //   id: 'sizeMaster',
      //   title: 'Size Group',
      //   icon: <RiPencilRuler2Fill size={12} />,
      //   permissions: ['admin', 'editor'],
      //   navLink: '/masters/size'
      // }, 
      // {
      //   id: 'colorMaster',
      //   title: 'Color',
      //   icon: <FaPalette size={12} />,
      //   permissions: ['admin', 'editor'],
      //   navLink: '/masters/color'
      // }
    ]
  }
]
