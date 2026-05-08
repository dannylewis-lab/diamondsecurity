import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email    = process.env.ADMIN_EMAIL    ?? 'admin@diamondglobal.co.tz'
  const password = process.env.ADMIN_PASSWORD ?? 'ChangeMe2024!'
  const name     = process.env.ADMIN_NAME     ?? 'Administrator'

  const hashed = await bcrypt.hash(password, 12)

  const admin = await prisma.admin.upsert({
    where:  { email },
    update: { password: hashed, name },
    create: { email, password: hashed, name },
  })

  console.log(`✓ Admin seeded: ${admin.email}`)
  console.log(`  Password:     ${password}`)
  console.log('  → Change your password after first login via Settings page.')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
