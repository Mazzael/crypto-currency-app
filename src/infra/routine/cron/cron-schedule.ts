import { Alert } from '@prisma/client'
import { api } from '../../lib/axios'
import { prisma } from '../../lib/prisma'
import { env } from '../../env/env'
import { CronJobInterface } from '../cron-job-interface'

export class CronJob implements CronJobInterface {
  async getAlerts() {
    const alerts = await prisma.alert.findMany()

    return alerts
  }

  async checkCryptoPrices(cryptosIds: string[], alerts: Alert[]) {
    cryptosIds.forEach(async (cryptoId) => {
      try {
        const response = await api.get(
          `https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=${env.COINGECKO_API_KEY}&ids=${cryptoId}&vs_currencies=brl`,
        )

        const filteredAlerts = alerts.filter(
          (alert) => alert.cryptoId === cryptoId,
        )

        filteredAlerts.forEach((alert) => {
          if (alert.targetPrice > response.data[alert.cryptoId].brl) {
            // Implementar evento
          }
        })
      } catch (error) {
        console.error(`Error when searching for crypto price: ${error}`)
      }
    })
  }
}
