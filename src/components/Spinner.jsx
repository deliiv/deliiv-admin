import React from 'react'

export default function Spinner({width, height}) {
    return (
    <div className="spinner-border text-primary"
    size="large" role="status"
     style={{ marginLeft: '10px',
      marginTop: '5px',
       height: {height}, width:{width} }}>
        <span className="sr-only">Loading...</span>
    </div>
    )
}
