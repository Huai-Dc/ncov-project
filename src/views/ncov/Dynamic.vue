<template>
    <div class="dynamic-content">
        <div class="update-date">更新至 {{updateDate}} 全国数据统计</div>
        <div class="map-canvas" ref="chartCanvas">
        </div>
    </div>
</template>

<script>
    import {formatTimeToStr} from "../../utils/date";
    import * as ECharts from "echarts";
    import '../../assets/mapGeo/china'

    export default {
        name: "dynamic",
        data() {
            return {
                updateDate: '',
                ncovData: [{
                    name: "南海诸岛",
                    value: 0
                },
                    {
                        name: '北京',
                        value: 132
                    },
                    {
                        name: '天津',
                        value: 28
                    },
                    {
                        name: '上海',
                        value: 47
                    },
                    {
                        name: '重庆',
                        value: 148
                    },
                    {
                        name: '河北',
                        value: 31
                    },
                    {
                        name: '河南',
                        value: 89
                    },
                    {
                        name: '云南',
                        value: 15
                    },
                    {
                        name: '辽宁',
                        value: 25
                    },
                    {
                        name: '黑龙江',
                        value: 168
                    },
                    {
                        name: '湖南',
                        value: 171
                    },
                    {
                        name: '安徽',
                        value: 116
                    },
                    {
                        name: '山东',
                        value: 333
                    },
                    {
                        name: '新疆',
                        value: 21
                    },
                    {
                        name: '江苏',
                        value: 108
                    },
                    {
                        name: '浙江',
                        value: 215
                    },
                    {
                        name: '江西',
                        value: 123
                    },
                    {
                        name: '湖北',
                        value: 34681
                    },
                    {
                        name: '广西',
                        value: 78
                    },
                    {
                        name: '甘肃',
                        value: 7
                    },
                    {
                        name: '山西',
                        value: 20
                    },
                    {
                        name: '内蒙古',
                        value: 27
                    },
                    {
                        name: '陕西',
                        value: 39
                    },
                    {
                        name: '吉林',
                        value: 19
                    },
                    {
                        name: '福建',
                        value: 54
                    },
                    {
                        name: '贵州',
                        value: 32
                    },
                    {
                        name: '广东',
                        value: 369
                    },
                    {
                        name: '青海',
                        value: 0
                    },
                    {
                        name: '西藏',
                        value: 0
                    },
                    {
                        name: '四川',
                        value: 185
                    },
                    {
                        name: '宁夏',
                        value: 4
                    },
                    {
                        name: '海南',
                        value: 20
                    },
                    {
                        name: '台湾',
                        value: 29
                    },
                    {
                        name: '香港',
                        value: 62
                    },
                    {
                        name: '澳门',
                        value: 2
                    }
                ],
            }
        },
        mounted() {
            this.initUpdateDate();
            this.initNcovMap()
        },
        methods: {
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
                        showLabel:true,
                        right: '15%',
                        bottom:'20%',
                        show: true,
                        type:'piecewise',
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
                        data: that.ncovData
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
        .map-canvas {
            width: 100%;
            height: 700px;
        }
    }
</style>