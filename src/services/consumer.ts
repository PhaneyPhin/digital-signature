import { GROUP_ID } from "../config";
import { App, getApp } from "../container";
import { kafka } from "./kafka";

export const consumeMessage = async () => {
  const consumer = kafka.consumer({ groupId: GROUP_ID });
  await consumer.connect();
  const app = getApp()
  console.log(App.getTopic())
  await consumer.subscribe({ topics: App.getTopic(), fromBeginning: false });
  await consumer.run({
    eachMessage: async ({ topic, message }) => {
        console.info('Received message from topic' + topic)

          if (message.value) {
            const handle = app.callHandler(topic, message.key?.toString(), message.value)

            if (! handle) {
              console.info('No message handler for topic: ' + topic)
          }
        }
      },
  });
  console.log('cosumed message')
};
