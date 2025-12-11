import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Button } from './components/Button';
import { ChatWidget } from './components/ChatWidget';
import { ServiceItem, BookingFormData } from './types';
import { Check, ArrowRight, Instagram, Twitter, MapPin, Phone, Send, Loader2, Truck, Store, QrCode, Banknote } from 'lucide-react';

const services: ServiceItem[] = [
  {
    id: 'refresh',
    title: 'The Refresh',
    description: 'Pembersihan cepat untuk debu harian.',
    price: 'Rp 15.000',
    recommendedFor: 'Debu ringan, pemakaian harian',
    features: ['Upper cleaning', 'Midsole wipe-down', 'Fast process', 'Basic deodorizing']
  },
  {
    id: 'deep',
    title: 'The Deep Clean',
    description: 'Layanan signature kami untuk sepatu kotor berat.',
    price: 'Rp 25.000',
    recommendedFor: 'Lumpur, noda membandel, kotoran menumpuk',
    features: ['Deep upper scrub', 'Undersole detailing', 'Insole steam clean', 'Stain treatment', 'Water & stain repellent']
  },
  {
    id: 'revival',
    title: 'The Revival',
    description: 'Restorasi total untuk sepatu vintage atau luxury.',
    price: 'Rp 45.000+',
    recommendedFor: 'Yellowing, kerusakan suede, lem lepas',
    features: ['Suede restoration', 'Sole un-yellowing', 'Repaint minor', 'Leather conditioning', 'Crease removal']
  }
];

// Component definition moved outside App to prevent re-rendering issues
const InputField = ({ label, ...props }: any) => (
  <div className="group">
    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-stone-900">{label}</label>
    <input 
      className="w-full px-4 py-3 bg-stone-50 border border-transparent rounded-sm focus:bg-white focus:border-stone-900 focus:ring-0 transition-all placeholder:text-stone-400 text-stone-900"
      {...props} 
    />
  </div>
);

// Component definition moved outside App
const SelectCard = ({ active, onClick, icon: Icon, title, subtitle }: any) => (
  <div 
    onClick={onClick}
    className={`
      cursor-pointer relative flex flex-row items-center justify-start p-4 rounded-md border transition-all duration-200 w-full
      ${active 
        ? 'bg-white border-stone-900 shadow-sm ring-1 ring-stone-900 z-10' 
        : 'bg-stone-50 border-transparent hover:bg-stone-100 hover:border-stone-200 text-stone-500'}
    `}
  >
    <Icon className={`h-5 w-5 mr-3 ${active ? 'text-stone-900' : 'text-stone-400'}`} />
    <div className="flex flex-col text-left">
      <span className={`text-sm font-bold leading-none ${active ? 'text-stone-900' : 'text-stone-600'}`}>{title}</span>
      <span className="text-[10px] text-stone-400 mt-1 leading-none">{subtitle}</span>
    </div>
    {active && <div className="absolute top-1/2 right-4 -translate-y-1/2 w-2 h-2 rounded-full bg-stone-900" />}
  </div>
);

