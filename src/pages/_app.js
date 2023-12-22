
import store from '@/redux/store'
import { Provider } from 'react-redux'
import "./../styles/globals.css"
import Layout from "./../layouts/Layout";


export default function App({ Component, pageProps }) {
  return <>
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  </>
}
