<script lang="ts">
  let { data } = $props();
</script>

<div class="mb-8">
  <h2 class="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h2>
  <p class="text-gray-600 mt-2">Selamat datang di Panel Pengurus. Berikut ringkasan aktivitas saat ini.</p>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
      👥
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">Total Mahasiswa</p>
      <h3 class="text-2xl font-black text-gray-900">{data.stats.students}</h3>
    </div>
  </div>

  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
      📅
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">Kegiatan</p>
      <h3 class="text-2xl font-black text-gray-900">{data.stats.events}</h3>
    </div>
  </div>

  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div class="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl font-bold">
      📢
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">Informasi</p>
      <h3 class="text-2xl font-black text-gray-900">{data.stats.announcements}</h3>
    </div>
  </div>

  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div class="w-12 h-12 rounded-xl bg-gray-50 text-gray-600 flex items-center justify-center text-xl font-bold">
      🛡️
    </div>
    <div>
      <p class="text-sm font-medium text-gray-500 mb-1">Admin Aktif</p>
      <h3 class="text-2xl font-black text-gray-900">{data.stats.admins}</h3>
    </div>
  </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <div class="lg:col-span-2">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100">
        <h3 class="text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
      </div>
      <div class="p-0">
        {#if data.logs.length > 0}
          <div class="divide-y divide-gray-50">
            {#each data.logs as log}
              <div class="p-6 hover:bg-gray-50/50 transition-colors flex gap-4">
                <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                  {log.action === 'CREATE' ? '➕' : log.action === 'UPDATE' ? '✏️' : log.action === 'DELETE' ? '🗑️' : '🔔'}
                </div>
                <div>
                  <p class="text-sm text-gray-900 font-medium">{log.description}</p>
                  <p class="text-xs text-gray-500 mt-1">{new Date(log.created_at).toLocaleString('id-ID')}</p>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="p-8 text-center text-gray-500 text-sm">
            Belum ada aktivitas tercatat.
          </div>
        {/if}
      </div>
    </div>
  </div>
  
  <div>
    <div class="bg-gradient-to-br from-[#0f4c81] to-[#1e3a8a] rounded-2xl shadow-md p-6 text-white">
      <h3 class="text-lg font-bold mb-2">Portal Pengurus</h3>
      <p class="text-blue-100 text-sm leading-relaxed mb-6">
        Sistem manajemen konten Himpunan Mahasiswa Fakultas Sains dan Teknologi. Pastikan untuk selalu memeriksa data secara berkala.
      </p>
      <a href="/admin/informasi" class="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-colors w-full text-center">
        Buat Pengumuman Baru
      </a>
    </div>
  </div>
</div>
