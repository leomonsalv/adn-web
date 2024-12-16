import React from 'react'

function ProductDetailSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse flex w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-x-8">
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-gray-200 h-[500px] w-full rounded-lg" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-6 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="h-10 w-1/2 bg-gray-200 rounded mt-6" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailSkeleton
