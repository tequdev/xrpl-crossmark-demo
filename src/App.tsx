import { useEffect, useState } from 'react'
import xrplLogo from './assets/xrpl.svg'
import crossmarkLogo from '/assets/crossmark.png'
import './App.css'
import sdk from '@crossmarkio/sdk';

function App() {
  const [address, setAddress] = useState<string>()
  
  useEffect(() => {
    sdk.mount.loop(200).then(() => {
      setAddress(sdk.methods.getAddress())
    })
  },[])
  
  const connect = async () => {
    const signIn = await sdk.methods.signInAndWait();
    const address = signIn.response.data.address;
    setAddress(address)
  }
  
  const createTransaction = async () => {
    const { response } = await sdk.methods.signAndSubmitAndWait({
      TransactionType: "Payment",
      Account: address,
      Destination: 'rQQQrUdN1cLdNmxH4dHfKgmX5P4kf3ZrM',
      Amount: '1000000' // 1,000,000 drops = 1 XRP
    })
    console.log(response.data.resp.result.hash)
  }

  return (
    <>
      <div>
        <img src={xrplLogo} className="logo" alt="XRPL logo" />
        <img  src='crossmark.png' className="logo" alt="Crossmark logo" />
      </div>
      <h1>XRPL + Crossmark</h1>
      <div className="card">
        <button onClick={connect}>
          Connect
        </button>
        <p>
          {address}
        </p>
      </div>
      {address && (
        <button onClick={createTransaction}>
          Payment
        </button>
      )}

    </>
  )
}

export default App
