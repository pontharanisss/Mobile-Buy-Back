// ** Icons Import
import { Book, Save } from 'react-feather'

export default [
  {
    id: 'master',
    title: 'Master',
    icon: <Book size={12} />,
    children: [
      {
        id: 'usermaster',
        title: 'User Master',
        icon: <Book size={20} />,
        navLink: '/masters/usermaster'
      },
      {
        id: 'reasons',
        title: 'Reasons  ',
        icon: <Save size={20} />,
        navLink: 'transaction/reasons'
      }
    ]
  }    
]
