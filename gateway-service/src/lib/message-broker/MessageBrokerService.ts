import amqp from "amqplib/callback_api.js";
import amqpAsync from "amqplib"

export class AMQPService {
    rabbit: typeof amqp;

    constructor() {
        this.rabbit = amqp;
    }

    sendMessageToQueue(queueId: string, payload: any) {
        const URL = process.env.AMQP_URL;

        if (!URL) throw new Error("No URL provided");
        this.rabbit.connect(URL, function (error, connection) {
            if (error) {
                throw error;
            }

            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                const data = JSON.stringify(payload);

                channel.assertQueue(queueId, {
                    durable: false
                });

                channel.sendToQueue(queueId, Buffer.from(data));
            });
        });
    }

    logMessageFromQueue(queueId: string) {
        const URL = process.env.AMQP_URL;

        if (!URL) throw new Error("No URL provided");
        this.rabbit.connect(URL, function (error, connection) {
            if (error) {
                throw error;
            }

            connection.createChannel(function (error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertQueue(queueId, {
                    durable: false
                });

                channel.consume(queueId, function (payload) {
                    if (payload != null) {
                        let contents = JSON.parse(payload.content.toString())
                        console.log('===== Receive =====');
                        console.log(contents);
                    }
                }, {
                    noAck: true
                });
            });
        });
    }
}

export class AMQPServiceAsync {
    connection?: amqpAsync.Connection;

    async connect() {
        this.connection = await amqpAsync.connect(process.env.AMQP_URL!)

        if (!this.connection) {
            console.error("Not able to establish connection to AMQP");
            return;
        }
    }

    async send(queueId: string, message: any) {
        if (!this.connection) {
            console.error("Not connected to message broker");
            return;
        }

        const channel = await this.connection.createChannel();

        await channel.assertQueue(queueId, {
            durable: false
        })

        channel.sendToQueue(queueId, Buffer.from(JSON.stringify(message)));
    }

    async consume(queueId: string) {
        if (!this.connection) {
            console.error("No current connection");
            return;
        }

        const channel = await this.connection.createChannel()

        await channel.assertQueue(queueId, {
            durable: false
        })

        await channel.consume(queueId, (msg) => {
            if (msg !== null) {
                console.log("RECEIVED: " + msg?.content);
                channel.ack(msg)
            }
        });
    }

    async disconnect() {
        if (!this.connection) {
            console.error("Not connection to close");
            return;
        }
        await this.connection.close()
    }
}