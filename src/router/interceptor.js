import {getToken} from '../common/js/token.service'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style


NProgress.configure({showSpinner: false}) // NProgress Configuration
//const whiteList = ['/login','/404'] // no redirect whitelist
export const beforeEach = (to, from, next) => {
    NProgress.start()
    const hasToken = getToken()
    if (hasToken) {

        console.log("hasToken")
        next()

    } else {

        console.log("notToken not whiteLis")
        console.log(to.path)
        next(true)
        // next({
        //     path: '/login',
        //     query: {redirect: to.fullPath}
        // })

        /*for(let path of whiteList){
            if(to.path.indexOf(path)!==-1){
                console.log("notToken whiteList")
                next()
                break;
            }else{
                console.log("notToken not whiteLis")
                next({
                    path: '/login',
                    query: {redirect: to.fullPath}
                })
            }
        }*/
        NProgress.done()

       /* if (whiteList.indexOf(to.path) !== -1) {
            console.log("notToken whiteList")
            next()
        } else {
            console.log("notToken not whiteLis")
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })

        }*/
    }



}

export const afterEach = () => {
    NProgress.done()
}





