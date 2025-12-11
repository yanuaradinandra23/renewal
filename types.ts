export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  recommendedFor: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PricingTier {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  RESTORATION = 'RESTORATION'
}

export interface BookingFormData {
  name: string;
  phone: string;
  address: string;
  shoeBrand: string;
  shoeType: string;
  color: string;
  serviceId: string;
  deliveryType: 'dropoff' | 'pickup';
  paymentMethod: 'qris' | 'cash';
}