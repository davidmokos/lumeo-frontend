import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (error) {
    console.error(`Webhook signature verification failed. ${error}`);
    return NextResponse.json({ error: error }, { status: 400 });
  }

  const { type: eventType } = event;

  try {
    if (eventType === "checkout.session.completed") {
      // TODO: handle checkout.session.completed
    } else if (eventType === "customer.subscription.deleted") {
      // TODO: handle customer.subscription.deleted
    }
  } catch (error) {
    console.error("stripe error: " + error + " | EVENT TYPE: " + eventType);
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ message: "Webhook received" }, { status: 200 });
}
