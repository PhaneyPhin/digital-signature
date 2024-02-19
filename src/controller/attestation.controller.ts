import { CreditNote, Invoice  } from "../interface/invoice";
import { Topic } from "../enums/topic";
import ResponseKafkaMessage from "../decorator/ResponseKafkaMessage";
import { DIGITAL_SIGNATURE_TEMPLATE } from "../config";
import { AttestStationService } from "../services/attestation.service";

export class AttestationController {
  private readonly attestationService = new AttestStationService();

  @ResponseKafkaMessage({ topic: Topic.ATTEST_INVOICE, replyTopic: Topic.INVOICE_GENERATED })
  async attestUBL(key: string | Buffer, document: any) {
    try {
        document.document = await this.attestationService.attest({
          document: document.document,
          $template: DIGITAL_SIGNATURE_TEMPLATE
        })
        
        console.log('attested document')
        return document
      } catch (e) {
        console.log('[error]', e)
      }
  }

  @ResponseKafkaMessage({ topic: Topic.VERIFY_INVOICE })
  async verifyInvoice(key: string | Buffer, data: any) {
      return  this.attestationService.verifyInvoice(data);
  }
}