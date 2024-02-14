import { App } from "../container";

function CronJob(cronExpression: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        App.addCronExpression(cronExpression, target.constructor.name, propertyKey)
        
        return descriptor;
    };
}

export default CronJob