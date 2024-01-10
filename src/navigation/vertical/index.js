// ** Navigation imports 

import forms from './forms'
import inward from './inward'
import Sales from './sales'
import Stock from './stock'
import masters from './masters'

// ** Merge & Export

// import Masters from './masters'

// ** Merge & Export
export default [...forms, ...masters, ...inward, ...Sales, ...Stock]
