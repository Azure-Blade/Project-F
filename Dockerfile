FROM node:lts-alpine3.20 as base

FROM base AS builder

# RUN apk add --no-cache libc6-compat
# RUN apk update

WORKDIR /app

COPY . .

ENV BUILDING true

RUN npm install
RUN npm run build

FROM base AS runner 
WORKDIR /app

COPY --from=builder /app/public ./public

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 3000
ENV HOSTNAME 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "server.js"]
