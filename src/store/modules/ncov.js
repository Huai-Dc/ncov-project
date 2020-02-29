const SET_PROVINCE = "SET_PROVINCE"
const SET_SIMULATION_TYPE = "SET_SIMULATION_TYPE"

const ncov = {
    state: {
        province: "",
        simulationType: "confirmedCount",
    },
    mutations: {
        [SET_PROVINCE](state, province){
            state.province = province
        },
        [SET_SIMULATION_TYPE](state, type){
            state.simulationType = type
        }
    },
    actions: {
        changeProvince({commit}, province){
            commit(SET_PROVINCE, province)
        },
        changeSimulationType({commit}, type){
            commit(SET_SIMULATION_TYPE, type)
        },
    }
}

export default ncov