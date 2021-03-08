import './Share.css'
import { withRouter } from "react-router-dom"
import html2canvas from 'html2canvas'

function Share(props) {
    const screenClip = () => {
        console.log(1)
        html2canvas(document.querySelector('.Share'), { scale: 1, logging: false, useCORS: true }).
            then(function (canvas) {
                let dataUrl = canvas.toDataURL();
                // console.log(dataUrl)

                let img = new Image()
                img.src = dataUrl
                img.style.width = '100%'
                img.style.height = '100%'
                // img.classList.add('show')

                let screen = document.querySelector('.screen')
                console.log(img)
                screen.append(img)
                screen.style.display = 'block'
            })
    }
    return (
        <div className="Share">
            <div className="Share-background">
            </div>

            <div className="Share-title">
                上海市
            </div>

            <div className="Share-link">
                <div className="Share-link-btn">
                    <a href="#">▶ 播放</a>
                </div>
                <div className="Share-link-btn" onClick={screenClip}>
                    生成截图
                </div>
                <div className="Share-link-btn">
                    <a href="#">点击分享</a>
                </div>
            </div>

            <div className="Share-right">
                <p>新华社</p>
                <p>中国地图出版集团</p>
            </div>

            <div className="screen"></div>
        </div>
    )
}

export default withRouter(Share)