import Hilo from 'hilojs'
const GoldBasics = Hilo.Class.create({
    // 指定要继承的父类。
    Extends: Hilo.Bitmap,
    constructor: function(properties) {
        // superclass：该类的父类
        GoldBasics.superclass.constructor.call(this, properties)
        // 定时器刷新页面，更新元素
        this.onUpdate = this.onUpdate.bind(this)
    },
    // 用于碰撞后执行，移除该元素
    over() {
        this.removeFromParent()
    },
    onUpdate() {
        // 如果该元素的y值，大于屏幕的高度，则从父容器里删除此对象
        if(this.parent.height < this.y) {
            this.removeFromParent()
        }
    }
})
export default GoldBasics
