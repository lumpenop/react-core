import Header from './components/header'
import Layout from './components/layout'
import SectionLayout from './components/section-layout'

function SuccessPage({ setPage }) {
  return (
    <Layout>
      <Header />
      <SectionLayout>
        <p>success</p>
        <p>{window.localStorage.getItem('data')}</p>
      </SectionLayout>
      <button onClick={() => setPage(0)}>처음으로</button>
    </Layout>
  )
}

export default SuccessPage
