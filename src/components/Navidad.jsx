import Image from 'next/image'
import React from 'react'

const Navidad = () => {
  return (
    <div className='mt-5'>
        <Image
        src={"/navidad.jpg"}
        alt="foto con feliz navidad y santa en un tren con regalos"
        width={400}
        height={500}
        className="object-cover w-full h-full rounded-lg"
      />
    </div>
  )
}

export default Navidad