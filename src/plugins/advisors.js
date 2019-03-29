
export default {

    install (Vue) {
        console.log('installing advisors')
        // get axios
        const http = Vue.prototype.$http

        Vue.prototype.$loadAdvisorNamesAndIds = function (setAdvisors) {
            console.log('loading names + ids...')
            http
            .get('/advisor/names')
            .then(response => {
                setAdvisors(response.data)
            })
        }
    }
}