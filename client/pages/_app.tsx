import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {store} from "../store";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


function MyApp({Component, pageProps}: AppProps) {
    return <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
}

export default MyApp
