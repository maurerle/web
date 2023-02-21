import { forwardRef } from 'react'
import type { FC as ReactFC } from 'react'
import { tw } from '@helpwave/common/twind/index'
import Header from '../Header'
import { useTranslation } from '@helpwave/common/hooks/useTranslation'
import type { PropsWithLanguage } from '@helpwave/common/hooks/useTranslation'
import type { Languages } from '@helpwave/common/hooks/useLanguage'

export type StartSectionLanguage = {
  HeroMessageComponent: ReactFC,
  features: {
    intuitive: string,
    collaborative: string,
    practical: string,
    secure: string,
    interdisciplinary: string,
    openSource: string
  }
}

const defaultStartSectionLanguage: Record<Languages, StartSectionLanguage> = {
  en: {
    HeroMessageComponent: () => (
      <>
        {'We develop '}
        <span className={tw('text-hw-primary-400')}>{'real'}</span>
        {' Solutions for '}
        <span className={tw('text-hw-pool-red')}>{'real'}</span>
        {' people'}
      </>
    ),
    features: {
      intuitive: 'Intuitive',
      collaborative: 'Collaborative',
      practical: 'Practical',
      secure: 'Secure',
      interdisciplinary: 'Interdisciplinary',
      openSource: 'Open Source'
    }
  },
  de: {
    HeroMessageComponent: () => (
      <>
        {'Bei helpwave entwickeln wir keine Software für das Gesundheitssystem, sondern mit ihm. '}<br />
        {'In diesem Zusammenschluss aus Ärzten, Entwicklern und weiteren frischen Geistern, '}<br />
        {'entstehen '}
        <span className={tw('text-hw-primary-400')}>{'echte'}</span>
        {' Lösungen für '}
        <span className={tw('text-hw-pool-red')}>{'echte'}</span>
        {' Menschen.'}
      </>
    ),
    features: {
      intuitive: 'Intuitiv',
      collaborative: 'Kollaborativ',
      practical: 'Praxisnah',
      secure: 'Sicher',
      interdisciplinary: 'Interprofessionell',
      openSource: 'Open Source'
    }
  }
}

const StartSection = forwardRef<HTMLDivElement, PropsWithLanguage<StartSectionLanguage, Record<string, unknown>>>(function StartSection(props, ref) {
  const language = useTranslation(props.language, defaultStartSectionLanguage)
  return (
    <div className={tw('w-full h-[85vh] bg-white bg-[length:25px_25px]')} style={{'background-image': 'linear-gradient(to right, #e1e1e1 1px, transparent 1px), linear-gradient(to bottom, #e1e1e1 1px, transparent 1px);'}} id="start" ref={ref}>
      <div className={tw('py-8 px-16')}>
        <Header />
      </div>
      <div className={tw('relative top-[20vh] m-auto w-[580px]')}>
        <div className={tw('flex justify-center')}>
          <div className={tw('font-space text-7xl font-bold')}>helpwave</div>
        </div>

        <div className={tw('font-sans text-2xl font-medium mt-4 text-center')}>
          <language.HeroMessageComponent />
        </div>
      </div>
    </div>
  )
})

export default StartSection
