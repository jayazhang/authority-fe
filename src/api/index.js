const api = {
  Login: '/admin/login',
  Logout: '/admin/logout',
  Info: '/admin/personal/info',
  PermissionList: '/admin/personal/operatePermissionList',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  Routers: '/admin/menu/list'
}
export default api
