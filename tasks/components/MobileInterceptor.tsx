import { tw } from '@helpwave/common/twind'
import type { PropsWithLanguage } from '@helpwave/common/hooks/useTranslation'
import { useTranslation } from '@helpwave/common/hooks/useTranslation'
import Link from 'next/link'
import HelpwaveLogo from '../icons/HelpwaveRect'
import type { NextPage } from 'next'
import { AndroidView, IOSView } from 'react-device-detect'
import { getConfig } from '../utils/config'

type MobileInterceptorTranslation = {
  pleaseDownloadApp: string,
  playstore: string,
  appstore: string
}

const defaultMobileInterceptorTranslation = {
  en: {
    pleaseDownloadApp: 'Please download the app',
    playstore: 'Google Play Store',
    appstore: 'Apple App Store'
  },
  de: {
    pleaseDownloadApp: 'Bitte laden Sie die App herunter',
    playstore: 'Google Play Store',
    appstore: 'Apple App Store'
  }
}

const MobileInterceptor: NextPage = ({ language }: PropsWithLanguage<MobileInterceptorTranslation>) => {
  const translation = useTranslation(language, defaultMobileInterceptorTranslation)
  const config = getConfig()
  const playstoreLink = config.appstoreLinks.playStore
  const appstoreLink = config.appstoreLinks.appStore
  return (
    <div className={tw('w-screen h-[80vh] flex flex-col items-center justify-center')}>
      <HelpwaveLogo className={tw('w-1/3 mx-auto h-auto mb-2 text-black')}/>
      <span className={tw('text-lg font-semibold mb-8')}>{translation.pleaseDownloadApp}</span>
      <AndroidView>
        <Link href={playstoreLink}>{translation.playstore}</Link>
      </AndroidView>
      <IOSView>
        <Link href={appstoreLink}>{translation.appstore}</Link>
      </IOSView>
    </div>
  )
}

export default MobileInterceptor
