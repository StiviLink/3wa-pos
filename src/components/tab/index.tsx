import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

interface Props {
    tabs?: [string]
    action?: any
}

const TabComponent = (props:Props) => {
    const tabs = props.tabs??[], action = props.action
    const [tabIndex, setTabIndex] = React.useState(0),
        onChange = (e:React.SyntheticEvent, index:number) => {
            setTabIndex(index)
            if(action) action(index)
        }
    return (
        <Tabs
            value={tabIndex}
            onChange={onChange}
        >
            {tabs.map(x => <Tab label={x}/>)}
        </Tabs>
    )
}

export default TabComponent
