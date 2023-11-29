import React, {useState, useEffect} from 'react'
import useGet from 'hooks/useGet'
import { GET_QUOTE_LIST } from 'constants/api'

const QuoteList = () => {
  const appId = localStorage.getItem('appId')
  const [quoteList, setQuoteList] = useState([])
  const {mutateAsync: getQuoteList} = useGet();

  useEffect(() => {
    if(appId) {
      console.log('get quote list api called')
      getQuoteList({
        url: `${GET_QUOTE_LIST}=${appId}`
      }).then((res) => {
        console.log('quote list -->', res)
        setQuoteList(res?.data)
      })
    }
  }, [appId])
  
  return (
    <div>QUOTES LIST</div>
  )
}

export default QuoteList