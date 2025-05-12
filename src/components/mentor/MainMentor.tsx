
import MentorDetail from './MentorDetail'
import Review from './Review'
import { Pricing } from './Pricing'
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

const MainMentor = () => {
    useRedirectIfNotLoggedIn()

    return (
        <div>
            <MentorDetail />
            <div className='flex'>
                <Review
                    name="Jon Doe"
                    title="DESIGNER"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque semper elit non pellentesque. Curabitur neque arcu, efficitur facilisis porta at, feugiat ut est. Vivamus sed dui in dui vehicula congue. Phasellus sed pellentesque nisi. Phasellus tempus bibendum massa ut tincidunt. Nam hendrerit ut tortor eget rutrum. Suspendisse facilisis ante eget fringilla auctor. Nam a odio orci. Pellentesque imperdiet quis sem."
                    imageSrc="https://dummyimage.com/110x110"
                />
                <Review
                    name="Jon Doe"
                    title="DESIGNER"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque semper elit non pellentesque. Curabitur neque arcu, efficitur facilisis porta at, feugiat ut est. Vivamus sed dui in dui vehicula congue. Phasellus sed pellentesque nisi. Phasellus tempus bibendum massa ut tincidunt. Nam hendrerit ut tortor eget rutrum. Suspendisse facilisis ante eget fringilla auctor. Nam a odio orci. Pellentesque imperdiet quis sem."
                    imageSrc="https://dummyimage.com/110x110"
                />
            </div>

            <Pricing />

        </div>
    )
}

export default MainMentor