import { Injectable } from '@nestjs/common';
import { OpenArtificialIntelligence, sendTextMessage } from './utils/bot';

@Injectable()
export class AppService {
  facebookWebhookVerify(query: any): string {
    let mode = query["hub.mode"];
    let token = query["hub.verify_token"];
    let challenge = query["hub.challenge"];
    if (mode && token) {
      if (mode === "subscribe" && token === process.env.VERIFYTOKEN) {
        console.log("WEBHOOK_VERIFIED");
        return challenge;
      }
    }
  }
  facebookWebhook(body: any): string {
    if (body.entry.length && body.entry[0]["changes"]) {
      let changes = body.entry[0]["changes"];
      let message: any = changes[0]["value"]["messages"] ? changes[0]["value"]["messages"][0] : false;
      // console.log(message)
      if (message) {
        switch (message["type"]) {
          case "text":
            OpenArtificialIntelligence(message.text.body).then((message: any) => {
              sendTextMessage(message).then(res => {
                console.log(res);
              }).catch(err => {
                console.log(err)
              })
            }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err)
            })
            break;

          default:
            break;
        }
        return 'Hello GandS!';
      }
    }
  }
}
