import { env } from '@/env'
import { app } from '@/app' // veja a linha 33 de tsconfig.json para entender esse @
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`Servidor rodando em http://localhost:${env.PORT}`)
  })
