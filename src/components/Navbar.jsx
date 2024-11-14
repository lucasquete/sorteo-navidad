"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useAdminContext } from '../app/providers'

const Navbar = () => {

  const {admin, setAdmin} = useAdminContext();

  return (
    <nav className='p-4 sm:p-6 text-center'>
      <ul className='flex items-center justify-center gap-4 flex-wrap text-[#d86da8] uppercase font-bold'>
        <Link href={"/"}>
          <li>Inicio</li>
        </Link>
        <Link href={"/fotos"}>
          <li>imágenes</li>
        </Link>
        {admin && (
          <Link href={"/editar"}>
            <li>Foto</li>
          </Link>
        )}
        {admin && (
          <Link href={"/ganador"}>
            <li>ganador</li>
          </Link>
        )}
      </ul>
    </nav>
  )
}

export default Navbar