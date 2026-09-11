<script lang="ts">
  import StatCard from '$lib/components/admin/StatCard.svelte';
  import { siteConfig } from '$lib/config/site';

  let { data } = $props();

  const quickActions = [
    { title: 'Buat Informasi', href: '/admin/informasi', icon: '📢', desc: 'Publikasikan berita & pengumuman baru' },
    { title: 'Tambah Agenda', href: '/admin/kalender', icon: '📅', desc: 'Jadwalkan kegiatan fakultas / HIMA' },
    { title: 'Tambah Prestasi', href: '/admin/prestasi', icon: '🏆', desc: 'Unggah capaian & penghargaan mahasiswa' },
    { title: 'Data Mahasiswa', href: '/admin/mahasiswa', icon: '👥', desc: 'Kelola data mahasiswa terdaftar' },
    { title: 'Cek Aspirasi', href: '/admin/aspirasi', icon: '💬', desc: 'Tinjau & balas aspirasi mahasiswa' },
    { title: 'Seleksi Pendaftaran', href: '/admin/pendaftaran', icon: '📝', desc: 'Verifikasi pendaftar pengurus HIMA' }
  ];
</script>

<svelte:head>
  <title>Dashboard Admin | {siteConfig.name}</title>
</svelte:head>

<div class="space-y-8 fade-in">
  <!-- Greeting & Banner Header -->
  <div class="relative overflow-hidden bg-gradient-to-r from-[#0b132b] via-[#0f4c81] to-[#1e3a8a] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl shadow-blue-950/20 border border-slate-700/40">
    <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="relative z-10 max-w-3xl space-y-3">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/10">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Sistem Terintegrasi Live Database
      </div>
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
        Selamat Datang, {data.user?.name || data.user?.email || 'Pengurus HIMA'} 👋
      </h1>
      <p class="text-sm sm:text-base text-blue-100 font-medium leading-relaxed">
        Pusat kendali operasional Portal Mahasiswa Fakultas Sains dan Teknologi. Semua perubahan data langsung tersinkronisasi secara instan ke portal publik.
      </p>
    </div>
  </div>

  <!-- 8 Main Statistic Cards -->
  <div>
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
        <span>Ringkasan Data Portal</span>
      </h2>
      <span class="text-xs text-slate-500 font-semibold">Real-time dari Database</span>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      <StatCard
        title="Total Mahasiswa"
        value={data.stats.students}
        subtitle="Akun mahasiswa aktif"
        icon="Users"
        color="blue"
        href="/admin/mahasiswa"
      />
      <StatCard
        title="Pengurus HIMA"
        value={data.stats.officers}
        subtitle="Struktur kepengurusan"
        icon="UserCheck"
        color="indigo"
        href="/admin/pengurus"
      />
      <StatCard
        title="Program Studi"
        value={data.stats.studyPrograms}
        subtitle="Jurusan di FST"
        icon="GraduationCap"
        color="cyan"
        href="/admin/program-studi"
      />
      <StatCard
        title="Prestasi Mahasiswa"
        value={data.stats.achievements}
        subtitle="Hall of Fame terbit"
        icon="Trophy"
        color="amber"
        href="/admin/prestasi"
      />
      <StatCard
        title="Informasi & Berita"
        value={data.stats.announcements}
        subtitle="Pengumuman aktif"
        icon="Megaphone"
        color="emerald"
        href="/admin/informasi"
      />
      <StatCard
        title="Agenda Mendatang"
        value={data.stats.upcomingEvents}
        subtitle="Event kalender kegiatan"
        icon="Calendar"
        color="purple"
        href="/admin/kalender"
      />
      <StatCard
        title="Aspirasi Masuk"
        value={data.stats.aspirasiPending}
        subtitle="Menunggu tanggapan"
        icon="MessageSquareText"
        color="rose"
        href="/admin/aspirasi"
      />
      <StatCard
        title="Pendaftaran HIMA"
        value={data.stats.registrationsPending}
        subtitle="Perlu verifikasi"
        icon="UserPlus"
        color="blue"
        href="/admin/pendaftaran"
      />
    </div>
  </div>

  <!-- Quick Actions Grid -->
  <div>
    <h2 class="text-lg font-bold text-slate-900 mb-4">Aksi Cepat Pengurus</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      {#each quickActions as qa}
        <a
          href={qa.href}
          class="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400/80 hover:-translate-y-0.5 transition-all group"
        >
          <div class="w-12 h-12 rounded-2xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center text-2xl mb-2 transition-colors">
            {qa.icon}
          </div>
          <span class="text-xs font-bold text-slate-800 group-hover:text-blue-700 leading-tight">
            {qa.title}
          </span>
        </a>
      {/each}
    </div>
  </div>

  <!-- Content Grids: Recent Data & Activity Logs -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
    
    <!-- Left Column (2/3): Recent Students & Pendaftaran -->
    <div class="lg:col-span-2 space-y-6">
      
      <!-- Recent Students Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900">Mahasiswa Baru Terdaftar</h3>
            <p class="text-xs text-slate-500 mt-0.5">Pendaftar akun terbaru di portal</p>
          </div>
          <a href="/admin/mahasiswa" class="text-xs font-bold text-blue-600 hover:text-blue-800">
            Lihat Semua →
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3">Nama Mahasiswa</th>
                <th class="px-5 py-3">NIM</th>
                <th class="px-5 py-3">Program Studi</th>
                <th class="px-5 py-3">Tanggal Daftar</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each data.recentStudents as s}
                <tr class="hover:bg-slate-50/60 transition-colors">
                  <td class="px-5 py-3.5 font-bold text-slate-900">
                    <div class="flex items-center gap-2.5">
                      <div class="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-[11px] shrink-0">
                        {s.name ? s.name[0].toUpperCase() : 'M'}
                      </div>
                      <div class="min-w-0">
                        <p class="truncate">{s.name}</p>
                        <p class="text-[10px] text-slate-400 font-normal">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-3.5 font-semibold text-slate-700">{s.nim || '-'}</td>
                  <td class="px-5 py-3.5 text-slate-600">{s.program_studi || '-'}</td>
                  <td class="px-5 py-3.5 text-slate-400">
                    {s.created_at ? new Date(s.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                </tr>
              {:else}
                <tr>
                  <td colspan="4" class="px-5 py-8 text-center text-slate-400">Belum ada data mahasiswa terdaftar.</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Recent Pendaftaran HIMA Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 class="text-base font-bold text-slate-900">Pendaftaran HIMA FST Terbaru</h3>
            <p class="text-xs text-slate-500 mt-0.5">Formulir pendaftaran kepengurusan masuk</p>
          </div>
          <a href="/admin/pendaftaran" class="text-xs font-bold text-blue-600 hover:text-blue-800">
            Kelola Pendaftaran →
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3">Nama</th>
                <th class="px-5 py-3">Pilihan Divisi</th>
                <th class="px-5 py-3">Status</th>
                <th class="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {#each data.recentRegistrations as reg}
                <tr class="hover:bg-slate-50/60 transition-colors">
                  <td class="px-5 py-3.5">
                    <p class="font-bold text-slate-900">{reg.name}</p>
                    <p class="text-[10px] text-slate-400">{reg.nim} • {reg.prodi || 'FST'}</p>
                  </td>
                  <td class="px-5 py-3.5 font-semibold text-slate-700">{reg.division_choice || '-'}</td>
                  <td class="px-5 py-3.5">
                    <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase
                      {reg.status === 'DITERIMA' ? 'bg-emerald-100 text-emerald-800' :
                       reg.status === 'DITOLAK' ? 'bg-rose-100 text-rose-800' :
                       reg.status === 'DITINJAU' ? 'bg-blue-100 text-blue-800' :
                       'bg-amber-100 text-amber-800'}">
                      {reg.status || 'MENUNGGU'}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-right">
                    <a href="/admin/pendaftaran" class="text-xs font-bold text-blue-600 hover:text-blue-800">Tinjau</a>
                  </td>
                </tr>
              {:else}
                <tr>
                  <td colspan="4" class="px-5 py-8 text-center text-slate-400">Belum ada formulir pendaftaran baru.</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Right Column (1/3): Aspirasi & Activity Logs -->
    <div class="space-y-6">
      
      <!-- Recent Aspirations -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 class="text-base font-bold text-slate-900">Aspirasi Mahasiswa</h3>
            <p class="text-xs text-slate-500">Pesan & masukan dari mahasiswa</p>
          </div>
          <a href="/admin/aspirasi" class="text-xs font-bold text-blue-600 hover:text-blue-800">Lihat →</a>
        </div>

        <div class="space-y-3">
          {#each data.recentAspirations as asp}
            <a href="/admin/aspirasi" class="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 border border-slate-100 transition-colors group">
              <div class="flex items-center justify-between gap-2 mb-1">
                <span class="font-bold text-xs text-slate-900 group-hover:text-blue-700 truncate">{asp.subject || 'Aspirasi Mahasiswa'}</span>
                <span class="text-[10px] font-bold px-1.5 py-0.5 rounded
                  {asp.status === 'SELESAI' ? 'bg-emerald-100 text-emerald-800' :
                   asp.status === 'DIPROSES' ? 'bg-blue-100 text-blue-800' :
                   'bg-amber-100 text-amber-800'}">
                  {asp.status || 'BARU'}
                </span>
              </div>
              <p class="text-xs text-slate-500 line-clamp-2">{asp.content}</p>
              <p class="text-[10px] text-slate-400 mt-2 font-medium">
                {asp.created_at ? new Date(asp.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : ''}
              </p>
            </a>
          {:else}
            <div class="py-8 text-center text-slate-400 text-xs">Belum ada aspirasi baru.</div>
          {/each}
        </div>
      </div>

      <!-- Admin Activity Log -->
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6">
        <div class="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 class="text-base font-bold text-slate-900">Log Aktivitas Admin</h3>
            <p class="text-xs text-slate-500">Catatan riwayat perubahan</p>
          </div>
        </div>

        <div class="space-y-3">
          {#each data.logs as log}
            <div class="flex items-start gap-3 text-xs">
              <div class="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                {log.action === 'CREATE' ? '➕' : log.action === 'UPDATE' ? '✏️' : log.action === 'DELETE' ? '🗑️' : '🔔'}
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-slate-800 leading-snug">{log.description}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">
                  {log.created_at ? new Date(log.created_at).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : ''}
                </p>
              </div>
            </div>
          {:else}
            <div class="py-6 text-center text-slate-400 text-xs">Belum ada aktivitas tercatat.</div>
          {/each}
        </div>
      </div>

    </div>

  </div>
</div>
