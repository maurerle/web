import { tw, tx } from '@helpwave/common/twind/index'
import type { Languages } from '@helpwave/common/hooks/useLanguage'
import type { PropsWithLanguage } from '@helpwave/common/hooks/useTranslation'
import { useTranslation } from '@helpwave/common/hooks/useTranslation'
import { Input } from './user_input/Input'
import { useState } from 'react'

type WardFormTranslation = {
  general: string,
  name: string,
  nameDescription: string,
  required: string,
  tooLong: (maxCharacters: number) => string,
  tooShort: (minCharacters: number) => string,
  duplicateName: string
}

const defaultWardFormTranslations: Record<Languages, WardFormTranslation> = {
  en: {
    general: 'General',
    name: 'Name',
    nameDescription: 'Should be short, prefer abbreviations.',
    required: 'Required Field, cannot be empty',
    tooLong: (maxCharacters) => `Too long, at most ${maxCharacters} characters`,
    tooShort: (minCharacters) => `Too short, at least ${minCharacters} characters`,
    duplicateName: 'Wards can\'t have the same name'
  },
  de: {
    general: 'Allgemeines',
    name: 'Name',
    nameDescription: 'Sollte kurz sein, Abbkürzungen werden präferiert.',
    required: 'Benötigter Wert, darf nicht leer sein',
    tooLong: (maxCharacters) => `Zu lang, maximal ${maxCharacters} Zeichen`,
    tooShort: (minCharacters) => `Zu kurz, mindestens ${minCharacters} Zeichen`,
    duplicateName: 'Stationen müssen unterschiedliche Namen haben'
  }
}

type WardFormInfoDTO = {
  name: string
}

export type WardFormProps = {
  ward?: WardFormInfoDTO,
  usedWardNames: string[],
  onChange: (organization: WardFormInfoDTO, isValid: boolean) => void,
  isShowingErrorsDirectly?: boolean
}

export const WardForm = ({
  language,
  ward = { name: '' },
  usedWardNames = [],
  onChange = () => undefined,
  isShowingErrorsDirectly = false
}: PropsWithLanguage<WardFormTranslation, WardFormProps>) => {
  const translation = useTranslation(language, defaultWardFormTranslations)
  const [touched, setTouched] = useState({ name: isShowingErrorsDirectly })

  const minWardNameLength = 2
  const maxWardNameLength = 32

  const inputErrorClasses = tw('border-hw-negative-500 focus:border-hw-negative-500 focus:ring-hw-negative-500 border-2')
  const errorClasses = tw('text-hw-negative-500 text-sm')
  const inputClasses = tw('mt-1 block rounded-md w-full border-gray-300 shadow-sm focus:outline-none focus:border-hw-primary-500 focus:ring-hw-primary-500')

  function validateName(ward: WardFormInfoDTO) {
    if (ward.name === '') {
      return translation.required
    } else if (ward.name.length < minWardNameLength) {
      return translation.tooShort(minWardNameLength)
    } else if (ward.name.length > maxWardNameLength) {
      return translation.tooLong(maxWardNameLength)
    } else if (usedWardNames.find(value => value === ward.name) !== undefined) {
      // May still be a duplicate, if edited at the same time
      return translation.duplicateName
    }
  }

  function triggerOnChange(newWard: WardFormInfoDTO) {
    const isValid = validateName(newWard) === undefined
    onChange(newWard, isValid)
  }

  const nameErrorMessage: string | undefined = validateName(ward)

  const isDisplayingShortNameError = nameErrorMessage && touched.name

  return (
    <form>
      <div className={tw('mt-2 mb-1')}>
        <Input id="name" value={ward.name} label={translation.name}
               onBlur={() => setTouched({ ...touched, name: true })}
               onChange={text => triggerOnChange({ ...ward, name: text })}
               maxLength={maxWardNameLength}
               className={tx(inputClasses, { [inputErrorClasses]: isDisplayingShortNameError })}
        />
        {isDisplayingShortNameError && <span className={tw(errorClasses)}>{nameErrorMessage}</span>}
      </div>
      <span className={tw('text-gray-500 text-sm')}>{translation.nameDescription}</span>
    </form>
  )
}
