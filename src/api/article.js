import request from '@/utils/request.js'

export const getArticleCate = () => request.get('/my/cate/list')

export const addArticleCate = (data) => request.post('/my/cate/add', data)

export const updateArticleCate = (data) => request.put('/my/cate/info', data)

export const deleteArticleCate = (id) =>
  request.delete('/my/cate/del', {
    params: {
      id
    }
  })

export const getArticle = (data) =>
  request.get('/my/article/list', {
    params: { ...data }
  })

export const addArticle = (data) => request.post('/my/article/add', data)

export const getArticleDetail = (id) => request.get('/my/article/info', { params: { id } })

export const updataArticleDetail = (data) => request.put('/my/article/info', data)

export const delArticleDetail = (id) => request.delete('/my/article/info', { params: { id } })
