import React, { useState } from 'react';
import { Gift, MessageCircle, Heart } from 'lucide-react';
import { STUDIO_INFO } from '../../data/studioInfo';

export const GiftVouchers: React.FC = () => {
  const [amount, setAmount] = useState<number>(75);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('Sophie');
  const [sender, setSender] = useState<string>('Charlotte');
  const [message, setMessage] = useState<string>('Enjoy your relaxing private manicure ritual at The Coco Club!');
  const [voucherCode] = useState(() => `CC-GIFT-${Math.floor(1000 + Math.random() * 9000)}`);

  const finalAmount = customAmount ? Number(customAmount) || 50 : amount;

  const handleWhatsAppVoucher = () => {
    const cleanPhone = STUDIO_INFO.phone.replace(/[^0-9]/g, '');
    const text = `Hello Deoana! 🎁\nI would like to order a bespoke Gift Voucher for The Coco Club in Saint Helier:\n\n🏷️ Amount: £${finalAmount}\n👤 To: ${recipient}\n💌 From: ${sender}\n📝 Message: "${message}"\n🔖 Reference: #${voucherCode}\n\nPlease let me know how to arrange the payment and collection/digital voucher. Thank you!`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section className="py-20 lg:py-24 bg-pearlBush/40 relative overflow-hidden border-t border-oyster-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-redRobin-50 border border-redRobin-200 text-redRobin-900 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest-luxury">
            <Gift className="w-3.5 h-3.5 text-redRobin" />
            <span>The Gift of Pampering</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-normal text-jacobean tracking-tight uppercase leading-tight">
            The Coco Club Gift Vouchers
          </h2>
          <p className="text-sm sm:text-base text-jacobean/70 leading-relaxed">
            Treat someone special to an unhurried, private 1-on-1 beauty or podology experience at 14 La Motte Street.
          </p>
        </div>

        {/* 2-Column Voucher Builder & Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Voucher Customizer Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-oyster-200 shadow-sm space-y-6">
            <h3 className="font-display text-2xl font-bold text-jacobean border-b border-oyster-100 pb-3 uppercase tracking-wide">
              Personalise Your Voucher
            </h3>

            {/* Amount Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-jacobean">
                Select Voucher Value (£ GBP)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[50, 75, 100, 150].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setAmount(val);
                      setCustomAmount('');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      amount === val && !customAmount
                        ? 'bg-jacobean text-lace border-jacobean shadow-xs'
                        : 'bg-lace text-jacobean border-oyster-300 hover:bg-oyster-100'
                    }`}
                  >
                    £{val}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient & Sender */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-jacobean">Recipient Name</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Sophie"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 text-xs focus:outline-none focus:ring-2 focus:ring-redRobin/20"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-jacobean">From (Your Name)</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. Charlotte"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-oyster-300 text-xs focus:outline-none focus:ring-2 focus:ring-redRobin/20"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-jacobean">Personal Note / Message</label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your personal greeting..."
                className="w-full px-3.5 py-2 rounded-xl border border-oyster-300 text-xs focus:outline-none focus:ring-2 focus:ring-redRobin/20 font-bodySerif italic"
              />
            </div>

            <button
              onClick={handleWhatsAppVoucher}
              className="w-full py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order Voucher via WhatsApp (£{finalAmount})</span>
            </button>
          </div>

          {/* Right Column: Live Luxury Voucher Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-jacobean via-jacobean-800 to-jacobean text-lace shadow-2xl border-4 border-gold-400/40 space-y-6 overflow-hidden">
              
              {/* Gold Shimmer Background Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-redRobin/20 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-4 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-redRobin flex items-center justify-center shadow-md">
                    <Heart className="w-4 h-4 text-lace fill-current" />
                  </div>
                  <div>
                    <span className="font-display text-xl font-bold tracking-wider uppercase">
                      THE COCO CLUB
                    </span>
                    <p className="text-[10px] text-gold-300 uppercase tracking-widest font-sans">
                      Privilege Gift Card
                    </p>
                  </div>
                </div>

                <span className="font-display text-4xl font-bold text-gold-300">
                  £{finalAmount}
                </span>
              </div>

              {/* Card Body */}
              <div className="space-y-4 relative z-10">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-oyster-400">Presented To</p>
                  <p className="font-signature text-3xl sm:text-4xl text-lace leading-none">{recipient || 'Valued Guest'}</p>
                </div>

                <div className="bg-white/5 backdrop-blur-xs p-3.5 rounded-2xl border border-white/10 text-xs text-oyster-200 font-bodySerif italic">
                  “{message || 'With love, for your private pampering session.'}”
                </div>

                <div className="flex items-center justify-between text-[11px] text-oyster-300 pt-1">
                  <span>With Love From: <strong>{sender || 'A Friend'}</strong></span>
                  <span className="font-mono text-gold-400">#{voucherCode}</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[10px] text-oyster-400 relative z-10 uppercase tracking-wider">
                <span>14 La Motte St, Saint Helier, Jersey</span>
                <span>Valid for all treatments</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
