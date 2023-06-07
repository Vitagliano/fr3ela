"use client";

import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

export type JazziconProps = {
  address: number;
  diameter?: number;
};

const ClientJazzicon = ({ address, diameter = 24 }: JazziconProps) => (
  <Jazzicon diameter={diameter} seed={address} />
);

export default ClientJazzicon;
