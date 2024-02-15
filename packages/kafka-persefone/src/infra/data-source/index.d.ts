export interface KafkaDataSourceProps {
  brokers: string[]
  ssl: boolean
  sasl: {
    mechanism: 'scram-sha-256'
    username: string
    password: string
  }
}
