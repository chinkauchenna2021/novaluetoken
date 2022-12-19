import type { NextPage } from "next";
import Head from "next/head";

import CreateFreeToPLayArea  from "components/createFreeToPlayArea";

const Roulette: NextPage = () => {
  return (
    <>
      <Head>
        <title>DOubledice Free To Play Game</title>
        <meta
          name="description"
          content="DoubleDice is a patent-backed non-custodial gateway to the pooled betting multiverse"
        />
      </Head>
      <CreateFreeToPLayArea  />
    </>
  );
};

export default Roulette;
