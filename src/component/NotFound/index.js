import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <img
      src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      alt="not found"
      className="failure"
    />
    <h1>Page Not Found</h1>
    <p>We are sorry, the page you requested could not be found</p>
  </>
)
export default NotFound
