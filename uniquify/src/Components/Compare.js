import React, { useEffect, useState } from "react";
import 'aos/dist/aos.css';
import { LandingPage } from '../Components/LandingPage';
import { Header } from '../Components/Header'
import { CompareForm } from '../Components/CompareForm'
export const Compare = () => {

    const [showCompare, setShowCompare] = useState(true)


    return (
        <>
            {
                showCompare ?
                    <LandingPage show={setShowCompare} />
                    :
                    <>
                        <Header />
                        <CompareForm />

                    </>
            }
        </>
    )
}


