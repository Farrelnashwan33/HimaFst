<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  
  const members = [
    { name: 'Annadzira Sukma Kamila', role: 'Pengurus', division: 'Pengembangan Sumber Daya Mahasiswa', image: '/anggota/633632667_17893412919411782_8560237054708599174_n..webp' },
    { name: 'Ima Siti Fatimah', role: 'Pengurus', division: 'Bendahara HIMA FST', image: '/anggota/636204297_17893415589411782_6604859214681852774_n..webp' },
    { name: 'Karima Khoerunnisa', role: 'Pengurus', division: 'Bendahara HIMA FST', image: '/anggota/636730634_17893414491411782_5949510265058959597_n..webp' },
    { name: 'Eka Septi Narsiati', role: 'Pengurus', division: 'Wakil Ketua HIMA FST', image: '/anggota/636970169_17893418355411782_8654938015269718382_n..webp' },
    { name: 'Fithrotul Kamilah Zakiah', role: 'Pengurus', division: 'Sekretaris HIMA FST', image: '/anggota/637159545_17893417371411782_4508942944506224394_n..webp' },
    { name: 'Ghefira Nur Karimah', role: 'Pengurus', division: 'Sekretaris HIMA FST', image: '/anggota/637212417_17893417725411782_2920826417516928908_n..webp' },
    { name: 'Keisha Refanaura Hakim', role: 'Pengurus', division: 'Media Informasi', image: '/anggota/637235845_17893409850411782_7305827936777666534_n..webp' },
    { name: 'Gilang Permana', role: 'Pengurus', division: 'Pengembangan Sumber Daya Mahasiswa', image: '/anggota/637698261_17893413657411782_5447808352072757297_n..webp' },
    { name: 'Kurnia Rahayu', role: 'Pengurus', division: 'Hubungan Masyarakat', image: '/anggota/637716635_17893386393411782_596907200205409086_n..jpg' },
    { name: 'Aditya Sadia Pratama', role: 'Pengurus', division: 'Hubungan Masyarakat', image: '/anggota/637737214_17893366512411782_2585164871824113141_n..jpg' },
    { name: 'Filemon Manuel', role: 'Pengurus', division: 'Sekretaris HIMA FST', image: '/anggota/637761673_17893417620411782_2136933120054856836_n..webp' },
    { name: 'Sebi Febrian', role: 'Pengurus', division: 'Media Informasi', image: '/anggota/637783566_17893409235411782_9062628675631394507_n..webp' },
    { name: 'Lilik Hamdan', role: 'Pengurus', division: 'Hubungan Masyarakat', image: '/anggota/639485227_17893366743411782_8661347865640415231_n..jpg' },
    { name: 'Tasya Angelicia', role: 'Pengurus', division: 'Ketua HIMA FST', image: '/anggota/639728685_17893420674411782_4440245931304648053_n..webp' },
    { name: 'Zakaria Masduqi', role: 'Pengurus', division: 'Hubungan Masyarakat', image: '/anggota/640136620_17893363932411782_372637179601644961_n..jpg' },
    { name: 'Cindyana Putri', role: 'Pengurus', division: 'Hubungan Masyarakat', image: '/anggota/640325384_17893366605411782_1981236577618494935_n..jpg' },
    { name: 'Firda Amalia P', role: 'Pengurus', division: 'Hubungan Masyarakat', image: '/anggota/640392678_17893386237411782_117332439100215825_n..jpg' },
    { name: 'M. Raihan Ramzy TT', role: 'Pengurus', division: 'Media Informasi', image: '/anggota/641182878_17893410327411782_6146131516176124244_n..webp' }
  ];
</script>

<svelte:head>
  <title>Pengurus HIMA - HIMA FST</title>
</svelte:head>

<section class="relative pt-40 pb-20 lg:pt-48 lg:pb-32 bg-soft min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-16 fade-up">
      <h1 class="text-4xl sm:text-5xl lg:text-7xl font-black text-dark tracking-tight leading-tight mb-6">
        Pengurus <span class="text-primary">HIMA</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-500 leading-relaxed font-normal">
        Daftar pengurus Himpunan Mahasiswa Fakultas Sains dan Teknologi Universitas Terbuka Bandung.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each members as member, i}
        <Card class="fade-up overflow-hidden group">
          <div class="aspect-[4/5] bg-gray-100 relative">
            {#if member.image}
              <img src={member.image} alt={member.name} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {:else}
              <div class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            {/if}
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold text-dark mb-1">{member.name}</h3>
            <p class="text-primary font-semibold text-sm uppercase tracking-wider">{member.role}</p>
            <p class="text-gray-500 text-sm mt-2">Divisi: {member.division}</p>
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>
