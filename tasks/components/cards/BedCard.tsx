import { tw } from '@helpwave/common/twind'
import Add from '@helpwave/common/icons/Add'
import type { CardProps } from './Card'
import { Card } from './Card'
import type { PropsWithLanguage } from '@helpwave/common/hooks/useTranslation'
import { useTranslation } from '@helpwave/common/hooks/useTranslation'

type BedCardTranslation = {
  nobody: string
}

const defaultBedCardTranslation = {
  de: {
    nobody: 'frei'
  },
  en: {
    nobody: 'nobody'
  }
}

type BedDTO = {
  name: string
}

export type BedCardProps = CardProps & {
  bed: BedDTO
}

export const BedCard = ({
  language,
  bed,
  onTileClick,
  isSelected
}: PropsWithLanguage<BedCardTranslation, BedCardProps>) => {
  const translation = useTranslation(language, defaultBedCardTranslation)
  return (
    (
      <Card key={bed.name} onTileClick={onTileClick} isSelected={isSelected} className={tw('h-[148px] flex flex-col')}>
        <div className={tw('flex flex-row justify-between')}>
          <span className={tw('font-space font-bold')}>{bed.name}</span>
          <span>{translation.nobody}</span>
        </div>
        <div className={tw('flex flex-1 justify-center items-center')}>
          <Add/>
        </div>
      </Card>
    )
  )
}
