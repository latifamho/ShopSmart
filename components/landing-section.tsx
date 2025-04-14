'use client'

import React from 'react'
import Button from './base/button'
import Link from 'next/link'
import Image from 'next/image'

const LandingSection = () => {
      
  return (
         <section className="mb-12 rounded-lg bg-muted p-6 md:p-10">
            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl">
                  Discover Your Perfect Style
                </h1>
                <p className="max-w-[600px] text-foreground/[20] md:text-xl">
                  Shop the latest trends with personalized recommendations tailored
                  just for you.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/">
                    <Button color="primary" variant="fill" size="medium">
                      {" "}
                      shop now
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button color="secondary" variant="fill" size="medium">
                      {" "}
                      explore elcronics
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-[10px]">
                  <Image
                    src="/images/land.webp"
                    alt="Featured product"
                    fill
                    className="object-cover "
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            </div>
          </section>
    
  )
}

export default LandingSection