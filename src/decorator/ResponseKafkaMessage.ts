import { App } from "../container";
import { producer } from "../services/producer";

interface ResponseMessageDecoratorParams {
    topic: string,
    responseSchema?: string,
    errorSchema?: string,
    produceTopic?: string
} 

function ResponseKafkaMessage(options: ResponseMessageDecoratorParams, decodedParam = false) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        App.addTopic(options.topic, target.constructor.name, propertyKey)

        descriptor.value = async function (key: any, data: any) {
            try {
                data = JSON.parse(data?.toString())
                
                data = await originalMethod.call(this, key, data);
                
                await producer.send({ topic: options.produceTopic || 'reply-topic', messages: [
                    { 
                        key: key,
                        value: JSON.stringify(data),
                        headers: {
                            'kafka_correlationId': key
                        }
                    }
                ]})
                
                return data;
            } catch (e: any) {
                console.error('error on descriptor response kafka ' + e.message)
            }
        };
        
        return descriptor;
    };
}

export default ResponseKafkaMessage