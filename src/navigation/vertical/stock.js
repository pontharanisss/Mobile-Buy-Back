// ** Icons Import
import { ShoppingBag, Delete } from 'react-feather'

export default [
  {
    id: 'report',
    title: 'Report',
    icon: <ShoppingBag size={12} />,
    children: [
      {
        id: 'stock',
        title: 'Stock Report  ',
        icon: <ShoppingBag size={20} />,
        navLink: 'transaction/stock'
      },
      {
        id: 'pendingreport',
        title: 'Pending Imported Report',
        icon: <ShoppingBag size={20} />
        // navLink: 'transaction/stock'
      }
    ]
  }   
]
