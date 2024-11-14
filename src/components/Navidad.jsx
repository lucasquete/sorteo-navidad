import Image from 'next/image'
import React from 'react'

const Navidad = () => {
  return (
    <div className=''>
        <Image
        src={"/navidad.jpg"}
        alt="foto con feliz navidad y santa en un tren con regalos"
        width={400}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  )
}

export default Navidad