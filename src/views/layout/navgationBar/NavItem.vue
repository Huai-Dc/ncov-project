<template>
    <div class="nav-item">
        <template v-for="(item, index) in routes" v-if="!item.hidden">
            <router-link :to="item.path + '/' +item.children[0].path" :key="index">
                <MenuItem :name="index+''">
                    <span>{{item.children[0].meta.title}}</span>
                </MenuItem>
            </router-link>
        </template>
    </div>
</template>

<script>

    export default {
        name: "nav-item",
        props: {
            routes: {
                type: Array
            }
        },
    }
</script>

<style lang="scss" scoped>
.nav-item{
    .ivu-menu-item{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
    }
    .ivu-menu-item-active, .ivu-menu-item:hover{
        color: #10aeb5;
        border-bottom: 2px solid #10aeb5;
    }
}
</style>