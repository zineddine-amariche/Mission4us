import React from "react"
import {Outlet} from "react-router-dom"

import TavNav from "../../components/TabNav"

const Tabs = (props) => {
	const {userName} = props.props
	return (
		<div className="tabs">
			<h1>Tabs demo page {userName}</h1>

			{/** Tab navigation  */}
			<TavNav />
			{/** Tab inner content */}
			<Outlet />
		</div>
	)
}

export default Tabs
