// ** React Imports
import { Fragment, useContext, useEffect, useReducer } from 'react'

// ** Reactstrap Imports
import { Alert, Col, Label, Row } from 'reactstrap'

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'
// ** Styles
import StatsHorizontal from '@src/@core/components/widgets/stats/StatsHorizontal'
import LoadingButton from '@src/modules/common/components/buttons/LoadingButton'
import { TableFormData } from '@src/modules/common/components/CustomDataTable/CustomDataTable'
import Header from '@src/modules/common/components/header'
import Shimmer from '@src/modules/common/components/shimmers/Shimmer'
import { getPath } from '@src/router/RouteHelper'
import useUser from '@src/utility/hooks/useUser'
import Show from '@src/utility/Show'
import { stateReducer } from '@src/utility/stateReducer'
import { abbreviateNumber, FM, isValid, log } from '@src/utility/Utils'
import '@styles/base/pages/dashboard-ecommerce.scss'
import '@styles/react/libs/charts/apex-charts.scss'
import {
  Activity,
  AlertCircle,
  Check,
  CheckCircle,
  CheckSquare,
  Database,
  Edit3,
  FilePlus,
  FileText,
  List,
  Pause,
  RefreshCcw,
  Send,
  Server,
  Sliders,
  Upload,
  UserCheck,
  Users,
  X
} from 'react-feather'
import { Link } from 'react-router-dom'
import { useDashboardReportMutation } from '../../redux/RTKQuery/AppSettingRTK'

interface States {
  lastStoreRefresh?: any
  lastRefresh?: any
  reportData?: any
  page?: any
  per_page_record?: any
  search?: any
  filterData?: any
}

const Dashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors)
  const user = useUser()
  // ** vars
  const trackBgColor = '#e9ecef'
  const initState: States = {
    page: 1,
    reportData: [],
    per_page_record: 30,
    lastStoreRefresh: new Date().getTime(),
    lastRefresh: new Date().getTime()
  }
  const reducers = stateReducer<States>
  const [state, setState] = useReducer(reducers, initState)
  const [loadDashboard, result] = useDashboardReportMutation()

  useEffect(() => {
    loadDashboard({
      //   jsonData: { name: state?.search },
    })
  }, [state?.lastRefresh])

  useEffect(() => {
    if (result?.isSuccess) {
      setState({
        reportData: result?.data
      })
    }
  }, [result])

  const statsData = state?.reportData?.data
  log('Dashboard', statsData)
  // admin
  return (
    <Fragment>
      {result?.isLoading ? (
        <div id='dashboard-dpr'>
          <Row className='match-height'>
            <Col md='4'>
              <Shimmer height={250} />
            </Col>
            <Col md='4'>
              <Shimmer height={250} />
            </Col>
            <Col md='4'>
              <Shimmer height={250} />
            </Col>
            <Col md='4'>
              <Shimmer height={250} />
            </Col>
            <Col md='4'>
              <Shimmer height={250} />
            </Col>
            <Col md='4'>
              <Shimmer height={250} />
            </Col>
          </Row>
        </div>
      ) : (
        <>
          <Header title={state?.reportData?.message}></Header>
          <div id='dashboard-dpr'>
            <Row className='match-height'>
              <Show IF={isValid(statsData?.userCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.userCount}`}
                    icon={<Users />}
                    color='primary'
                    stats={abbreviateNumber(statsData?.userCount)}
                    statTitle={FM('total-users')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.todayMeetingCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.todayMeetingCount}`}
                    icon={<List />}
                    color='success'
                    stats={abbreviateNumber(statsData?.todayMeetingCount)}
                    statTitle={FM('today-meeting')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.meetingCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.meetingCount}`}
                    icon={<List />}
                    color='info'
                    stats={abbreviateNumber(statsData?.meetingCount)}
                    statTitle={FM('total-meetings')}
                  />
                </Col>
              </Show>
            </Row>
            <hr />
            <Row>
              <h3 className='text-primary fw-bold'>Invoices</h3>
              <Show IF={isValid(statsData?.invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.invoiceCount}`}
                    icon={<FileText />}
                    color='primary'
                    stats={abbreviateNumber(statsData?.invoiceCount)}
                    statTitle={FM('total-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.approved_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.approved_invoiceCount}`}
                    icon={<CheckCircle />}
                    color='success'
                    stats={abbreviateNumber(statsData?.approved_invoiceCount)}
                    statTitle={FM('approved-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.pending_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    icon={<AlertCircle />}
                    tooltip={`${statsData?.pending_invoiceCount}`}
                    color='warning'
                    stats={abbreviateNumber(statsData?.pending_invoiceCount)}
                    statTitle={FM('pending-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.pending_with_owner_InvoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    icon={<AlertCircle />}
                    tooltip={`${statsData?.pending_with_owner_InvoiceCount}`}
                    color='warning'
                    stats={abbreviateNumber(statsData?.pending_with_owner_InvoiceCount)}
                    statTitle={FM('pending-with-owner-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.pending_with_epcm_InvoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    icon={<AlertCircle />}
                    tooltip={`${statsData?.pending_with_epcm_InvoiceCount}`}
                    color='warning'
                    stats={abbreviateNumber(statsData?.pending_with_epcm_InvoiceCount)}
                    statTitle={FM('pending-with-epcm-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.rejected_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    icon={<X />}
                    tooltip={`${statsData?.rejected_invoiceCount}`}
                    color='danger'
                    stats={abbreviateNumber(statsData?.rejected_invoiceCount)}
                    statTitle={FM('rejected-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.on_hold_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    icon={<Pause />}
                    tooltip={`${statsData?.on_hold_invoiceCount}`}
                    color='secondary'
                    stats={abbreviateNumber(statsData?.on_hold_invoiceCount)}
                    statTitle={FM('on-hold-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.paid_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.paid_invoiceCount}`}
                    icon={<CheckSquare />}
                    color='info'
                    stats={abbreviateNumber(statsData?.paid_invoiceCount)}
                    statTitle={FM('paid-invoices')}
                  />
                </Col>
              </Show>

              <Show IF={isValid(statsData?.resend_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.resend_invoiceCount}`}
                    icon={<Send />}
                    color='info'
                    stats={abbreviateNumber(statsData?.resend_invoiceCount)}
                    statTitle={FM('resend-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.send_for_payment_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.send_for_payment_invoiceCount}`}
                    icon={<Send />}
                    color='primary'
                    stats={abbreviateNumber(statsData?.send_for_payment_invoiceCount)}
                    statTitle={FM('send-for-payment-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.under_review_by_owner_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.under_review_by_owner_invoiceCount}`}
                    icon={<UserCheck />}
                    color='dark'
                    stats={abbreviateNumber(statsData?.under_review_by_owner_invoiceCount)}
                    statTitle={FM('under-review-by-owner-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.under_review_by_owner_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.under_review_by_owner_invoiceCount}`}
                    icon={<UserCheck />}
                    color='secondary'
                    stats={abbreviateNumber(statsData?.under_review_by_emcm_invoiceCount)}
                    statTitle={FM('under-review-by-epcm-invoices')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.verified_invoiceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.verified_invoiceCount}`}
                    icon={<FilePlus />}
                    color='success'
                    stats={abbreviateNumber(statsData?.verified_invoiceCount)}
                    statTitle={FM('verified-invoices')}
                  />
                </Col>
              </Show>
            </Row>
            <hr />
            <Row>
              <h3 className='text-primary fw-bold'>Hindrance</h3>
              <Show IF={isValid(statsData?.hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.hindranceCount}`}
                    icon={<FileText />}
                    color='primary'
                    stats={abbreviateNumber(statsData?.hindranceCount)}
                    statTitle={FM('total-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.approved_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.approved_hindranceCount}`}
                    icon={<CheckSquare />}
                    color='success'
                    stats={abbreviateNumber(statsData?.approved_hindranceCount)}
                    statTitle={FM('approved-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.pending_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.pending_hindranceCount}`}
                    icon={<AlertCircle />}
                    color='warning'
                    stats={abbreviateNumber(statsData?.pending_hindranceCount)}
                    statTitle={FM('pending-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.rejected_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.rejected_hindranceCount}`}
                    icon={<X />}
                    color='danger'
                    stats={abbreviateNumber(statsData?.hindranceCount)}
                    statTitle={FM('rejected-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.on_hold_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.on_hold_hindranceCount}`}
                    icon={<Pause />}
                    color='secondary'
                    stats={abbreviateNumber(statsData?.on_hold_hindranceCount)}
                    statTitle={FM('on-hold-hindrance')}
                  />
                </Col>
              </Show>

              <Show IF={isValid(statsData?.resend_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.resend_hindranceCount}`}
                    icon={<Send />}
                    color='info'
                    stats={abbreviateNumber(statsData?.hindranceCount)}
                    statTitle={FM('resend-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.resolved_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.resolved_hindranceCount}`}
                    icon={<Edit3 />}
                    color='success'
                    stats={abbreviateNumber(statsData?.resolved_hindranceCount)}
                    statTitle={FM('resolved-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.under_review_by_emcm_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.under_review_by_emcm_hindranceCount}`}
                    icon={<UserCheck />}
                    color='primary'
                    stats={abbreviateNumber(statsData?.under_review_by_emcm_hindranceCount)}
                    statTitle={FM('under-review-by-epcm-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.under_review_by_owner_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.under_review_by_owner_hindranceCount}`}
                    icon={<UserCheck />}
                    color='dark'
                    stats={abbreviateNumber(statsData?.under_review_by_owner_hindranceCount)}
                    statTitle={FM('under-review-by-owner-hindrance')}
                  />
                </Col>
              </Show>
              <Show IF={isValid(statsData?.verified_hindranceCount)}>
                <Col md='4'>
                  <StatsHorizontal
                    tooltip={`${statsData?.verified_hindranceCount}`}
                    icon={<FilePlus />}
                    color='success'
                    stats={abbreviateNumber(statsData?.verified_hindranceCount)}
                    statTitle={FM('verified-hindrance')}
                  />
                </Col>
              </Show>
            </Row>
          </div>
        </>
      )}
    </Fragment>
  )
}

export default Dashboard
