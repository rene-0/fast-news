import { registerRootComponent } from 'expo'

import { Suspense } from 'react'
import { RecoilRoot } from 'recoil'
import { MainNavigation } from './navigation/MainNavigation'
import './translation/index'

export default function App() {
  return (
    <Suspense>
      <RecoilRoot>
        <MainNavigation />
      </RecoilRoot>
    </Suspense>
  )
}

registerRootComponent(App)
