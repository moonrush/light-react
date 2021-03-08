import './Home.css'
import { withRouter } from "react-router-dom"

function Home(props) {
    const go = () => {
        props.history.push('/play')
    }
    return (
        <div className="Home">
            <div className="Home-background">
            </div>
            <div className="Home-title">
                百年党史、点亮家乡
            </div>
            <div className="Home-go">
                <div className="Home-go-btn" onClick={go}>
                    马上去点亮
                </div>
            </div>
            <div className="Home-link">
                <div className="Home-link-btn">
                    百年视频
                </div>
                <div className="Home-link-btn">
                    挑战答题
                </div>
                <div className="Home-link-btn">
                    红色足迹
                </div>
            </div>
            <div className="Home-right">
                <p>新华社</p>
                <p>中国地图出版集团</p>
            </div>
        </div>
    )
}

export default withRouter(Home)