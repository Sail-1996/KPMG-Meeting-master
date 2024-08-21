// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Icons Imports
import { ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardText, Form, Label, Input, Button, Alert } from 'reactstrap'

// app logo
import { ReactComponent as AppLogo } from '@@assets/images/logo/logo.svg'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import { FM, isValid, SuccessToast } from '@src/utility/Utils'
import { getPath } from '@src/router/RouteHelper'
import { useForm } from 'react-hook-form'
import FormGroupCustom from '@modules/common/components/formGroupCustom/FormGroupCustom'
import LoadingButton from '@modules/common/components/buttons/LoadingButton'
import { useState } from 'react'
import { loginApi, sendResetLinkApi } from '@src/utility/http/Apis/auth'
import { toast } from 'react-hot-toast'
import { Patterns } from '@src/utility/Const'
import Show from '@src/utility/Show'
import { useAppSelector } from '@src/redux/store'
import Shimmer from '../components/shimmers/Shimmer'
const ForgotPasswordBasic = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const appSettings = useAppSelector((state) => state.layout.appSettings)

  const {
    control,
    setError,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onSubmit = (jsonData) => {
    sendResetLinkApi({
      jsonData,
      loading: setLoading,
      success: (res) => {
        setSuccess(res.message)
        reset({
          email: ''
        })
      }
    })
  }
  return (
    <div className='auth-wrapper auth-basic px-2'>
      <div className='auth-inner my-2'>
        <Card className='mb-0'>
          <CardBody>
            <Link className='brand-logo' to='/' onClick={(e) => e.preventDefault()}>
              {/* <AppLogo /> */}
              {appSettings?.app_logo ? (
                <img src={appSettings?.app_logo} alt='logo' style={{ height: '30px' }} />
              ) : (
                <Shimmer width={100} height={30} />
              )}
            </Link>
            <CardTitle tag='h4' className='mb-1'>
              {FM('forgot-password')}? 🔒
            </CardTitle>
            <CardText className='mb-2'>
              {FM('enter-your-email-and-we-wll-send-you-instructions-to-reset-your-password')}
            </CardText>
            <Show IF={isValid(success)}>
              <Alert color='success'>
                <p className='p-1 m-0'>{success}</p>
              </Alert>
            </Show>
            <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroupCustom
                rules={{ required: true, pattern: Patterns.EmailOnly }}
                control={control}
                name='email'
                type='email'
                label={FM('email')}
                className='mb-1'
              />
              <LoadingButton loading={loading} type='submit' color='primary' block>
                {FM('send-reset-link')}
              </LoadingButton>
            </Form>
            <p className='text-center mt-2'>
              <Link to={'/login'}>
                <ChevronLeft className='rotate-rtl me-25' size={14} />
                <span className='align-middle'>{FM('back-to-login')}</span>
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default ForgotPasswordBasic
