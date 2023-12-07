"use client";
import { GetHeroesResponse, IHero } from '@/types/types';
import axios from 'axios';
import Image from 'next/image'
import { useEffect, useState } from 'react'
import localFont from '@next/font/local'
import Link from 'next/link';

const harryFont = localFont({ src: '../../fonts/Harry Potter.ttf' })


const HeroesList = () => {
  const [heroes, setHeroes] = useState<GetHeroesResponse>()
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  async function getHeroes() {
    try {
      const { data, status } = await axios.get<GetHeroesResponse>(
        'https://hp-api.onrender.com/api/characters'
      );

      setHeroes(data)

      console.log('response status is: ', status);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  useEffect(() => {
    getHeroes()
  }, [])

  const getHeroId = (id: string) => {
    localStorage.setItem('hero_id', id)
  }
  const filteredHeroes = heroes?.data.filter(item => {
    return item.name.toLowerCase().includes(searchTerm)
  })
  console.log(filteredHeroes);

  return (
    <div className='w-full'>
      <input
        type="text"
        className='w-full p-4 rounded-lg bg-gray-700 text-zinc-300'
        placeholder='Start to search heroes...'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className='mt-5'>
        {filteredHeroes?.map((item: IHero, i: number) => {
          return (
            <Link key={i} href={`/hero`}>
              <li
                className='flex justify-between mb-5 items-center bg-gray-700 rounded-lg p-2'
                onClick={() => {
                  getHeroId(item.id)
                }}
              >
                {item.image ?
                  <Image
                    src={item.image}
                    alt={'none'}
                    width={50}
                    height={50}
                    className='rounded-lg'
                  // style={{ objectFit: 'contain', height: '70px', width: '70px' }}
                  /> :
                  <div className={`${harryFont.className} rounded-lg border-1 border-amber-600`}>
                    <p className='text-6xl text-center text-amber-600 '>?</p>
                  </div>

                }
                <p className='flex-1 justify-self-start ml-5'>{item.name}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </li>
            </Link>
          )
        })}
      </ul>
    </div>
  )
}

export default HeroesList