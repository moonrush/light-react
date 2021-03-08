import './App.css'
import createjs from 'createjs-cmd'
import { useEffect } from 'react'
import { GetSizeFunc } from './lib/util'
import ReactDom from 'react-dom'
import map from './datas/map'
import { SMap, Irreg } from './lib/easy-create'


function App() {
    let canvas, stage, loader
    let size = GetSizeFunc()

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

        let ire = new Irreg({ p: 'AgqCJQgPgSgHgCIgBAAQAMgHAHgOQAGgNABgQQABgLgDgUQgCgWAAgJQAAgNAEgdQAFgcgBgPIgEgqQADAFAGADQAGACAFgCIAEgiQAEgBADADQADAEABAFIACAJQABAGACACQADACAGAAQAHAAADABQAGADADAOQAEANAGACQADABAIgBQAHgBADACQAJAFgFANIgEAJIgDAKIgBAGQAAADgCACIgIADQgHACAAAPIABAaQAAASAJAFIAJAFQAEADABAJQABAcgDAZIgBAFQgSgDgWAKQgSAJgOAQIgJAIIgEABQgHAAgKgMg', x: 100, y: 100 })

        ctr.addChild(ire)

        window.ctr = ctr
        stage.addChild(ctr)
    }

    /**
     * 只执行一次
     */
    useEffect(() => {
        canvas = ReactDom.findDOMNode(
            document.querySelector('.stage')
        )
        stage = new createjs.Stage(canvas)
        createjs.Touch.enable(stage, false, true)

        loader = new createjs.LoadQueue(false)
        loader.loadManifest([{
            src: 'img/bg.jpg',
            id: 'bg'
        }], true)

        loader.addEventListener('complete', loaded)
        map.stage = stage

        createjs.Ticker.timingMode = createjs.Ticker.RAF
        createjs.Ticker.addEventListener('tick', tick)
    }, [])

    return (
        <div className="App">
            <canvas className="stage" width={Math.min(size.width, size.height)} height={Math.max(size.height, size.width)}
                style={size.width > size.height ? { transform: `matrix(0,-1,1,0,0,${-Math.abs((size.height - size.width) / 2)})` } : {}}></canvas>
        </div>
    );
}

export default App
