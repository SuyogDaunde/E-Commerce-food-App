import React from 'react'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Cards from './components/Cards'
import CardsDetails from './components/CardsDetails'
import {Routes,Route} from "react-router-dom"


const App = () => {
  return (
    <>
      <Header/>
    <Routes>
      <Route path="/" element={<Cards/>}/>
      <Route path="/cart" element={<CardsDetails/>}/>
    </Routes>
    </>    
  )
}

export default App
