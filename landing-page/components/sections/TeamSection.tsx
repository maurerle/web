import { forwardRef } from 'react'
import { tw } from '@twind/core'
import GridBox from '../GridBox'
import { Section } from '../Section'
import { useTranslation } from '../../hooks/useTranslation'
import type { PropsWithLanguage } from '../../hooks/useTranslation'
import type { Languages } from '../../hooks/useLanguage'
import StadtWarendorf from '../../icons/partners/StadtWarendorf'
import Ukm from '../../icons/partners/ukm'
import MSHack from '../../icons/partners/MSHack'

const roles = { /* eslint-disable key-spacing, no-multi-spaces */
  FRONTEND_DEVELOPER: { id: 'FRONTEND_DEVELOPER', name: 'Frontend Developer', color: 'hw-primary-300' },
  BACKEND_DEVELOPER:  { id: 'BACKEND-DEVELOPER',  name: 'Backend Developer',  color: 'hw-pool-red'    },
  PRODUCT_OWNER:      { id: 'PRODUCT_OWNER',      name: 'Product Owner',      color: 'hw-pool-green'  },
  PRODUCT_MANAGER:    { id: 'PRODUCT_MANAGER',    name: 'Product Manager',    color: 'hw-pool-green'  },
  CUSTOMER_RELATIONS: { id: 'CUSTOMER_RELATIONS', name: 'Customer Relations', color: 'hw-pool-green'  },
  DEVOPS:             { id: 'DEVOPS',             name: 'DevOps',             color: 'hw-pool-orange' },
} /* eslint-enable key-spacing, no-multi-spaces */

type Role = keyof typeof roles

const roleEnum = Object.fromEntries(Object.keys(roles).map((key) => [key, key])) as { [key in Role]: key }

const teamMembers = [ /* eslint-disable key-spacing, no-multi-spaces */
  { name: 'Felix',     role: roleEnum.FRONTEND_DEVELOPER },
  { name: 'Felix',     role: roleEnum.PRODUCT_MANAGER },
  { name: 'Max',       role: roleEnum.BACKEND_DEVELOPER },
  { name: 'Jonas',     role: roleEnum.PRODUCT_OWNER },
  { name: 'Jannik',    role: roleEnum.FRONTEND_DEVELOPER },
  { name: 'Christian', role: roleEnum.CUSTOMER_RELATIONS },
  { name: 'Max',       role: roleEnum.BACKEND_DEVELOPER },
  { name: 'Florian',   role: roleEnum.BACKEND_DEVELOPER },
  { name: 'Nico',      role: roleEnum.DEVOPS }
] /* eslint-enable key-spacing, no-multi-spaces */

const partners = [ /* eslint-disable key-spacing, no-multi-spaces */
  { name: 'Muensterhack',      Icon: MSHack,         url: 'https://www.muensterhack.de/' },
  { name: 'Uniklinik Münster', Icon: Ukm,            url: 'https://www.ukm.de/' },
  { name: 'Stadt Warendorf',   Icon: StadtWarendorf, url: 'https://www.warendorf.de/' },
] /* eslint-enable key-spacing, no-multi-spaces */

export type PartnersTeamSectionLanguage = {
  headingPartners: string,
  headingTeam: string
}

const defaultPartnersTeamSectionTranslations: Record<Languages, PartnersTeamSectionLanguage> = {
  en: {
    headingPartners: 'Our Partners',
    headingTeam: 'Our Team'
  },
  de: {
    headingPartners: 'Unsere Partner',
    headingTeam: 'Unser Team',
  }
}

const Person = ({ name, role }: { name: string, role: Role }) => (
  <div className={tw('w-48')}>
    <div className={tw('font-semibold text-4xl text-white')}>
      {name}
    </div>
    <div className={tw(`font-medium text-xl text-${roles[role].color}`)}>{roles[role].name}</div>
  </div>
)

const PartnersTeamSection = forwardRef<HTMLDivElement, PropsWithLanguage<PartnersTeamSectionLanguage, Record<string, unknown>>>(function TeamSection(props, ref) {
  const language = useTranslation(props.language, defaultPartnersTeamSectionTranslations)
  return (
    <Section ref={ref} id="partners_team">
      <div className={tw('flex justify-between')}>
        <div className={tw('')}>
          <h1 className={tw('text-5xl font-space font-bold pb-4')}>{language.headingPartners}</h1>
          <div className={tw('flex flex-col gap-4 pt-4')}>
            {partners.map((partner) => (
              <a key={partner.name} href={partner.url} target="_blank" rel="noopener noreferrer">
                <div className={tw('flex justify-center py-2 px-8 bg-white rounded-lg')}>
                  <partner.Icon className={tw('w-44 h-16')} />
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className={tw('shrink-0')}>
          <GridBox heading={<h1 className={tw('text-white text-5xl font-space font-bold pl-4 pb-4')}>{language.headingTeam}</h1>}>
            <div className={tw('w-fit grid grid-cols-2 gap-16')}>
              {teamMembers.map(({ name, role }, index) => <Person key={index} name={name} role={role} />)}
            </div>
          </GridBox>
        </div>
      </div>
    </Section>
  )
})

export default PartnersTeamSection
