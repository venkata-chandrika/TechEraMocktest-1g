import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EraItem from '../EraItem'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TechEra extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    coursesList: [],
  }

  componentDidMount() {
    this.getTechEra()
  }

  getTechEra = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/te/courses')
    if (response.ok) {
      const data = await response.json()
      const formattedData = data.courses.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.name,
        logoUrl: eachObj.logo_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        coursesList: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" width={50} height={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="warning">Oops! Something Went Wrong</h1>
      <p className="warning-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.getTechEra}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="success-container">
        <h1 className="heading">Courses</h1>
        <ul className="list-container">
          {coursesList.map(eachObj => (
            <EraItem key={eachObj.id} eraItem={eachObj} />
          ))}
        </ul>
      </div>
    )
  }

  renderTechEra = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderTechEra()}
      </>
    )
  }
}
export default TechEra
