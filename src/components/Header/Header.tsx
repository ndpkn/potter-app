import localFont from '@next/font/local'
import Link from 'next/link'

const harryFont = localFont({ src: '../../fonts/Harry Potter.ttf' })

const Header = () => {
  return (
    <div className={harryFont.className}>
      <Link href={'/'}>
        <h1 className='text-5xl text-center text-amber-600 mt-5'>Hogvarts Universe</h1>
      </Link>
    </div>
  )
}

export default Header