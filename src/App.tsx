import { Suspense, useEffect, useState } from 'react'
import ChangePassword from './modules/meeting/views/users/ChnagePassword'
import UpdateViewProfile from './modules/meeting/views/users/UpdateViewPorfile'
import { useAppDispatch, useAppSelector } from './redux/store'
import { useIdleTimer } from 'react-idle-timer'

// ** Router Imports
import Router from './router/Router'
import { handleLogout } from './redux/authentication'
import { useLoadAppSettingMutation } from './modules/meeting/redux/RTKQuery/AppSettingRTK'
import { handleAppSetting } from './redux/layout'
import { isValid } from './utility/Utils'
//
const App = () => {
  const user = useAppSelector((stats) => stats.auth.userData)
  const [loadSetting, res] = useLoadAppSettingMutation()
  const dispatch = useAppDispatch()

  //   const tabId = getTabId() === null ? 'loading' : getTabId().toString()
  //   const lastActiveTab = isLastActiveTab() === null ? 'loading' : isLastActiveTab().toString()
  //   const leader = isLeader() === null ? 'loading' : isLeader().toString()

//   SKIP_PREFLIGHT_CHECK=true
// VITE_BASE_URL=/pact
// VITE_API_URL=cpcl.pivot.kpmg.com/pactapi/public
// VITE_SSL=true


  useEffect(() => {
    loadSetting({})
  }, [])

  useEffect(() => {
    if (res.isSuccess) {
      const data = res.data?.data
      if (data !== undefined) {
        dispatch(handleAppSetting(data))
      }
    }
  }, [res])

  return (
    <Suspense fallback={null}>
      <UpdateViewProfile data={{ ...user }} />
      <ChangePassword data={{ ...user }} />
      <Router />
    </Suspense>
  )
}

export default App
