// ** Icons Import
import { FileText, Circle, Square, UserCheck } from 'react-feather'
import {FaCut, FaRegIdBadge, FaMoneyCheckAlt, FaPeopleArrows, FaDiagnoses, FaPersonBooth } from "react-icons/fa"
import { GiSewingMachine } from "react-icons/gi"
import { HiCurrencyRupee } from "react-icons/hi"
import { SiAffinitydesigner } from "react-icons/si"
export default [
  {
    header: 'Production'
  },    
      {
        id: 'machineMaster',
        title: 'Machine',
        icon: <GiSewingMachine size={12} />,
        permissions: ['admin', 'editor'],
        navLink: 'production/machine'
      },
      {
        id: 'designMaster',
        title: 'Design',
        icon: <SiAffinitydesigner size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/production/design'
      },
      {
        id: 'jobCard',
        title: 'Job Card',
        icon: <FaRegIdBadge size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/production/jobcard'
      },
      {
        id: 'rateCard',
        title: 'Rate Card',
        icon: <HiCurrencyRupee size={12} />,
        permissions: ['admin', 'editor'],
        navLink: '/production/ratecard'
      }
]
