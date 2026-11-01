import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { getSystemStatus } from '@recall-radar/shared';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

const recallQueue = new Queue('recall-ingestion', { connection });

const worker = new Worker(
  'recall-ingestion',
  async (job) => {
    console.log('Processing job:', job.name, job.data);

    return {
      processedAt: new Date().toISOString(),
      status: getSystemStatus(),
    };
  },
  { connection }
);

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed`, err.message);
});

(async () => {
  await recallQueue.add('sync-recalls', {
    retailerId: 'demo-retailer',
    source: 'government-feed',
  });

  console.log('Worker started and queued a recall sync job');
})();

process.on('SIGINT', async () => {
  await worker.close();
  process.exit(0);
});
