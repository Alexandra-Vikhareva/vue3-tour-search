type CurrencyCode = "RUB" | "UAH" | "USD" | "EUR" | "GBP" | "KZT" | "BYN";

type CurrencyPrices = Record<CurrencyCode, number>;

type ActivityType = "tour" | "entry_ticket" | "transfer" | "composite_activity";

type PayType = "post_pay" | "deposit" | "full_pay";

type ProductType = "shared" | "private";

type TicketType =
  | "group_tour, ticket_per_person"
  | "private_tour, ticket_per_group"
  | "private_tour, ticket_per_person";

interface Duration {
  value: number;
  type: string;
  name: string;
}

interface Schedule {
  id: number | null;
  name: string;
}

interface OrderLineDiscount {
  value: number;
  expiration_date: string;
  expiration_text: string;
  original_price: string;
}

interface OrderLine {
  id: number;
  price: string;
  discount: OrderLineDiscount;
  all_prices: CurrencyPrices;
  netto_all_prices: CurrencyPrices;
  all_amounts_to_pay: CurrencyPrices;
  price_per: string;
  title: string;
  offer_type: "base";
  countable: boolean;
  start_date: number;
  from_quantity: number;
  to_quantity: number;
}

interface OrderOption {
  id: number;
  title: string;
  ticket_type: TicketType;
  is_base: boolean;
  duration: Duration;
  order_lines: OrderLine[];
  schedule: Schedule;
}

interface Category {
  id: number;
  slug: string;
  language: string;
  short_name: string;
  description: string | null;
  name: string;
}

interface Photo {
  id: number | null;
  original: string;
  small: string;
  big: string;
  name: string;
  wide?: string;
}

interface Review {
  activity_id: number;
  content: string;
  rating: number;
  name: string;
  date: string;
}

interface BeginPlace {
  address: string;
  address_existing: boolean;
  address_comment: string;
}

interface BasePrice {
  price: string;
  discount_value: string;
  discount_expires_at: string;
  discount_expiration_text: string;
  original_price: string;
}

interface Host {
  id: string;
  name: string;
  photo: string;
  review_rating: number;
  link: string;
}

export interface Activity {
  id: number;
  activity_type: ActivityType;
  title: string;
  updated_at: string;
  netto_price: string;

  order_options: OrderOption[];

  pay_type: PayType;
  pay_type_in_text: string;
  deposit_amount: number;

  categories: Category[];
  recommendation: number;
  rating: number;
  languages: string[];
  popularity: number;

  description: string;
  url: string;

  cover_photo: Photo;
  main_photo: Photo;

  what_included: string;
  what_not_included: string;

  customers_review_rating: number;
  reviews: number;
  reviews_with_text: number;

  begin_place: BeginPlace;
  finish_point: string;

  minimum_book_period: number;

  places_to_see: string;
  short_info: string;

  reviews_list?: Review[];

  city_id: number;
  city_slug: string;
  region_id: number;
  country_id: number;
  country_slug: string;

  price: string;
  base_price: BasePrice;
  image_small: string;
  image_big: string;

  duration: string;
  product_type: ProductType;

  host: Host;
}
