import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import usePost from 'hooks/usePost'
import { CREATE_QUOTE } from 'constants/api'

const CreateQuote = () => {
  const appId = localStorage.getItem('appId')
  const navigate = useNavigate();
  const {mutateAsync: createQuote} = usePost();

  useEffect(() => {
    const submitBtn = document.querySelector('air-button')
    if (appId) {
        submitBtn.addEventListener('click', async function () {
            // Your click event logic here
            // document.querySelector('air-questionnaire').validate()
                const payload = {
                    "applicationId": appId
                }
                createQuote({
                    url: CREATE_QUOTE,
                    payload
                }).then((res) => {
                    console.log('Quote Created --->', res)
                    navigate('/quotes')
                })
            })
        }
}, [appId])
  return (
    <air-button type="submit" variant="primary">Create Quote</air-button>
  )
}

export default CreateQuote