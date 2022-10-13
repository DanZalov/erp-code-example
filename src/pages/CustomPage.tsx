import { ReactNode } from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/Navbar'

interface CustomPageProps {
  children: ReactNode
}

export default function CustomPage({ children }: CustomPageProps) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}
