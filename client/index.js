import React from "react"
import ReactDOM from "react-dom"

fetch("/api/v1").then((response) => {
  console.log(response.json())
})

export const Index = () => {
  return <div>Hello React!</div>
}

ReactDOM.render(<Index />, document.getElementById("index"))
