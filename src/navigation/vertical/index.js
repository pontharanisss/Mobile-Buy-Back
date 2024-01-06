// ** Navigation imports 

import forms from './forms'
import inward from './inward'
import Sales from './sales'
import Stock from './stock'
import Products from './products'
import Masters from './masters'

// ** Merge & Export
export default [...forms, ...inward, ...Sales, ...Stock, ...Products, ...Masters]
