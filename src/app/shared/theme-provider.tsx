/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client';

import { logoShort, preloLogo } from '@/assests';
import { LAYOUT_OPTIONS, MODE } from '@/config/enums';
// import { siteConfig } from '@/config/site.config';
import hideRechartsConsoleError from '@/utils/recharts-console-error';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

hideRechartsConsoleError();


export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
    const siteConfig = {
        title: 'Predo',
        description: `Prelo the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.`,
        logo: preloLogo,
        icon: logoShort,
        mode: MODE.LIGHT,
        layout: LAYOUT_OPTIONS.HYDROGEN,
        // TODO: favicon
      };
  return (
    <NextThemeProvider
      enableSystem={false}
      defaultTheme={String(siteConfig.mode)}
    >
      {children}
    </NextThemeProvider>
  );
}