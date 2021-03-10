import './Home.css'
import { withRouter } from "react-router-dom"
import { useEffect } from 'react'
import { wxAuthorize } from '../lib/util'


function Home(props) {
    const go = () => {
        props.history.push('/play')
    }

    useEffect(() => {
        // 进行用户授权
        let wxuserinfo = JSON.parse(localStorage.getItem('wxuserinfo')) || {}
        if (!wxuserinfo.nickname) {
            wxAuthorize()
        }
    }, [])

    return (
        <div className="Home">
            <div className="Home-background">
                <img src="img/index-bg.jpg" width="100%" height="100%" />
            </div>
            <div className="Home-title">
                {/* 百年党史、点亮家乡 */}
            </div>
            <div className="Home-go">
                <div className="Home-go-btn" onClick={go}>
                    <img src="img/index-btn.png" width="100%" />
                </div>
            </div>
            <div className="Home-link">
                <div className="Home-link-btn">
                    百年视频
                </div>
                <div className="Home-link-btn">
                    挑战答题
                </div>
            </div>
            {/* <div className="Home-right">
                <p>新华社</p>
                <p>中国地图出版集团</p>
            </div> */}
        </div>
    )
}

export default withRouter(Home)