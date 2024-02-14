export const KAFKA_BROKER = process.env.KAFKA_BROKER as string
export const CLIENT_ID = 'ATTESTATION'
export const GROUP_ID = "ATTESTATION";
export const DIGITAL_SIGNATURE_TEMPLATE = {
    "name": "CAM_INVOICE_ATTESTATION",
    "type": "EMBEDDED_RENDERER",
    "url": "https://renderer.poc-caminvoice.camdx.gov.kh"
}
export const OpenAttestationServiceBasedUrl = process.env.OPEN_ATTESTATION_URL as string
export const OpenAttestationServiceAuthorizationKey = process.env.OPEN_ATTESTATION_AUTHORIZATION_KEY as string