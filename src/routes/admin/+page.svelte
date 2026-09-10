<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  
  // Dummy data for mockup
  const stats = [
    { label: 'Total Pendaftar', value: '142', icon: '📝' },
    { label: 'Pendaftar Terbaru (Minggu ini)', value: '28', icon: '📈' },
    { label: 'Menunggu Review', value: '45', icon: '⏳' },
    { label: 'Diterima', value: '89', icon: '✅' }
  ];

  const recentRegistrations = [
    { name: 'Budi Santoso', prodi: 'Sistem Informasi', divisi: 'Medinfo', status: 'Baru', date: '5 Sep 2026' },
    { name: 'Siti Aminah', prodi: 'Teknik Informatika', divisi: 'Psdm', status: 'Diproses', date: '4 Sep 2026' },
    { name: 'Ahmad Fauzi', prodi: 'Matematika', divisi: 'Bendahara', status: 'Diterima', date: '3 Sep 2026' },
    { name: 'Dewi Lestari', prodi: 'Biologi', divisi: 'Humas', status: 'Ditolak', date: '1 Sep 2026' },
  ];

  const statusColors: Record<string, string> = {
    'Baru': 'bg-blue-100 text-blue-800',
    'Diproses': 'bg-yellow-100 text-yellow-800',
    'Diterima': 'bg-green-100 text-green-800',
    'Ditolak': 'bg-red-100 text-red-800',
  };
</script>

<svelte:head>
  <title>Admin Dashboard — HIMA FST</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
  <div class="mb-8 flex justify-between items-end">
    <div>
      <h1 class="text-3xl font-bold text-dark">Dashboard Admin</h1>
      <p class="text-gray-600 mt-1">Kelola pendaftaran anggota HIMA FST (Mockup)</p>
    </div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
    {#each stats as stat}
      <Card class="flex items-center p-6">
        <div class="text-3xl mr-4">{stat.icon}</div>
        <div>
          <div class="text-sm text-gray-500 font-medium">{stat.label}</div>
          <div class="text-2xl font-bold text-dark">{stat.value}</div>
        </div>
      </Card>
    {/each}
  </div>

  <!-- Filter & Table -->
  <Card class="p-0 overflow-hidden">
    <div class="p-6 border-b border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
      <h2 class="text-lg font-bold text-dark">Daftar Pendaftar Terbaru</h2>
      <div class="flex gap-2">
        <select class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary">
          <option>Semua Prodi</option>
          <option>Sistem Informasi</option>
          <option>Teknik Informatika</option>
        </select>
        <select class="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary">
          <option>Semua Status</option>
          <option>Baru</option>
          <option>Diproses</option>
          <option>Diterima</option>
        </select>
      </div>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-white border-b border-gray-100 text-sm text-gray-500">
            <th class="p-4 font-semibold">Nama Pendaftar</th>
            <th class="p-4 font-semibold">Program Studi</th>
            <th class="p-4 font-semibold">Pilihan Divisi</th>
            <th class="p-4 font-semibold">Tanggal</th>
            <th class="p-4 font-semibold text-center">Status</th>
            <th class="p-4 font-semibold text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {#each recentRegistrations as user}
            <tr class="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td class="p-4 font-medium text-dark">{user.name}</td>
              <td class="p-4 text-gray-600">{user.prodi}</td>
              <td class="p-4 text-gray-600">{user.divisi}</td>
              <td class="p-4 text-gray-600 text-sm">{user.date}</td>
              <td class="p-4 text-center">
                <span class={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td class="p-4 text-right">
                <button class="text-primary hover:text-primary-700 text-sm font-medium mr-3">Detail</button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    
    <div class="p-4 border-t border-gray-100 bg-white text-center">
      <button class="text-sm font-medium text-primary hover:text-primary-700">Lihat Semua Pendaftar</button>
    </div>
  </Card>
</div>
