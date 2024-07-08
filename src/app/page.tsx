import Head from 'next/head';
import { Suspense } from 'react';
import * as React from 'react';
import '@/lib/env';

import Garden from '@/components/Garden';
import Loading from '@/components/Loading';

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
        <div className='relative flex min-h-screen flex-col justify-center'>
          <h1 className='text-center mt-4'>Splash</h1>

          <div className='grid grid-cols-6 grid-rows-4 p-4 gap-4 grow'>
            <Suspense fallback={<Loading />}>
              <Garden />
            </Suspense>

            <button
              className='row-start-4 col-start-6 cursor-pointer'
              style={{
                backgroundImage: `url(https://as2.ftcdn.net/v2/jpg/08/30/53/63/1000_F_830536348_F7yPqVsvvceKfxmXEafxs27Og5OgyoIW.jpg)`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
              type='button'
              aria-label='Pick up the watering can'
            />
          </div>
        </div>
      </section>
    </main>
  );
}
