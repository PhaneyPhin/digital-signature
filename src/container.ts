export class App {
    public static mappedTopics: Record<string, { controllerName: string, methodName: string }> = {}
    public static mappedCronExpressions: Record<string, { expression: string, controllerName: string, methodName: string }> = {}

    public static addTopic = (topic: string, controllerName: string, methodName: string): void => {
        App.mappedTopics[topic] = {
            controllerName,
            methodName
        }
    }

    public static addCronExpression = (expression: string, controllerName: string, methodName: string): void => {
        const key =[expression, controllerName, methodName].join('-') 
            App.mappedCronExpressions[key] = {
                expression,
                controllerName,
                methodName
            }
    }

    public static getTopic = () => Object.keys(App.mappedTopics)
    public static getMappedCronExpression = () => App.mappedCronExpressions
    public static container: Container;
}

class Container {
    public topics: string[] = []
    public controllers: Record<string, any> = {}

    constructor(Controllers: any[] = []) {
        Controllers.forEach(Controller => {
            const controller = new Controller()

            this.controllers[controller.constructor.name] = controller
        });
    }

    public getHandler(topic: string) {
        const topicHandler = App.mappedTopics[topic]
        if (topicHandler) {
            return {
                controller: this.controllers[topicHandler.controllerName],
                method: topicHandler.methodName
            }
        } else {
            return null
        }
    }

    public getCronHandler(key: string) {
        const cronExpression = App.mappedCronExpressions[key]

        if (cronExpression) {
            return {
                controller: this.controllers[cronExpression.controllerName],
                method: cronExpression.methodName
            }
        }

        return null
    }

    public callHandler(topic: string, key: any, data: any) {
        const handler = this.getHandler(topic)

        if (handler) {
            const controller = handler.controller
            const method = handler.method
            console.log(key, data)
            controller[method](key, data)

            return true
        }

        return false
    }

    public callCronHandler = (expression: string, controllerName: string, methodName: string) => {
        const key =[expression, controllerName, methodName].join('-') 

        const handler = this.getCronHandler(key)

        if (handler) {
            const controller = handler.controller
            const method = handler.method
            controller[method]()

            return true
        }

        return false
    }

    public getControllerInstant<T>(Controller: any): T {
        return this.controllers[Controller.name]
    }
}

interface AppOptions {
    Controllers?: any[]
}

export const app = (appOptions: AppOptions = {}) => {
    App.container = new Container(appOptions.Controllers)

    return App.container
}

export const getApp = () => {
    return App.container
}