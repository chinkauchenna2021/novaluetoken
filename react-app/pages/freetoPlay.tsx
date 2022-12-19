import type { NextPage } from "next";
import Head from "next/head";

import CreateFreeToPLayArea from "components/createFreeToPlayArea";

const freetoPlay: NextPage = () => {
  return(
    <>
      <Head>
        <title>Free To Play Area (JackPot is will Commence Soon.)</title>
        <meta
          name="description"
          content="DoubleDice is a patent-backed non-custodial gateway to the pooled betting multiverse"
        />
      </Head>
      <CreateFreeToPLayArea/>
    </>
  );
};

export default freetoPlay;
