<template>
    <div class="layout-header-content">
        <div class="herder-title">
            <span class="main-title">疫情分级指挥系统</span>
            <span class="pre-title">蒙正智库大数据报告</span>
        </div>

        <NavigationBar></NavigationBar>

        <Select v-if="provinces.length>0 && currentTab==1" v-model="currentProvince" style="width:100px" @on-change="changeProvince">
            <Option v-for="item in provinces" :value="item" :key="item">{{ item }}</Option>
        </Select>
    </div>
</template>

<script>
    import NavigationBar from './navgationBar/Index'
    import {mapGetters} from "vuex";
    export default {
        name: "v-header",
        components: {
            NavigationBar
        },
        data(){
            return {
                currentProvince: "",
                provinces: []
            }
        },
        computed: {
            ...mapGetters([
                'routers', "currentTab"
            ])
        },
        mounted(){
            this.getBaseData();
            this.$store.dispatch("changeProvince", "湖北省").then(res=>{
                this.currentProvince = "湖北省"
            });


            if(this.$route.name == "simulation"){
                this.$store.dispatch("changeTab", "1")
            }
        },
        methods: {
            getBaseData(){
                this.$http.get(this.$apis.baseHost + this.$apis.getBaseParamColection,{timestamp: Math.random()})
                    .then(res => {
                        if(res.data.code == 1){
                            let data = res.data.data;
                            this.provinces = data.provinceData;

                            this.$store.dispatch("initSummaryData", data.summaryData)
                            this.$store.dispatch("initEmergencyData", data.emergencyData)
                        }
                    })
            },
            changeProvince(value){
                this.$store.dispatch("changeProvince", value);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
