<template>
    <div id="app">
        <coinPage />
    </div>
</template>

<script>
import coinPage from './components/coinPage.vue'

export default {
    name: 'App',
    components: {
        coinPage
    },
    created() {
        var flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
        console.log(Boolean(flag))
        if (!flag) {
            alert('请切换到移动端模式体验')
        }
    }
}
</script>

<style>
#app {
    font-size: 0.24rem;
}
* {
    padding: 0;
    margin: 0;
}
</style>