const App: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    address: '',
    shoeBrand: '',
    shoeType: '',
    color: '',
    serviceId: 'deep',
    deliveryType: 'dropoff',
    paymentMethod: 'qris'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const selectedService = services.find(s => s.id === formData.serviceId)?.title || formData.serviceId;
      const deliveryText = formData.deliveryType === 'pickup' ? 'Antar Jemput (+ Rp 5.000)' : 'Drop off di Workshop (Gratis)';
      const paymentText = formData.paymentMethod === 'qris' ? 'QRIS' : 'Tunai / Cash';
      
      const message = `Halo Renewal, saya ingin booking jasa cuci sepatu:\n\n` +
        `Nama: ${formData.name}\n` +
        `Alamat: ${formData.address}\n` +
        `Merk Sepatu: ${formData.shoeBrand}\n` +
        `Tipe: ${formData.shoeType}\n` +
        `Warna: ${formData.color}\n` +
        `Paket: ${selectedService}\n` +
        `Metode: ${deliveryText}\n` +
        `Pembayaran: ${paymentText}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/628176468354?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 1000);
  };

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-stone-200 text-stone-900">
      <Navbar />
      
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
              Hidupkan kembali <br />
              <span className="text-stone-500">langkah terbaikmu.</span>
            </h1>
            <p className="text-lg lg:text-xl text-stone-600 max-w-md leading-relaxed">
              Premium shoe cleaning & care di Balikpapan. Pendekatan minimalis, hasil maksimal untuk sepatu kesayangan Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={scrollToBooking}>Booking Sekarang</Button>
              <Button size="lg" variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'})}>
                Cara Kerja
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[600px] w-full bg-stone-200 rounded-sm overflow-hidden shadow-xl group">
            <img 
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2525&auto=format&fit=crop" 
              alt="Fresh natural clean sneakers outdoors" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Pilihan Paket</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Harga transparan, mulai dari Rp 15.000. Disesuaikan dengan kondisi dan kebutuhan sepatu Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="group relative border border-stone-200 p-8 hover:border-stone-900 transition-all duration-300 bg-stone-50/50 hover:bg-white hover:shadow-lg flex flex-col h-full">
                <div className="mb-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-stone-500 text-sm h-12">{service.description}</p>
                  <div className="text-3xl font-bold mb-6 text-stone-900 mt-4">{service.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm text-stone-600">
                        <Check className="h-4 w-4 text-stone-900 mr-3 mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button variant="outline" fullWidth onClick={() => {
                    setFormData({...formData, serviceId: service.id});
                    scrollToBooking();
                  }}>Pilih Paket</Button>
                  
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Cocok Untuk</span>
                    <p className="text-xs text-stone-600 mt-1">{service.recommendedFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="bg-stone-900 text-stone-50 rounded-sm p-8 lg:p-16 overflow-hidden relative shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            <div>
              <h2 className="text-3xl font-bold mb-6">Proses Renewal</h2>
              <div className="space-y-8">
                {[
                  { title: '01. Inspect / Cek', desc: 'Analisis material sepatu untuk menentukan metode yang aman.' },
                  { title: '02. Treat / Rawat', desc: 'Pembersihan menggunakan solusi eco-friendly khusus (Leather/Suede/Knit).' },
                  { title: '03. Protect / Lindungi', desc: 'Finishing dengan lapisan pelindung untuk menolak debu dan noda baru.' }
                ].map((step) => (
                  <div key={step.title} className="flex flex-col border-l-2 border-stone-700 pl-6 hover:border-white transition-colors">
                    <span className="text-xl font-medium mb-2">{step.title}</span>
                    <p className="text-stone-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="bg-stone-800 p-8 rounded-sm max-w-md w-full border border-stone-700">
                <h3 className="text-xl font-bold mb-4">Bingung pilih paket?</h3>
                <p className="text-stone-400 mb-6">
                  Tanya "Ren", AI Specialist kami untuk diagnosa kondisi sepatu Anda secara instan.
                </p>
                <div className="flex items-center text-stone-300 text-sm font-medium">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Coba widget chat di pojok kanan bawah
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-24 bg-stone-50 scroll-mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden">
            
            <div className="p-8 md:p-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-stone-900">Form Booking</h2>
                <p className="text-stone-500 mt-2">Isi data di bawah, kami akan segera konfirmasi via WhatsApp.</p>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-stone-900 border-b border-stone-100 pb-2 mb-6">
                    <div className="w-2 h-2 bg-stone-900 rounded-full"></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider">Data Pelanggan</h3>
                  </div>

                  <InputField 
                    label="Nama Lengkap" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                    placeholder="Contoh: Budi Santoso" 
                    required 
                  />
                  <InputField 
                    label="Nomor WhatsApp" 
                    name="phone" 
                    type="tel" 
                    value={formData.phone} 
                    onChange={handleInputChange} 
                    placeholder="0812..." 
                    required 
                  />
                  <div className="group">
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5 ml-1 transition-colors group-focus-within:text-stone-900">Alamat Lengkap</label>
                    <textarea 
                      required 
                      name="address" 
                      rows={4} 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3 bg-stone-50 border border-transparent rounded-sm focus:bg-white focus:border-stone-900 focus:ring-0 transition-all placeholder:text-stone-400 text-stone-900 resize-none" 
                      placeholder="Jalan, Kelurahan, Kecamatan..." 
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-stone-900 border-b border-stone-100 pb-2 mb-6">
                    <div className="w-2 h-2 bg-stone-900 rounded-full"></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider">Detail Sepatu & Layanan</h3>
                  </div>

                  <InputField 
                    label="Merk Sepatu" 
                    name="shoeBrand" 
                    value={formData.shoeBrand} 
                    onChange={handleInputChange} 
                    placeholder="Nike, Adidas, dll" 
                    required 
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <InputField 
                      label="Tipe" 
                      name="shoeType" 
                      value={formData.shoeType} 
                      onChange={handleInputChange} 
                      placeholder="Sneakers/Boots" 
                      required 
                    />
                    <InputField 
                      label="Warna" 
                      name="color" 
                      value={formData.color} 
                      onChange={handleInputChange} 
                      placeholder="Putih/Hitam" 
                      required 
                    />
                  </div>

                  <div className="group">
                    <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5 ml-1">Pilih Paket</label>
                    <select 
                      name="serviceId" 
                      value={formData.serviceId} 
                      onChange={handleInputChange} 
                      className="w-full px-4 py-3 bg-stone-50 border border-transparent rounded-sm focus:bg-white focus:border-stone-900 focus:ring-0 transition-all text-stone-900 appearance-none cursor-pointer"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.id}>{s.title} — {s.price}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-5 pt-2">
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Metode Serah Terima</label>
                      <div className="grid grid-cols-2 gap-3">
                        <SelectCard 
                          active={formData.deliveryType === 'dropoff'} 
                          onClick={() => setFormData({...formData, deliveryType: 'dropoff'})}
                          icon={Store}
                          title="Drop Off"
                          subtitle="Gratis ke Workshop"
                        />
                        <SelectCard 
                          active={formData.deliveryType === 'pickup'} 
                          onClick={() => setFormData({...formData, deliveryType: 'pickup'})}
                          icon={Truck}
                          title="Antar Jemput"
                          subtitle="+ Rp 5.000"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider ml-1">Metode Pembayaran</label>
                      <div className="grid grid-cols-2 gap-3">
                        <SelectCard 
                          active={formData.paymentMethod === 'qris'} 
                          onClick={() => setFormData({...formData, paymentMethod: 'qris'})}
                          icon={QrCode}
                          title="QRIS"
                          subtitle="Scan & Go"
                        />
                        <SelectCard 
                          active={formData.paymentMethod === 'cash'} 
                          onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                          icon={Banknote}
                          title="Tunai"
                          subtitle="Bayar Ditempat"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="md:col-span-2 pt-6 border-t border-stone-100 mt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 text-white font-bold py-4 rounded-md hover:bg-stone-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 disabled:opacity-70 disabled:transform-none disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Memproses Pesanan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Kirim Booking via WhatsApp</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-stone-400 mt-4">
                    Pesanan Anda akan diteruskan langsung ke WhatsApp Admin Renewal untuk konfirmasi jadwal.
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="bg-stone-50 border-t border-stone-200 pt-16 pb-8 scroll-mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <span className="text-xl font-bold tracking-tight text-stone-900 block mb-4">RENEWAL.</span>
              <p className="text-stone-500 text-sm">
                Professional shoe care for the modern individual in Balikpapan.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-stone-900">Lokasi Workshop</h4>
              <div className="flex items-start space-x-3 text-stone-600 text-sm mb-3">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>Jl. Kalimaya<br/>Kelurahan Damai<br/>Kecamatan Balikpapan Kota</span>
              </div>
              <div className="flex items-center space-x-3 text-stone-600 text-sm">
                <MapPin className="h-4 w-4 shrink-0 opacity-0" />
                <span>Buka: Senin - Sabtu (10.00 - 20.00)</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-stone-900">Kontak</h4>
              <div className="space-y-3 text-sm text-stone-600">
                <a href="tel:+628176468354" className="flex items-center hover:text-stone-900">
                  <Phone className="h-4 w-4 mr-3" />
                  +62 817 6468 354
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-stone-900">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-colors">
                  <Instagram className="h-5 w-5 text-stone-700" />
                </a>
                <a href="#" className="p-2 bg-white border border-stone-200 rounded-full hover:bg-stone-100 transition-colors">
                  <Twitter className="h-5 w-5 text-stone-700" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500">
            <p>&copy; 2024 Renewal Shoe Care Balikpapan. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-stone-900">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
};

export default App;