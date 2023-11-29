import { createContext, useContext, useState } from 'react'

const contextDefaultValues = {
  preAppId: '',
  setPreAppId: '',
  appId: '',
  setAppId: ''
}
const MetadataContext = createContext(contextDefaultValues)

export const MetadataProvider = ({ children }) => {
  const [preAppId, setPreAppId] = useState(contextDefaultValues.preAppId)
  const [appId, setAppId] = useState(contextDefaultValues.appId)

  return (
    <MetadataContext.Provider
      value={{
        preAppId,
        setPreAppId,
        appId,
        setAppId
      }}
    >
      {children}
    </MetadataContext.Provider>
  )
}

export default () => useContext(MetadataContext)
