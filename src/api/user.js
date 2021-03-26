// 用户请求模块
import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data
  })
}

export const getCodeSms = (mobile) => {
  return request({
    url: '/v1_0/sms/codes/' + mobile,
    method: 'get'
  })
}
