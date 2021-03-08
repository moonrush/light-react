import { useCallback, useEffect, useState } from 'react'

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
    // if (isNaN(ori)) {
    //     return false
    // }
    // if (ori === 180 || ori === 0) {
    //     return false
    // }    
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
    isNeedRotate
}