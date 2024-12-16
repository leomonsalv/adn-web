import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

interface SupportLinkProps {
  text: string
  url: string
}

export const SupportLink: React.FC<SupportLinkProps> = ({ text, url }) => (
  <Link
    href={url}
    className="flex overflow-hidden gap-1 items-center self-center"
    rel="noopener noreferrer"
    target="_blank"
  >
    <div className="self-stretch my-auto">{text}</div>
    <SquareArrowOutUpRight className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square" />
  </Link>
)
