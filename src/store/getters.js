export default {
    routers: state => state.navigator.routers,
    province: state => state.ncov.province,
    simulationType: state => state.ncov.simulationType,
    summaryData: state => state.ncov.summaryData,
    emergencyData: state => state.ncov.emergencyData,
    currentTab: state => state.ncov.currentTab,
};