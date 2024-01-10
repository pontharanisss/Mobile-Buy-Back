// ** Icons Import
import { ShoppingCart, Delete } from 'react-feather'

export default [
  {
    id: 'transactions',
    title: 'Transactions',
    icon: <ShoppingCart size={12} />,
    children: [
      {
        id: 'inward',
        title: 'Stock Inward  ',
        icon: <ShoppingCart size={20} />,
        navLink: 'transaction/inward'
      },
      {
        id: 'import',
        title: 'Cancelled Product',
        icon: <Delete size={20} />,
        navLink: 'product/cancelledproducts'
      }
    ]
  }   
  
]
