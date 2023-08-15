import React from 'react'

export default function Spinner({size}) {
  return (
    <div className="spinner-border text-primary"
      size={size} role="status"
      style={{ marginLeft: '10px', marginTop: '5px', height: "50px", width: "50px" }}>
        <span className="sr-only">Loading...</span>
      </div>
  )
}
