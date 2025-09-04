import { logoShort, preloLogo } from '@/assests';
import { LAYOUT_OPTIONS, MODE } from './enums';
// import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

export const siteConfig = {
  title: 'Predo',
  description: `Isomorphic the ultimate React TypeScript Admin Template. Streamline your admin dashboard development with our feature-rich, responsive, and highly customizable solution. Boost productivity and create stunning admin interfaces effortlessly.`,
  logo: preloLogo,
  icon: logoShort,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

// export const metaObject = (
//   title?: string,
//   openGraph?: OpenGraph,
//   description: string = siteConfig.description
// ): Metadata => {
//   return {
//     title: title ? title : siteConfig.title,
//     description,
//     openGraph: openGraph ?? {
//       title: title ? `${title} - Isomorphic Furyroad` : title,
//       description,
//       url: 'https://isomorphic-furyroad.vercel.app',
//       siteName: 'Isomorphic Furyroad', // https://developers.google.com/search/docs/appearance/site-names
//       images: {
//         url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
//         width: 1200,
//         height: 630,
//       },
//       locale: 'en_US',
//       type: 'website',
//     },
//   };
// };
