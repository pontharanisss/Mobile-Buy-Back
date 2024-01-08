// ** Navigation imports 

import forms from './forms'
import inward from './inward'
import Sales from './sales'
import Stock from './stock'
import masters from './masters'
import Products from './products'
import reasons from './reasons'

// ** Merge & Export

// import Masters from './masters'

// ** Merge & Export
export default [...forms, ...masters, ...inward, ...Sales, ...reasons, ...Products, ...Stock]
