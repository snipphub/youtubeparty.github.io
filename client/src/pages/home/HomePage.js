// Libs & utils
import React, { Component } from 'react'
import { connect } from 'react-redux'

// CSS
import './HomePage.css'

// Components
import AppDescription from '../../components/appDescription/AppDescription'
import SetUserNameForm from '../../components/setUserNameForm/SetUserNameForm'

// Actions
import { userActions } from "../../core/user/index"

class HomePage extends Component {

	constructor ( props ) {
		super ( props )
		this.state = {
			creatingUserName: false
		}
	}

	componentDidMount () {
		// Read userName from localStorage, if it exists -> redirect to the browse page
		const userName = this.props.user.userName
		if ( userName ) {
			this.props.router.push ( '/browse' )
		}
	}

	/**
	 * When the user presses the 'Start watching' button
	 */
	startButtonClickHandler = () => {
		this.setState ( { creatingUserName: true } )
	}

	/**
	 * When the user cancels the creation of a username
	 */
	cancelButtonClickHandler = () => {
		this.setState ( { creatingUserName: false } )
	}

	/**
	 * Set the given username in store
	 */
	handleSetUserName = (userName) => {
		const { setUserName } = this.props
		if ( userName.length ) {
			setUserName(userName)
			this.navigateToBrowsePage()
		}
	}

	/**
	 * Navigate to the browse page using react-router
	 */
	navigateToBrowsePage = () => {
		this.props.router.push('/browse')
	}

	render () {
		const { creatingUserName } = this.state

		return (
			<div className="home-page">
				<div className="g-row">
					<div className="g-col">

						<AppDescription
							creatingUserName={creatingUserName}
							startButtonClickHandler={this.startButtonClickHandler}
						/>

						<SetUserNameForm
							creatingUserName={creatingUserName}
							cancelButtonClickHandler={this.cancelButtonClickHandler}
							handleSetUserName={this.handleSetUserName}
						/>

					</div>
				</div>
			</div>
		)
	}
}


//=====================================
//  CONNECT
//-------------------------------------

const mapStateToProps = ( state ) => {
	return {
		user : state.user,
	}
}

const mapDispatchToProps = {
	setUserName: userActions.setUserName
}

HomePage = connect (
	mapStateToProps,
	mapDispatchToProps
) ( HomePage )

export default HomePage