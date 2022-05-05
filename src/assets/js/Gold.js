import Hilo from 'hilojs'
import GoldBasics from './GoldBasics'
const Gold = Hilo.Class.create({
    Extends: Hilo.Container,
    timer: null, // 定时器

    // 下落元素，如['+2分的资源内容', '+1分的资源内容', '-1的资源内容', '炸弹停止游戏的资源内容']
    dropEleArr: [],
    goldIdList: [], // 下落元素的id列表，用来生成对应的下落元素类型
    idIndex: 0, // 创建下落元素的序号

    dropSpeed: 0, // 下落速度
    createSpeed: 0, // 生成速度

    score: [2, 1, -1, 0],
    tween: null, // 提供缓动功能，设置动画
    constructor: function (properties) {
        Gold.superclass.constructor.call(this, properties)
        this.tween = Hilo.Tween
        // 因为初始速度为0，所以需要先创建第一个金币
        this.createGold()
        this.beginCreateGold()
    },
    random (lower, upper) {
        return Math.floor(Math.random() * (upper - lower + 1)) + lower
    },
    // 开始生成元素
    beginCreateGold () {
        this.timer = setInterval(() => {
            this.createGold()
        }, this.createSpeed)
    },
    // 生成下落元素
    createGold () {
        // 生成元素的类型
        let typeIndex = null
        switch (this.goldIdList[this.idIndex]) {
        case '2':
            typeIndex = 0
            break
        case 'r':
            typeIndex = 2
            break
        case '0':
            typeIndex = 3
            break
        default:
            typeIndex = 1
            break
        }

        // 分区域设置元素的下落速度
        if(this.idIndex === 10) {
            this.dropSpeed = 1000
        } else if(this.idIndex === 30) {
            this.dropSpeed = 1200
        } else if(this.idIndex === 60) {
            this.dropSpeed = 1500
        }

        // 生成元素，并添加到当前盒子里，参数为Bitmap的参数
        const currEle = this.dropEleArr[typeIndex]
        const eleIcon = new GoldBasics({
            image: currEle,
            rect: [0, 0, currEle.width, currEle.height],
            id: this.goldIdList[this.idIndex]
        }).addTo(this)
        // 设置元素的初始X值，设置元素的初始Y值
        eleIcon.x = this.random(100, (this.width - 100))
        eleIcon.y = 60
        // 当前元素的序号，当前元素对应的分值
        eleIcon.index = this.idIndex
        eleIcon.score = this.score[typeIndex]

        // 给下落元素添加动画
        this.tween.to(
            eleIcon, // 缓动对象
            { y: this.height + 200 }, // 目标属性集合
            {
                duration: 1400 / this.dropSpeed * 1000,
                loop: false,
                // 动画结束回调函数
                onComplete: () => {
                    eleIcon.removeFromParent()
                }
            }
        )
        this.idIndex++
    },
    // 停止生成并移出所有下落元素
    stopCreateGold () {
        clearInterval(this.timer)
        this.removeAllChildren()
    },
    // 碰撞检测
    checkCollision (ele) {
        // 检测object参数指定的对象是否与其相交。使用多边形碰撞检测
        for (var i = 0, len = this.children.length; i < len; i++) {
            // 检测object参数指定的对象是否与其相交。true表示使用多边形碰撞检测
            if(ele.hitTestObject(this.children[i], true)) {
                return true
            }
        }
        return false
    }
})
export default Gold
