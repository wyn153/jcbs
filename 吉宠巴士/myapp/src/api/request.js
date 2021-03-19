// import axios from "axios"
import axios from '@/tools/index.js'
export function getBanner () {
  return axios.get('/banner')
}
export function getKind () {
  return axios.get('/pro/kind')
}
export function getPageDate (num,index ) {
  return axios.get(`/pro/page?num=${num}&index=${index}`)
}
export function getData(id){
    return axios.get(`/pro/detail?id=${id}`)
}
export function sendSms(tel){
    return axios.get(`/user/send?tel=${tel}`)
}
export function register(ops){
    return axios.post(`/user/register`,ops)
}
export function login(ops){
    return axios.get(`/user/login`,{params:ops})
}
export function cartAdd(ops){
    return axios.post(`/cart/add`,ops)
}
export function cartGet(ops){
    return axios.get(`/cart`,{params:ops})
}
export function numSet(ops){
    return axios.post(`/cart/num`,ops)
}
export function delCart(ops){
    return axios.post(`/cart/del`,ops)
}
export function flagSet(ops){
    return axios.post(`/cart/flag`,ops)
}
export function allFlagSet(ops){
    return axios.post(`/cart/allFlag`,ops)
}
export function searchResult(ops){
    return axios.get(`/pro/search`,{params:ops})
}
export function allProData(){
    return axios.get(`/pro`)
}
export function addOrder(ops){
    return axios.post(`/order/add`,ops)
}
export function getOrder(ops){
    return axios.get(`/order`,{params:ops})
}
export function getHistorySearch(ops){
    return axios.get(`/search`,{params:ops})
}
export function addHistorySearch(ops){
    return axios.post(`/search/add`,ops)
}
export function delHistorySearch(ops){
    return axios.post(`/search/del`,ops)
}
export function proSort(ops){
    return axios.get(`/pro/sort`,{params:ops})
}
export function setAvatar(ops){
    return axios.post(`/user/avatar`,ops)
}
export function getUser(ops){
    return axios.get(`/user/msg`,{params:ops})
}
// export function getDetailData(ops){
//     return axios.get(`/pro/detail`,{params:ops})
// }