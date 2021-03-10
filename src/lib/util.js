import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'

const appID = 'wx5beaa8eddff00c03'
const appsecret = 'a90dfcdeaa9cbe2f63da81339c2f1b7e'

const GetSizeFunc = () => {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [onResize])

    return size
}

/**
 * 判断是否需要旋转
 * @returns 
 */
const isNeedRotate = () => {
    let ori = window.orientation
    if (ori === 90 || ori === -90) {
        return true
    }
    return false
}

/**
 * 应用于createjs的实例的tap触发
 * @param {*} cinst 
 * @param {*} fn 
 */
const tap = (cinst, fn) => {
    let sp = {}
    cinst.addEventListener('mousedown', (e) => {
        sp = {
            x: e.stageX,
            y: e.stageY
        }
    })
    cinst.addEventListener('pressup', (e) => {
        let np = {
            x: e.stageX,
            y: e.stageY
        }
        if (Math.abs(np.x - sp.x) < 5
            && Math.abs(np.y - sp.y) < 5) {
            fn && fn.call(cinst, e)
        }
    })
}

// 获取url参数
const queryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 判断是否为微信浏览器
const isWxBrowser = () => {
    let ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

/**
 * 授权并返回用户数据
 */
const wxAuthorize = () => {
    // let domain = 'https://api.weixin.qq.com'
    let domain = ''
    // axios.defaults.baseURL="/api"

    if (isWxBrowser()) {
        // 如果不存在code 
        let code = queryString('code')
        if (!code) {
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appID}&redirect_uri=${window.location.href.split('#')[0]}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
        } else {
            axios.get(`${domain}/sns/oauth2/access_token?appid=${appID}&secret=${appsecret}&code=${code}&grant_type=authorization_code`)
                .then(res => {
                    console.log(res)
                    let access_token = res.data.access_token
                    let openid = res.data.openid
                    localStorage.setItem('access_token', JSON.stringify(res.data))

                    return axios.get(`${domain}/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
                })
                .catch(res => {
                    console.log(res)
                })
                .then(res => {
                    localStorage.setItem('wxuserinfo', JSON.stringify(res.data))
                    alert(res.data.nickname)
                })
        }
    }
}

// /**
//  * 判断你是否为nan
//  * @param {*} n 
//  * @returns 
//  */
//  const isNaN = n => {
//     return n !== n
// }

// const loading = () => {

// }

// const loaded = () => {

// }

// const mark = () => {

// }

// const unmark = () => {

// }

export {
    GetSizeFunc,
    isNeedRotate,
    tap,
    wxAuthorize
}