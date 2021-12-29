import React from 'react'

export default function _navitem({icon, name}) {

    return (<div style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        // textAlign: "left",
        flexDirection: "row"
    }}>
        {icon}
        <p style={{ padding: 0, margin: 0 , paddingLeft:20, textAlign:"left"}}>{name}</p>
    </div>
    )

}
