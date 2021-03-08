import createjs from 'createjs-cmd'

/**
 * 构建可移动缩放的地图
 * @param {*} opt 
 */
const SMap = function (opt) {
    const _ = this
    _.stage = opt.stage                 // 舞台对象
    _.canvas = opt.stage.canvas         // canvas Node
    _.bgColor = opt.bgColor || '#eee'   // 默认背景颜色
    _.width = opt.width || 500          // 宽度
    _.height = opt.height || 550        // 高度
    _.maxScale = opt.maxScale || 2      // 最大放大倍率
    _.minScale = opt.minScale || 0.5    // 最校放大倍率

    let ctr = new createjs.Container()

    _.bg = new createjs.Shape(
        new createjs.Graphics().f(_.bgColor).dr(0, 0, _.width, _.height)
    )

    // 初始化位置和缩放大小
    ctr.scale = 1
    ctr.width = _.width
    ctr.height = _.height
    ctr.x = (_.canvas.width - _.width) / 2 * ctr.scale
    ctr.y = (_.canvas.height - _.height) / 2 * ctr.scale

    // 初始化辅助值
    _.oldDis = _.oldCent = 0
    _.oldX = _.oldY = 0


    /**
     * 计算两个点之间的距离和中点
     * @param {*} t1 
     * @param {*} t2 
     * @returns 
     */
    _._calFinger = (t1, t2) => {
        let dis = Math.sqrt(
            Math.pow(t1.clientX - t2.clientX, 2) +
            Math.pow(t1.clientY - t2.clientY, 2)
        )
        let cent = {
            x: (t1.clientX + t2.clientX) / 2,
            y: (t1.clientY + t2.clientY) / 2
        }
        return [dis, cent]
    }

    /**
     * 设置container缩放倍率
     * @param {*}} s 
     * @param {*} rate 
     */
    _._setScale = (s, rate = 0.05) => {
        // 设置速率
        s = rate * s + (1 - rate)

        let scale = Math.max(Math.min(_.maxScale, s * ctr.scale), _.minScale)

        ctr.width = _.width * scale
        ctr.height = _.height * scale

        ctr.x = _.oldCent.x - (_.oldCent.x - ctr.x) * scale / ctr.scale
        ctr.y = _.oldCent.y - (_.oldCent.y - ctr.y) * scale / ctr.scale

        ctr.x = Math.max(Math.min(ctr.x, 0), _.canvas.width - ctr.width)
        ctr.y = Math.max(Math.min(ctr.y, 0), _.canvas.height - ctr.height)

        ctr.scale = ctr.scaleX = ctr.scaleY = scale
    }

    /**
     * 计算手指移动距离
     * @returns 
     */
    _._calMove = () => {
        let x = _.stage.mouseX - _.oldX
        let y = _.stage.mouseY - _.oldY

        _.oldX = _.stage.mouseX
        _.oldY = _.stage.mouseY
        return [x, y]
    }

    /**
     * 按下触发事件
     * @param {*} e 
     * @returns 
     */
    _._smapMousedown = (e) => {
        let ts = e.nativeEvent.touches
        if (ts.length >= 2) {
            [_.oldDis, _.oldCent] = _._calFinger(ts[0], ts[1])
            return true
        }
        [_.oldX, _.oldY] = [_.stage.mouseX, _.stage.mouseY]
    }

    /**
     * 移动触发事件
     * @param {*} e 
     * @returns 
     */
    _._smapPressmove = (e) => {
        // multi-operate
        let ts = e.nativeEvent.touches
        if (ts.length >= 2) {
            let [newDis, newCent] = _._calFinger(ts[0], ts[1])
            _._setScale(newDis / _.oldDis)
            return true
        }

        // calculate move x,y
        let [moveX, moveY] = _._calMove()

        // set x,y
        ctr.x = Math.max(Math.min(ctr.x + moveX, 0), _.canvas.width - ctr.width)
        ctr.y = Math.max(Math.min(ctr.y + moveY, 0), _.canvas.height - ctr.height)
    }

    ctr.addEventListener('mousedown', _._smapMousedown)
    ctr.addEventListener('pressmove', _._smapPressmove)

    ctr.addChild(_.bg)

    return ctr
}

/**
 * 绘制不规则图形
 * @param {*} opt
 *  x,y 相对于全画布的位置，通常是底图container
 */
const Irreg = function (opt) {
    const _ = this
    _.x = opt.x || 0
    _.y = opt.y || 0
    _.s = opt.s || '#000'
    _.f = opt.f || '#fff'
    _.p = opt.p || ''

    let ire = new createjs.Shape(
        new createjs.Graphics().s(_.s).f(_.f).p(_.p)
    )
    ire.setTransform(_.x, _.y)

    return ire
}

export {
    SMap,
    Irreg
}