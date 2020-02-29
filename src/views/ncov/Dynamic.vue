<template>
    <div class="dynamic-content">
        <div class="update-date">更新至 {{updateDate}} 全国数据统计</div>
        <div class="ncov-info-panel" v-if="summaryData">
            <div class="panel-item">
                <span class="float-data">较昨日<span style="color: rgb(247, 76, 49)">{{summaryData.currentConfirmedIncr}}</span></span>
                <span class="main-count" style="color: rgb(247, 76, 49)">{{summaryData.currentConfirmedCount}}</span>
                <span class="count-title">现存确诊</span>
            </div>
            <!--<div class="panel-item">-->
                <!--<span class="float-data">较昨日<span style="color: rgb(247, 130, 7)">-2564</span></span>-->
                <!--<span class="main-count" style="color: rgb(247, 130, 7)">{{summaryData.suspectedCount}}</span>-->
                <!--<span class="count-title">现存疑似</span>-->
            <!--</div>-->
            <!--<div class="panel-item">-->
                <!--<span class="float-data">较昨日<span style="color: rgb(162, 90, 78)">-2564</span></span>-->
                <!--<span class="main-count" style="color: rgb(162, 90, 78)">37393</span>-->
                <!--<span class="count-title">现存重症</span>-->
            <!--</div>-->
            <div class="panel-item">
                <span class="float-data">较昨日<span style="color: rgb(174, 33, 44)">{{summaryData.confirmedIncr}}</span></span>
                <span class="main-count" style="color: rgb(174, 33, 44)">{{summaryData.confirmedCount}}</span>
                <span class="count-title">累计确诊</span>
            </div>
            <div class="panel-item">
                <span class="float-data">较昨日<span style="color: rgb(93, 112, 146)">{{summaryData.deadIncr}}</span></span>
                <span class="main-count" style="color: rgb(93, 112, 146)">{{summaryData.deadCount}}</span>
                <span class="count-title">累计死亡</span>
            </div>
            <div class="panel-item">
                <span class="float-data">较昨日<span style="color: rgb(40, 183, 163)">{{summaryData.curedIncr}}</span></span>
                <span class="main-count" style="color: rgb(40, 183, 163)">{{summaryData.curedCount}}</span>
                <span class="count-title">累计治愈</span>
            </div>

            <!--<Poptip word-wrap width="200" content="数据说明">-->
                <!--<Button>Long Content</Button>-->
            <!--</Poptip>-->
        </div>
        <div class="button-group">
            <div @click="changeTab('confirmedCount')" :class="{active:currentActive == 'confirmedCount'}">累计确诊</div>
            <div @click="changeTab('currentConfirmedCount')" :class="{active:currentActive == 'currentConfirmedCount'}">现有确诊</div>
            <!--<div @click="changeTab('currentConfirmedIncr')" :class="{active:currentActive == 'currentConfirmedIncr'}">每日确诊</div>-->
        </div>
        <div class="map-canvas" ref="chartCanvas">
        </div>
    </div>
</template>

