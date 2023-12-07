'use client'
import { IHero } from '@/types/types';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './hero.module.scss'
import dobby from '../../../public/dobby.jpeg'

import localFont from '@next/font/local'

const harryFont = localFont({ src: '../../fonts/Harry Potter.ttf' })

const HeroPage = () => {
  const [hero, setHero] = useState<IHero>();
  const [heroId, setHeroId] = useState<string | null>('')

  useEffect(() => {
    let getId: string | null
    getId = localStorage.getItem('hero_id')
    setHeroId(getId)
  }, [])

  async function getHero() {
    try {
      const { data, status } = await axios.get<IHero>(
        `https://hp-api.onrender.com/api/character/${heroId}`
      );

      setHero(data);
      console.log(data, null, 4);
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
    getHero();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroId]);

  return (
    <>
      <div className='flex justify-center flex-col items-center w-full'>
        {hero?.image ?
          <Image
            src={hero.image}
            alt={'none'}
            width={200}
            height={200}
            className='rounded-lg border border-amber-600'
            priority
          /> :
          <Image
            src={dobby}
            alt={'none'}
            width={200}
            height={200}
            className='rounded-lg border border-amber-600'
            priority
          />

        }
        <h2 className={`${harryFont.className} text-6xl text-center text-amber-600 mt-5`}>{hero?.name}</h2>
        <table className={`${styles.heroTable} ${harryFont.className}`}>
          <tbody>
            <tr>
              <td className='w-1/3'>Alternate names</td>
              <td>
                <ul>
                  {hero?.alternate_names.length !== 0 ?
                    hero?.alternate_names.map((item, i) => {
                      return <li className='text-left' key={i}>{item}</li>
                    }) :
                    <li>No</li>
                  }

                </ul>
              </td>
            </tr>
            <tr>
              <td>Species</td>
              <td>{hero?.species}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{hero?.gender}</td>
            </tr>
            <tr>
              <td>House</td>
              <td>{hero?.house}</td>
            </tr>
            <tr>
              <td>Date of birth</td>
              <td>{hero?.dateOfBirth}</td>
            </tr>
            <tr>
              <td>Wizard</td>
              <td>{hero?.wizard ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Ancestry</td>
              <td>{hero?.ancestry}</td>
            </tr>
            <tr>
              <td>Eye color</td>
              <td>{hero?.eyeColour}</td>
            </tr>
            <tr>
              <td>Hair color</td>
              <td>{hero?.hairColour}</td>
            </tr>
            <tr>
              <td className='w-1/3'>Wand</td>
              <td>
                <ul className='text-left'>
                  <li>Wood: {hero?.wand.wood}</li>
                  <li>Core: {hero?.wand.core}</li>
                  <li>Length: {hero?.wand.length}</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td>Patronus</td>
              <td>{hero?.patronus}</td>
            </tr>
            <tr>
              <td>Hogwarts student</td>
              <td>{hero?.hogwartsStudent ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Hogwarts staff</td>
              <td>{hero?.hogwartsStaff ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td>Actor</td>
              <td>{hero?.actor}</td>
            </tr>
            <tr>
              <td>Alive</td>
              <td>{hero?.alive ? 'Yes' : 'No'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      ))
    </>
  );
};

export default HeroPage;