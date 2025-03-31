"use client";

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import HomePage from '@/components/HomePage'
import DebugSession from '@/components/DebugSession'
import { useSession } from 'next-auth/react'

// const Loading = () => (
//     <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2">
//           <svg className="w-6 h-6" viewBox="0 0 24 24">
//             <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 16.4183 15.4183 20 11 20V23C16.5228 23 21 18.5228 21 13H18C18 17.4183 14.4183 21 10 21V18C14.4183 18 18 14.4183 18 10H15C15 14.4183 11.4183 18 7 18V15C11.4183 15 15 11.4183 15 7H12V22Z" fill="currentColor"></path>
//           </svg>
//         </div>
//         </div>
//     );


export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
        // Only redirect if we're sure the user is not authenticated
        // if (status === "unauthenticated") {
        //     router.push('/signin');
        // } else if (status === "authenticated") {
        //     setIsLoading(false);
        // }
    // }, [status, router]);

    // Show loading state while checking authentication
    // if (status === "loading" || isLoading) {
    //     return <Loading />;
    // }

    // Only render the dashboard if authenticated
    return (
        <>
        <Suspense >
            <HomePage />
            <DebugSession />
        </Suspense>
        </>
    );
}