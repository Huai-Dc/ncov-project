const SET_PROVINCE = "SET_PROVINCE"
const SET_SIMULATION_TYPE = "SET_SIMULATION_TYPE"
const SET_SUMMARY_DATA = "SET_SUMMARY_DATA"
const SET_EMERGENCY_DATA = "SET_EMERGENCY_DATA"
const SET_CURRENT_TAB = "SET_CURRENT_TAB"

const ncov = {
    state: {
        province: "",
        simulationType: "confirmedCount",
        summaryData: null,
        emergencyData: null,
        currentTab: "0",
    },
    mutations: {
        [SET_PROVINCE](state, province){
            state.province = province
        },
        [SET_SIMULATION_TYPE](state, type){
            state.simulationType = type
        },
        [SET_SUMMARY_DATA](state, data){
            state.summaryData = data
        },
        [SET_EMERGENCY_DATA](state, data){
            state.emergencyData = data
        },
        [SET_CURRENT_TAB](state, tab){
            state.currentTab = tab
        }
    },
    actions: {
        changeProvince({commit}, province){
            commit(SET_PROVINCE, province)
        },
        changeSimulationType({commit}, type){
            commit(SET_SIMULATION_TYPE, type)
        },
        initSummaryData({commit}, data){
            commit(SET_SUMMARY_DATA, data)
        },
        initEmergencyData({commit}, data){
            commit(SET_EMERGENCY_DATA, data)
        },
        changeTab({commit}, tab){
            commit(SET_CURRENT_TAB, tab)
        }
    }
}

export default ncov