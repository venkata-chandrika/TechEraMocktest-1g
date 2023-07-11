import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class BlogItemDetails extends Component {
  state = {eachItem: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCourseItemData()
  }

  getCourseItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = d => ({
        id: d.id,
        name: d.name,
        imageUrl: d.image_url,
        description: d.description,
      })
      this.setState({
        eachItem: updatedData(data.course_details),
        apiStatus: apiStatusConstants.success,
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

  renderCourseItemDetails = () => {
    const {eachItem} = this.state
    const {name, imageUrl, description} = eachItem

    return (
      <div className="course-info">
        <div className="course-info-container">
          <img className="course-pic" src={imageUrl} alt={name} />
          <div className="name-description">
            <h1 className="title">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

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
      <button
        type="button"
        className="retry-btn"
        onClick={this.getCourseItemData}
      >
        Retry
      </button>
    </div>
  )

  renderCourseItem = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseItemDetails()
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
      <div className="blog-container">
        <Header />

        {this.renderCourseItem()}
      </div>
    )
  }
}

export default BlogItemDetails
