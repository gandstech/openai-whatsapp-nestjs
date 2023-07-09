import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
console.log(process.env.OPENAI_TOKEN)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_TOKEN
})
const openai = new OpenAIApi(configuration);


export const OpenArtificialIntelligence = async (prompt: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: prompt}],
            });
            console.log(response.data.choices)
            resolve(response.data.choices[0]['message']['content']);
        } catch (error) {
            reject(error);
        }
    })
}




export const sendTextMessage = (message: string) => {
    return new Promise((resolve, reject) => {
        const data = {
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": process.env.TEST_PHONE_NUMBER,
            "type": "text",
            "text": {
                "body": message
            }
        }
        axios.post(`https://graph.facebook.com/v15.0/103136212562162/messages`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.FACEBOOK_API}`
            }
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            sendTextMessage(`Sorry, I can't able to find your query. Please try later.`)
            reject(err.response.data)
        })
    })
}

