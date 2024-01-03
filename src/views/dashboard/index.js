// ** React Imports 
import Flatpickr from 'react-flatpickr'
// import { getUserData } from '@utils'
// ** Reactstrap Imports
import {
  Button,
  Label,
  Row,
  Col,
  Card, CardHeader, CardTitle, CardBody, CardText
} from 'reactstrap'

// ** Store & Actions
// import {
//   getmaster, getDashboardData, onchangeData,
//   onchangeitemcategory
// } from './store'
// import { useDispatch, useSelector } from 'react-redux'
// ** Styles
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign, Calendar } from 'react-feather'
import Avatar from '@components/avatar'
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '../../assets/style/style.css'
import {Line } from "react-chartjs-2"
import moment from 'moment'
import { useSkin } from '@hooks/useSkin'
// import { GrCompliance } from "react-icons/gr"
import { FaClipboardList } from "react-icons/fa"
import { MdPendingActions } from "react-icons/md"
import { BiTransferAlt } from "react-icons/bi"
import { GoChecklist } from "react-icons/go"

const DashboardReport = () => {
  // ** Store vars
  // const dispatch = useDispatch()
  // const store = useSelector(state => state.DashboardReport)
  // const user = getUserData()

  const cols = {md: '3', sm: '6', xs: '12' }
  const data1 = [
    {
      title: '10',
      subtitle: 'Total Jobs',
      color: 'light-primary',
      icon: <FaClipboardList size={24} />
    },
    {
      title: '5',
      subtitle: 'Completed Jobs',
      color: 'light-success',
      icon: <GoChecklist size={24} />
    },
    {
      title: '3',
      subtitle: 'Pending Jobs',
      color: 'light-warning',
      icon: <MdPendingActions size={24} />
    },
    {
      title: '2',
      subtitle: 'Transfer Job',
      color: 'light-danger',
      icon: <BiTransferAlt size={24} />
    }
  ],
    { skin } = useSkin(),
    labelColor = skin === 'dark' ? '#b4b7bd' : '#6e6b7b',
    gridLineColor = 'rgba(200, 200, 200, 0.2)',
    lineChartDanger = '#ff4961'

  // ** Chart Options
  const options = {
    responsive: true,
    backgroundColor: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: { color: labelColor },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      },
      y: {
        min: 0,
        max: 400,
        scaleLabel: { display: true },
        ticks: {
          stepSize: 100,
          color: labelColor
        },
        grid: {
          borderColor: gridLineColor,
          color: gridLineColor
        }
      }
    },
    plugins: {
      legend: {
        align: 'start',
        position: 'top',
        labels: {
          boxWidth: 10,
          marginBottom: 25,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  // ** Chart Data
  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
    datasets: [
      {
        data: [80, 150, 180, 270, 210, 160, 160, 202, 265, 210, 270, 255, 290, 360, 375],
        fill: false,
        tension: 0.5,
        pointRadius: 1,
        label: 'Job',
        pointHoverRadius: 5,
        pointStyle: 'circle',
        pointHoverBorderWidth: 5,
        borderColor: lineChartDanger,
        pointBorderColor: 'transparent',
        backgroundColor: lineChartDanger,
        pointHoverBackgroundColor: lineChartDanger
      }
    ]
  }
  const fromdate = new Date()
  const from_date = moment(new Date(fromdate)).format("DD-MM-YYYY")
  //** To add spacing between legends and chart
  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20
        }
      }
    }
  ]

  const renderData = () => {
    return data1.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data1.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0 align-center'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }


  return (
    <div className='invoice-list-wrapper'>
      <Card>
        <div className="d-flex das_head"><div>Dashboard</div>
          <div style={{ textAlign: 'right', width: '100%', paddingRight: '20px' }}>Date : {from_date} </div>
        </div>
          <CardBody className='statistics-body'>
            <Row >{renderData()}</Row>
          </CardBody>
      </Card>

      <Row>
        <Card>
          <CardHeader className='d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start'>
            <div>
              <CardTitle className='mb-75' tag='h4'>
                Job Trends
             </CardTitle>
            </div>
            <div className='d-flex align-items-center mt-md-0 mt-1'>
              <Calendar size={17} />
              <Flatpickr
                className='form-control flat-picker bg-transparent border-0 shadow-none'
                options={{
                  mode: 'range',
                  // eslint-disable-next-line no-mixed-operators
                  defaultDate: [new Date(), new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)]
                }}
              />
            </div>
          </CardHeader>
          <CardBody>
            <Line  data={data} options={options} height={450} plugins={plugins} />
          </CardBody>
        </Card>
      </Row>
    </div>
  )
}

export default DashboardReport
