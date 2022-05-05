<template>
    <div class="hilo-page" ref="hiloEle">
        <div class="gameInfo">
            <div class="score">分数：{{score}}</div>
            <div class="time">剩余时间：{{gameTime}}s</div>
        </div>
        <div class="dialog-end" v-show="showEnd" @click="closeDialog">
            <p>你本次游戏：{{score}}分</p>
        </div>
    </div>
</template>
<script>
import Game from '../assets/js/Game'
export default {
    name: '',
    data() {
        return {
            showEnd: false,
            showCount: false,
            game: new Game()
        }
    },
    mounted() {
        this.initGame()
    },
    methods: {
        initGame() {
            this.game.pageEle = this.$refs.hiloEle
            this.game.init()
        },
        closeDialog() {
            this.showEnd = false
        }
    },
    watch: {
        gameStatus(status) {
            console.log(status)
            if (status === 'play') {
                this.showCount = true
                this.showEnd = false
            } else if (status === 'end' || status === 'bomb') {
                this.showCount = false
                this.showEnd = true
            } else {
                this.showCount = false
                this.showEnd = false
            }
        }
    },
    computed: {
        // 游戏分数
        score() {
            return this.game.score
        },
        // 游戏时间
        gameTime() {
            return this.game.gameTime
        },
        // 游戏状态
        gameStatus() {
            return this.game.gameStatus
        }
    }
}
</script>
<style scoped lang='stylus'>
.hilo-page
    position relative

.gameInfo
    position absolute
    top .2rem
    left .2rem
    z-index 2
    font-size .3rem
    line-height 1.5

.dialog-end
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    background rgba(0,0,0,.8)
    z-index 3
    p
        position absolute
        width 6rem
        left 50%
        top 50%
        transform: translate(-50%, -50%)
        background #fff
        font-size .4rem
        text-align: center
</style>
