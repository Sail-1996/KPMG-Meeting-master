import LoadingButton from '@src/modules/common/components/buttons/LoadingButton'
import Header from '@src/modules/common/components/header'
import BsTooltip from '@src/modules/common/components/tooltip'
import Emitter from '@src/utility/Emitter'
import { Permissions } from '@src/utility/Permissions'
import Show, { Can } from '@src/utility/Show'
import { Meeting } from '@src/utility/types/typeMeeting'
import { FM, formatDate, isValid, isValidArray, log, makeLinksClickable } from '@src/utility/Utils'
import { useEffect, useReducer, useState } from 'react'
import { Bookmark, Edit, ExternalLink, FilePlus, RefreshCcw } from 'react-feather'
import { defaultStyles, FileIcon } from 'react-file-icon'
import { useLocation, useParams } from 'react-router-dom'
import {
  Button,
  ButtonGroup,
  ButtonProps,
  Card,
  CardBody,
  Col,
  Row,
  TabContent,
  TabPane
} from 'reactstrap'
import { useViewMeetingByIdMutation } from '../../redux/RTKQuery/MeetingManagement'
import MeetingNotes from './MeetingNotes'
import DOMPurify from 'dompurify'
import BookmarkAdd from '@mui/icons-material/BookmarkAdd'

import { useModal } from '@src/modules/common/components/modal/HandleModal'
import { stateReducer } from '@src/utility/stateReducer'
import CreateEditMeeting from './CreateEditMeeting'
import CreateEditNote from './CreateEditNote'
import CreateEditAction from './CreateEditActionItems'

type States = {
  page?: any
  per_page_record?: any
  filterData?: any
  reload?: any
  isAddingNewData?: boolean
  search?: string
  lastRefresh?: any
  selectedItem?: Meeting
  enableEdit?: boolean
}

