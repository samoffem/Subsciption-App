import Api from './Api'

export default {
    postSubscription(credential){
        return Api().post('subscription', credential)
    },
    getSubscription(credential){
        return Api().get('subscription', credential)
    },
    removeSubscription(credential){
        return Api().delete('unsubscribe', credential)
    }
}