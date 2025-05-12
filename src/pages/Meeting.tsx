import JitsiMeetComponent from '@/components/JitsiMeetComponent'
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';


const Meeting = () => {
  useRedirectIfNotLoggedIn()

  return (
    <div>
      <JitsiMeetComponent/>
    </div>
  )
}

export default Meeting