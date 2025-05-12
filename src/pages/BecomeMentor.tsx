import BecomeFormV2 from '@/components/becomementor/BecomeFormV2'
// import BecomeForm from '@/components/becomementor/BecomeFrom'
// import React from 'react'
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

const BecomeMentor = () => {
    useRedirectIfNotLoggedIn()

    return (
        <div>
            {/* <BecomeForm /> */}
            <BecomeFormV2 />

        </div>
    )
}

export default BecomeMentor