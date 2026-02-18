import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import AdminDashboard from './AdminDashboard';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  if (!adminSession || adminSession.value !== process.env.ADMIN_PASSWORD) {
    redirect('/admin/login');
  }

  // Get stats
  const [userCount, lastCronLogs, contentCount, readingCount] = await Promise.all([
    prisma.user.count(),
    prisma.cronLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
    prisma.generatedContent.count(),
    prisma.weeklyReading.count(),
  ]);

  return (
    <AdminDashboard
      stats={{
        userCount,
        contentCount,
        readingCount,
      }}
      cronLogs={lastCronLogs}
    />
  );
}
