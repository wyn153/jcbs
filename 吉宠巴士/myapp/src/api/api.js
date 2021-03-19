// 发送具体的请求
// 导入需要使用模块
import http from './http'
import {
    nowPlayingListUrl,
    comingSoonListUrl,
    moiveDetailUrl,
    theatreUrl,
    GatewayUrl,
    cityListUrl,
    loginUrl,
    centerUrl
} from '@/config/url.js'





export const GatewayData = (cityId) => {
    http.defaults.headers.info = "banners";
    http.defaults.headers.authorization = ""
    return http.get(GatewayUrl + cityId)
}
// 地理位置数据
// export const locationData = () => {
//     http.defaults.headers.info = "";
//     return http.get(locationUrl)
// }
// 城市列表数据
export const cityListData = async () => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "city";
    let ret = await http.get(cityListUrl);
    let cities = ret.data.data.cities;
    let codeList = []//'A','B','C',....(完整的26个字母)
    let dataList = []//城市信息
    let indexList = []//A','B','C',....(进过筛选的字母)
    // for循环生成26个字母
    for (let i = 65; i <= 90; i++) {
        codeList.push(String.fromCharCode(i))
    }

    codeList.forEach((element) => {
        // 与城市信息的pinyin字段进行对比，如果符合则留下大写字母
        let tempArr = cities.filter((item) => element.toLowerCase() == item.pinyin.substr(0, 1))
        if (tempArr.length > 0) {
            indexList.push(element)
            dataList.push({
                index: element,
                data: tempArr,
            })
        }
    })
    // 返回数据
    return Promise.resolve([dataList, indexList])

}

