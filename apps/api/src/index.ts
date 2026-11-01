import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createDashboardSummary, getSystemStatus } from '@recall-radar/shared';

const app = Fastify({ logger: true });

app.register(cors, {
  origin: true,
});

app.get('/health', async () => ({
  ok: true,
  service: 'recall-radar-api',
  timestamp: new Date().toISOString(),
}));

app.get('/api/summary', async () => {
  return createDashboardSummary({
    openAlerts: 12,
    highPriority: 4,
    categories: 8,
    resolvedThisWeek: 19,
  });
});

app.get('/api/status', async () => {
  return getSystemStatus();
});

const start = async () => {
  try {
    await app.listen({ port: 3001, host: '0.0.0.0' });
    console.log('API listening on http://localhost:3001');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
