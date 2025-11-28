import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2] || 'admin@cartegrise.fr';
  const password = process.argv[3] || 'Admin123!';
  const nom = process.argv[4] || 'Administrateur';
  const prenom = process.argv[5] || 'Système';

  console.log('🔧 Création du compte administrateur...');
  console.log(`📧 Email: ${email}`);

  // Vérifier si l'utilisateur existe déjà
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log('⚠️  Un utilisateur avec cet email existe déjà.');
    
    // Mettre à jour le rôle en ADMIN
    const updated = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    });

    console.log('✅ Rôle mis à jour en ADMIN pour:', updated.email);
    return;
  }

  // Créer un nouvel administrateur
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nom,
      prenom,
      role: 'ADMIN',
    },
  });

  console.log('✅ Compte administrateur créé avec succès!');
  console.log('👤 ID:', admin.id);
  console.log('📧 Email:', admin.email);
  console.log('👑 Rôle:', admin.role);
  console.log('\n🔐 Mot de passe:', password);
  console.log('\n⚠️  Changez ce mot de passe après votre première connexion!');
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
