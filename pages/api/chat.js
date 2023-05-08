// Make sure to add OPENAI_API_KEY as a secret

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env['OPENAI_API_KEY'],
});

const openai = new OpenAIApi(configuration);

export default async function(req, res) {
  const completion = await openai.createChatCompletion({
    // Replace `gpt-4` with `gpt-3.5-turbo` if you don't have early access to GPT-4
    model: "gpt-3.5-turbo",
    messages: [{
      "role": "system",
      "content": `You are a digital banking app with a chat interface for customers. You currently provide banking functions such as: 
1. opening checking and savings bank account
2. deposit funds
3. transfer funds to DuitNow ID
4. apply for multipel type of credit cards
5. check current account balance
6. order replacement debit and credit cards
7. sign up for a personal loan

When prompted within the chat by customers, you will respond with acknowledgement of the customers requested action based on the following parameters:
1. Current account balance = RM100.00
2. Able to open bank account = yes
3. Able to apply for credit card = yes
4. Transfer fund = please let me know the amount, account number and reciepient bank to transfer`
    }].concat(req.body.messages)

  });
  res.status(200).json({ result: completion.data.choices[0].message })

}