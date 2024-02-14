import { Invoice  } from "../interface/invoice";
import { Topic } from "../enums/topic";
import ResponseKafkaMessage from "../decorator/ResponseKafkaMessage";
import { DIGITAL_SIGNATURE_TEMPLATE } from "../config";
import { AttestStationService } from "../services/attestation.service";

export class AttestationController {
  private readonly attestationService = new AttestStationService();

  @ResponseKafkaMessage({ topic: Topic.ATTEST_INVOICE, replyTopic: Topic.INVOICE_CREATED })
  async attestInvoice(key: string | Buffer, invoice: Invoice) {
    try {
        invoice.customer.merchant_logo = undefined
        invoice.supplier.merchant_logo = undefined
        const result  = await this.attestationService.attestInvoice({
          invoice_id: invoice.invoice_id,
          currency: invoice.currency,
          invoice_number: invoice.invoice_number,
          issue_date: invoice.issue_date,
          due_date: invoice.due_date,
          buyer_reference: invoice.buyer_reference,
          tax_total: invoice.tax_total,
          legal_monetary_total: invoice.legal_monetary_total,
          allowance_charges: invoice.allowance_charges,
          exchange_rate: invoice.exchange_rate,
          supplier_id: invoice.supplier_id,
          customer_id: invoice.customer_id,
          supplier: invoice.supplier,
          customer: invoice.customer,
          invoice_lines: invoice.invoice_lines,
          $template: DIGITAL_SIGNATURE_TEMPLATE
        })
        
        invoice.attestation = result;
        invoice.status = 'GENERATED'
        console.log(result)
        return invoice;
      } catch (e) {
        console.log('[error]', e)
      }
  }

  @ResponseKafkaMessage({ topic: Topic.VERIFY_INVOICE })
  async verifyInvoice(key: string | Buffer, data: any) {
      return  this.attestationService.verifyInvoice(data);
  }
}