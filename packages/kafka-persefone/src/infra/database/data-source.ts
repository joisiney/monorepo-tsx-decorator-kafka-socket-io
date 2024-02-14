import { Kafka, logLevel } from 'kafkajs';
interface KafkaDataSourceProps {
    brokers: string[];
    ssl: boolean;
    sasl: {
        mechanism: 'scram-sha-256';
        username: string;
        password: string;
    };
}
export class KafkaDataSourceComposer {
    protected kafka!: Kafka;
    protected checkIfBooted() {
        if (!this.kafka) throw new Error('KafkaProducerService is not booted')
      }
    boot(credentials: KafkaDataSourceProps) {
        this.kafka = new Kafka({
            ...credentials,
            logLevel: logLevel.ERROR,
        });
    }
    
}
