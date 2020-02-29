<template>
    <div class="simulation-content">
        <Alert class="simulation-tips" type="warning" show-icon>疫情整体预测：预计湖北省疫情4月底将得到全面控制，估算感染总人数将达到70000人。根据现在湖北省的治愈率进行拟合，6月初才能完成所有感染人员的治疗。</Alert>
        <div class="simulation-charts">
            <div class="chart-tab">
                <div @click="changeTab('confirmedCount')" :class="{active:active=='confirmedCount'}">累计确诊</div>
                <div @click="changeTab('currentConfirmedCount')" :class="{active:active=='currentConfirmedCount'}">当前确诊</div>
                <div @click="changeTab('confirmedIncr')" :class="{active:active=='confirmedIncr'}">累积确诊新增</div>
            </div>
            <div class="chart-canvas" ref="chartCanvas"></div>
        </div>
        <div class="simulation-model">
            <h4>D_SEIR模型</h4>
            <div class="model-list">
                <div class="model-item" v-for="(item, index) in model" :key="index">
                    <div class="item-title">{{item.title}}</div>
                    <div class="item-params">
                        <p v-for="(param, itemIndex) in item.params" :key="itemIndex">{{param}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as ECharts from "echarts";
    import {mapGetters} from "vuex";
    require('echarts/theme/shine');

    export default {
        name: "simulation",
        data(){
            return {
                active: "",
                nameGroup: ['累计确诊', '模拟累计确诊'],
                model: [
                    {
                        title: "参数：",
                        params: ["S：易感染人群","E：潜伏人群","I：感染人群","R：治愈人群及死亡人群","N：总人数（全省总人口）","R0：基本生殖数（代表一个潜伏或者感染人群治愈前可以感染多少人；随各省政策进行时间变化，例如戴口罩，小区隔离会降低R0）",
                            "De：平均潜伏期（针对人员进行排查会提前监测出潜伏人员，De会减小）","O：平均武汉人流量","Nw：武汉总人口","Nc,w:全国进入武汉平均人流量","γ1：死亡率（每个省不一样）：γ2：治愈率(随时间进行函数拟合变化)"]
                    },
                    {
                        title: "湖北模式公式：",
                        params: ["∂E/∂t=S(t)/N*R0/De*E(t)-E(t)/De-O/Nw*E(t)","∂I/∂t=E(t)/De-I(t)*(γ1+γ2)", "∂R/∂t=I(t)*(γ1+γ2)", "∂S/∂t=-S(t)/N*R0/De*E(t)+Nc,w-O/Nw*S(t)"]
                    },
                    {
                        title: "其他省份公式：",
                        params: ["∂E/∂t=S(t)/N*R0/De*E(t)-E(t)/De+O/Nw*Ew(t)", "∂I/∂t=E(t)/De-I(t)*(γ1+γ2)", "∂R/∂t=I(t)*(γ1+γ2)", "∂S/∂t=-S(t)/N*R0/De*E(t)"]
                    }
                ]
            }
        },
        watch: {
            province(curval, oldval){
                if(curval != oldval){
                    this.changeTab();
                }
            }
        },
        computed: {
            ...mapGetters([
                "province", "simulationType"
            ])
        },
        mounted(){
            this.initLintChart()
        },
        methods: {
            changeTab(type){
                if(!type){
                    type = this.simulationType
                }
                let that = this;
                this.active = type;
                this.$store.dispatch("changeSimulationType", type).then(res => {});
                switch(type){
                    case "confirmedCount":
                        that.nameGroup=['累计确诊', '模拟累计确诊']
                        break;
                    case "currentConfirmedCount":
                        that.nameGroup=['当前确诊', '模拟当前确诊']
                        break;
                    case "confirmedIncr":
                        that.nameGroup=['累计确诊新增', '模拟累计确诊新增']
                        break;
                    default:
                        that.nameGroup=['累计确诊', '模拟累计确诊']
                        break;
                }

                this.$http.get(this.$apis.baseHost + this.$apis.getProvinceSimulateTrend, {
                    provinceName: this.province,
                    typeName: type
                }).then( res => {
                    if(res.data.code == 1){
                        let data = res.data.data;

                        this.lineChart.setOption({
                            legend: {
                                data: that.nameGroup
                            },
                            xAxis: {
                                data: data.category
                            },
                            series: [{
                                // 根据名字对应到相应的系列
                                name: that.nameGroup[0],
                                data: data.history
                            },
                                {
                                    // 根据名字对应到相应的系列
                                    name: that.nameGroup[1],
                                    data: data.simulate
                                }
                            ]
                        });
                    }
                })
            },
            initLintChart(){
                this.lineChart = ECharts.init(this.$refs.chartCanvas, 'shine');
                let that = this;
                this.lineChart.setOption({
                    backgroundColor: '#ffffff',
                    tooltip: {
                        trigger: "item",
                        formatter: "{a} <br/>{b} : {c}例"
                    },
                    grid: {
                        left: 10,
                        right: 10,
                        bottom: '3%',
                        containLabel: true
                    },
                    legend: {
                        data: that.nameGroup
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {
                        type: 'value',

                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: [{
                        name: that.nameGroup[0],
                        type: 'line',
                        data: []
                    },
                        {
                            name: that.nameGroup[1],
                            type: 'line',
                            data: []
                        }]
                });

                this.changeTab()
            }
        }
    }
</script>

<style lang="scss" scoped>
.simulation-content{
    padding: 0 25px;
    box-sizing: border-box;
    .simulation-tips{
        margin: 10px 0;
        text-align: left;
    }
    .simulation-charts{
        /*margin: 0 auto;*/
        /*width: 1200px;*/
        height: 450px;
        display: flex;
        .chart-tab{
            width: 80px;
            >div{
                border: 1px solid #ebebeb;
                border-radius: 4px;
                padding: 5px 8px;
                width: 70px;
                margin-bottom: 8px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                &:hover{
                    cursor: pointer;
                }
            }
            .active{
                background-color: #10aeb5;
                color: white;
            }
        }
        .chart-canvas{
            flex: 1;
        }
    }
    .simulation-model{
        text-align: left;
        padding-bottom: 20px;
        .model-list{
            .model-item{
                margin-top: 10px;
                .item-title{
                    font-size: 14px;
                    font-weight: bolder;
                    line-height: 16px;
                }
                .item-params{
                    margin: 0 10px;
                    p{
                        text-indent: 25px;
                        font-size: 14px;
                        line-height: 25px;
                    }
                }
            }
        }
    }
}
</style>