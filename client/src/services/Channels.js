import Api from './Api'

export default {
    viewChannels(){
        return Api().get('channels')
    }
}