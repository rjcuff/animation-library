import type { MDXComponents } from 'mdx/types'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { ButtonPressDemo } from '@/components/tweens/demos/ButtonPressDemo'
import { CascadeDemo } from '@/components/tweens/demos/CascadeDemo'
import { HoverLiftDemo } from '@/components/tweens/demos/HoverLiftDemo'
import { InterruptDemo } from '@/components/tweens/demos/InterruptDemo'
import { MagneticDemo } from '@/components/tweens/demos/MagneticDemo'
import { PresetsDemo } from '@/components/tweens/demos/PresetsDemo'
import { RotateDemo } from '@/components/tweens/demos/RotateDemo'
import { ToastDemo } from '@/components/tweens/demos/ToastDemo'
import { AnimateDemo } from '@/components/tweens/demos/AnimateDemo'
import { ColorDemo } from '@/components/tweens/demos/ColorDemo'
import { SequenceDemo } from '@/components/tweens/demos/SequenceDemo'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ButtonPressDemo,
    CascadeDemo,
    HoverLiftDemo,
    InterruptDemo,
    MagneticDemo,
    PresetsDemo,
    RotateDemo,
    ToastDemo,
    AnimateDemo,
    ColorDemo,
    SequenceDemo,
    ...components,
  }
}
