// lib/rateLimiter.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create Upstash Redis instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter allowing 2 requests every 60 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, "60s"),
  analytics: true,
});