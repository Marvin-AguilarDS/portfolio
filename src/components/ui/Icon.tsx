import type { SocialLink } from '@/types/portfolio'

type IconName =
  | SocialLink['icon']
  | 'arrow'
  | 'external'
  | 'location'
  | 'spark'
  | 'sound-on'
  | 'sound-off'

const paths: Record<IconName, JSX.Element> = {
  github: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
    />
  ),
  linkedin: (
    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM3 8.5h3.87V21H3V8.5Zm6.36 0h3.71v1.71h.05c.52-.94 1.78-1.93 3.67-1.93 3.92 0 4.64 2.5 4.64 5.76V21h-3.87v-5.4c0-1.29-.02-2.95-1.83-2.95-1.83 0-2.11 1.4-2.11 2.85V21H9.36V8.5Z" />
  ),
  mail: (
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm.4 2 8.6 6 8.6-6H3.4ZM20 8.2l-7.4 5.2a1 1 0 0 1-1.2 0L4 8.2V17h16V8.2Z" />
  ),
  globe: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.9 6h-2.6a15.5 15.5 0 0 0-1.3-3.5A8 8 0 0 1 18.9 8ZM12 4c.8 1 1.5 2.4 1.9 4H10c.4-1.6 1.1-3 2-4ZM4.3 14a8 8 0 0 1 0-4h3a17 17 0 0 0 0 4h-3Zm.8 2h2.6c.3 1.3.8 2.5 1.3 3.5A8 8 0 0 1 5.1 16Zm2.6-8H5.1a8 8 0 0 1 3.9-3.5A15.5 15.5 0 0 0 7.7 8ZM12 20c-.9-1-1.6-2.4-2-4h4c-.4 1.6-1.1 3-2 4Zm2.4-6H9.6a15 15 0 0 1 0-4h4.8a15 15 0 0 1 0 4Zm.6 5.5c.5-1 1-2.2 1.3-3.5h2.6a8 8 0 0 1-3.9 3.5ZM16.7 14a17 17 0 0 0 0-4h3a8 8 0 0 1 0 4h-3Z" />
  ),
  twitter: (
    <path d="M18.9 3H21l-6.6 7.5L22 21h-6l-4.7-6-5.3 6H3l7-8L2 3h6.2l4.2 5.6L18.9 3Zm-2.1 16h1.4L7.3 4.4H5.8L16.8 19Z" />
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  external: (
    <path d="M14 4h6v6M20 4l-8 8M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  location: (
    <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
  ),
  spark: (
    <path d="M12 2l2.2 6.2L20 10l-5.8 1.8L12 18l-2.2-6.2L4 10l5.8-1.8L12 2Z" />
  ),
  'sound-on': (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path
        d="M16 8.5a4 4 0 0 1 0 7M18.5 6a7 7 0 0 1 0 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
  'sound-off': (
    <>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      <path
        d="M16 9.5l5 5m0-5l-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
}

export function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: IconName
  className?: string
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}