<script>
    import {formatTimeToStr} from "../../utils/date";
    import * as ECharts from "echarts";
    import '../../assets/mapGeo/china'
    import {mapGetters} from "vuex";

    export default {
        name: "dynamic",
        data() {
            return {
                updateDate: '',
                currentData: [],
                currentActive: 'confirmedCount', // currentConfirmed  confirmed  daysConfirmed
                summaryInfo: {},
                provinceName: ["新疆", "西藏", "青海", "甘肃", "宁夏", "云南", "贵州", "广西", "海南", "福建", "台湾", "上海", "陕西", "河南", "山西", "河北", "天津", "内蒙古", "辽宁", "吉林", "黑龙江", "山东", "北京", "江苏", "安徽", "浙江", "江西", "湖南", "广东", "重庆", "四川", "湖北", "香港", "澳门"]
            }
        },
        watch: {
            emergencyData(curval, oldval){
                this.currentData = [{
                    name: "南海诸岛",
                    value: 0
                }]
                let newArray = this.getDataByType("confirmedCount");

                this.currentData = this.currentData.concat(newArray)

                this.initNcovMap()
            }
        },
        computed: {
            ...mapGetters([
                "summaryData", "emergencyData"
            ])
        },
        mounted() {
            this.initUpdateDate()
            setTimeout(()=>{
                this.changeTab('confirmedCount');
            }, 100);

        },
        methods: {
            getDataByType(type){
                return this.emergencyData.map((item, index) => {
                    let name = this.provinceName[this.provinceName.indexOf(item.name.replace(/市/,"").replace(/省/,"").replace(/自治区/,"").replace(/回族/,"").replace(/维吾尔/,"").replace(/壮族/,""))]
                    return {
                        name: name,
                        value: item.emergencyData[type] // confirmedCount 累积确诊
                    }
                })
            },
            changeTab(type){
                this.currentActive = type

                this.currentData = [{
                    name: "南海诸岛",
                    value: 0
                }]
                let newArray = this.getDataByType(type);

                this.currentData = this.currentData.concat(newArray)

                this.initNcovMap()
            },
            initUpdateDate() {
                let now = new Date();
                this.updateDate = formatTimeToStr(now);
            },
            initNcovMap() {
                this.mapChart = ECharts.init(this.$refs.chartCanvas);
                let that = this;
                this.mapChart.setOption({
                    tooltip: {
                        triggerOn: "click",
                        formatter: function (e, t, n) {
                            return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
                        }
                    },
                    visualMap: {
                        calculable: true,
                        showLabel: true,
                        right: '15%',
                        bottom: '20%',
                        show: true,
                        type: 'piecewise',
                        text: ["确诊病例"],
                        pieces: [
                            {
                                gte: 10000,
                                label: ">= 10000",
                                color: "#660208"
                            }, {
                                gte: 1000,
                                lte: 9999,
                                label: "1000-9999",
                                color: "#8c0d0d"
                            }, {
                                gte: 500,
                                lte: 999,
                                label: "100-999",
                                color: "#cc2929"
                            }, {
                                gte: 100,
                                lte: 499,
                                label: "100-999",
                                color: "#cc2929"
                            }, {
                                gte: 10,
                                lte: 99,
                                label: "10-99",
                                color: "#ff7b69"
                            }, {
                                gte: 1,
                                lte: 9,
                                label: "1-9",
                                color: "#ffaa85"
                            }, {
                                value: 0,
                                color: "#ffffff"
                            }],
                    },
                    geo: {
                        map: "china",
                        roam: !1,
                        scaleLimit: {
                            min: 1,
                            max: 2
                        },
                        zoom: 1.23,
                        top: 70,
                        label: {
                            normal: {
                                show: !0,
                                fontSize: "14",
                                color: "rgba(0,0,0,0.7)"
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0, 0, 0, 0.2)"
                            },
                            emphasis: {
                                areaColor: "#f2d5ad",
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                borderWidth: 0
                            }
                        }
                    },
                    series: [{
                        name: "确诊病例",
                        type: "map",
                        geoIndex: 0,
                        data: that.currentData
                    }]
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dynamic-content {
        padding: 0 25px;
        box-sizing: border-box;
        .update-date {
            text-align: left;
            color: #b7b7b7;
            padding: 5px 8px;
        }
        .ncov-info-panel{
            display: flex;
            flex-direction: row;
            .panel-item{
                border: 1px solid #ebebeb;
                padding: 5px;
                border-radius: 4px;
                margin-right: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .float-data{
                    font-size: 10px;
                }
                .main-count{
                    font-size: 20px;
                    font-weight: bolder;
                }
                .count-title{
                    font-size: 12px;
                }
            }
        }

        .button-group{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 10px auto;
            >div{
                border: 1px solid #ebebeb;
                padding: 5px;
                border-radius: 4px;
                margin-right: 10px;
                cursor: pointer;
            }
            .active{
                background-color: #10aeb5;
                color: white;
            }
        }

        .map-canvas {
            width: 100%;
            height: 700px;
        }
    }
</style>