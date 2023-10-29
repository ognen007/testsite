import { useState } from 'react'
import BasicMap from "./BasicMap"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicMap/>
    </>
  )
}

export default App
