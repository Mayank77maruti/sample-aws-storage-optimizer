import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center items-center w-full mt-24'>
        <div className='w-[70%] flex flex-col justify-start items-start border-2 border-gray-400 px-10 py-5 rounded-lg'>
            <h3 className='text-3xl font-bold my-5'>Add Product as a?</h3>
            <div className='flex justify-start items-center'>
                <Link href={'/dashboard/add-product/seller'} className='bg-gray-800 text-white mr-2 px-4 py-2 rounded-lg'>Seller</Link>
                <Link href={'/dashboard/add-product/manufacturer'} className='bg-gray-800 text-white ml-2 px-4 py-2 rounded-lg'>Manufacturer</Link>
            </div>
        </div>
    </div>
  )
}

export default page