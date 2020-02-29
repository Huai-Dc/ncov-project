<template>
    <Menu mode="horizontal" theme="light" :active-name="currentTab" class="layout-nav" @on-select="selectTab">
        <NavItem :routes="routers"></NavItem>
    </Menu>
</template>

<script>
    import { mapGetters } from 'vuex'
    import NavItem from './NavItem';
    export default {
        name: "index",
        components: {
            NavItem
        },
        data(){
            return {
                active: null
            }
        },
        computed: {
            ...mapGetters([
                'routers', "currentTab"
            ])
        },
        mounted(){

        },
        methods: {
            selectTab(name){
                this.$store.dispatch("changeTab", name)
            }
        }
    }
</script>

<style scoped>

</style>