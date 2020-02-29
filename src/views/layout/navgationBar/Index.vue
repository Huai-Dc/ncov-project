<template>
    <Menu mode="horizontal" theme="light" :active-name="active" class="layout-nav">
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
                'routers'
            ])
        },
        mounted(){
            this.active = "1"
        }
    }
</script>

<style scoped>

</style>