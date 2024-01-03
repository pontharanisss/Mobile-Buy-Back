// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
// import { getUserData } from '@utils' 
const VerticalLayout = props => { 
  // const user = getUserData() 
  // let dataRemovedFinal 
  // dataRemovedFinal = navigation
  // if (user?.userroleid === 2) {
  //   const dataRemoved = navigation.filter((el) => {
  //     return el.header !== "Control Panel"
  //   })
  //   const dataRemoved1 = dataRemoved.filter((el) => {
  //     return el.id !== "masters"
  //   }) 
  //     dataRemovedFinal = dataRemoved1.filter((el) => {
  //     return el.id !== "configuration"
  //   })
  // } else {
  //   dataRemovedFinal = navigation
  // }

  return (
    <Layout menuData={navigation} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
