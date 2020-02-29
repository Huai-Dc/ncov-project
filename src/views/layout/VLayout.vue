<template>
    <Layout>
        <!-- 头部 -->
        <Affix style="width: 100%">
            <div class="dark-background"></div>
            <div class="white-background"></div>
            <Header>
                <VHeader></VHeader>
            </Header>
        </Affix>

        <!-- 内容主体 -->
        <Content>
            <MainContent></MainContent>
        </Content>

        <!-- 页脚 -->
        <VFooter/>
    </Layout>
</template>

<script>
    import { VHeader, VFooter, MainContent } from './index'
    export default {
        name: "v-layout",
        components: {
            VHeader, VFooter, MainContent
        }
    }
</script>

<style lang="scss" scoped>
    .dark-background{
        background-color: #222222;
        height: 60px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
    }
    .white-background{
        background-color: #ffffff;
        height: 50px;
        width: 100%;
        position: fixed;
        top: 60px;
        left: 0;
    }
</style>