const MeetingDetails = (props: any) => {
  // location
  const location = useLocation()
  // params
  const params: any = useParams()
  // ** State
  const [active, setActive] = useState('1')
  // load details
  const [loadDetails, res] = useViewMeetingByIdMutation()
  const canEditMeeting = Can(Permissions.meetingEdit)
  // check delete permission
  const canDeleteMeeting = Can(Permissions.meetingDelete)
  // check notes add permission
  const canAddNotes = Can(Permissions.notesAdd)
  // check notes edit permission
  const canEditNotes = Can(Permissions.notesEdit)
  // check notes delete permission
  const canDeleteNotes = Can(Permissions.notesDelete)
  // check action add permission
  const canAddAction = Can(Permissions.actionItemsAdd)
  // check action edit permission
  const canEditAction = Can(Permissions.actionItemsEdit)

  const initState: States = {
    page: 1,
    per_page_record: 20,
    filterData: undefined,
    search: '',
    enableEdit: false,
    lastRefresh: new Date().getTime()
  }

  const reducers = stateReducer<States>

  const [state, setState] = useReducer(reducers, initState)

  // toggle add modal
  const [modalAdd, toggleModalAdd] = useModal()
  // toggle add modal
  const [modalEdit, toggleModalEdit] = useModal()
  // toggle add modal
  const [modalActionAdd, toggleModalActionAdd] = useModal()
  // meeting data
  const tempData = res?.data?.data ?? (location?.state as Meeting)
  // toggle tab
  const toggle = (tab: string) => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  // load details
  const loadData = () => {
    loadDetails(params?.id)
  }

  // load details on page
  useEffect(() => {
    if (isValid(params?.id)) {
      loadData()
    }
  }, [params?.id])

  // reload Data
  const reloadData = () => {
    Emitter.emit('reloadNotes', true)
    loadData()
  }

  // reload Data
  useEffect(() => {
    Emitter.on('reloadMeeting', (data: boolean) => {
      reloadData()
    })
    return () => {
      Emitter.off('reloadMeeting', (data: boolean) => {})
    }
  }, [])

  return (
    <div>
      <CreateEditMeeting data={{ ...tempData }} modal={modalEdit} toggleModal={toggleModalEdit} />
      <CreateEditNote
        meeting={tempData}
        data={{ ...state?.selectedItem, type: 'note' }}
        modal={modalAdd}
        toggleModal={toggleModalAdd}
        toggleNextModal={(e) => {
          if (e) {
            log('e', e)
            toggleModalActionAdd()
            setTimeout(() => {
              setState({ selectedItem: e })
            }, 1000)
          }
        }}
      />
      <CreateEditAction
        meeting={tempData}
        note={state?.selectedItem}
        modal={modalActionAdd}
        toggleModal={toggleModalActionAdd}
      />
      <Row>
        <Col md='12'>
          <Header route={props?.route} goBack title={tempData?.meeting_title}>
            <ButtonGroup color='dark'>
              <Show IF={canAddNotes}>
                <BsTooltip<ButtonProps>
                  Tag={Button}
                  className='btn-primary'
                  color='primary'
                  size='sm'
                  onClick={() => {
                    setState({
                      selectedItem: undefined,
                      enableEdit: false
                    })
                    // form.reset()
                    toggleModalAdd()
                  }}
                  title={FM('add-note')}
                >
                  <Bookmark size='14' className={'ficon ' + (modalEdit ? 'text-white' : '')} />
                  {/* <GetApp size='5px' /> */}
                </BsTooltip>
              </Show>
              <Show IF={canEditMeeting}>
                <BsTooltip<ButtonProps>
                  Tag={Button}
                  className='btn-secondary'
                  color='secondary'
                  size='sm'
                  onClick={() => {
                    setState({
                      selectedItem: undefined,
                      enableEdit: false
                    })
                    // form.reset()
                    toggleModalEdit()
                  }}
                  title={FM('edit-meeting')}
                >
                  <Edit size='14' className={'ficon ' + (modalEdit ? 'text-white' : '')} />
                  {/* <GetApp size='5px' /> */}
                </BsTooltip>
              </Show>
              <LoadingButton
                tooltip={FM('reload')}
                loading={res.isLoading}
                size='sm'
                color='info'
                onClick={reloadData}
              >
                <RefreshCcw size='14' />
              </LoadingButton>
            </ButtonGroup>
          </Header>

          {/* <Card className=''>
            <CardBody className='p-1 mb-0 pb-0'>
              <Nav pills className=''>
                <NavItem>
                  <NavLink
                    active={active === '1'}
                    onClick={() => {
                      toggle('1')
                    }}
                  >
                    {FM('details')}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={active === '2'}
                    onClick={() => {
                      toggle('2')
                    }}
                  >
                    {FM('add-note')}
                  </NavLink>
                </NavItem>
              </Nav>
            </CardBody>
          </Card> */}

          <TabContent className='py-0' activeTab={active}>
            <TabPane tabId='1'>
              <Card className=''>
                <CardBody className='mb-0'>
                  <Row>
                    <Col md='8'>
                      <div className='mb-1'>
                        <div className='mb-1'>
                          <h5 className='mb-50 fw-bolder text-dark'>{FM('organizer')}</h5>
                          <p className='mb-50'>{tempData?.organiser?.name ?? 'N/A'}</p>
                        </div>
                        <h5 className='mb-50 fw-bolder text-dark'>
                          {FM('meeting-time')}{' '}
                          <Show IF={isValid(tempData?.meeting_link)}>
                            <BsTooltip
                              title={
                                <>
                                  {tempData?.meeting_link}
                                  <hr />
                                  {FM('join-meeting')}
                                </>
                              }
                            >
                              <a href={tempData?.meeting_link} target='_blank'>
                                <ExternalLink style={{ marginTop: -5 }} size={16} />
                              </a>
                            </BsTooltip>
                          </Show>
                        </h5>
                        <p className='mb-50'>
                          {formatDate(tempData?.meeting_date)} |{' '}
                          {formatDate(`2022-12-12 ${tempData?.meeting_time_start}`, 'HH:mm A')} -
                          {formatDate(`2022-12-12 ${tempData?.meeting_time_end}`, 'HH:mm A')}
                        </p>
                      </div>
                      <div className='mb-1'>
                        <h5 className='mb-50 fw-bolder text-dark'>{FM('meeting-ref-no')}</h5>
                        <p className='mb-50'>{tempData?.meeting_ref_no ?? 'N/A'}</p>
                      </div>
                      <div className='mb-1'>
                        <h5 className='mb-50 fw-bolder text-dark'>{FM('agenda')}</h5>
                        <p className='mb-50'>
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                DOMPurify.sanitize(
                                  makeLinksClickable(tempData?.agenda_of_meeting) ?? ''
                                ) ?? ''
                            }}
                          />
                        </p>
                      </div>
                    </Col>
                    <Col md='4' className='border-start'>
                      <Show IF={isValidArray(tempData?.attendees)}>
                        <div className='mb-1 pb-1 border-bottom'>
                          <h5 className='mb-50 fw-bolder text-dark'>{FM('attendees')}</h5>
                          {tempData?.attendees?.map((a) => (
                            <div className='text-dark mb-50'>{a?.user?.email}</div>
                          ))}
                        </div>
                      </Show>
                      <div className='mb-1'>
                        <h5 className='mb-1 fw-bolder text-dark'>{FM('documents')}</h5>
                        {/* <p className='text-muted'>{FM('add-or-download-attachment')}</p> */}
                        {tempData?.documents?.map((a) => (
                          <div className='file-list mb-50'>
                            <FileIcon
                              extension={a.file_extension}
                              {...defaultStyles[a.file_extension]}
                            />
                            <a href={a?.document} target={'_blank'}>
                              {a?.uploading_file_name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </Col>
                    {/* <Col md='12'>
                      <p
                        role={'button'}
                        className='text-primary mb-0 fw-bold small mt-2 text-uppercase'
                      >
                        {FM('update-meeting')}
                      </p>
                    </Col> */}
                  </Row>
                </CardBody>
              </Card>
              <MeetingNotes meeting={tempData} />
            </TabPane>
          </TabContent>
        </Col>
        <Col md='3'></Col>
      </Row>
    </div>
  )
}

export default MeetingDetails
