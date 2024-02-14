import axios, { Axios } from "axios";
import { OpenAttestationServiceBasedUrl, OpenAttestationServiceAuthorizationKey } from "../config";
    
export class AttestStationService
{
    private http: Axios;

    constructor() {
        this.http = axios.create({
            baseURL: OpenAttestationServiceBasedUrl,
            headers: {
                'Authorization': OpenAttestationServiceAuthorizationKey,
                'Content-Type': 'application/json'
            }
        })
    }

    public attestInvoice = async (data: any) => {
        console.log('attesting invoice', data)
        try {
            console.log(JSON.stringify(data))
            const result = await this.http.post('/api/v1/document/wrap', data)
            console.log('attested')
            return result.data
        } catch (e) {
            console.log('Unable to attest Invoice', e)
            return null
        }
    }

    public verifyInvoice = async (data: any) => {
        try {
            const result = await this.http.post('/api/v1/document/verify', data)
            
            return result.data
        } catch (e) {
           // invalid EKYB
           console.log('unable to verify invoice')
           return null
        }
    }
}
