import { useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import UserState from '../store/UserState'

const WithoutAuth = observer(({ children }) => {
   const navigate = useNavigate()
   const goBack = () => navigate(-1)

   if (UserState.isAuth) {
      return goBack()
   }

   return children
})

export default WithoutAuth
