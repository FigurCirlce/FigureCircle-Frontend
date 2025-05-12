import FeedbackForm from '@/components/feedback/FeedbackForm'
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';


const FeedBack = () => {
    useRedirectIfNotLoggedIn()

    return (
        <div>
            <FeedbackForm />
        </div>
    )
}

export default FeedBack