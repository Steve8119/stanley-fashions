import React from "react";
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  CreditCard,
} from "lucide-react";

/* =========================================================
   BENEFITS — Trust strip under the hero
   Four small feature highlights.
========================================================= */

const BENEFITS = [
  {
    id: "delivery",
    Icon: Truck,
    title: "Delivery Options",
    text: "Ask us about delivery",
  },
  {
    id: "service",
    Icon: ShieldCheck,
    title: "Personal Service",
    text: "Help when you need it",
  },
  {
    id: "ordering",
    Icon: MessageCircle,
    title: "Easy Ordering",
    text: "Order through WhatsApp",
  },
  {
    id: "payment",
    Icon: CreditCard,
    title: "Flexible Enquiries",
    text: "Confirm payment options",
  },
];

export default function Benefits() {
  return (
    <section className="sf-benefits" aria-label="Store benefits">
      {BENEFITS.map(({ id, Icon, title, text }) => (
        <div className="sf-benefit" key={id}>
          <div className="sf-benefit-icon">
            <Icon size={22} />
          </div>
          <div>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </section>
  );
}