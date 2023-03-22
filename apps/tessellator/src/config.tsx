import Head from "next/head";

import { environment } from "./environments/environment";

const titleDefault = "Tessellator";
const url = environment.frontendUrl;
const description = "A | free to use | real-time | 3-D | music visualizer";
const author = "njm222";

const Header = ({ title = titleDefault }:{title:string}) => {
  return (
    <>
      <Head>
        {/* Recommended Meta Tags */}
        <meta charSet="utf-8" />
        <meta content="english" name="language" />
        <meta content="text/html" httpEquiv="content-type" />
        <meta content={author} name="author" />
        <meta content={author} name="designer" />
        <meta content={author} name="publisher" />

        {/* Search Engine Optimization Meta Tags */}
        <title>{title}</title>
        <meta content={description} name="description" />
        <meta
          content="Music Visualizer,Audio Visualizer,Spotify Visualizer,r3f,three.js"
          name="keywords"
        />
        <meta content="index,follow" name="robots" />
        <meta content="web" name="distribution" />
        {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
        <meta content={title} name="og:title" />
        <meta content="site" name="og:type" />
        <meta content={url} name="og:url" />
        <meta content={"/icons/share.png"} name="og:image" />
        <meta content={title} name="og:site_name" />
        <meta content={description} name="og:description" />

        <link href="/icons/apple-touch-icon.png" rel="apple-touch-icon" />
        <link
          href="/icons/favicon-16x16.png"
          rel="apple-touch-icon"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="apple-touch-icon"
          sizes="32x32"
        />
        <link
          href="/icons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link href="/manifest.json" rel="manifest" />
        <link
          color="#000000"
          href="/icons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <link href="/startup.png" rel="apple-touch-startup-image" />

        {/* Meta Tags for HTML pages on Mobile */}
        {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
        <meta
          content="width=device-width, minimum-scale=1, initial-scale=1.0"
          name="viewport"
        />
        <meta content="#000" name="theme-color" />
        <link href="/icons/favicon.ico" rel="shortcut icon" />
      </Head>
    </>
  );
};

export default Header;
