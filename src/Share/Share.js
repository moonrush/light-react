import './Share.css'
import { withRouter } from "react-router-dom"
import html2canvas from 'html2canvas'
import { Avatar } from 'antd';
import { useEffect, useState } from 'react';

function Share(props) {
    const [name, setName] = useState()
    const [src, setSrc] = useState()
    const [count, setCount] = useState()

    const countInfo = () => {
        let count = 30

        return count
    }

    const userInfo = () => {
        let name = 'Finn的草剑'
        let src = 'img/share-avatar.png'

        // TODO 实际获取用户的数据

        return [name, src]
    }

    const closePic = () => {
        document.querySelector('.screen').style.display = 'none'
        document.querySelector('.Share').removeEventListener('click', closePic)
    }

    const screenClip = () => {
        html2canvas(document.querySelector('.Share-part'), { scale: 1, logging: false, useCORS: true }).
            then(function (canvas) {
                let dataUrl = canvas.toDataURL();

                let img = new Image()
                img.src = dataUrl
                img.style.width = '100%'
                img.style.height = '100%'

                let screen = document.querySelector('.screen')
                screen.innerHTML = ''
                screen.append(img)
                screen.style.display = 'block'
            })
        document.querySelector('.Share').addEventListener('click', closePic)
    }

    useEffect(() => {
        let [name, src] = userInfo()
        let count = countInfo()
        setName(name)
        setSrc(src)
        setCount(count)
    }, [])

    return (
        <div className="Share">
            <div className="Share-part">
                <div className="Share-background">
                    <img src="img/share-bj.jpg" width="100%" height="100%" />
                </div>

                <div className="Share-title">
                    <div className="avatar">
                        <Avatar size="large" src={src} />
                        <p>{name}</p>
                    </div>
                    <div className="msg">
                        <p>您是全国第{count}位</p>
                        <p className="point">红色助力官</p>
                    </div>
                </div>
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

            {/* <div className="Share-right">
                <p>新华社</p>
                <p>中国地图出版集团</p>
            </div> */}

            <div className="screen"></div>
        </div>
    )
}

export default withRouter(Share)