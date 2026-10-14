/// <reference types="vite/client" />

declare module 'lucide-react' {
  import * as React from 'react';

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowDown: LucideIcon;
  export const ArrowUp: LucideIcon;
  export const ArrowUpRight: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const Code2: LucideIcon;
  export const Copy: LucideIcon;
  export const Cpu: LucideIcon;
  export const Database: LucideIcon;
  export const Github: LucideIcon;
  export const Layers: LucideIcon;
  export const Linkedin: LucideIcon;
  export const Mail: LucideIcon;
  export const Menu: LucideIcon;
  export const Send: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Terminal: LucideIcon;
  export const X: LucideIcon;
}
