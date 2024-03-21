import React from 'react'

const Review = () => {
  return (
    <>
<div class="  flex justify-center items-center p-10 ">
    <div class="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5 bg-white rounded-lg shadow-lg border">
        <div class="flex flex-col gap-3 mt-1">
            <div class="flex flex-col gap-4  bg-slate-100 shadow-lg p-4">
                <div class="flex justify justify-between">
                    <div class="flex gap-2">
                        <div class="w-7 h-7 text-center rounded-full bg-red-500">J</div>
                        <span className=' shadow-md'>Sumit Soni</span>
                    </div>
                    <div class="flex p-1 gap-1 text-orange-300">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star-half"></ion-icon>
                    </div>
                </div>

                <div>
                    I am able to find a nice Room Mate, Thank you Room-Buddy
                </div>

                <div class="flex justify-between">
                    <span>Feb 13, 2021</span>
                    <button class="font-bold cursor-pointer border px-3  bg-blue-500 mt-2 text-white rounded-md shadow-lg hover: border-blue-500 hover:bg-white hover:text-blue-500">
                        <ion-icon name="share-outline"></ion-icon> Share</button>
                </div>
            </div>

            <div class="flex flex-col gap-4  bg-slate-100 shadow-lg p-4">
                <div class="flex justify justify-between">
                    <div class="flex gap-2">
                        <div class="w-7 h-7 text-center rounded-full bg-yellow-500">A</div>
                        <span>Himanshu</span>
                    </div>
                    <div class="flex p-1 gap-1 text-orange-300">
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        <ion-icon name="star"></ion-icon>
                        
                    </div>
                </div>
            
                <div>
                    The device has a clean design and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at.
                </div>
            
                <div class="flex justify-between">
                    <span>Feb 13, 2021</span>
                    <button class="font-bold cursor-pointer border px-3  bg-blue-500 mt-2 text-white rounded-md shadow-lg hover: border-blue-500 hover:bg-white hover:text-blue-500">
                                    <ion-icon name="share-outline"></ion-icon> Share</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
    </>
  )
}

export default Review