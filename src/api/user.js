import request from '@/utils/request'

export const GetApi = () => request.get('/my/userinfo')

export const UpdateAvatarApi = (avatar) => request.patch('/my/update/avatar', { avatar })

export const UpdateInfoApi = (data) => request.put('/my/userinfo', data)

export const UpdatePassApi = (data) => request.patch('/my/updatepwd', data)
