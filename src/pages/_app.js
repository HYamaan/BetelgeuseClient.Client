import store from '@/redux/store'
import {Provider} from 'react-redux'
import "./../styles/globals.css"
import Layout from "./../layouts/Layout";
import {QueryClient, QueryClientProvider} from 'react-query'
import {CookiesProvider} from 'react-cookie';

const queryClient = new QueryClient()
export default function App({Component, pageProps}) {

    return <>
        <CookiesProvider defaultSetOptions={{path: '/'}}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </Provider>
            </QueryClientProvider>
        </CookiesProvider>
    </>
}
