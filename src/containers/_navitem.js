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
        <img src={icon} alt="" width={30} height={30}/>
        <p style={{ padding: 0, margin: 0 , paddingLeft:20,marginTop:5,color:"#3E3E3E", textAlign:"left"}}>{name}</p>
    </div>
    )

}
