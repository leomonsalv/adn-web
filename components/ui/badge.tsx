import * as Headless from '@headlessui/react'
import clsx from 'clsx'
import React, { forwardRef } from 'react'
import { TouchTarget } from './button'
import { Link } from './link'

const colors = {
  red: 'bg-red-500/15 text-red-700 group-data-[hover]:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400 dark:group-data-[hover]:bg-red-500/20',
  orange:
    'bg-orange-500/15 text-orange-700 group-data-[hover]:bg-orange-500/25 dark:bg-orange-500/10 dark:text-orange-400 dark:group-data-[hover]:bg-orange-500/20',
  amber:
    'bg-amber-400/20 text-amber-700 group-data-[hover]:bg-amber-400/30 dark:bg-amber-400/10 dark:text-amber-400 dark:group-data-[hover]:bg-amber-400/15',
  yellow:
    'bg-yellow-400/20 text-yellow-700 group-data-[hover]:bg-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300 dark:group-data-[hover]:bg-yellow-400/15',
  lime: 'bg-lime-400/20 text-lime-700 group-data-[hover]:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-[hover]:bg-lime-400/15',
  green:
    'bg-green-500/15 text-green-700 group-data-[hover]:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400 dark:group-data-[hover]:bg-green-500/20',
  emerald:
    'bg-emerald-500/15 text-emerald-700 group-data-[hover]:bg-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400 dark:group-data-[hover]:bg-emerald-500/20',
  teal: 'bg-teal-500/15 text-teal-700 group-data-[hover]:bg-teal-500/25 dark:bg-teal-500/10 dark:text-teal-300 dark:group-data-[hover]:bg-teal-500/20',
  cyan: 'bg-cyan-400/20 text-cyan-700 group-data-[hover]:bg-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-300 dark:group-data-[hover]:bg-cyan-400/15',
  sky: 'bg-sky-500/15 text-sky-700 group-data-[hover]:bg-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300 dark:group-data-[hover]:bg-sky-500/20',
  blue: 'bg-blue-500/15 text-blue-700 group-data-[hover]:bg-blue-500/25 dark:text-blue-400 dark:group-data-[hover]:bg-blue-500/25',
  indigo:
    'bg-indigo-500/15 text-indigo-700 group-data-[hover]:bg-indigo-500/25 dark:text-indigo-400 dark:group-data-[hover]:bg-indigo-500/20',
  violet:
    'bg-violet-500/15 text-violet-700 group-data-[hover]:bg-violet-500/25 dark:text-violet-400 dark:group-data-[hover]:bg-violet-500/20',
  purple:
    'bg-purple-500/15 text-purple-700 group-data-[hover]:bg-purple-500/25 dark:text-purple-400 dark:group-data-[hover]:bg-purple-500/20',
  fuchsia:
    'bg-fuchsia-400/15 text-fuchsia-700 group-data-[hover]:bg-fuchsia-400/25 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:group-data-[hover]:bg-fuchsia-400/20',
  pink: 'bg-pink-400/15 text-pink-700 group-data-[hover]:bg-pink-400/25 dark:bg-pink-400/10 dark:text-pink-400 dark:group-data-[hover]:bg-pink-400/20',
  rose: 'bg-rose-400/15 text-rose-700 group-data-[hover]:bg-rose-400/25 dark:bg-rose-400/10 dark:text-rose-400 dark:group-data-[hover]:bg-rose-400/20',
  zinc: 'bg-zinc-600/10 text-zinc-700 group-data-[hover]:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-[hover]:bg-white/10',
}

const customColors = {
  red: 'before:border-r-red-500 before:border-l-red-500 bg-red-500',
  orange: 'before:border-r-orange-500 before:border-l-orange-500 bg-orange-500',
  amber: 'before:border-r-amber-500 before:border-l-amber-500 bg-amber-500',
  yellow: 'before:border-r-yellow-500 before:border-l-yellow-500 bg-yellow-500',
  lime: 'before:border-r-lime-500 before:border-l-lime-500 bg-lime-500',
  green: 'before:border-r-green-500 before:border-l-green-500 bg-green-500',
  emerald: 'before:border-r-emerald-500 before:border-l-emerald-500 bg-emerald-500',
  teal: 'before:border-r-teal-500 before:border-l-teal-500 bg-teal-500',
  cyan: 'before:border-r-cyan-500 before:border-l-cyan-500 bg-cyan-500',
  sky: 'before:border-r-sky-500 before:border-l-sky-500 bg-sky-500',
  blue: 'before:border-r-blue-500 before:border-l-blue-500',
  indigo: 'before:border-r-indigo-500 before:border-l-indigo-500',
  violet: 'before:border-r-violet-500 before:border-l-violet-500',
  purple: 'before:border-r-purple-500 before:border-l-purple-500',
  fuchsia: 'before:border-r-fuchsia-500 before:border-l-fuchsia-500',
  pink: 'before:border-r-pink-500 before:border-l-pink-500',
  rose: 'before:border-r-rose-500 before:border-l-rose-500',
  zinc: 'before:border-r-zinc-500 before:border-l-zinc-500',
}

type BadgeProps = { color?: keyof typeof colors }

export function Badge({
  color = 'zinc',
  className,
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-sm/5 font-medium sm:text-xs/5 forced-colors:outline',
        colors[color],
      )}
    />
  )
}

export const BadgeButton = forwardRef(function BadgeButton(
  {
    color = 'zinc',
    className,
    children,
    ...props
  }: BadgeProps & { className?: string; children: React.ReactNode } & (
      | Omit<Headless.ButtonProps, 'as' | 'className'>
      | Omit<React.ComponentPropsWithoutRef<typeof Link>, 'className'>
    ),
  ref: React.ForwardedRef<HTMLElement>,
) {
  let classes = clsx(
    className,
    'group relative inline-flex rounded-md focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
  )

  return 'href' in props ? (
    <Link {...props} className={classes} ref={ref as React.ForwardedRef<HTMLAnchorElement>}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Link>
  ) : (
    <Headless.Button {...props} className={classes} ref={ref}>
      <TouchTarget>
        <Badge color={color}>{children}</Badge>
      </TouchTarget>
    </Headless.Button>
  )
})

export function CustomBadge({
  children,
  className,
  color = 'red',
  ...props
}: BadgeProps & React.ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      {...props}
      className={clsx(
        className,
        'relative inline-flex items-center justify-center text-white font-bold h-5 w-auto px-1.5 text-xs font-semibold rounded-l-sm rounded-r-sm',
        // Left triangle
        'before:content-[""] before:absolute before:top-0 before:-left-1.5 before:w-0 before:h-0',
        'before:border-t-[10px] before:border-t-transparent before:rounded-l-sm',
        'before:border-r-[8px] before:border-r-red-500 before:rounded-t-lg',
        'before:border-b-[10px] before:border-b-transparent before:rounded-b-lg',
        // colors[color],
        customColors[color],
        // Diagonal stripes in the background
      )}
    >
      {children}
    </span>
  )
}
