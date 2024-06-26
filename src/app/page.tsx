'use client';

import Head from 'next/head';
import * as React from 'react';
import '@/lib/env';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-blue-950 text-white'>
        <div className='layout relative flex min-h-screen flex-col justify-center py-12'>
          <h1 className='text-center'>Splash</h1>

          <div className='flex flex-row justify-center p-4 gap-4'>
            <div className='bg-white p-4 text-black'>
              <h2>All Plants</h2>
              <ul className='list-disc ml-6'>
                <li>Plant one</li>
                <li>Plant two</li>
                <li>Plant three</li>
              </ul>
            </div>

            <div className='bg-white p-4 text-black'>
              <h2>Recently Watered</h2>
              <ul className='list-disc ml-6'>
                <li>Plant one</li>
                <li>Plant two</li>
                <li>Plant three</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
