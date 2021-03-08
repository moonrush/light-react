import './App.css'
import createjs from 'createjs-cmd'
import { useEffect, useState } from 'react'
import { GetSizeFunc, isNeedRotate } from '../lib/util'
import ReactDom from 'react-dom'
import map from '../datas/map'
import area from '../datas/area'
import { SMap, Irreg } from '../lib/easy-create'
import { notification, Button } from 'antd'



function App(props) {
    let size = GetSizeFunc()

    const [canvas, setCanvas] = useState()
    const [stage, setStage] = useState()
    const [loader, setLoader] = useState()

    const skip = (key) => {
        props.history.push(`/share?id=${key}`)
    }

    const openNotification = (key, name, msg) => {
        const btn = (
            <Button type="primary" size="small" onClick={() => skip(key)}>
                点亮它
            </Button>
        )
        notification.open({
            message: name,
            description: msg,
            btn,
            key,
            placement: 'bottomRight'
        })
    }

    const tick = () => {
        stage.update()
    }

    /**
     * 资源已加载，绘制图形
     */
    const loaded = () => {
        let ctr = new SMap(map)
        let bg = new createjs.Bitmap(loader.getResult('bg'))
        ctr.addChild(bg)

        area.forEach(item => {
            let ire = new Irreg({ p: item.p, x: item.x, y: item.y })
            ire.addEventListener('click', () => {
                openNotification(item.id, item.name, item.msg)
            })
            ctr.addChild(ire)
        })

        window.ctr = ctr
        stage.addChild(ctr)
    }

    /**
     * 只执行一次
     */
    useEffect(() => {
        setCanvas(ReactDom.findDOMNode(
            document.querySelector('.stage')
        ))
    }, [])

    useEffect(() => {
        if (canvas) {
            setStage(new createjs.Stage(canvas))
        }        
    }, [canvas])

    useEffect(() => {
        if (stage) {
            createjs.Touch.enable(stage, false, true)
            setLoader(new createjs.LoadQueue(false))
        }
    }, [stage])

    useEffect(() => {
        if (loader) {
            loader.loadManifest([{
                src: 'img/bg.jpg',
                id: 'bg'
            }], true)

            loader.addEventListener('complete', loaded)
            map.stage = stage

            createjs.Ticker.timingMode = createjs.Ticker.RAF
            createjs.Ticker.addEventListener('tick', tick)
        }
    }, [loader])


    return (
        <div className="App">
            <canvas className="stage" width={isNeedRotate() ? size.height : size.width} height={isNeedRotate() ? size.width : size.height}
                style={isNeedRotate() ? { transform: `matrix(0,-1,1,0,0,${-Math.abs((size.height - size.width) / 2)})` } : {}}></canvas>
        </div>
    )
}

export default App