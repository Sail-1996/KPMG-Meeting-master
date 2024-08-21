// ** Api Endpoints
// const domain = 'meeting-api.gofactz.com'
// const domain = 'demo-meeting-api.gofactz.com'
// const domain = 'demo-meeting-api.3mad.in'
const baseUrl = import.meta.env.VITE_API_URL ?? 'localhost:8000'
const enableSsl: any = import.meta.env.VITE_SSL ?? false
// const domain = enableSsl ? `http://${baseUrl}` : `http://${baseUrl}`
const domain =
    enableSsl === 'true' || enableSsl === true ? `https://${baseUrl}` : `http://${baseUrl}`

export default {
    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: 'Bearer',
    entryPoint: 'web',

    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: 'kpmg-meeting-notes-token',
    storageRefreshTokenKeyName: 'kpmg-meeting-notes-token-refresh',
    storageUserData: 'kpmg-meeting-notes-userdata',

    // base api urls
    baseUrl: `${domain}/api/`,
    baseUrl2: `${domain}/`,
    baseUrl3: `${domain}`,

    enableSocket: false,
    socketChatUrl: `ws://${baseUrl}:8090`,

    socketNotificationUrl: baseUrl,
    socketNotificationPort: 6001,

    encryptKey: 'test key',
    enableAES: true
}
