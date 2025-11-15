// pages/api/stripe/create-payment-intent.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2020-08-27" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "stripe error" });
  }
}
