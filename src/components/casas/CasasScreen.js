import React from 'react'
import { InmuebleList } from '../inmueble/InmuebleList'

export const CasasScreen = () => {
  return (
    <div>
      <center><h1>Casas</h1></center>
      <hr />
      <InmuebleList categoria={'Casa'} />
    </div>
  )
}

