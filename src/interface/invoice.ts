interface TaxCategory {
  id: string | null;
  percent: number;
  tax_scheme: string | null;
}

export interface Item {
  description: string | null;
  name: string | null;
  tax_categories: TaxCategory[] | null;
}

export interface AllowanceCharge {
  charge_indicator: boolean | null;
  reason: string | null;
  amount: number;
  tax_categories: TaxCategory[] | null;
}

export interface InvoiceLine {
  id: string | null;
  quantity_unit_code: string | null;
  quantity: number;
  line_extension_amount: number;
  price: number;
  allowance_charges: AllowanceCharge[] | null,
  item: Item | null;
}

export interface LegalMonetaryTotal {
  line_extension_amount: number;
  tax_exclusive_amount: number;
  tax_inclusive_amount: number;
  charge_total_amount: number;
  payable_amount: number;
}

export interface TaxTotal {
  tax_amount: number;
  tax_subtotals: TaxSubtotal[];
}

export interface TaxSubtotal {
  taxable_amount: string;
  tax_amount: string;
  tax_category: TaxCategory;
}

export interface Merchant {
  merchant_id: string;
  name: string;
  postal_address: {
    street_name: string;
    additional_street_name: string;
    city_name: string;
    postal_zone: string;
    country_code: string;
  };
  party_tax_scheme: {
    company_id: string;
    tax_scheme: string;
  };
  party_legal_entity: {
    registration_name: string;
    company_id: string;
  };
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  business_type: string;
  date_of_incorporation: string;
  bank_account_number: string;
  currency: string;
  bank_name: string;
  bakong_id: string;
  national_id_number: string;
  description: string;
  webhook_url: string;
  merchant_logo?: string;
  iv_param: string;
  secret_key: string;
  hmac_secret_key: string;
}

export interface Invoice {
  currency: string,
  invoice_number: string,
  status: string;
  invoice_id: string,
  issue_date: string,
  due_date: string | null;
  buyer_reference: string | null;
  buyer_vat_tin: string | null;
  attestation: any;
  allowance_charges: AllowanceCharge[] | null;
  exchange_rate: number;
  invoice_lines: InvoiceLine[] | null;
  supplier_id: number,
  customer_id: number,
  supplier: Merchant;
  customer: Merchant;
  tax_total: TaxTotal,
  legal_monetary_total: LegalMonetaryTotal | null;
  is_preview: boolean
}

export interface BatchInvoiceData {
  supplier: Merchant,
  customer: Merchant,
  invoices: Invoice[]
}