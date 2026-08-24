import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const StudioFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Technique & Results',
      question: 'What is a Russian / Dry E-File Manicure, and why is it superior?',
      answer: 'Unlike traditional wet manicures that soak and swell the nail plate (causing gel to lift early), a Russian dry manicure uses specialized diamond-grit burs to gently exfoliate dead cuticle tissue without cutting living skin. This creates a seamlessly clean canvas allowing gel or BIAB to be applied flush to the eponychium for up to 4+ weeks of clean outgrown wear.'
    },
    {
      category: 'Natural Nail Health',
      question: 'What is BIAB (Builder in a Bottle) and how does it strengthen nails?',
      answer: 'BIAB is a flexible, thick structural builder gel formulated to reinforce the natural nail apex. It absorbs daily impacts, prevents splits, and allows weak, brittle, or bitten nails to grow long and healthy underneath without the need for acrylic extensions.'
    },
    {
      category: 'Clinical Podology',
      question: 'How does Deoana’s 30+ years of Podology differ from a standard salon pedicure?',
      answer: 'Deoana holds over three decades of international medical podology training. Our clinical podology treatments do not merely apply polish — they safely diagnose and treat deep heel fissures, hyperkeratosis (calluses), thickened toenails, and painful ingrown edges using sterile medical-grade rotary instruments without painful cutting or harsh blades.'
    },
    {
      category: 'Hygiene & Safety',
      question: 'What are your sterilization protocols?',
      answer: 'Hygiene is non-negotiable. Every metal instrument is cleaned ultrasonically with medical-grade hospital disinfectant, dried, and sterilized in an autoclave pouch that is opened fresh in front of you. Files, buffers, and towels are single-use or sanitized to medical standards.'
    },
    {
      category: 'Arrival & Location',
      question: 'Where can I park in Saint Helier and how do I enter the studio?',
      answer: 'The studio is located at 14 La Motte Street in central Saint Helier (near the Jersey Archive and Central Market). The nearest parking is Green Street Multi-Storey Car Park (3 minutes walk) or Pier Road. We operate as a private 1-on-1 sanctuary with a private entrance bell to ensure absolute peace and privacy during your visit.'
    },
    {
      category: 'Bookings & Maintenance',
      question: 'Do you remove existing gel or acrylic applied by other salons?',
      answer: 'Yes! We gently de-bulk and safely remove product from other salons using non-damaging e-file and soak techniques to protect your natural nail plate. Please note any existing product when booking so we can allocate sufficient time for your appointment.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative border-t border-oyster-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-khaki-100/80 border border-khaki-300 text-khaki-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-luxury">
            <HelpCircle className="w-3.5 h-3.5 text-khaki-700" />
            <span>Studio Etiquette & Advice</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-jacobean tracking-tight uppercase leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-jacobean/70 leading-relaxed">
            Everything you need to know about our treatments, hygiene standards, and private studio appointments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-redRobin/40 bg-lace shadow-sm'
                    : 'border-oyster-200 bg-white hover:border-oyster-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-khaki-700">
                      {faq.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-jacobean leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-oyster-100 flex items-center justify-center text-jacobean shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-jacobean/80 leading-relaxed border-t border-oyster-200/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Box */}
        <div className="mt-12 p-6 rounded-2xl bg-pearlBush/50 border border-oyster-300 text-center space-y-2">
          <p className="font-display text-xl font-bold text-jacobean uppercase">
            Have a specific concern or custom bridal inquiry?
          </p>
          <p className="text-xs sm:text-sm text-jacobean/70">
            Deoana is happy to answer your questions personally via WhatsApp or phone.
          </p>
        </div>

      </div>
    </section>
  );
};
