import Hilo from 'hilojs'
const Hand = Hilo.Class.create({
    Extends: Hilo.Container,
    img: null, // 手图片
    catchEle: null, // 碰撞元素
    score: null, // 分数
    constructor(properties) {
        Hand.superclass.constructor.call(this, properties)
        this.initHand()
        this.initCatch()
    },
    // 初始化接币人物
    initHand() {
        new Hilo.Bitmap({
            id: 'hand',
            image: this.img,
            rect: [0, 0, this.img.width, this.img.height]
        }).addTo(this)
    },
    // 初始化碰撞元素，因接币人物有外边沿，不好作为碰撞检测盒子
    initCatch() {
        this.catchEle = new Hilo.Bitmap({
            id: 'catch',
            background: 'rgb(0,0,0)', // 为了看效果
            rect: [0, 0, 80, 10],
            x: 45,
            y: 20
        }).addTo(this)
    },
    // 碰撞检测
    checkCollision(ele) {
        if(ele.hitTestObject(this.catchEle, true)) {
            return true
        }
        return false
    }
})
export default Hand
