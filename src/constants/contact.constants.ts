// =============================================================================
// CONTACT PAGE CONSTANTS
// =============================================================================

import { Phone, Clock, MapPin } from "lucide-react";
import type {
  ContactHeroContent,
  ContactFormContent,
  TrustedPartnerContent,
  FAQContent,
  ContactInfo,
  Stat,
  FAQ,
  ContactFormData,
} from "@/types/contact.types";

// -----------------------------------------------------------------------------
// Hero Section
// -----------------------------------------------------------------------------

export const CONTACT_HERO: ContactHeroContent = {
  title: "Contact Us",
  subtitle: '"We help you turn your dream trip into reality. From custom choices to tour packages, our team is ready to assist. Contact us and start your smooth travel experience."',
  image: "https://images.unsplash.com/photo-1532364158125-02d75a0f7fb9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "Scenic lake view with boat",
} as const;

// -----------------------------------------------------------------------------
// Contact Form Section
// -----------------------------------------------------------------------------

export const CONTACT_FORM_CONTENT: ContactFormContent = {
  title: "Let's Create Your\nAdventure Together",
  subtitle: "Send us your questions about your travel plans, tour packages, or special requests. Our team will get back to you as soon as possible.",
  form: {
    nameLabel: "Your name",
    namePlaceholder: "Alex Watson",
    emailLabel: "Your Email",
    emailPlaceholder: "alexwatson@gmail.com",
    messageLabel: "Your Message",
    messagePlaceholder: "Write your message",
    submitButton: "Send",
  },
} as const;

export const CONTACT_INFO: ContactInfo[] = [
  {
    id: "phone",
    icon: Phone,
    title: "Phone Number",
    value: "(+994) 55 402-09-80",
  },
  {
    id: "hours",
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Sat: 09:00 - 19:00",
  },
  {
    id: "address",
    icon: MapPin,
    title: "Address",
    value: "Baku Hasan Mecidov street, 1141",
  },
];

export const CONTACT_FORM_INITIAL: ContactFormData = {
  name: "",
  email: "",
  message: "",
};

// -----------------------------------------------------------------------------
// Trusted Partner Section
// -----------------------------------------------------------------------------

export const TRUSTED_PARTNER_CONTENT: TrustedPartnerContent = {
  title: "Your Trusted Partner\nin Travel",
  subtitle: "Our statistics reflect years of expertise, reliability, and customer satisfaction.",
  image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=1200&auto=format&fit=crop",
  imageAlt: "Traveler in nature",
} as const;

export const STATS: Stat[] = [
  { id: "travelers-1", value: "3000+", label: "happy travelers" },
  { id: "packages", value: "150+", label: "successful tour packages" },
  { id: "feedback", value: "500+", label: "positive feedback" },
  { id: "travelers-2", value: "3000+", label: "happy travelers" },
];

// -----------------------------------------------------------------------------
// FAQ Section
// -----------------------------------------------------------------------------

export const FAQ_CONTENT: FAQContent = {
  title: "Frequently asked\nquestions",
  image: "https://images.unsplash.com/photo-1604156788856-2ce5f2171cce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt: "Hot air balloons in the sky",
} as const;

export const FAQS: FAQ[] = [
  {
    id: "reservation",
    question: "What is your reservation process like?",
    answer: "Our reservation process is simple and secure. You can book directly through our website or contact our support team.",
  },
  {
    id: "packages",
    question: "Do your tour packages include flights and hotels?",
    answer: "Yes, most of our packages include flights, hotels, and transfers. Details are specified in each package.",
  },
  {
    id: "payment",
    question: "What payment methods can I use?",
    answer: "We accept all major credit cards, PayPal, and bank transfers.",
  },
  {
    id: "costs",
    question: "Do your prices include additional costs?",
    answer: "Our prices are transparent. Any additional costs (like visa fees or personal expenses) are clearly listed.",
  },
];

// -----------------------------------------------------------------------------
// Validation Messages
// -----------------------------------------------------------------------------

export const CONTACT_VALIDATION = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 2 characters",
  },
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email",
  },
  message: {
    required: "Message is required",
    minLength: "Message must be at least 10 characters",
  },
} as const;
